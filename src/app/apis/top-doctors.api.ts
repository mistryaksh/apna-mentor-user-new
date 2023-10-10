import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TopDoctorsProps } from "../../interface/top-doctor.interface";
import { baseQueryUser } from "../../utils";

const topDoctorApi = createApi({
     reducerPath: "topDoctorApi",
     baseQuery: fetchBaseQuery(baseQueryUser),
     endpoints: ({ mutation, query }) => ({
          GetTopDoctorsList: query<{ data: TopDoctorsProps[] }, void>({
               query: () => "/list-top-doctor",
          }),
     }),
});

export const { useGetTopDoctorsListQuery } = topDoctorApi;

export const TopDoctorApiReducer = topDoctorApi.reducer;
export const TopDoctorApiMiddleware = topDoctorApi.middleware;
