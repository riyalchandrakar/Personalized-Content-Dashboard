import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useGetSocialPostsQuery } from "@/services/socialApi";
import { toggleFavorite } from "@/features/preferences/preferencesSlice";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const SocialFeed = () => {
  const { data, isLoading, isError } = useGetSocialPostsQuery();
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.preferences.favorites
  );

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const filteredPosts = data?.filter((post: any) =>
    post.content?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (isLoading) return <p className="text-white">Loading social feed...</p>;
  if (isError)
    return <p className="text-red-500">Failed to load social posts.</p>;

  return (
    <div className="space-y-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search social posts..."
        className="mb-4 p-2 w-full max-w-md rounded border dark:bg-gray-800 dark:text-white"
      />

      {filteredPosts?.length === 0 && (
        <p className="text-sm text-gray-400">No matching posts found.</p>
      )}

      {filteredPosts?.map((post: any) => {
        const isFav = favorites.includes(post.content);
        return (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-700 rounded-lg shadow p-4"
          >
            <div className="flex items-center mb-2">
              <img
                src={post.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-md font-semibold text-gray-800 dark:text-white">
                @{post.username}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {post.content}
            </p>
            {post.image && (
              <img src={post.image} alt="post" className="rounded" />
            )}
            <div className="text-xs text-gray-500 mt-2">
              {post.hashtags.map((tag: string) => (
                <span key={tag} className="mr-2">
                  #{tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => dispatch(toggleFavorite(post.content))}
              className={`mt-2 text-sm px-3 py-1 rounded ${
                isFav ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              {isFav ? "Remove Favorite" : "Add to Favorites"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SocialFeed;
