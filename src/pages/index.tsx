// pages/index.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to Your Personalized Dashboard 🎉
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Choose a section below to explore:
      </p>
      <div className="space-x-4">
        <Link href="/news" className="text-blue-500 hover:underline">
          News
        </Link>
        <Link href="/movies" className="text-blue-500 hover:underline">
          Movies
        </Link>
        <Link href="/social" className="text-blue-500 hover:underline">
          Social
        </Link>
      </div>
    </div>
  );
}
