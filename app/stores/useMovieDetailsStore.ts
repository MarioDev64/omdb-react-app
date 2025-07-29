import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { MovieDetails } from '../shared/types/omdb';

interface MovieDetailsState {
  // Movie details state
  movie: MovieDetails | null;
  loading: boolean;
  error: string | null;

  // Enhanced details cache with better management
  detailsCache: Map<
    string,
    {
      movie: MovieDetails;
      timestamp: number;
      lastAccessed: number;
      accessCount: number;
    }
  >;

  // Cache configuration
  cacheConfig: {
    maxCacheSize: number;
    maxCacheAge: number;
    prefetchThreshold: number; // Time in ms to prefetch on hover
  };

  // Actions
  setMovie: (movie: MovieDetails | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMovie: () => void;

  // Enhanced cache actions
  getCachedMovie: (imdbId: string) => MovieDetails | null;
  setCachedMovie: (imdbId: string, movie: MovieDetails) => void;
  clearCache: () => void;
  cleanupCache: () => void;
  prefetchMovie: (imdbId: string) => Promise<void>;
  getCacheStats: () => {
    size: number;
    hitRate: number;
    totalHits: number;
    totalMisses: number;
  };
}

// Cache configuration
const CACHE_CONFIG = {
  maxCacheSize: 30, // Maximum number of cached movies
  maxCacheAge: 10 * 60 * 1000, // 10 minutes
  prefetchThreshold: 300, // 300ms hover to trigger prefetch
};

export const useMovieDetailsStore = create<MovieDetailsState>()(
  devtools(
    (set, get) => ({
      // Initial state
      movie: null,
      loading: false,
      error: null,
      detailsCache: new Map(),
      cacheConfig: CACHE_CONFIG,

      // Actions
      setMovie: movie => set({ movie, error: null }),

      setLoading: loading => set({ loading }),

      setError: error => set({ error, movie: null }),

      clearMovie: () => set({ movie: null, error: null, loading: false }),

      // Enhanced cache actions
      getCachedMovie: imdbId => {
        const { detailsCache, cacheConfig } = get();
        const cached = detailsCache.get(imdbId);

        if (cached && Date.now() - cached.timestamp < cacheConfig.maxCacheAge) {
          // Update access statistics
          cached.lastAccessed = Date.now();
          cached.accessCount += 1;
          return cached.movie;
        }

        return null;
      },

      setCachedMovie: (imdbId, movie) => {
        const { detailsCache, cacheConfig, cleanupCache } = get();
        
        // Cleanup cache if it's getting too large
        if (detailsCache.size >= cacheConfig.maxCacheSize) {
          cleanupCache();
        }

        detailsCache.set(imdbId, {
          movie,
          timestamp: Date.now(),
          lastAccessed: Date.now(),
          accessCount: 1,
        });
      },

      clearCache: () => set({ detailsCache: new Map() }),

      cleanupCache: () => {
        const { detailsCache, cacheConfig } = get();
        const now = Date.now();
        const entries = Array.from(detailsCache.entries());
        
        // Sort by last accessed time and access count (LRU with frequency)
        entries.sort((a, b) => {
          const aScore = a[1].accessCount * (now - a[1].lastAccessed);
          const bScore = b[1].accessCount * (now - b[1].lastAccessed);
          return aScore - bScore;
        });
        
        // Remove oldest entries if cache is too large
        if (entries.length > cacheConfig.maxCacheSize) {
          const toRemove = entries.slice(0, entries.length - cacheConfig.maxCacheSize);
          toRemove.forEach(([key]) => detailsCache.delete(key));
        }
        
        // Remove expired entries
        entries.forEach(([key, value]) => {
          if (now - value.timestamp > cacheConfig.maxCacheAge) {
            detailsCache.delete(key);
          }
        });
      },

      prefetchMovie: async (imdbId) => {
        const { getCachedMovie, setCachedMovie, cacheConfig } = get();
        
        // Don't prefetch if already cached
        if (getCachedMovie(imdbId)) {
          return;
        }

        try {
          // Import service dynamically to avoid circular dependencies
          const { omdbService } = await import('../shared/services/OMDBService');
          
          if (!omdbService.isApiKeyConfigured()) {
            return;
          }

          const movieDetails = await omdbService.getMovieDetails({ i: imdbId });
          setCachedMovie(imdbId, movieDetails);
        } catch (error) {
          // Silently fail for prefetching
          console.debug('Prefetch failed for:', imdbId, error);
        }
      },

      getCacheStats: () => {
        const { detailsCache } = get();
        const now = Date.now();
        let totalHits = 0;
        let totalMisses = 0;
        
        // This is a simplified version - in a real app you'd track hits/misses
        detailsCache.forEach(entry => {
          if (now - entry.lastAccessed < 60000) { // Last minute
            totalHits += entry.accessCount;
          }
        });
        
        return {
          size: detailsCache.size,
          hitRate: totalHits / Math.max(totalHits + totalMisses, 1),
          totalHits,
          totalMisses,
        };
      },
    }),
    {
      name: 'movie-details-store',
    }
  )
);
