import { useEffect } from 'react';
import { useParams } from 'react-router';
import { MovieDetails } from '../components/details/MovieDetails';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { AppLayout } from '../components/layout/AppLayout';

export function meta() {
  return [
    { title: 'Movie Details - OMDB React App' },
    { name: 'description', content: 'Complete details of the movie or series' },
  ];
}

export default function MoviePage() {
  const { id } = useParams();
  const { movie, loading, error, fetchMovieDetails, clearMovie } =
    useMovieDetails();

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
    }

    // Cleanup when unmounting
    return () => {
      clearMovie();
    };
  }, [id, fetchMovieDetails, clearMovie]);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <MovieDetails
          movie={movie}
          loading={loading}
          error={error}
          onRetry={() => id && fetchMovieDetails(id)}
        />
      </div>
    </AppLayout>
  );
}
