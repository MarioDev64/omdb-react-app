// Example Netlify Edge Function
// This runs on the edge (closer to users) for better performance

export default async (request, context) => {
  // Get user's location for better performance
  const geo = context.geo;
  
  return new Response(
    JSON.stringify({
      message: 'Hello from Netlify Edge Functions!',
      timestamp: new Date().toISOString(),
      location: {
        country: geo.country?.name,
        city: geo.city,
        timezone: geo.timezone
      },
      // You can access environment variables here
      // apiKey: context.env.VITE_OMDB_API_KEY
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      }
    }
  );
}; 