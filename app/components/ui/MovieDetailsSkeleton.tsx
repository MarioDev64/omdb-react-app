import { motion } from 'framer-motion';

interface MovieDetailsSkeletonProps {
  className?: string;
}

export function MovieDetailsSkeleton({
  className = '',
}: MovieDetailsSkeletonProps) {
  return (
    <motion.div
      className={`max-w-6xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back button skeleton */}
      <div className="mb-6">
        <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Main content skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Poster skeleton */}
          <div className="md:w-1/3">
            <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>

          {/* Content skeleton */}
          <div className="p-8 flex-1">
            {/* Title skeleton */}
            <div className="mb-6">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
            </div>

            {/* Ratings skeleton */}
            <div className="mb-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
            </div>

            {/* Plot skeleton */}
            <div className="mb-6">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
              </div>
            </div>

            {/* Details skeleton */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-4">
                <div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
