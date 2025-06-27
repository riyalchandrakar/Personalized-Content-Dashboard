import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useGetTopHeadlinesQuery } from "@/services/newsApi";
import { useGetMoviesByGenresQuery } from "@/services/tmdbApi";
import { useGetSocialPostsQuery } from "@/services/socialApi";
import { toggleFavorite } from "@/features/preferences/preferencesSlice";
import { useEffect, useMemo, useState } from "react";
import { Reorder, motion } from "framer-motion";

const PersonalizedFeed = () => {
  const dispatch = useDispatch();
  const {
    newsCategories = [],
    movieGenres = [],
    favorites,
  } = useSelector((state: RootState) => state.preferences);

  const defaultCategory = newsCategories[0] || "technology";
  const defaultGenres = movieGenres.join(",") || "28";

  const { data: newsData } = useGetTopHeadlinesQuery(defaultCategory);
  const { data: movieData } = useGetMoviesByGenresQuery(defaultGenres);
  const { data: socialData } = useGetSocialPostsQuery();

  const initialCards = useMemo(() => {
    return [
      ...(newsData?.articles
        ?.slice(0, 5)
        .map((n) => ({ type: "news", data: n })) || []),
      ...(movieData?.results
        ?.slice(0, 6)
        .map((m) => ({ type: "movie", data: m })) || []),
      ...(socialData?.slice(0, 4).map((s) => ({ type: "social", data: s })) ||
        []),
    ];
  }, [newsData, movieData, socialData]);

  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("feedOrder");
    return saved ? JSON.parse(saved) : initialCards;
  });

  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  useEffect(() => {
    localStorage.setItem("feedOrder", JSON.stringify(cards));
  }, [cards]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white space-y-10">
          <h1 className="text-2xl font-bold">🎯 Personalized Feed</h1>

          <Reorder.Group
            axis="y"
            values={cards}
            onReorder={setCards}
            className="space-y-6"
            as="ul"
          >
            {cards.map((card: any, index: number) => (
              <Reorder.Item
                key={index}
                value={card}
                as={motion.li}
                layout
                layoutScroll
                dragListener={true}
                dragConstraints={{ top: 0, bottom: 0 }}
                whileDrag={{
                  scale: 1.02,
                  boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="list-none"
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  {card.type === "news" && (
                    <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
                      <h3 className="font-semibold">{card.data.title}</h3>
                      <p className="text-sm">{card.data.description}</p>
                      <a
                        href={card.data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        Read More
                      </a>
                      <button
                        className={`mt-2 text-sm px-3 py-1 rounded ${
                          favorites.includes(card.data.title)
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() =>
                          dispatch(toggleFavorite(card.data.title))
                        }
                      >
                        {favorites.includes(card.data.title)
                          ? "Remove Favorite"
                          : "Add to Favorites"}
                      </button>
                    </div>
                  )}

                  {card.type === "movie" && (
                    <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
                      <img
                        src={
                          card.data.poster_path
                            ? `https://image.tmdb.org/t/p/w500${card.data.poster_path}`
                            : "/fallback-movie.jpg"
                        }
                        alt={card.data.title}
                        className="rounded mb-2 h-64 object-cover w-full"
                      />
                      <h3 className="font-semibold">{card.data.title}</h3>
                      <p className="text-sm">⭐ {card.data.vote_average}</p>
                      <button
                        onClick={() =>
                          dispatch(toggleFavorite(card.data.title))
                        }
                        className={`mt-2 text-sm px-3 py-1 rounded ${
                          favorites.includes(card.data.title)
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {favorites.includes(card.data.title)
                          ? "Remove Favorite"
                          : "Add to Favorites"}
                      </button>
                    </div>
                  )}

                  {card.type === "social" && (
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
                      <div className="flex items-center mb-2">
                        <img
                          src={card.data.avatar || "/fallback-avatar.png"}
                          alt="avatar"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <span className="text-md font-semibold">
                          @{card.data.username}
                        </span>
                      </div>
                      <p className="text-sm">{card.data.content}</p>
                      {card.data.image && (
                        <img
                          src={card.data.image}
                          alt="post"
                          className="rounded mt-2 max-h-64 object-cover"
                        />
                      )}
                      <div className="text-xs text-gray-500 mt-2">
                        {card.data.hashtags.map((tag: string) => (
                          <span key={tag} className="mr-2">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() =>
                          dispatch(toggleFavorite(card.data.content))
                        }
                        className={`mt-2 text-sm px-3 py-1 rounded ${
                          favorites.includes(card.data.content)
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {favorites.includes(card.data.content)
                          ? "Remove Favorite"
                          : "Add to Favorites"}
                      </button>
                    </div>
                  )}
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </main>
      </div>
    </div>
  );
};

export default PersonalizedFeed;
