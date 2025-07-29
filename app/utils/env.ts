// Environment utilities for production deployment

/**
 * Get the OMDB API key from environment variables
 * In development, it comes from .env file
 * In production (GitHub Pages), it comes from repository secrets
 */
export function getOmdbApiKey(): string {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  if (!apiKey) {
    console.error('OMDB API key is not configured');
    throw new Error(
      'OMDB API key is not configured. Please check your environment variables.'
    );
  }

  return apiKey;
}

/**
 * Check if the application is running in production
 */
export function isProduction(): boolean {
  return import.meta.env.PROD;
}

/**
 * Check if the application is running in development
 */
export function isDevelopment(): boolean {
  return import.meta.env.DEV;
}

/**
 * Get the current environment name
 */
export function getEnvironment(): string {
  return import.meta.env.MODE;
}

/**
 * Get all environment variables for debugging
 */
export function getEnvironmentInfo() {
  return {
    mode: import.meta.env.MODE,
    dev: import.meta.env.DEV,
    prod: import.meta.env.PROD,
    hasApiKey: !!import.meta.env.VITE_OMDB_API_KEY,
    baseUrl: import.meta.env.BASE_URL,
  };
}
