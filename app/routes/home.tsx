import type { Route } from './+types/home';
import { Banner } from '../components/ui/Banner';
import { SearchInput } from '../components/search/SearchInput';
import { MovieList } from '../components/search/MovieList';
import { AppLayout } from '../components/layout/AppLayout';
import { useSearch } from '../hooks/useSearch';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'OMDB React App - Search Movies and Series' },
    {
      name: 'description',
      content: 'Search and discover movies and TV series using the OMDB API',
    },
  ];
}

export default function Home() {
  const {
    results,
    loading,
    error,
    totalResults,
    hasMore,
    search,
    loadMore,
    clearResults,
  } = useSearch();

  return (
    <AppLayout showHeader={true}>
      <div className="container mx-auto px-4 py-8">
        {/* Banner */}
        <div className="mb-12">
          <Banner />
        </div>

        {/* Search component */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchInput
            onSearch={search}
            onClear={clearResults}
            loading={loading}
          />
        </div>

        {/* Results list */}
        <MovieList
          movies={results}
          loading={loading}
          error={error}
          totalResults={totalResults}
          hasMore={hasMore}
          onLoadMore={loadMore}
          onRetry={() => search('', undefined)}
        />
      </div>
    </AppLayout>
  );
}
