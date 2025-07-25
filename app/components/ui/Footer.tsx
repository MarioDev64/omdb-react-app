import { Link } from 'react-router';
import {
  FilmIcon,
  GlobeAltIcon,
  BookOpenIcon,
  PaintBrushIcon,
  PlayIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Left Column */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
              <FilmIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-200">
                  OMDB React App
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                  Movie & Series Search
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs transition-colors duration-200">
              Discover and explore movies and TV series from around the world.
              Built with React, TypeScript, and the OMDB API for a seamless
              search experience.
            </p>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 justify-center"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 justify-center"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 justify-center"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column - App Benefits */}
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
              Why Choose Us
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 justify-center">
                <MagnifyingGlassIcon className="w-4 h-4 text-blue-500" />
                <span>Instant search results</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 justify-center">
                <SparklesIcon className="w-4 h-4 text-purple-500" />
                <span>Modern & responsive design</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 justify-center">
                <ShieldCheckIcon className="w-4 h-4 text-green-500" />
                <span>Secure & reliable API</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 justify-center">
                <FilmIcon className="w-4 h-4 text-orange-500" />
                <span>Comprehensive movie database</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 justify-center">
                <PlayIcon className="w-4 h-4 text-red-500" />
                <span>Free to use, no registration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
              © 2025 OMDB React App. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://github.com/MarioDev64"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/mario-jr-torres-perez-84468a122/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
