import { useGetSocialPostsQuery } from "@/services/socialApi";

const SocialFeed = () => {
  const { data, isLoading, isError } = useGetSocialPostsQuery();

  if (isLoading) return <p className="text-white">Loading social feed...</p>;
  if (isError)
    return <p className="text-red-500">Failed to load social posts.</p>;

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        Social Feed
      </h2>
      {data?.map((post: any) => (
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
        </div>
      ))}
    </div>
  );
};

export default SocialFeed;
