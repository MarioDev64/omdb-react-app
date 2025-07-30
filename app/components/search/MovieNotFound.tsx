import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface MovieNotFoundProps {
  className?: string;
}

export function MovieNotFound({ className = '' }: MovieNotFoundProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="text-gray-500 dark:text-gray-400">
        <MagnifyingGlassIcon className="mx-auto h-12 w-12 mb-4" />
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