// Analytics utilities for production deployment

/**
 * Initialize analytics for the application
 * Currently supports Google Analytics 4
 */
export function initializeAnalytics(): void {
  if (import.meta.env.PROD && import.meta.env.VITE_GA_MEASUREMENT_ID) {
    // Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID);
  }
}

/**
 * Track page view for analytics
 */
export function trackPageView(path: string): void {
  if (import.meta.env.PROD && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
}

/**
 * Track custom event for analytics
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, any>
): void {
  if (import.meta.env.PROD && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

/**
 * Track search event
 */
export function trackSearch(query: string, type?: string): void {
  trackEvent('search', {
    search_term: query,
    content_type: type || 'all',
  });
}

/**
 * Track movie view event
 */
export function trackMovieView(movieId: string, title: string): void {
  trackEvent('movie_view', {
    movie_id: movieId,
    movie_title: title,
  });
}

// Type declarations for global objects
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
} 