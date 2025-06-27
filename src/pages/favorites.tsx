import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Favorites from "@/components/Favorites";

export default function FavoritesPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            ⭐ Favorites
          </h1>
          <Favorites />
        </main>
      </div>
    </div>
  );
}
