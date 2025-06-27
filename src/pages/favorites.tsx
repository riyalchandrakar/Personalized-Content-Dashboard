import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const Favorites = dynamic(() => import("@/components/Favorites"));

export default function FavoritesPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 bg-white dark:bg-gray-900 min-h-screen">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            ⭐ Favorites
          </h2>
          <Favorites />
        </main>
      </div>
    </div>
  );
}
