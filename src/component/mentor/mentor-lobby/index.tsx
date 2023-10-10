import React, { ChangeEvent, FC } from "react";
import { AppInput } from "../../input";
import { AppButton } from "../../button";

export interface MentorLobbyComponentProps {
     username: string;
     handleUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void;
     roomName: string;
     handleRoomNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
     handleSubmit: () => void;
}

export const MentorLobbyComponent: FC<MentorLobbyComponentProps> = ({
     handleRoomNameChange,
     handleSubmit,
     handleUsernameChange,
     roomName,
     username,
}) => {
     return (
          <div className="w-[50%] border p-5">
               <AppInput value={username} onChange={(e) => handleUsernameChange(e)} label="Enter username" />
               <AppInput value={roomName} onChange={(e) => handleRoomNameChange(e)} label="Enter room name" />
               <AppButton onClick={handleSubmit} primary>
                    Continue
               </AppButton>
          </div>
     );
};
