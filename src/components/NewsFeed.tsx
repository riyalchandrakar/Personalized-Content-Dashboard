import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetTopHeadlinesQuery } from "@/services/newsApi";

const NewsFeed = () => {
  const { categories } = useSelector((state: RootState) => state.preferences);
  const category = categories[0];

  const { data, isLoading, isError } = useGetTopHeadlinesQuery(category);

  console.log("Redux categories:", categories);
  console.log("Selected category:", category);

  if (!categories.length) {
    return (
      <p className="text-yellow-500 text-center text-lg mt-8">
        ⚠️ Please select at least one category from the sidebar to view news.
      </p>
    );
  }

  if (isLoading)
    return <p className="text-white text-center mt-4">Loading news...</p>;

  if (isError)
    return <p className="text-red-500 text-center mt-4">Error loading news</p>;

  if (!data?.articles?.length)
    return (
      <p className="text-gray-400 text-center mt-4">
        No articles found for selected category.
      </p>
    );

  return (
    <div className="space-y-4">
      {data.articles.map((article, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-700 p-4 rounded shadow"
        >
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
          )}
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            {article.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {article.description}
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
