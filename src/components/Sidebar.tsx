import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-100 dark:bg-gray-900 p-4 border-r dark:border-gray-700 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Navigation
        </h2>
        <nav className="space-y-2">
          <Link
            href="/feed"
            className="block text-gray-800 dark:text-white hover:underline"
          >
            🧠 Personalized Feed
          </Link>

          <Link
            href="/news"
            className="block text-gray-800 dark:text-white hover:underline"
          >
            📰 News
          </Link>
          <Link
            href="/movies"
            className="block text-gray-800 dark:text-white hover:underline"
          >
            🎬 Movies
          </Link>
          <Link
            href="/social"
            className="block text-gray-800 dark:text-white hover:underline"
          >
            📱 Social
          </Link>
          <Link
            href="/trending"
            className="block text-gray-800 dark:text-white hover:underline"
          >
            🔥 Trending
          </Link>
          <Link
            href="/favorites"
            className="block text-gray-800 dark:text-white hover:underline"
          >
            ⭐ Favorites
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
