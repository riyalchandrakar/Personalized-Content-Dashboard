import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleCategory } from "@/features/preferences/preferencesSlice";

const categories = ["technology", "sports", "finance", "movies", "music"];

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectedCategories = useSelector(
    (state: RootState) => state.preferences.categories
  );

  const handleToggle = (category: string) => {
    dispatch(toggleCategory(category));
  };

  return (
    <aside className="w-64 h-screen bg-gray-100 dark:bg-gray-900 p-4 border-r dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Preferences
      </h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat} className="flex items-center justify-between mb-2">
            <span className="text-gray-800 dark:text-white capitalize">
              {cat}
            </span>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => handleToggle(cat)}
              className="accent-blue-500"
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
