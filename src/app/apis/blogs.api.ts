import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBlogProps } from "../../interface";
import { baseQueryUser } from "../../utils";

const blogApi = createApi({
     reducerPath: "blogApi",
     baseQuery: fetchBaseQuery(baseQueryUser),
     endpoints: ({ query, mutation }) => ({
          GetAllBlogs: query<{ data: IBlogProps[] }, void>({
               query: () => "/blog",
          }),
          GetSpecificBlogs: mutation({
               query: (id: string) => {
                    return {
                         url: `/blog/${id}`,
                    };
               },
          }),
     }),
});

export const { useGetAllBlogsQuery, useGetSpecificBlogsMutation } = blogApi;

export const BlogApiReducer = blogApi.reducer;
export const BlogApiMiddleware = blogApi.middleware;
