import { ThunkAction } from "redux-thunk";
import { AppStore } from ".";
import { useDispatch } from "react-redux";
import { Action, combineReducers } from "@reduxjs/toolkit";
import {
     AccountReducer,
     ChatReducer,
     LayoutReducer,
     MentorChatReducer,
     MentorLayoutReducer,
     VideoChatReducer,
} from "./features";
import {
     AccountApiReducer,
     ChatApiReducer,
     DoctorApiReducer,
     MentorApiReducer,
     MentorCallReducer,
     MentorCommentReducer,
     TopDoctorApiReducer,
     VideoCallApiReducer,
} from "./apis";
import storage from "redux-persist/lib/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import { BlogApiReducer } from "./apis/blogs.api";

export type AppDispatch = typeof AppStore.dispatch;
export type RootState = ReturnType<typeof AppStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const rootStorage = combineReducers({
     // Normal State reducer
     account: AccountReducer,
     layout: LayoutReducer,
     chat: ChatReducer,
     mentorLayout: MentorLayoutReducer,
     videoChat: VideoChatReducer,
     mentorChat: MentorChatReducer,

     // API reducer
     topDoctorApi: TopDoctorApiReducer,
     accountApi: AccountApiReducer,
     doctorApi: DoctorApiReducer,
     blogApi: BlogApiReducer,
     chatApi: ChatApiReducer,
     mentorApi: MentorApiReducer,
     videoCallApi: VideoCallApiReducer,
     mentorCallApi: MentorCallReducer,
     mentorCommentApi: MentorCommentReducer,
});

export const persistConfig = {
     key: "root",
     storage,
     whitelist: ["account"],
};

export const persistedReducer = persistReducer(persistConfig, rootStorage);
