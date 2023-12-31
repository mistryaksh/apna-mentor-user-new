import { Middleware, configureStore } from "@reduxjs/toolkit";
import {
     AccountApiMiddleware,
     ChatApiMiddleware,
     DoctorApiMiddleware,
     MentorApiMiddleware,
     MentorCallMiddleware,
     MentorCommentMiddleware,
     TopDoctorApiMiddleware,
     VideoCallApiMiddleware,
} from "./apis";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistedReducer } from "./hooks";
import { BlogApiMiddleware } from "./apis/blogs.api";

export const StoreMiddlewaresArray: Middleware[] = [
     TopDoctorApiMiddleware,
     AccountApiMiddleware,
     DoctorApiMiddleware,
     BlogApiMiddleware,
     ChatApiMiddleware,
     MentorApiMiddleware,
     VideoCallApiMiddleware,
     MentorCallMiddleware,
     MentorCommentMiddleware,
];

export const AppStore = configureStore({
     reducer: persistedReducer,
     middleware: (dfm) => dfm({ serializableCheck: false }).concat(StoreMiddlewaresArray),
     devTools: process.env.NODE_ENV !== "production",
});

setupListeners(AppStore.dispatch);

export * from "./hooks";
