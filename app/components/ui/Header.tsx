import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';

export function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🎬</div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-200">
                OMDB
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-200">
                React App
              </span>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label={
              isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {isDarkMode ? (
              <>
                <SunIcon className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-white transition-colors duration-200">
                  Light Mode
                </span>
              </>
            ) : (
              <>
                <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 transition-colors duration-200">
                  Dark Mode
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
