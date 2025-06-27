import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const SocialFeed = dynamic(() => import("@/components/SocialFeed"));

export default function SocialPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 bg-white dark:bg-gray-900 min-h-screen">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            📱 Social
          </h2>
          <SocialFeed />
        </main>
      </div>
    </div>
  );
}
