import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../hooks";
import { UserProps } from "../../interface";

interface initialStateProps {
     sideBar: boolean;
     mentorMeeting: string | null;
     mentorToken: string | null;
     callReceived: boolean;
     CallAccepted?: boolean;
     meetingIsValid?: boolean;
     callStateData?: {
          callFrom: UserProps;
     };
}

const initialState: initialStateProps = {
     sideBar: true,
     mentorMeeting: null,
     callReceived: false,
     mentorToken: null,
};

const MentorLayoutSlice = createSlice({
     initialState,
     name: "mentorLayout",
     reducers: {
          handleSideBar: (state) => {
               state.sideBar = !state.sideBar;
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
               state.mentorMeeting = action.payload;
          },
          handleDeclineCall: (state) => {
               state.CallAccepted = false;
          },
          handleMeetingValidation: (state) => {
               state.meetingIsValid = true;
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
     handleCallReceived,
     handleAcceptCall,
     handleDeclineCall,
     handleCallData,
     handleMeetingValidation,
} = MentorLayoutSlice.actions;
