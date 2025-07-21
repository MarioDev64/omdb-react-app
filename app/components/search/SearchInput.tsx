import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { SearchParams } from '../../shared/types/omdb';

interface SearchInputProps {
  onSearch: (query: string, type?: SearchParams['type']) => void;
  onClear: () => void;
  loading?: boolean;
  className?: string;
}

export function SearchInput({
  onSearch,
  onClear,
  loading = false,
  className = '',
}: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<SearchParams['type']>(undefined);

  useEffect(() => {
    if (query.trim()) {
      onSearch(query.trim(), type);
    } else {
      onClear();
    }
  }, [query, type, onSearch, onClear]);

  const handleClear = () => {
    setQuery('');
    setType(undefined);
    onClear();
  };

  return (
    <motion.div
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search Input */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for movies, series, or games..."
            className="block w-full pl-12 pr-12 py-4 text-lg border-0 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white dark:placeholder-gray-400 transition-all duration-300"
            disabled={loading}
          />
          {query && (
            <motion.button
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <XMarkIcon className="h-6 w-6" />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Filter by:
        </span>
        <div className="flex gap-3">
          <motion.button
            onClick={() => setType(undefined)}
            className={`px-6 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
              type === undefined
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30 dark:shadow-blue-400/30'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-md hover:shadow-lg'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          <motion.button
            onClick={() => setType('movie')}
            className={`px-6 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
              type === 'movie'
                ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-500/30 dark:shadow-green-400/30'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-green-600 shadow-md hover:shadow-lg'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Movies
          </motion.button>
          <motion.button
            onClick={() => setType('series')}
            className={`px-6 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
              type === 'series'
                ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/30 dark:shadow-purple-400/30'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-600 shadow-md hover:shadow-lg'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Series
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
