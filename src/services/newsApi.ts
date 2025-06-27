import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY as string;

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsapi.org/v2/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", NEWS_API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query({
      query: (category: string) =>
        `top-headlines?category=${category}&pageSize=10`,
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;
