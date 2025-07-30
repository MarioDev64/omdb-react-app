import { MovieCard } from './MovieCard';
import { MovieListSkeleton } from '../ui/MovieListSkeleton';
import { ErrorMessage } from '../ui/ErrorMessage';
import { EmptyState } from './EmptyState';
import { MovieNotFound } from './MovieNotFound';
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

// Loading skeleton component for pagination
function LoadingSkeleton() {
  return (
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
  );
}

// Results count component
function ResultsCount({ totalResults }: { totalResults: number }) {
  return (
    <div className="mb-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Found{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalResults}
        </span>{' '}
        results
      </p>
    </div>
  );
}

// Load more button component
function LoadMoreButton({ 
  onLoadMore, 
  loading, 
  hasMore 
}: { 
  onLoadMore: () => void; 
  loading: boolean; 
  hasMore: boolean; 
}) {
  if (!hasMore) return null;

  return (
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
  );
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
  // Handle different states
  if (error && error !== 'NOT_FOUND') {
    return (
      <div className={className}>
        <ErrorMessage message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (error === 'NOT_FOUND') {
    return <MovieNotFound className={className} />;
  }

  if (movies.length === 0 && !error && !loading) {
    return <EmptyState className={className} />;
  }

  if (loading && movies.length === 0) {
    return (
      <div className={className}>
        <MovieListSkeleton count={12} />
      </div>
    );
  }

  return (
    <div className={className}>
      <ResultsCount totalResults={totalResults} />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie, index) => (
          <MovieCard key={movie.imdbID} movie={movie} index={index} />
        ))}
        
        {loading && movies.length > 0 && hasMore && <LoadingSkeleton />}
      </div>

      <LoadMoreButton onLoadMore={onLoadMore} loading={loading} hasMore={hasMore} />
    </div>
  );
}
