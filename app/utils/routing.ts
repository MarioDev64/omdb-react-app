// Utility functions for handling routing in GitHub Pages

/**
 * Get the base path for the application
 * In development, this is undefined
 * In production (GitHub Pages), this is '/omdb-react-app'
 */
export function getBasePath(): string | undefined {
  if (import.meta.env.DEV) {
    return undefined;
  }
  
  // Check if we're on GitHub Pages
  if (window.location.hostname === 'mariodev64.github.io') {
    return '/omdb-react-app';
  }
  
  return undefined;
}

/**
 * Check if the current environment is GitHub Pages
 */
export function isGitHubPages(): boolean {
  return window.location.hostname === 'mariodev64.github.io';
}

/**
 * Get the full URL for a route
 * Handles the base path for GitHub Pages
 */
export function getFullUrl(path: string): string {
  const basePath = getBasePath();
  const fullPath = basePath ? `${basePath}${path}` : path;
  return `${window.location.origin}${fullPath}`;
}

/**
 * Navigate to a route with proper base path handling
 */
export function navigateTo(path: string): void {
  const basePath = getBasePath();
  const fullPath = basePath ? `${basePath}${path}` : path;
  window.location.href = fullPath;
} 