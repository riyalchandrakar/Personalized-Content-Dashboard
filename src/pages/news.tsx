import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const NewsFeed = dynamic(() => import("@/components/NewsFeed"));

export default function NewsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 bg-white dark:bg-gray-900 min-h-screen">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            📰 News
          </h2>
          <NewsFeed />
        </main>
      </div>
    </div>
  );
}
