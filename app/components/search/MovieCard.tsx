import { motion } from 'framer-motion';
import { Link } from 'react-router';
import type { SearchResult } from '../../shared/types/omdb';

interface MovieCardProps {
  movie: SearchResult;
  className?: string;
  index?: number;
}

export function MovieCard({
  movie,
  className = '',
  index = 0,
}: MovieCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movie':
        return '🎬';
      case 'series':
        return '📺';
      case 'episode':
        return '📺';
      default:
        return '🎭';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'movie':
        return 'Movie';
      case 'series':
        return 'Series';
      case 'episode':
        return 'Episode';
      default:
        return 'Other';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={`/movie/${movie.imdbID}`}
        className={`block group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${className}`}
      >
        <div className="relative">
          {/* Poster */}
          <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img
                src={movie.Poster}
                alt={`Poster for ${movie.Title}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
                <div className="text-gray-500 dark:text-gray-400 text-center">
                  <svg
                    className="w-12 h-12 mx-auto mb-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs">No image</span>
                </div>
              </div>
            )}
          </div>

          {/* Badge de tipo */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-full">
            {getTypeIcon(movie.Type)} {getTypeLabel(movie.Type)}
          </div>
        </div>

        {/* Información */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {movie.Title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
            {movie.Year}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
