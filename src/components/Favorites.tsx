import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { toggleFavorite } from "@/features/preferences/preferencesSlice";

const Favorites = () => {
  const favorites = useSelector(
    (state: RootState) => state.preferences.favorites
  );
  const dispatch = useDispatch();

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        ⭐ Favorites
      </h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No favorite items yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-700 p-4 rounded shadow flex flex-col"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded mb-3 h-48 object-cover w-full"
                />
              )}
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {item.description}
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase">
                Type: {item.type}
              </p>

              {/* 🎬 Show Play Now button only for movies */}
              {item.type === "movie" && (
                <a
                  href={`https://www.themoviedb.org/movie/${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-auto mb-2 px-4 py-1 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  🎬 Play Now
                </a>
              )}

              {/* ❌ Remove from favorites */}
              <button
                onClick={() => dispatch(toggleFavorite(item))}
                className="text-sm text-red-500 mt-1"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
