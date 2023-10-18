import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDoctorProps } from "../../interface/top-doctor.interface";
import { baseQueryUser } from "../../utils";
import { IMentorProps } from "../../interface";

const doctorApi = createApi({
     reducerPath: "doctorApi",
     baseQuery: fetchBaseQuery(baseQueryUser),
     endpoints: ({ query, mutation }) => ({
          GetAllDoctors: query<{ data: IDoctorProps[] }, void>({
               query: () => "/doctor/get",
          }),
          GetOnlineDoctors: query<{ data: IDoctorProps[] }, void>({
               query: () => `/doctor/status/online`,
          }),
          GetDoctorById: mutation<{ data: IMentorProps }, string>({
               query: (id: string) => {
                    return {
                         url: `/doctor/${id}`,
                    };
               },
          }),
     }),
});

export const { useGetAllDoctorsQuery, useGetOnlineDoctorsQuery, useGetDoctorByIdMutation } = doctorApi;

export const DoctorApiReducer = doctorApi.reducer;
export const DoctorApiMiddleware = doctorApi.middleware;
