import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  FilmIcon,
  VideoCameraIcon,
  TvIcon,
  PlayIcon,
  StarIcon,
  ChartBarIcon,
  BookOpenIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  TagIcon,
  PencilIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { MovieDetailsSkeleton } from '../ui/MovieDetailsSkeleton';
import { ErrorMessage } from '../ui/ErrorMessage';
import { useTheme } from '../../contexts/ThemeContext';
import type { MovieDetails as MovieDetailsType } from '../../shared/types/omdb';

interface MovieDetailsProps {
  movie: MovieDetailsType | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  className?: string;
}

export function MovieDetails({
  movie,
  loading,
  error,
  onRetry,
  className = '',
}: MovieDetailsProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  if (loading) {
    return <MovieDetailsSkeleton className={className} />;
  }

  if (error) {
    // Check if it's a NOT_FOUND error
    if (error === 'NOT_FOUND') {
      return (
        <div className={`text-center py-12 ${className}`}>
          <div className="text-gray-500 dark:text-gray-400">
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
              Movie not found
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The movie you are looking for could not be found
            </p>
            <Link
              to="/"
              className="inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Search
            </Link>
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

  if (!movie) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-500 dark:text-gray-400">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
            Movie not found
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Could not load movie information
          </p>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movie':
        return FilmIcon;
      case 'series':
        return TvIcon;
      case 'episode':
        return PlayIcon;
      case 'game':
        return ComputerDesktopIcon;
      default:
        return VideoCameraIcon;
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
      case 'game':
        return 'Game';
      default:
        return 'Other';
    }
  };

  const getRatingColor = (rating: string) => {
    const num = parseFloat(rating);
    if (num >= 8)
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (num >= 6)
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  const getMetascoreColor = (score: string) => {
    const num = parseInt(score);
    if (num >= 80)
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (num >= 60)
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  const TypeIcon = getTypeIcon(movie.Type);

  return (
    <motion.div
      className={`max-w-6xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button and Theme Toggle */}
      <motion.div
        className="mb-6 flex justify-between items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          to="/"
          className="inline-flex items-center justify-center w-16 h-16 rounded-full text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
          aria-label="Go back to search"
        >
          <ArrowLeftIcon className="w-10 h-10" />
        </Link>

        {/* Theme Toggle Button */}
        <motion.button
          onClick={toggleDarkMode}
          className="inline-flex cursor-pointer items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110"
          aria-label={
            isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
          }
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {isDarkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </motion.button>
      </motion.div>

      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="md:flex">
          {/* Poster */}
          <div className="md:w-1/3">
            <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 relative">
              {movie.Poster && movie.Poster !== 'N/A' ? (
                <img
                  src={movie.Poster}
                  alt={`Poster for ${movie.Title}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700">
                  <div className="text-gray-500 dark:text-gray-400 text-center">
                    <VideoCameraIcon className="w-16 h-16 mx-auto mb-2" />
                    <span className="text-sm">No image available</span>
                  </div>
                </div>
              )}

              {/* Type badge overlay */}
              <div className="absolute top-4 right-4">
                <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-1">
                  <TypeIcon className="w-4 h-4" />
                  {getTypeLabel(movie.Type)}
                </div>
              </div>
            </div>
          </div>

          {/* Información */}
          <div className="md:w-2/3 p-8">
            {/* Header */}
            <div className="mb-8">
              <motion.div
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <TypeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div className="flex items-center gap-4">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    {getTypeLabel(movie.Type)}
                  </span>
                  {movie.Rated && movie.Rated !== 'N/A' && (
                    <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                      {movie.Rated}
                    </span>
                  )}
                </div>
              </motion.div>

              <motion.h1
                className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {movie.Title}
              </motion.h1>

              <motion.div
                className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4 text-red-500" />
                  <span>{movie.Year}</span>
                </div>
                {movie.Runtime && movie.Runtime !== 'N/A' && (
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4 text-blue-500" />
                    <span>{movie.Runtime}</span>
                  </div>
                )}
                {movie.Released && movie.Released !== 'N/A' && (
                  <div className="flex items-center gap-1">
                    <FilmIcon className="w-4 h-4 text-green-500" />
                    <span>{movie.Released}</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Ratings */}
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <motion.div
                className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-800 mb-4 flex items-center gap-2">
                  <StarIcon className="w-5 h-5 text-yellow-500" />
                  Ratings & Reviews
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StarIcon className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold text-gray-900 dark:text-gray-800">
                        IMDb Rating
                      </span>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-bold ${getRatingColor(movie.imdbRating)}`}
                    >
                      {movie.imdbRating}/10
                    </div>
                  </div>
                  {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-800 font-bold">
                        Total Votes
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-gray-800">
                        {parseInt(movie.imdbVotes).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {movie.Metascore && movie.Metascore !== 'N/A' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ChartBarIcon className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-gray-900 dark:text-gray-800">
                          Metascore
                        </span>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-bold ${getMetascoreColor(movie.Metascore)}`}
                      >
                        {movie.Metascore}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Plot */}
            {movie.Plot && movie.Plot !== 'N/A' && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <BookOpenIcon className="w-5 h-5 text-purple-500" />
                  Synopsis
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-lg">
                    {movie.Plot}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Details Grid */}
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {/* Left column */}
              <div className="space-y-6">
                {movie.Genre && movie.Genre !== 'N/A' && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <TagIcon className="w-5 h-5 text-blue-500" />
                      Genre
                    </h4>
                    <p className="text-gray-700 dark:text-gray-400">
                      {movie.Genre}
                    </p>
                  </div>
                )}

                {movie.Director && movie.Director !== 'N/A' && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <VideoCameraIcon className="w-5 h-5 text-green-500" />
                      Director
                    </h4>
                    <p className="text-gray-700 dark:text-gray-400">
                      {movie.Director}
                    </p>
                  </div>
                )}

                {movie.Writer && movie.Writer !== 'N/A' && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <PencilIcon className="w-5 h-5 text-purple-500" />
                      Writer
                    </h4>
                    <p className="text-gray-700 dark:text-gray-400">
                      {movie.Writer}
                    </p>
                  </div>
                )}
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {movie.Actors && movie.Actors !== 'N/A' && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <UserGroupIcon className="w-5 h-5 text-orange-500" />
                      Cast
                    </h4>
                    <p className="text-gray-700 dark:text-gray-400">
                      {movie.Actors}
                    </p>
                  </div>
                )}

                {movie.Production && movie.Production !== 'N/A' && (
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <BuildingOfficeIcon className="w-5 h-5 text-indigo-500" />
                      Production
                    </h4>
                    <p className="text-gray-700 dark:text-gray-400">
                      {movie.Production}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Additional information */}
            {(movie.BoxOffice || movie.DVD || movie.Website) && (
              <motion.div
                className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  Additional Information
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <CurrencyDollarIcon className="w-5 h-5 text-emerald-500" />
                        Box Office
                      </h4>
                      <p className="text-gray-700 dark:text-gray-400 font-medium">
                        {movie.BoxOffice}
                      </p>
                    </div>
                  )}
                  {movie.DVD && movie.DVD !== 'N/A' && (
                    <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-xl border border-pink-200 dark:border-pink-800">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <ComputerDesktopIcon className="w-5 h-5 text-pink-500" />
                        DVD Release
                      </h4>
                      <p className="text-gray-700 dark:text-gray-400">
                        {movie.DVD}
                      </p>
                    </div>
                  )}
                  {movie.Website && movie.Website !== 'N/A' && (
                    <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <GlobeAltIcon className="w-5 h-5 text-cyan-500" />
                        Official Website
                      </h4>
                      <a
                        href={movie.Website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium"
                      >
                        Visit site
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
