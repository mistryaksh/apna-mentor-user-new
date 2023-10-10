import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryUser } from "../../utils";
import { LoginProps, RegisterProps, UserProps } from "../../interface";

const accountApi = createApi({
     reducerPath: "accountApi",
     baseQuery: fetchBaseQuery(baseQueryUser),
     endpoints: ({ mutation, query }) => ({
          LoginToAccount: mutation({
               query: ({ mobile, password }: LoginProps) => {
                    return {
                         url: "/user/sign-in",
                         method: "PUT",
                         body: {
                              mobile,
                              password,
                         },
                    };
               },
          }),
          LogoutToAccount: mutation<any, void>({
               query: () => {
                    return {
                         url: "/user/sign-out",
                         method: "PUT",
                    };
               },
          }),
          RegisterToAccount: mutation({
               query: ({ email, mobile, firstName, lastName, password }: RegisterProps) => {
                    return {
                         url: "/user/sign-up",
                         method: "POST",
                         body: {
                              email,
                              mobile,
                              name: {
                                   firstName: firstName,
                                   lastName: lastName,
                              },
                              password,
                         },
                    };
               },
          }),
          ProfileAccount: query<{ data: UserProps }, void>({
               query: () => "/user/profile",
          }),
          SendVerificationNumber: mutation({
               query: (mobile: string) => {
                    return {
                         url: "/send/verify/mobile",
                         method: "POST",
                         body: {
                              mobile,
                         },
                    };
               },
          }),
          VerifyMobileNumberUser: mutation({
               query: ({ mobile, code }: { mobile: string; code: string }) => {
                    return {
                         url: "/verify/mobile-number",
                         method: "PUT",
                         body: {
                              mobile,
                              code,
                         },
                    };
               },
          }),
     }),
});

export const {
     useLoginToAccountMutation,
     useProfileAccountQuery,
     useRegisterToAccountMutation,
     useSendVerificationNumberMutation,
     useLogoutToAccountMutation,
     useVerifyMobileNumberUserMutation,
} = accountApi;

export const AccountApiReducer = accountApi.reducer;
export const AccountApiMiddleware = accountApi.middleware;
