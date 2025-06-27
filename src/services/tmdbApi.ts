import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    getTrendingMovies: builder.query({
      query: () => `trending/movie/day?api_key=${TMDB_API_KEY}`,
    }),

    getMoviesByGenres: builder.query({
      query: (genres: string) =>
        `discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genres}&sort_by=popularity.desc`,
    }),

    searchMovies: builder.query({
      query: (query) =>
        `search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          query
        )}`,
    }),
  }),
});

export const {
  useGetTrendingMoviesQuery,
  useGetMoviesByGenresQuery,
  useSearchMoviesQuery,
} = tmdbApi;
