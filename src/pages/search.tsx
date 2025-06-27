import { useRouter } from "next/router";
import { useSearchMoviesQuery } from "@/services/tmdbApi";
import { useGetTopHeadlinesQuery } from "@/services/newsApi";
import { useGetSocialPostsQuery } from "@/services/socialApi";

const SearchPage = () => {
  const router = useRouter();
  const { q = "", type = "all" } = router.query;

  const query = String(q).toLowerCase();
  const searchType = String(type);

  const { data: movies } = useSearchMoviesQuery(query, {
    skip: searchType !== "movies" && searchType !== "all",
  });
  const { data: news } = useGetTopHeadlinesQuery("technology", {
    skip: searchType !== "news" && searchType !== "all",
  });
  const { data: social } = useGetSocialPostsQuery(undefined, {
    skip: searchType !== "social" && searchType !== "all",
  });

  const filteredNews = news?.articles?.filter((a: any) =>
    a.title.toLowerCase().includes(query)
  );
  const filteredSocial = social?.filter((p: any) =>
    p.content.toLowerCase().includes(query)
  );

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        🔍 Results for: <em>{query}</em>
      </h1>

      {["all", "news"].includes(searchType) && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">
            📰 News
          </h2>
          {filteredNews?.length ? (
            filteredNews.map((n: any) => (
              <div
                key={n.url}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-3"
              >
                <h3 className="font-semibold text-lg mb-1">{n.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {n.description}
                </p>
                <a
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:underline"
                >
                  Read More →
                </a>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No news results.</p>
          )}
        </div>
      )}

      {["all", "movies"].includes(searchType) && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">
            🎬 Movies
          </h2>
          {movies?.results?.length ? (
            movies.results.map((m: any) => (
              <div
                key={m.id}
                className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-3 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                  alt={m.title}
                  className="w-32 rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{m.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    ⭐ {m.vote_average} / 10
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No movie results.</p>
          )}
        </div>
      )}

      {["all", "social"].includes(searchType) && (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">
            📱 Social
          </h2>
          {filteredSocial?.length ? (
            filteredSocial.map((p: any) => (
              <div
                key={p.id}
                className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={p.avatar}
                    className="w-8 h-8 rounded-full"
                    alt={p.username}
                  />
                  <span className="text-sm font-medium">@{p.username}</span>
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-300 mb-1">
                  {p.content}
                </p>
                {p.image && (
                  <img
                    src={p.image}
                    alt="Post"
                    className="rounded mt-2 max-h-48 object-cover"
                  />
                )}
                <div className="text-xs text-gray-400 mt-2">
                  {p.hashtags.map((tag: string) => (
                    <span key={tag} className="mr-2">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No social post results.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
