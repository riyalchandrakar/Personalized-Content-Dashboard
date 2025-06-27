import Sidebar from "@/components/Sidebar";
import NewsFeed from "@/components/NewsFeed";
import MovieRecommendations from "@/components/MovieRecommendations";
import SocialFeed from "@/components/SocialFeed";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-white dark:bg-gray-800 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <NewsFeed />
        <MovieRecommendations />
        <SocialFeed />
      </main>
    </div>
  );
}
