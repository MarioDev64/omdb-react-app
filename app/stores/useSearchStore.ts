import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { SearchResult, SearchParams } from '../shared/types/omdb';

interface SearchState {
  // Search state
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  searchQuery: string;
  searchType: SearchParams['type'];

  // Enhanced search cache with pagination support
  searchCache: Map<
    string,
    {
      results: SearchResult[];
      totalResults: number;
      timestamp: number;
      pages: Map<number, SearchResult[]>;
      lastAccessed: number;
    }
  >;

  // Cache configuration
  cacheConfig: {
    maxCacheSize: number;
    maxCacheAge: number;
    maxPagesPerQuery: number;
  };

  // Actions
  setResults: (results: SearchResult[], totalResults: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSearchType: (type: SearchParams['type']) => void;
  setCurrentPage: (page: number) => void;
  addResults: (results: SearchResult[]) => void;
  clearResults: () => void;
  clearError: () => void;

  // Enhanced cache actions
  getCachedResults: (
    query: string,
    type?: SearchParams['type'],
    page?: number
  ) => SearchResult[] | null;
  getCachedData: (
    query: string,
    type?: SearchParams['type']
  ) => { results: SearchResult[]; totalResults: number } | null;
  setCachedResults: (
    query: string,
    type: SearchParams['type'] | undefined,
    results: SearchResult[],
    totalResults: number,
    page?: number
  ) => void;
  clearCache: () => void;
  cleanupCache: () => void;
  getCacheStats: () => {
    size: number;
    hitRate: number;
    totalHits: number;
    totalMisses: number;
  };

  // Utilities
  hasMore: () => boolean;
  isEmpty: boolean;
  getCacheKey: (query: string, type?: SearchParams['type']) => string;
}

// Cache configuration
const CACHE_CONFIG = {
  maxCacheSize: 50, // Maximum number of cached queries
  maxCacheAge: 5 * 60 * 1000, // 5 minutes
  maxPagesPerQuery: 10, // Maximum pages to cache per query
};

// Minimum loading time (reduced for better UX)
const MIN_LOADING_TIME = 500;

export const useSearchStore = create<SearchState>()(
  devtools(
    (set, get) => ({
      // Initial state
      results: [],
      loading: false,
      error: null,
      totalResults: 0,
      currentPage: 1,
      searchQuery: '',
      searchType: undefined,
      searchCache: new Map(),
      cacheConfig: CACHE_CONFIG,

      // Actions
      setResults: (results, totalResults) =>
        set({
          results,
          totalResults,
          currentPage: 1,
          error: null,
        }),

      setLoading: loading => set({ loading }),

      setError: error => set({ error }),

      setSearchQuery: searchQuery => set({ searchQuery }),

      setSearchType: searchType => set({ searchType }),

      setCurrentPage: currentPage => set({ currentPage }),

      addResults: newResults =>
        set(state => ({
          results: [...state.results, ...newResults],
        })),

      clearResults: () =>
        set({
          results: [],
          totalResults: 0,
          currentPage: 1,
          error: null,
          searchQuery: '',
          searchType: undefined,
        }),

      clearError: () => set({ error: null }),

      // Enhanced cache actions
      getCachedResults: (query, type, page = 1) => {
        const { searchCache, getCacheKey, cacheConfig } = get();
        const cacheKey = getCacheKey(query, type);
        const cached = searchCache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < cacheConfig.maxCacheAge) {
          // Update last accessed time
          cached.lastAccessed = Date.now();
          
          // If requesting specific page, check if it's cached
          if (page > 1 && cached.pages.has(page)) {
            return cached.pages.get(page) || null;
          }
          
          // For page 1, return main results
          if (page === 1) {
            return cached.results;
          }
        }

        return null;
      },

      getCachedData: (query, type) => {
        const { searchCache, getCacheKey, cacheConfig } = get();
        const cacheKey = getCacheKey(query, type);
        const cached = searchCache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < cacheConfig.maxCacheAge) {
          // Update last accessed time
          cached.lastAccessed = Date.now();
          return {
            results: cached.results,
            totalResults: cached.totalResults,
          };
        }

        return null;
      },

      setCachedResults: (query, type, results, totalResults, page = 1) => {
        const { searchCache, getCacheKey, cacheConfig, cleanupCache } = get();
        const cacheKey = getCacheKey(query, type);
        
        // Cleanup cache if it's getting too large
        if (searchCache.size >= cacheConfig.maxCacheSize) {
          cleanupCache();
        }

        const existing = searchCache.get(cacheKey);
        
        if (existing) {
          // Update existing cache entry
          existing.results = page === 1 ? results : existing.results;
          existing.totalResults = totalResults;
          existing.timestamp = Date.now();
          existing.lastAccessed = Date.now();
          
          // Cache specific page if not page 1
          if (page > 1 && existing.pages.size < cacheConfig.maxPagesPerQuery) {
            existing.pages.set(page, results);
          }
        } else {
          // Create new cache entry
          const pages = new Map();
          if (page > 1) {
            pages.set(page, results);
          }
          
          searchCache.set(cacheKey, {
            results: page === 1 ? results : [],
            totalResults,
            timestamp: Date.now(),
            pages,
            lastAccessed: Date.now(),
          });
        }
      },

      clearCache: () => set({ searchCache: new Map() }),

      cleanupCache: () => {
        const { searchCache, cacheConfig } = get();
        const now = Date.now();
        const entries = Array.from(searchCache.entries());
        
        // Sort by last accessed time (LRU)
        entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
        
        // Remove oldest entries if cache is too large
        if (entries.length > cacheConfig.maxCacheSize) {
          const toRemove = entries.slice(0, entries.length - cacheConfig.maxCacheSize);
          toRemove.forEach(([key]) => searchCache.delete(key));
        }
        
        // Remove expired entries
        entries.forEach(([key, value]) => {
          if (now - value.timestamp > cacheConfig.maxCacheAge) {
            searchCache.delete(key);
          }
        });
      },

      getCacheStats: () => {
        const { searchCache } = get();
        const now = Date.now();
        let totalHits = 0;
        let totalMisses = 0;
        
        // This is a simplified version - in a real app you'd track hits/misses
        searchCache.forEach(entry => {
          if (now - entry.lastAccessed < 60000) { // Last minute
            totalHits++;
          }
        });
        
        return {
          size: searchCache.size,
          hitRate: totalHits / Math.max(totalHits + totalMisses, 1),
          totalHits,
          totalMisses,
        };
      },

      // Utilities
      hasMore: () => {
        const { results, totalResults } = get();
        const total =
          typeof totalResults === 'string'
            ? parseInt(totalResults, 10)
            : totalResults;
        return results.length < total;
      },

      get isEmpty() {
        const { results, loading, error } = get();
        return !loading && results.length === 0 && !error;
      },

      getCacheKey: (query, type) => {
        return `${query.toLowerCase()}_${type || 'all'}`;
      },
    }),
    {
      name: 'search-store',
    }
  )
);
