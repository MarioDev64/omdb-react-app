// OMDB API Proxy Function
// This function acts as a proxy to avoid CORS issues

exports.handler = async function (event, context) {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Get the API key from environment variables
    const apiKey = process.env.VITE_OMDB_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({
          error: 'OMDB API key not configured',
          message:
            'Please set VITE_OMDB_API_KEY in Netlify environment variables',
        }),
      };
    }

    // Get query parameters from the request
    const queryParams = event.queryStringParameters || {};

    // Build the OMDB API URL
    const omdbUrl = new URL('http://www.omdbapi.com/');
    omdbUrl.searchParams.set('apikey', apiKey);

    // Add all other query parameters
    Object.keys(queryParams).forEach(key => {
      if (key !== 'apikey') {
        // Don't override our API key
        omdbUrl.searchParams.set(key, queryParams[key]);
      }
    });

    // Make the request to OMDB API
    const response = await fetch(omdbUrl.toString());

    if (!response.ok) {
      throw new Error(`OMDB API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('OMDB Proxy Error:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message,
      }),
    };
  }
};
