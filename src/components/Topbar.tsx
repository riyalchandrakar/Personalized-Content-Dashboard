// ✅ components/Topbar.tsx
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchMoviesQuery } from "@/services/tmdbApi";
import { useGetTopHeadlinesQuery } from "@/services/newsApi";
import { useGetSocialPostsQuery } from "@/services/socialApi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleDarkMode } from "@/features/preferences/preferencesSlice";

const Topbar = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.preferences);

  const [searchType, setSearchType] = useState<
    "all" | "news" | "movies" | "social"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const showSearch = debouncedSearch.length > 2;

  const { data: movieResults } = useSearchMoviesQuery(debouncedSearch, {
    skip: searchType !== "all" && searchType !== "movies",
  });
  const { data: newsResults } = useGetTopHeadlinesQuery("technology", {
    skip: searchType !== "all" && searchType !== "news",
  });
  const { data: socialResults } = useGetSocialPostsQuery(undefined, {
    skip: searchType !== "all" && searchType !== "social",
  });

  const filteredNews = newsResults?.articles?.filter((a: any) =>
    a.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
  const filteredSocial = socialResults?.filter((p: any) =>
    p.content.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <header className="bg-gray-100 dark:bg-gray-800 px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b dark:border-gray-700 space-y-2 sm:space-y-0 relative">
      <div className="flex items-center gap-2 w-full max-w-xl">
        <input
          type="text"
          placeholder="Search anything..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 flex-1 rounded border dark:bg-gray-700 dark:text-white"
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as any)}
          className="p-2 rounded border dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All</option>
          <option value="news">News</option>
          <option value="movies">Movies</option>
          <option value="social">Social</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/settings"
          className="text-blue-500 hover:underline text-sm"
        >
          ⚙️ Settings
        </Link>

        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <span className="text-gray-700 dark:text-white font-medium">Riyal</span>
        <img
          src="https://ui-avatars.com/api/?name=R"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>

      {showSearch && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white dark:bg-gray-800 p-4 rounded shadow max-h-96 overflow-y-auto z-50">
          <h3 className="text-md font-bold text-gray-700 dark:text-white mb-2">
            Search Results
          </h3>

          {(searchType === "all" || searchType === "news") && (
            <>
              <h4 className="text-sm font-semibold text-gray-500 mb-1">News</h4>
              {filteredNews?.slice(0, 3).map((n: any) => (
                <Link
                  key={n.title}
                  href={`/search?type=news&q=${encodeURIComponent(
                    debouncedSearch
                  )}`}
                  className="text-sm mb-1 block text-gray-700 dark:text-gray-300 hover:underline"
                >
                  📰 {n.title}
                </Link>
              ))}
            </>
          )}

          {(searchType === "all" || searchType === "movies") && (
            <>
              <h4 className="text-sm font-semibold text-gray-500 mt-2 mb-1">
                Movies
              </h4>
              {movieResults?.results?.slice(0, 3).map((m: any) => (
                <Link
                  key={m.id}
                  href={`/search?type=movies&q=${encodeURIComponent(
                    debouncedSearch
                  )}`}
                  className="text-sm mb-1 block text-gray-700 dark:text-gray-300 hover:underline"
                >
                  🎬 {m.title}
                </Link>
              ))}
            </>
          )}

          {(searchType === "all" || searchType === "social") && (
            <>
              <h4 className="text-sm font-semibold text-gray-500 mt-2 mb-1">
                Social
              </h4>
              {filteredSocial?.slice(0, 3).map((p: any) => (
                <Link
                  key={p.id}
                  href={`/search?type=social&q=${encodeURIComponent(
                    debouncedSearch
                  )}`}
                  className="text-sm mb-1 block text-gray-700 dark:text-gray-300 hover:underline"
                >
                  📱 {p.content.slice(0, 60)}...
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Topbar;
