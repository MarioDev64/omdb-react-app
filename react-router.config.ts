import type { Config } from '@react-router/dev/config';

export default {
  // Enable SSR for Netlify
  ssr: true,
  // Prerender for better SEO (only static routes)
  prerender: ['/'],
} satisfies Config;
