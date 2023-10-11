import { MeetingProvider } from "@videosdk.live/react-sdk";
import React, { FC, ReactNode } from "react";

export interface CallProviderProps {
     token: string;
     meetingId: string;
     mic: boolean;
     webcam: boolean;
     children: ReactNode;
     username: string;
     userId: string;
}

export const CallProvider: FC<CallProviderProps> = ({ meetingId, mic, token, webcam, children, username, userId }) => {
     return (
          <MeetingProvider
               token={token}
               config={{
                    meetingId: meetingId,
                    micEnabled: mic,
                    name: username,
                    webcamEnabled: webcam,
                    mode: "CONFERENCE",
                    participantId: userId,
               }}
          >
               {children}
          </MeetingProvider>
     );
};
