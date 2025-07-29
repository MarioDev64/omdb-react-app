import type { Config } from '@react-router/dev/config';

export default {
  // Enable SSR for Netlify
  ssr: true,
  // Prerender for better SEO
  prerender: ['/', '/movie/:id'],
} satisfies Config;
