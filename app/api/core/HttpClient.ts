import { z } from 'zod';

/**
 * Generic HTTP client for making API requests with Zod schema validation
 * Built on top of fetch API for better control and consistency
 */
export class HttpClient {
  protected baseUrl: string;

  constructor(path: string = '', customBaseUrl?: string) {
    this.baseUrl = customBaseUrl || 'http://www.omdbapi.com';
    // Remove trailing slash and add path if provided
    this.baseUrl = this.baseUrl.replace(/\/$/, '');
    this.baseUrl = path ? `${this.baseUrl}/${path}` : this.baseUrl;
  }

  /**
   * Get default headers for requests
   * @returns Headers object with default headers
   * @private
   */
  private getDefaultHeaders(): HeadersInit {
    return {
      Accept: 'application/json',
      // Don't include Content-Type for GET requests to avoid CORS issues
    };
  }

  /**
   * Enhance error with more user-friendly messages
   * @param error - The original error
   * @returns Enhanced error with better message
   */
  protected enhanceError(error: any): Error {
    let message = 'An unexpected error occurred';

    if (error instanceof Response) {
      const status = error.status;
      message = `Something went wrong: Status code ${status}`;
    }

    console.error('Request failed:', error);
    const enhancedError = new Error(message);
    return enhancedError;
  }

  /**
   * Validate response data against a Zod schema
   * @param data - The data to validate
   * @param schema - The Zod schema to validate against
   * @returns The validated data
   */
  protected validateResponse<T>(data: unknown, schema: z.ZodType<T>): T {
    try {
      return schema.parse(data);
    } catch (error) {
      console.error('Response validation failed:', error);
      const validationError = new Error('Response validation failed');
      throw validationError;
    }
  }

  /**
   * Make a request with schema validation
   * @param method - HTTP method to use
   * @param url - The URL to request
   * @param schema - The Zod schema to validate the response against
   * @param data - Optional data to send with the request
   * @param customHeaders - Additional headers to include
   * @returns Promise with the validated response data
   * @private
   */
  private async requestWithSchema<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    schema?: z.ZodType<T>,
    data?: unknown,
    customHeaders?: HeadersInit
  ): Promise<T> {
    // For OMDB API, build the full URL correctly
    let fullUrl: string;
    if (url.startsWith('http')) {
      fullUrl = url;
    } else if (url.startsWith('?')) {
      // If URL starts with query parameters, append to base URL
      fullUrl = `${this.baseUrl}${url}`;
    } else {
      // Otherwise, treat as relative path
      fullUrl = `${this.baseUrl}/${url}`;
    }

    // Build headers - only include Content-Type for non-GET requests
    const baseHeaders = this.getDefaultHeaders();
    const headers: HeadersInit = {
      ...baseHeaders,
      ...(customHeaders || {}),
    };

    // Add Content-Type only for requests that send data
    if (data && method !== 'GET') {
      Object.assign(headers, { 'Content-Type': 'application/json' });
    }

    console.log(`Making ${method} request to ${fullUrl}`);
    console.log('Headers:', headers);

    const options: RequestInit = {
      method,
      headers,
      // Remove CORS mode for server-side requests
      // mode: 'cors',
    };

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(fullUrl, options);

      if (!response.ok) {
        throw response;
      }

      const responseData = await response.json();

      return schema
        ? this.validateResponse(responseData, schema)
        : responseData;
    } catch (error) {
      console.error(`Request failed: ${method} ${url}`, error);
      throw this.enhanceError(error);
    }
  }

  /**
   * Make a GET request with schema validation
   * @param url - The URL to request
   * @param schema - The Zod schema to validate the response against
   * @param customHeaders - Additional headers to include
   * @returns Promise with the validated response data
   */
  protected async getWithSchema<T>(
    url: string,
    schema: z.ZodType<T>,
    customHeaders?: HeadersInit
  ): Promise<T> {
    return this.requestWithSchema('GET', url, schema, undefined, customHeaders);
  }

  /**
   * Make a POST request with schema validation
   * @param url - The URL to request
   * @param data - The data to send
   * @param schema - The Zod schema to validate the response against
   * @param customHeaders - Additional headers to include
   * @returns Promise with the validated response data
   */
  protected async postWithSchema<T>(
    url: string,
    data: unknown,
    schema: z.ZodType<T>,
    customHeaders?: HeadersInit
  ): Promise<T> {
    return this.requestWithSchema('POST', url, schema, data, customHeaders);
  }
}
