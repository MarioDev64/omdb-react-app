import type { Config } from '@react-router/dev/config';

export default {
  // Disable SSR to avoid issues with dynamic routes
  ssr: false,

  // Prerender for better SEO (only static routes)
  prerender: ['/'],
} satisfies Config;
