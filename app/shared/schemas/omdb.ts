import { z } from 'zod';

/**
 * Schema for a single search result (movie/series)
 */
export const searchResultSchema = z.object({
  imdbID: z.string(),
  Title: z.string(),
  Year: z.string(),
  Type: z.enum(['movie', 'series', 'episode', 'game']),
  Poster: z.string(),
});

/**
 * Schema for search response
 */
export const searchResponseSchema = z.object({
  Search: z.array(searchResultSchema).optional(),
  totalResults: z
    .string()
    .transform(val => parseInt(val, 10))
    .optional(),
  Response: z.enum(['True', 'False']),
  Error: z.string().optional(),
});

/**
 * Schema for movie/series details
 */
export const movieDetailsSchema = z.object({
  imdbID: z.string(),
  Title: z.string(),
  Year: z.string(),
  Rated: z.string(),
  Released: z.string(),
  Runtime: z.string(),
  Genre: z.string(),
  Director: z.string(),
  Writer: z.string(),
  Actors: z.string(),
  Plot: z.string(),
  Poster: z.string(),
  Ratings: z.array(
    z.object({
      Source: z.string(),
      Value: z.string(),
    })
  ),
  Metascore: z.string(),
  imdbRating: z.string(),
  imdbVotes: z.string(),
  Type: z.enum(['movie', 'series', 'episode', 'game']),
  DVD: z.string().optional(),
  BoxOffice: z.string().optional(),
  Production: z.string().optional(),
  Website: z.string().optional(),
  Response: z.enum(['True', 'False']),
  Error: z.string().optional(),
});

/**
 * Schema for search parameters
 */
export const searchParamsSchema = z.object({
  s: z.string().min(1, 'Search term is required'),
  type: z.enum(['movie', 'series', 'episode', 'game']).optional(),
  y: z.string().optional(), // year
  page: z.number().min(1).optional(),
});

/**
 * Schema for movie details parameters
 */
export const movieDetailsParamsSchema = z.object({
  i: z.string().min(1, 'IMDB ID is required'),
  plot: z.enum(['short', 'full']).optional(),
});
