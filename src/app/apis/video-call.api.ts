import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authToken } from "../../service/video-call.api";

const videoCallApi = createApi({
     reducerPath: "videoCallApi",
     baseQuery: fetchBaseQuery({
          baseUrl: "http://localhost:8080/api/1.0",
          prepareHeaders: (header: Headers) => {
               header.set("Authorization", `${authToken}`);
          },
     }),
     endpoints: ({ mutation, query }) => ({
          GenerateToken: mutation<any, void>({
               query: () => {
                    return {
                         url: "/generate-token",
                         method: "POST",
                         body: {},
                    };
               },
          }),
          CreateMeeting: mutation({
               query: (token: string) => {
                    return {
                         url: "/create-meeting",
                         method: "POST",
                         body: {
                              token,
                         },
                    };
               },
          }),
     }),
});

export const { useGenerateTokenMutation, useCreateMeetingMutation } = videoCallApi;

export const VideoCallApiReducer = videoCallApi.reducer;
export const VideoCallApiMiddleware = videoCallApi.middleware;
