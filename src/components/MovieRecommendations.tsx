import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleFavorite } from "@/features/preferences/preferencesSlice";
import { useGetMoviesByGenresQuery } from "@/services/tmdbApi";

const MovieRecommendations = () => {
  const dispatch = useDispatch();
  const { movieGenres, favorites } = useSelector(
    (state: RootState) => state.preferences
  );

  const genreQuery = movieGenres.join(",") || "28"; // fallback to Action (28)
  const { data, isLoading, isError } = useGetMoviesByGenresQuery(genreQuery);

  if (isLoading) return <p className="text-white">Loading movies...</p>;
  if (isError) return <p className="text-red-500">Error fetching movies.</p>;

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        Recommended Movies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.results.map((movie: any) => {
          const isFav = favorites.some((f) => f.id === String(movie.id));

          return (
            <div
              key={movie.id}
              className="bg-white dark:bg-gray-700 p-4 rounded shadow"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded mb-2 h-64 object-cover w-full"
              />
              <h3 className="text-md font-semibold text-gray-800 dark:text-white">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ⭐ {movie.vote_average} | 📅 {movie.release_date}
              </p>

              {/* 🎬 Play Now button */}
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 mr-2 px-4 py-1 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                🎬 Play Now
              </a>

              {/* ❤️ Add/Remove Favorite */}
              <button
                onClick={() =>
                  dispatch(
                    toggleFavorite({
                      id: String(movie.id),
                      type: "movie",
                      title: movie.title,
                      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                      description: `⭐ ${movie.vote_average} | 📅 ${movie.release_date}`,
                    })
                  )
                }
                className={`mt-2 text-sm px-3 py-1 rounded ${
                  isFav
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white"
                }`}
              >
                {isFav ? "Remove Favorite" : "Add to Favorites"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieRecommendations;
