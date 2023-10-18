import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const chatApi = createApi({
     reducerPath: "chatApi",
     baseQuery: fetchBaseQuery({
          baseUrl: "http://35.171.78.89:8080/api/1.0",
     }),
     endpoints: ({ query, mutation }) => ({
          CreateMeeting: mutation({
               query: (token) => {
                    return {
                         url: "/create-meeting",
                         method: "POST",
                         body: {
                              token: token,
                         },
                    };
               },
          }),
          ValidateRoom: mutation({
               query: ({ token, meetingId }) => {
                    return {
                         url: `/validate-meeting`,
                         method: "POST",
                         body: {
                              meetingId,
                              token,
                         },
                    };
               },
          }),
     }),
});

export const { useCreateMeetingMutation, useValidateRoomMutation } = chatApi;

export const ChatApiReducer = chatApi.reducer;
export const ChatApiMiddleware = chatApi.middleware;
