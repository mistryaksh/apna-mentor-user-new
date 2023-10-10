import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../hooks";
import { UserProps } from "../../interface";

interface initialStateProps {
     sideBar: boolean;
     mentorMeeting: string | null;
     callReceived: boolean;
     CallAccepted?: boolean;
     callStateData?: {
          callFrom: UserProps;
     };
}

const initialState: initialStateProps = {
     sideBar: true,
     mentorMeeting: null,
     callReceived: false,
};

const MentorLayoutSlice = createSlice({
     initialState,
     name: "mentorLayout",
     reducers: {
          handleSideBar: (state) => {
               state.sideBar = !state.sideBar;
          },
          handleMentorMeetingId: (state, action) => {
               state.mentorMeeting = action.payload;
          },
          handleCallReceived: (state) => {
               state.callReceived = !state.callReceived;
          },
          handleCallData: (state, action) => {
               state.callStateData = {
                    callFrom: action.payload,
               };
          },
          handleAcceptCall: (state, action) => {
               state.CallAccepted = true;
               state.mentorMeeting = action.payload as string;
          },
          handleDeclineCall: (state) => {
               state.CallAccepted = false;
               state.mentorMeeting = null;
          },
     },
});

export const useMentorLayoutSlice = () =>
     useSelector((state: RootState) => {
          return state.mentorLayout;
     });

export const MentorLayoutReducer = MentorLayoutSlice.reducer;
export const {
     handleSideBar,
     handleMentorMeetingId,
     handleCallReceived,
     handleAcceptCall,
     handleDeclineCall,
     handleCallData,
} = MentorLayoutSlice.actions;
