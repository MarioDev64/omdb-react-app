import { HttpClient } from '../../api/core/HttpClient';
import {
  searchResponseSchema,
  movieDetailsSchema,
  searchParamsSchema,
  movieDetailsParamsSchema,
} from '../schemas/omdb';
import type {
  SearchResponse,
  MovieDetails,
  SearchParams,
  MovieDetailsParams,
} from '../types/omdb';

/**
 * Service for OMDB API endpoints
 * Extends HttpClient to provide validated API calls
 */
export class OMDBService extends HttpClient {
  private apiKey: string;

  constructor() {
    // Force proxy usage in Netlify to avoid CORS issues
    const isNetlify =
      typeof window !== 'undefined' &&
      window.location.hostname.includes('netlify.app');
    const baseUrl = isNetlify
      ? '/.netlify/functions/omdb-proxy'
      : 'http://www.omdbapi.com';

    super('', baseUrl);
    this.apiKey = import.meta.env.VITE_OMDB_API_KEY || '';

    console.log('🔧 OMDBService initialized:', {
      isNetlify,
      baseUrl,
      env: import.meta.env.MODE,
      hostname:
        typeof window !== 'undefined' ? window.location.hostname : 'server',
    });

    if (!this.apiKey) {
      console.warn(
        '⚠️ VITE_OMDB_API_KEY is not configured. Get your API key at https://www.omdbapi.com/'
      );
    }
  }

  /**
   * Build URL with API key and parameters
   * @param params - Query parameters
   * @returns URL with API key and parameters
   * @private
   */
  private buildUrl(
    params: Record<string, string | number | undefined>
  ): string {
    const isNetlify =
      typeof window !== 'undefined' &&
      window.location.hostname.includes('netlify.app');

    if (isNetlify) {
      // In Netlify, use the proxy - API key is handled server-side
      const filteredParams = Object.fromEntries(
        Object.entries(params)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
      );
      const searchParams = new URLSearchParams(filteredParams);
      return `?${searchParams.toString()}`;
    } else {
      // In development, include API key in URL
      const searchParams = new URLSearchParams({
        apikey: this.apiKey,
        ...Object.fromEntries(
          Object.entries(params).filter(([_, value]) => value !== undefined)
        ),
      });
      return `?${searchParams.toString()}`;
    }
  }

  /**
   * Search movies and series
   * @param params - Search parameters
   * @returns Promise with validated search response
   */
  async searchMovies(params: SearchParams): Promise<SearchResponse> {
    try {
      // Validate input parameters
      const validatedParams = searchParamsSchema.parse(params);

      const url = this.buildUrl(validatedParams);
      const response = await this.getWithSchema<SearchResponse>(
        url,
        searchResponseSchema
      );

      // Check if the response indicates an error
      if (response.Response === 'False') {
        // Check if it's a "not found" error (status 200 but no results)
        if (
          response.Error === 'Movie not found!' ||
          response.Error === 'Series not found!'
        ) {
          // Throw NOT_FOUND for consistent error handling
          throw new Error('NOT_FOUND');
        }
        throw new Error(response.Error || 'Search failed');
      }

      return response;
    } catch (error) {
      console.error('❌ Error searching movies:', error);
      throw error;
    }
  }

  /**
   * Get movie or series details
   * @param params - Movie details parameters
   * @returns Promise with validated movie details
   */
  async getMovieDetails(params: MovieDetailsParams): Promise<MovieDetails> {
    try {
      // Validate input parameters
      const validatedParams = movieDetailsParamsSchema.parse(params);

      const url = this.buildUrl(validatedParams);
      const response = await this.getWithSchema<MovieDetails>(
        url,
        movieDetailsSchema
      );

      // Check if the response indicates an error
      if (response.Response === 'False') {
        // Check if it's a "not found" error (status 200 but no results)
        if (
          response.Error === 'Movie not found!' ||
          response.Error === 'Series not found!'
        ) {
          throw new Error('NOT_FOUND');
        }
        throw new Error(response.Error || 'Failed to get movie details');
      }

      return response;
    } catch (error) {
      console.error('❌ Error getting movie details:', error);
      throw error;
    }
  }

  /**
   * Validate if API key is configured
   * @returns True if API key is configured
   */
  isApiKeyConfigured(): boolean {
    return !!this.apiKey;
  }
}

// Export singleton instance
export const omdbService = new OMDBService();
