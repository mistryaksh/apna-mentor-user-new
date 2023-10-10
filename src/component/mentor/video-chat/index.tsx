import React, { FC } from "react";

export interface MentorVideoChatProps {
     participants: any[];
     room: null | any;
     roomName: string;
}

export const MentorVideoChat: FC<MentorVideoChatProps> = ({ participants, room, roomName }) => {
     return (
          <div>
               Video chat component = {roomName}
               {participants.map((element, i) => (
                    <div key={i}>
                         SID{element.sid} ID{element.identity}
                    </div>
               ))}
               {room ? <p key={room.localParticipant.sid}>{room.localParticipant.identity}</p> : ""}
          </div>
     );
};
