import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useGetTopHeadlinesQuery } from "@/services/newsApi";
import { toggleFavorite } from "@/features/preferences/preferencesSlice";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const NewsFeed = () => {
  const { newsCategories = [], favorites } = useSelector(
    (state: RootState) => state.preferences
  );
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const categoriesToShow =
    newsCategories.length > 0 ? newsCategories : ["technology"];

  return (
    <div className="space-y-8">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search news articles..."
        className="mb-4 p-2 w-full max-w-md rounded border dark:bg-gray-800 dark:text-white"
      />

      {categoriesToShow.map((category) => {
        const { data, isLoading, isError } = useGetTopHeadlinesQuery(category);

        if (isLoading)
          return (
            <p key={`${category}-loading`} className="text-white">
              Loading {category} news...
            </p>
          );

        if (isError)
          return (
            <p key={`${category}-error`} className="text-red-500">
              Error loading {category} news.
            </p>
          );

        const filtered = data?.articles?.filter((article: any) =>
          article.title?.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

        return (
          <div key={category}>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white capitalize mb-2">
              {category} News
            </h2>
            {filtered?.length === 0 && (
              <p className="text-sm text-gray-400">No results found.</p>
            )}
            <div className="space-y-4">
              {filtered?.map((article: any) => {
                const isFav = favorites.includes(article.title);
                return (
                  <div
                    key={article.url}
                    className="bg-white dark:bg-gray-700 p-4 rounded shadow"
                  >
                    <h3 className="text-lg font-semibold">{article.title}</h3>
                    <p className="text-sm mb-2">{article.description}</p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      Read More
                    </a>
                    <button
                      className={`mt-2 text-sm px-3 py-1 rounded ${
                        isFav ? "bg-red-500 text-white" : "bg-gray-200"
                      }`}
                      onClick={() => dispatch(toggleFavorite(article.title))}
                    >
                      {isFav ? "Remove Favorite" : "Add to Favorites"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsFeed;
