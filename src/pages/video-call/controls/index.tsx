import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { FC } from "react";
import { BsCameraVideo, BsCameraVideoOff, BsMic, BsMicMute } from "react-icons/bs";

interface VideoCallControlProps {
     participate: string;
}

export const Controls: FC<VideoCallControlProps> = ({ participate }) => {
     const { leave, toggleMic, toggleWebcam } = useMeeting();
     const { micOn, webcamOn } = useParticipant(participate);

     return (
          <div className="flex gap-5 items-center">
               <button onClick={() => toggleMic()} className="bg-gray-300 p-3 rounded-lg">
                    {micOn ? (
                         <BsMic size={24} className="fill-primary-500" />
                    ) : (
                         <BsMicMute size={24} className="fill-gray-900" />
                    )}
               </button>
               <button onClick={() => toggleWebcam()} className="bg-gray-300 p-3 rounded-lg">
                    {webcamOn ? (
                         <BsCameraVideo size={24} className="fill-primary-500 " />
                    ) : (
                         <BsCameraVideoOff size={24} className="fill-gray-900" />
                    )}
               </button>
          </div>
     );
};
