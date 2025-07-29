import { useCallback, useEffect } from 'react';
import { useSearchStore } from '../stores/useSearchStore';
import { useMovieDetailsStore } from '../stores/useMovieDetailsStore';

export function useCacheManager() {
  const {
    searchCache,
    clearCache: clearSearchCache,
    cleanupCache: cleanupSearchCache,
    getCacheStats: getSearchCacheStats,
  } = useSearchStore();

  const {
    detailsCache,
    clearCache: clearDetailsCache,
    cleanupCache: cleanupDetailsCache,
    getCacheStats: getDetailsCacheStats,
  } = useMovieDetailsStore();

  // Auto-cleanup cache every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      cleanupSearchCache();
      cleanupDetailsCache();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [cleanupSearchCache, cleanupDetailsCache]);

  // Function to clear all cache
  const clearAllCache = useCallback(() => {
    clearSearchCache();
    clearDetailsCache();
  }, [clearSearchCache, clearDetailsCache]);

  // Function to get comprehensive cache statistics
  const getCacheStatistics = useCallback(() => {
    const searchStats = getSearchCacheStats();
    const detailsStats = getDetailsCacheStats();

    return {
      search: {
        ...searchStats,
        entries: searchCache.size,
      },
      details: {
        ...detailsStats,
        entries: detailsCache.size,
      },
      total: {
        entries: searchCache.size + detailsCache.size,
        totalHits: searchStats.totalHits + detailsStats.totalHits,
        totalMisses: searchStats.totalMisses + detailsStats.totalMisses,
        overallHitRate: 
          (searchStats.totalHits + detailsStats.totalHits) / 
          Math.max(searchStats.totalHits + detailsStats.totalHits + searchStats.totalMisses + detailsStats.totalMisses, 1),
      },
    };
  }, [getSearchCacheStats, getDetailsCacheStats, searchCache, detailsCache]);

  // Function to export cache data for debugging
  const exportCacheData = useCallback(() => {
    const searchEntries = Array.from(searchCache.entries()).map(([key, value]) => ({
      key,
      timestamp: value.timestamp,
      lastAccessed: value.lastAccessed,
      totalResults: value.totalResults,
      resultsCount: value.results.length,
      pagesCount: value.pages.size,
    }));

    const detailsEntries = Array.from(detailsCache.entries()).map(([key, value]) => ({
      key,
      timestamp: value.timestamp,
      lastAccessed: value.lastAccessed,
      accessCount: value.accessCount,
      title: value.movie.Title,
    }));

    return {
      search: searchEntries,
      details: detailsEntries,
      statistics: getCacheStatistics(),
    };
  }, [searchCache, detailsCache, getCacheStatistics]);

  // Function to log cache performance
  const logCachePerformance = useCallback(() => {
    const stats = getCacheStatistics();
    console.group('🎯 Cache Performance Report');
    console.log('📊 Search Cache:', stats.search);
    console.log('🎬 Details Cache:', stats.details);
    console.log('📈 Overall Performance:', stats.total);
    console.groupEnd();
  }, [getCacheStatistics]);

  return {
    clearAllCache,
    clearSearchCache,
    clearDetailsCache,
    cleanupSearchCache,
    cleanupDetailsCache,
    getCacheStatistics,
    exportCacheData,
    logCachePerformance,
  };
} 