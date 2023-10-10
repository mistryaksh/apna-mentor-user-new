import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../hooks";

export interface videoInitialStateProps {
     mic: boolean;
     videoCamera: boolean;
     meetingId: string | null;
     userName: string | null;
     joined?: string | null;
     token: string | null;
}

const initialState: videoInitialStateProps = {
     mic: true,
     videoCamera: true,
     meetingId: null,
     userName: null,
     token: null,
};

const VideoChat = createSlice({
     initialState,
     name: "videoChat",
     reducers: {
          handleVideoCam: (state) => {
               state.videoCamera = !state.videoCamera;
          },
          handleMice: (state) => {
               state.mic = !state.mic;
          },
          handleMeetingId: (state, action) => {
               state.meetingId = action.payload;
          },
          handleJoined: (state, action) => {
               state.joined = action.payload;
          },
          handleToken: (state, action) => {
               if (action.payload) {
                    state.token = action.payload;
               } else {
                    state.token = null;
               }
          },
     },
});

export const useVideoChatSlice = () =>
     useSelector((state: RootState) => {
          return state.videoChat;
     });

export const VideoChatReducer = VideoChat.reducer;
export const { handleMice, handleVideoCam, handleMeetingId, handleJoined, handleToken } = VideoChat.actions;
