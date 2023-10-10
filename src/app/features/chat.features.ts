import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../hooks";
import { v4 as uuIdV4 } from "uuid";

export interface initialStateProps {
     roomId: string | null;
}

const initialState: initialStateProps = {
     roomId: "",
};

const ChatSlice = createSlice({
     initialState,
     name: "chat",
     reducers: {
          handleGenerateRoomId: (state, action) => {
               state.roomId = action.payload;
          },
     },
});

export const useChatSlice = () =>
     useSelector((state: RootState) => {
          return state.chat;
     });
export const ChatReducer = ChatSlice.reducer;
export const { handleGenerateRoomId } = ChatSlice.actions;
