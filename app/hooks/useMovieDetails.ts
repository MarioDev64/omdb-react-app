import { useCallback, useRef } from 'react';
import { omdbService } from '../shared/services/OMDBService';
import { useMovieDetailsStore } from '../stores/useMovieDetailsStore';

// Reduced minimum loading time for better UX
const MIN_LOADING_TIME = 200;

export function useMovieDetails() {
  const {
    movie,
    loading,
    error,
    setMovie,
    setLoading,
    setError,
    clearMovie,
    getCachedMovie,
    setCachedMovie,
    prefetchMovie,
  } = useMovieDetailsStore();

  const loadingStartTime = useRef<number | null>(null);

  // Function to get movie details
  const fetchMovieDetails = useCallback(
    async (imdbId: string) => {
      if (!imdbId) {
        setError('IMDB ID is required');
        return;
      }

      // Check if API key is configured
      if (!omdbService.isApiKeyConfigured()) {
        setError(
          'API key is not configured. Please check your environment variables.'
        );
        return;
      }

      // Check cache first for instant loading
      const cached = getCachedMovie(imdbId);
      if (cached) {
        setMovie(cached);
        return;
      }

      try {
        // Start loading with timestamp
        loadingStartTime.current = Date.now();
        setLoading(true);
        setError(null);

        const movieDetails = await omdbService.getMovieDetails({ i: imdbId });

        // Cache the movie details
        setCachedMovie(imdbId, movieDetails);
        setMovie(movieDetails);
      } catch (error) {
        console.error('Movie details error:', error);
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load movie details'
        );
      } finally {
        // Ensure minimum loading time for better UX
        const elapsed = Date.now() - (loadingStartTime.current || 0);
        const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

        setTimeout(() => {
          setLoading(false);
        }, remaining);
      }
    },
    [setMovie, setLoading, setError, getCachedMovie, setCachedMovie]
  );

  // Function to clear state
  const clearMovieHandler = useCallback(() => {
    clearMovie();
  }, [clearMovie]);

  // Function to prefetch movie details
  const prefetchMovieHandler = useCallback(
    async (imdbId: string) => {
      if (!imdbId) return;
      
      // Don't prefetch if already cached
      const cached = getCachedMovie(imdbId);
      if (cached) return;

      try {
        await prefetchMovie(imdbId);
      } catch (error) {
        // Silently fail for prefetching
        console.debug('Prefetch failed:', error);
      }
    },
    [getCachedMovie, prefetchMovie]
  );

  return {
    movie,
    loading,
    error,
    fetchMovieDetails,
    clearMovie: clearMovieHandler,
    prefetchMovie: prefetchMovieHandler,
  };
}
