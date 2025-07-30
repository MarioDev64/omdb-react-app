import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('movie/:id', 'routes/movie.tsx'),
  // Fallback route for all unmatched routes (including Chrome DevTools requests)
  route('*', 'routes/404.tsx'),
] satisfies RouteConfig;
