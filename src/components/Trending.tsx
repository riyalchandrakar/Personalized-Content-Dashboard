import { useGetTopHeadlinesQuery } from "@/services/newsApi";
import { useGetTrendingMoviesQuery } from "@/services/tmdbApi";

const Trending = () => {
  const { data: newsData } = useGetTopHeadlinesQuery("technology");
  const { data: movieData } = useGetTrendingMoviesQuery();

  const topNews = newsData?.articles?.slice(0, 2);
  const topMovies = movieData?.results?.slice(0, 2);

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        🔥 Trending
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {topNews?.map((article, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-700 p-4 rounded shadow"
          >
            <h3 className="font-bold">{article.title}</h3>
            <a href={article.url} target="_blank" className="text-blue-500">
              Read More
            </a>
          </div>
        ))}

        {topMovies?.map((movie) => (
          <div
            key={movie.id}
            className="bg-white dark:bg-gray-700 p-4 rounded shadow"
          >
            <h3 className="font-bold">{movie.title}</h3>
            <p className="text-sm">⭐ {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
