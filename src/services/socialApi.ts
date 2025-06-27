import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const socialApi = createApi({
  reducerPath: "socialApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // since we're fetching local file
  endpoints: (builder) => ({
    getSocialPosts: builder.query({
      query: () => "data/mockSocialPosts.json",
    }),
  }),
});

export const { useGetSocialPostsQuery } = socialApi;
