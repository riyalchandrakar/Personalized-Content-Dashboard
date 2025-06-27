// ✅ pages/settings.tsx
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setNewsCategories,
  setMovieGenres,
  toggleDarkMode,
} from "@/features/preferences/preferencesSlice";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const newsOptions = ["technology", "sports", "business", "health"];

const movieGenres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
];

const SettingsPage = () => {
  const dispatch = useDispatch();

  const {
    newsCategories = [],
    movieGenres: selectedGenres = [],
    darkMode,
  } = useSelector((state: RootState) => state.preferences);

  const handleNewsChange = (category: string) => {
    const updated = newsCategories.includes(category)
      ? newsCategories.filter((c) => c !== category)
      : [...newsCategories, category];
    dispatch(setNewsCategories(updated));
  };

  const handleGenreChange = (id: number) => {
    const updated = selectedGenres.includes(id)
      ? selectedGenres.filter((g) => g !== id)
      : [...selectedGenres, id];
    dispatch(setMovieGenres(updated));
  };

  const handleReset = () => {
    dispatch(setNewsCategories(["technology"]));
    dispatch(setMovieGenres([28]));
    if (darkMode) dispatch(toggleDarkMode());
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

          {/* News Categories */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-3">📰 News Categories</h2>
            {newsOptions.map((cat) => (
              <label key={cat} className="block mb-2 capitalize">
                <input
                  type="checkbox"
                  checked={newsCategories.includes(cat)}
                  onChange={() => handleNewsChange(cat)}
                  className="mr-2 accent-blue-500"
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Movie Genres */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-3">🎬 Movie Genres</h2>
            {movieGenres.map((genre) => (
              <label key={genre.id} className="block mb-2">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre.id)}
                  onChange={() => handleGenreChange(genre.id)}
                  className="mr-2 accent-blue-500"
                />
                {genre.name}
              </label>
            ))}
          </div>

          {/* Dark Mode */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-3">🌙 Dark Mode</h2>
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600"
            >
              {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </div>

          {/* Reset Preferences */}
          <div>
            <h2 className="text-xl font-semibold mb-3">🔁 Reset Preferences</h2>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded bg-red-500 text-white"
            >
              Reset to Default Settings
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
