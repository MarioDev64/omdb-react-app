// Production utilities for GitHub Pages deployment

/**
 * Initialize production features
 */
export function initializeProduction(): void {
  if (import.meta.env.PROD) {
    // Initialize analytics
    import('./analytics').then(({ initializeAnalytics }) => {
      initializeAnalytics();
    });

    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/omdb-react-app/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Add production error handling
    window.addEventListener('error', (event) => {
      console.error('Production error:', event.error);
      // You can send errors to an external service here
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // You can send errors to an external service here
    });
  }
}

/**
 * Check if the app is running offline
 */
export function isOffline(): boolean {
  return !navigator.onLine;
}

/**
 * Add offline/online event listeners
 */
export function setupOfflineDetection(): void {
  window.addEventListener('online', () => {
    console.log('App is online');
    // You can show a notification or update UI here
  });

  window.addEventListener('offline', () => {
    console.log('App is offline');
    // You can show a notification or update UI here
  });
}

/**
 * Get app version for debugging
 */
export function getAppVersion(): string {
  return import.meta.env.VITE_APP_VERSION || '1.0.0';
}

/**
 * Get build timestamp
 */
export function getBuildTimestamp(): string {
  return import.meta.env.VITE_BUILD_TIMESTAMP || new Date().toISOString();
}

/**
 * Log production info for debugging
 */
export function logProductionInfo(): void {
  if (import.meta.env.PROD) {
    console.log('🚀 Production Build Info:', {
      version: getAppVersion(),
      timestamp: getBuildTimestamp(),
      environment: import.meta.env.MODE,
      hasApiKey: !!import.meta.env.VITE_OMDB_API_KEY,
      hasAnalytics: !!import.meta.env.VITE_GA_MEASUREMENT_ID,
      baseUrl: import.meta.env.BASE_URL,
    });
  }
} 