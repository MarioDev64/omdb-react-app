import { useCallback, useRef } from 'react';
import { omdbService } from '../shared/services/OMDBService';
import { useMovieDetailsStore } from '../stores/useMovieDetailsStore';

// Minimum loading time (1 second)
const MIN_LOADING_TIME = 1000;

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

      // Check cache first
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
        // Ensure minimum loading time
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

  return {
    movie,
    loading,
    error,
    fetchMovieDetails,
    clearMovie: clearMovieHandler,
  };
}
