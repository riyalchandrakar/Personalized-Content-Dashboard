import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/features/preferences/preferencesSlice";
import { RootState } from "@/store";
import useDarkMode from "@/hooks/useDarkMode";

const Topbar = () => {
  const dispatch = useDispatch();
  const dark = useSelector((state: RootState) => state.preferences.darkMode);

  useDarkMode(); // Sync Redux → DOM on every render

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <header className="h-16 px-6 flex items-center justify-between bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        📊 Dashboard
      </h1>
      <button
        onClick={handleToggle}
        className="bg-gray-200 dark:bg-gray-700 px-4 py-1 rounded text-sm text-gray-900 dark:text-white"
      >
        {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
};

export default Topbar;
