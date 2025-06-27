import { useGetTrendingMoviesQuery } from "@/services/tmdbApi";

const MovieRecommendations = () => {
  const { data, isLoading, isError } = useGetTrendingMoviesQuery();

  if (isLoading) return <p className="text-white">Loading movies...</p>;
  if (isError) return <p className="text-red-500">Error fetching movies.</p>;

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        Recommended Movies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.results.map((movie: any) => (
          <div
            key={movie.id}
            className="bg-white dark:bg-gray-700 p-4 rounded shadow"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded mb-2 h-64 object-cover w-full"
            />
            <h3 className="text-md font-semibold">{movie.title}</h3>
            <p className="text-sm">
              ⭐ {movie.vote_average} | 📅 {movie.release_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
