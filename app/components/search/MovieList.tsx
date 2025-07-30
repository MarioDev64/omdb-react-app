import { MovieCard } from './MovieCard';
import { MovieListSkeleton } from '../ui/MovieListSkeleton';
import { ErrorMessage } from '../ui/ErrorMessage';
import type { SearchResult } from '../../shared/types/omdb';

interface MovieListProps {
  movies: SearchResult[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  hasMore: boolean;
  onLoadMore: () => void;
  onRetry: () => void;
  className?: string;
}

export function MovieList({
  movies,
  loading,
  error,
  totalResults,
  hasMore,
  onLoadMore,
  onRetry,
  className = '',
}: MovieListProps) {
  if (error) {
    // Check if it's a NOT_FOUND error
    if (error === 'NOT_FOUND') {
      return (
        <div className={`text-center py-12 ${className}`}>
          <div className="text-gray-500 dark:text-gray-400">
            <svg
              className="mx-auto h-12 w-12 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
              No movies or series found
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try with different search terms
            </p>
          </div>
        </div>
      );
    }
    
    return (
      <div className={className}>
        <ErrorMessage message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (loading && movies.length === 0) {
    return (
      <div className={className}>
        <MovieListSkeleton count={12} />
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-500 dark:text-gray-400">
          <svg
            className="mx-auto h-12 w-12 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
            No results found
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Try with different search terms
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Results information */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Found{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalResults}
          </span>{' '}
          results
        </p>
      </div>

      {/* Movies grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie, index) => (
          <MovieCard key={movie.imdbID} movie={movie} index={index} />
        ))}

        {/* Loading skeleton for pagination - inside the grid */}
        {loading && movies.length > 0 && hasMore && (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 w-full mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Load more button */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Loading more results...
              </>
            ) : (
              'Load more results'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
