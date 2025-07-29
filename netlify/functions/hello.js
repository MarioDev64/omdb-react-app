// Example Netlify Function
// This demonstrates serverless function capabilities

exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    },
    body: JSON.stringify({
      message: 'Hello from Netlify Functions!',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      // You can access environment variables here
      // omdbApiKey: process.env.VITE_OMDB_API_KEY
    })
  };
}; 