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

  // Search cache
  searchCache: Map<
    string,
    {
      results: SearchResult[];
      totalResults: number;
      timestamp: number;
    }
  >;

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

  // Cache actions
  getCachedResults: (
    query: string,
    type?: SearchParams['type']
  ) => SearchResult[] | null;
  getCachedData: (
    query: string,
    type?: SearchParams['type']
  ) => { results: SearchResult[]; totalResults: number } | null;
  setCachedResults: (
    query: string,
    type: SearchParams['type'] | undefined,
    results: SearchResult[],
    totalResults: number
  ) => void;
  clearCache: () => void;

  // Utilities
  hasMore: () => boolean;
  isEmpty: boolean;
  getCacheKey: (query: string, type?: SearchParams['type']) => string;
}

// Cache expiration time (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

// Minimum loading time (1 second)
const MIN_LOADING_TIME = 1000;

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

      // Cache actions
      getCachedResults: (query, type) => {
        const { searchCache, getCacheKey } = get();
        const cacheKey = getCacheKey(query, type);
        const cached = searchCache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < CACHE_EXPIRATION) {
          return cached.results;
        }

        return null;
      },

      getCachedData: (query, type) => {
        const { searchCache, getCacheKey } = get();
        const cacheKey = getCacheKey(query, type);
        const cached = searchCache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < CACHE_EXPIRATION) {
          return cached;
        }

        return null;
      },

      setCachedResults: (query, type, results, totalResults) => {
        const { searchCache, getCacheKey } = get();
        const cacheKey = getCacheKey(query, type);

        searchCache.set(cacheKey, {
          results,
          totalResults,
          timestamp: Date.now(),
        });
      },

      clearCache: () => set({ searchCache: new Map() }),

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
