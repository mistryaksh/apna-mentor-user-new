import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IChatProps, IMentorLoginProps, IMentorProps } from "../../interface";
import { baseQueryMentor } from "../../utils";

const mentorApi = createApi({
     reducerPath: "mentorApi",
     baseQuery: fetchBaseQuery(baseQueryMentor),
     endpoints: ({ query, mutation }) => ({
          MentorLogin: mutation({
               query: ({ password, username }: IMentorLoginProps) => {
                    return {
                         url: "/mentor/sign-in",
                         body: {
                              username,
                              password,
                         },
                         method: "PUT",
                    };
               },
          }),
          MentorLogout: mutation<{ data: any }, void>({
               query: () => {
                    return {
                         url: "/mentor/sign-out",
                         method: "PUT",
                    };
               },
          }),
          MentorProfile: query<{ data: IMentorProps }, void>({
               query: () => "/profile/get-doctor-profile",
          }),
          GetMyCalls: query<{ data: IChatProps[] }, string>({
               query: (id: string) => {
                    return {
                         url: `/mentor/get-my-calls/${id}`,
                         method: "GET",
                    };
               },
          }),
     }),
});

export const { useMentorLoginMutation, useMentorLogoutMutation, useMentorProfileQuery, useGetMyCallsQuery } = mentorApi;

export const MentorApiReducer = mentorApi.reducer;
export const MentorApiMiddleware = mentorApi.middleware;
