import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryMentor } from "../../utils";

const mentorCallApi = createApi({
     reducerPath: "mentorCallApi",
     baseQuery: fetchBaseQuery(baseQueryMentor),
     endpoints: ({ query, mutation }) => ({
          GetMyVideoCalls: query({
               query: (doctorId) => `/mentor/get-my-calls/${doctorId}`,
          }),
     }),
});

export const { useGetMyVideoCallsQuery } = mentorCallApi;

export const MentorCallReducer = mentorCallApi.reducer;
export const MentorCallMiddleware = mentorCallApi.middleware;
