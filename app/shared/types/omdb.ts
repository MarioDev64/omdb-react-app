import type { z } from 'zod';
import type {
  searchResultSchema,
  searchResponseSchema,
  movieDetailsSchema,
  searchParamsSchema,
  movieDetailsParamsSchema,
} from '../schemas/omdb';

export type SearchResult = z.infer<typeof searchResultSchema>;
export type SearchResponse = z.infer<typeof searchResponseSchema>;
export type MovieDetails = z.infer<typeof movieDetailsSchema>;
export type SearchParams = z.infer<typeof searchParamsSchema>;
export type MovieDetailsParams = z.infer<typeof movieDetailsParamsSchema>;
