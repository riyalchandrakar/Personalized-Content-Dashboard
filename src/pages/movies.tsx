import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import {
  useGetMoviesByGenresQuery,
  useSearchMoviesQuery,
} from "@/services/tmdbApi";

export default function MoviesPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { movieGenres } = useSelector((state: RootState) => state.preferences);
  const genreQuery = movieGenres.join(",") || "28";

  const {
    data: defaultData,
    isLoading: loadingDefault,
    isError: errorDefault,
  } = useGetMoviesByGenresQuery(genreQuery);

  const {
    data: searchData,
    isLoading: loadingSearch,
    isError: errorSearch,
  } = useSearchMoviesQuery(debouncedSearch, {
    skip: !debouncedSearch,
  });

  const dataToShow = debouncedSearch ? searchData : defaultData;
  const isLoading = debouncedSearch ? loadingSearch : loadingDefault;
  const isError = debouncedSearch ? errorSearch : errorDefault;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            🎬 {debouncedSearch ? `Search Results` : `Recommended Movies`}
          </h1>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a movie..."
            className="mb-6 p-2 w-full max-w-md rounded border dark:bg-gray-800 dark:text-white"
          />

          {isLoading && <p className="text-white">Loading movies...</p>}
          {isError && (
            <p className="text-red-500">
              Something went wrong while fetching movies.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dataToShow?.results?.map((movie: any) => (
              <div
                key={movie.id}
                className="bg-white dark:bg-gray-700 p-4 rounded shadow"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="h-64 w-full object-cover rounded mb-2"
                />
                <h3 className="text-md font-semibold text-gray-800 dark:text-white">
                  {movie.title}
                </h3>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
