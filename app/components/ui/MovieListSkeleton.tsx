import { MovieCardSkeleton } from './MovieCardSkeleton';

interface MovieListSkeletonProps {
  count?: number;
  className?: string;
}

export function MovieListSkeleton({
  count = 12,
  className = '',
}: MovieListSkeletonProps) {
  return (
    <div className={className}>
      {/* Results info skeleton */}
      <div className="mb-6">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
      </div>

      {/* Grid of skeletons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <MovieCardSkeleton key={index} index={index} />
        ))}
      </div>
    </div>
  );
}
