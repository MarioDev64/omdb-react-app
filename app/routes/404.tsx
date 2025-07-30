import { Link } from 'react-router';
import { AppLayout } from '../components/layout/AppLayout';

// Meta tags for 404 page
export function meta() {
  return [
    { title: 'Page Not Found - OMDB React App' },
    {
      name: 'description',
      content: 'The page you are looking for could not be found.',
    },
    { name: 'robots', content: 'noindex, nofollow' },
    // Open Graph tags
    { property: 'og:title', content: 'Page Not Found - OMDB React App' },
    {
      property: 'og:description',
      content: 'The page you are looking for could not be found.',
    },
    { property: 'og:type', content: 'website' },
    // Canonical URL
    { tagName: 'link', rel: 'canonical', href: '/404' },
  ];
}

export default function NotFoundPage() {
  return (
    <AppLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full space-y-8 text-center">
          {/* 404 Icon */}
          <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600">
            <svg
              className="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Page Not Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Sorry, we couldn't find the page you're looking for. The page
              might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Go Back
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>
              If you believe this is an error, please{' '}
              <a
                href="mailto:support@example.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
