import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../hooks";

interface initialStateProps {
     user: {
          loggedIn: boolean;
          token: string;
          role: "user" | null;
     };
     mentor: {
          loggedIn: boolean;
          token: string;
          role: "mentor" | null;
     };
}

const initialState: initialStateProps = {
     user: {
          loggedIn: false,
          token: "",
          role: null,
     },
     mentor: {
          loggedIn: false,
          token: "",
          role: null,
     },
};

const AccountSlice = createSlice({
     initialState,
     name: "account",
     reducers: {
          UserLoggedInState: (state, action) => {
               state.user = {
                    loggedIn: true,
                    role: "user",
                    token: action.payload.token,
               };
               localStorage.setItem("user_token", state.user.token);
               localStorage.setItem("role", state?.user?.role as string);
          },
          UserLogoutState: (state) => {
               state.user = {
                    loggedIn: false,
                    role: null,
                    token: "",
               };
               localStorage.removeItem("user_token");
               localStorage.removeItem("role");
          },
          MentorLoginState: (state, action) => {
               state.mentor = {
                    loggedIn: true,
                    role: "mentor",
                    token: action.payload.token,
               };
               localStorage.setItem("mentor_token", state.mentor.token);
               localStorage.setItem("role", state.mentor.role as string);
          },
          MentorLogoutState: (state) => {
               state.mentor = {
                    loggedIn: false,
                    role: null,
                    token: "",
               };
               localStorage.removeItem("mentor_token");
               localStorage.removeItem("role");
          },
     },
});

export const useAccountSlice = () =>
     useSelector((state: RootState) => {
          return state.account;
     });
export const AccountReducer = AccountSlice.reducer;
export const { UserLoggedInState, UserLogoutState, MentorLoginState, MentorLogoutState } = AccountSlice.actions;
