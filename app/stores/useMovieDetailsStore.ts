import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { MovieDetails } from '../shared/types/omdb';

interface MovieDetailsState {
  // Movie details state
  movie: MovieDetails | null;
  loading: boolean;
  error: string | null;

  // Details cache
  detailsCache: Map<
    string,
    {
      movie: MovieDetails;
      timestamp: number;
    }
  >;

  // Actions
  setMovie: (movie: MovieDetails | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMovie: () => void;

  // Cache actions
  getCachedMovie: (imdbId: string) => MovieDetails | null;
  setCachedMovie: (imdbId: string, movie: MovieDetails) => void;
  clearCache: () => void;
}

// Cache expiration time (10 minutes for details)
const CACHE_EXPIRATION = 10 * 60 * 1000;

export const useMovieDetailsStore = create<MovieDetailsState>()(
  devtools(
    (set, get) => ({
      // Initial state
      movie: null,
      loading: false,
      error: null,
      detailsCache: new Map(),

      // Actions
      setMovie: movie => set({ movie, error: null }),

      setLoading: loading => set({ loading }),

      setError: error => set({ error, movie: null }),

      clearMovie: () => set({ movie: null, error: null, loading: false }),

      // Cache actions
      getCachedMovie: imdbId => {
        const { detailsCache } = get();
        const cached = detailsCache.get(imdbId);

        if (cached && Date.now() - cached.timestamp < CACHE_EXPIRATION) {
          return cached.movie;
        }

        return null;
      },

      setCachedMovie: (imdbId, movie) => {
        const { detailsCache } = get();
        detailsCache.set(imdbId, {
          movie,
          timestamp: Date.now(),
        });
      },

      clearCache: () => set({ detailsCache: new Map() }),
    }),
    {
      name: 'movie-details-store',
    }
  )
);
