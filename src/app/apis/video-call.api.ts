import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const videoCallApi = createApi({
     reducerPath: "videoCallApi",
     baseQuery: fetchBaseQuery({
          baseUrl: process.env.REACT_APP_URL,
     }),
     endpoints: ({ mutation }) => ({
          GenerateToken: mutation<any, void>({
               query: () => {
                    return {
                         url: "/generate-token",
                         method: "POST",
                    };
               },
          }),
     }),
});

export const { useGenerateTokenMutation } = videoCallApi;

export const VideoCallApiReducer = videoCallApi.reducer;
export const VideoCallApiMiddleware = videoCallApi.middleware;
