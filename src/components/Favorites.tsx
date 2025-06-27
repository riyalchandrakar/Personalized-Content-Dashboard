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
        <ul className="space-y-2">
          {favorites.map((item) => (
            <li
              key={item}
              className="bg-white dark:bg-gray-700 p-4 rounded shadow flex justify-between items-center"
            >
              <span className="text-gray-800 dark:text-white">{item}</span>
              <button
                onClick={() => dispatch(toggleFavorite(item))}
                className="text-sm text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Favorites;
