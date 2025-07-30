import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  className?: string;
}

export function EmptyState({ className = '' }: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="text-gray-500 dark:text-gray-400">
        <MagnifyingGlassIcon className="mx-auto h-12 w-12 mb-4" />
        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
          Start your search
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter a movie or series title to begin exploring
        </p>
      </div>
    </div>
  );
}
