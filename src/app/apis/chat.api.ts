import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const chatApi = createApi({
     reducerPath: "chatApi",
     baseQuery: fetchBaseQuery({
          baseUrl: process.env.REACT_APP_URL,
     }),
     endpoints: ({ query, mutation }) => ({
          GetUserById: mutation({
               query: (user) => {
                    return {
                         url: `/user/${user}`,
                         method: "GET",
                    };
               },
          }),
     }),
});

export const { useGetUserByIdMutation } = chatApi;

export const ChatApiReducer = chatApi.reducer;
export const ChatApiMiddleware = chatApi.middleware;
