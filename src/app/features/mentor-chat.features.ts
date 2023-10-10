import { createSlice } from "@reduxjs/toolkit";
import { IChatProps } from "../../interface";
import { useSelector } from "react-redux";
import { RootState } from "../hooks";

export interface InitialMentorChatProps {
     chats: IChatProps[];
}

const initialState: InitialMentorChatProps = {
     chats: [],
};

const MentorChatSlice = createSlice({
     initialState,
     name: "mentorChat",
     reducers: {},
});

export const useMentorChatSlice = () =>
     useSelector((state: RootState) => {
          return state.mentorChat;
     });
export const MentorChatReducer = MentorChatSlice.reducer;
// export const { handleMentorChats } = MentorChatSlice.actions;
