import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const videoCallApi = createApi({
     reducerPath: "videoCallApi",
     baseQuery: fetchBaseQuery({
          baseUrl: process.env.REACT_APP_URL,
     }),
     endpoints: ({ mutation }) => ({
          GenerateToken: mutation({
               query: (role: string) => {
                    return {
                         url: "/generate-token",
                         method: "POST",
                         body: {
                              role: role,
                         },
                    };
               },
          }),
     }),
});

export const { useGenerateTokenMutation } = videoCallApi;

export const VideoCallApiReducer = videoCallApi.reducer;
export const VideoCallApiMiddleware = videoCallApi.middleware;
