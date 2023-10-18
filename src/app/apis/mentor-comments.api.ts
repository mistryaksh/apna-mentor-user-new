import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryUser } from "../../utils";
import { MentorCommentProps } from "../../interface";

const mentorCommentApi = createApi({
     reducerPath: "mentorCommentApi",
     baseQuery: fetchBaseQuery(baseQueryUser),
     tagTypes: ["comments"],
     endpoints: ({ query, mutation }) => ({
          AddCommentsToDoctorProfile: mutation<{ data: string }, MentorCommentProps>({
               query: ({ body, doctorId, userId }: MentorCommentProps) => {
                    return {
                         url: `/comment`,
                         method: "POST",
                         body: {
                              body,
                              doctorId,
                              userId,
                         },
                    };
               },
               invalidatesTags: ["comments"],
          }),
          GetCommentsByDoctorId: query<{ data: MentorCommentProps[] }, string>({
               query: (doctorId: string) => {
                    return {
                         url: `/comments/${doctorId}`,
                         method: "GET",
                    };
               },
               providesTags: ["comments"],
          }),
          DeleteCommentByUserId: mutation({
               query: ({ userId, doctorId }) => {
                    return {
                         url: `/comment/delete`,
                         method: "DELETE",
                         body: {
                              userId: userId,
                              doctorId: doctorId,
                         },
                    };
               },
               invalidatesTags: ["comments"],
          }),
     }),
});

export const {
     useAddCommentsToDoctorProfileMutation,
     useGetCommentsByDoctorIdQuery,
     useDeleteCommentByUserIdMutation,
} = mentorCommentApi;

export const MentorCommentReducer = mentorCommentApi.reducer;
export const MentorCommentMiddleware = mentorCommentApi.middleware;
