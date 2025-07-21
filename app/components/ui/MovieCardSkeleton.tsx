import { motion } from 'framer-motion';

interface MovieCardSkeletonProps {
  className?: string;
  index?: number;
}

export function MovieCardSkeleton({
  className = '',
  index = 0,
}: MovieCardSkeletonProps) {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
    >
      <div className="relative">
        {/* Poster skeleton */}
        <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 animate-pulse" />
        </div>

        {/* Badge skeleton */}
        <div className="absolute top-2 right-2">
          <div className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Information skeleton */}
      <div className="p-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
