import { useCallback, useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';
import { omdbService } from '../shared/services/OMDBService';
import { useSearchStore } from '../stores/useSearchStore';
import type { SearchParams } from '../shared/types/omdb';

export function useSearch() {
  const {
    results,
    loading,
    error,
    totalResults,
    currentPage,
    searchQuery,
    searchType,
    hasMore,
    isEmpty,
    setResults,
    setLoading,
    setError,
    setSearchQuery,
    setSearchType,
    setCurrentPage,
    addResults,
    clearResults,
    clearError,
    getCachedData,
    setCachedResults,
  } = useSearchStore();

  // Debounce to avoid excessive API calls
  const debouncedQuery = useDebounce(searchQuery, 500);

  // Function to perform search
  const performSearch = useCallback(
    async (query: string, type?: SearchParams['type'], page: number = 1) => {
      if (!query.trim()) {
        clearResults();
        return;
      }

      // Check if API key is configured
      if (!omdbService.isApiKeyConfigured()) {
        setError(
          'API key is not configured. Please check your environment variables.'
        );
        return;
      }

      // Check cache first
      const cached = getCachedData(query, type);

      if (cached && page === 1) {
        setResults(cached.results, cached.totalResults);
        return;
      }

      try {
        // Start loading with timestamp
        setLoading(true);
        setError(null);

        const response = await omdbService.searchMovies({
          s: query,
          type,
          page,
        });

        const newResults = response.Search || [];
        const total = response.totalResults || 0;

        // Cache the results
        setCachedResults(query, type, newResults, total);

        if (page === 1) {
          setResults(newResults, total);
        } else {
          addResults(newResults);
          setCurrentPage(page);
        }
      } catch (error) {
        console.error('Search error:', error);
        setError(
          error instanceof Error
            ? error.message
            : 'An error occurred during search'
        );
      } finally {
        // Add a small delay to ensure the new results are rendered before hiding skeleton
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    },
    [
      setResults,
      setLoading,
      setError,
      clearResults,
      addResults,
      setCurrentPage,
      getCachedData,
      setCachedResults,
      totalResults,
    ]
  );

  // Effect to perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery, searchType, 1);
    } else if (searchQuery === '') {
      // Immediately clear results when query is empty
      clearResults();
    }
  }, [debouncedQuery, searchQuery, searchType, performSearch, clearResults]);

  // Function to start a new search
  const search = useCallback(
    (query: string, type?: SearchParams['type']) => {
      setSearchQuery(query);
      setSearchType(type);
      setCurrentPage(1);
    },
    [setSearchQuery, setSearchType, setCurrentPage]
  );

  // Function to load more results
  const loadMore = useCallback(() => {
    const hasMoreValue = hasMore();
    if (!loading && hasMoreValue && searchQuery) {
      performSearch(searchQuery, searchType, currentPage + 1);
    }
  }, [loading, hasMore, searchQuery, searchType, currentPage, performSearch]);

  // Function to clear results
  const clearResultsHandler = useCallback(() => {
    clearResults();
  }, [clearResults]);

  return {
    results,
    loading,
    error,
    totalResults,
    currentPage,
    search,
    loadMore,
    clearResults: clearResultsHandler,
    hasMore: hasMore(),
    isEmpty,
  };
}
