import { useParticipant } from "@videosdk.live/react-sdk";
import clsx from "clsx";
import { useEffect, useMemo, useRef } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { BsCameraVideo, BsCameraVideoOff, BsMic, BsMicMute } from "react-icons/bs";
import ReactPlayer from "react-player";
import { Controls } from "../controls";
import { toast } from "react-toastify";

export const UserParticipantView = ({
     participantId,
     userName,
     meetingId,
     startRecording,
}: {
     participantId: string;
     userName: string;
     meetingId: string;
     startRecording?: () => void;
}) => {
     const micRef = useRef<HTMLAudioElement>(null);
     const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(participantId);

     const videoStream = useMemo(() => {
          if (webcamOn && webcamStream) {
               const mediaStream = new MediaStream();
               mediaStream.addTrack(webcamStream.track);
               return mediaStream;
          }
     }, [webcamStream, webcamOn]);

     useEffect(() => {
          if (micRef.current) {
               if (micOn && micStream) {
                    const mediaStream = new MediaStream();
                    mediaStream.addTrack(micStream.track);

                    micRef.current.srcObject = mediaStream;
                    micRef.current.play().catch((error) => console.error("videoElem.current.play() failed", error));
               } else {
                    micRef.current.srcObject = null;
               }
          }
     }, [micStream, micOn, webcamOn]);

     const itsMe: boolean = displayName === userName;

     return (
          <div key={participantId} className="flex flex-col gap-5 justify-center items-start w-full">
               <audio ref={micRef} autoPlay muted={isLocal} />
               <div className={clsx("rounded-lg w-full flex items-center gap-3 relative z-10")}>
                    {!itsMe && (
                         <div className="absolute bottom-5 rounded-lg right-5 bg-secondary-500 shadow-lg z-20 p-3">
                              <div className="flex gap-5">
                                   <p className="text-white capitalize">{displayName}</p>
                                   {webcamOn ? (
                                        <BsCameraVideo size={24} className="fill-white" />
                                   ) : (
                                        <BsCameraVideoOff size={24} className="fill-white" />
                                   )}
                                   {micOn ? (
                                        <BsMic size={24} className="fill-white" />
                                   ) : (
                                        <BsMicMute size={24} className="fill-white" />
                                   )}
                              </div>
                         </div>
                    )}
                    {webcamOn && (
                         <ReactPlayer
                              //
                              playsinline // very very imp prop
                              pip={false}
                              light={false}
                              controls={false}
                              muted={true}
                              playing={true}
                              //
                              url={videoStream}
                              //
                              height={itsMe ? "40%" : "100%"}
                              width={itsMe ? "40%" : "100%"}
                              onError={(err) => {
                                   console.log(err, "participant video error");
                                   toast("Your hardware caused error please check your browser configs");
                              }}
                         />
                    )}
                    {itsMe && (
                         <div className="flex flex-col gap-3 flex-1 border border-primary-500 h-full p-5">
                              <p className="text-2xl">You : {displayName}</p>
                              <p className="text-gray-500 flex items-center gap-3">
                                   Meeting ID : {meetingId}{" "}
                                   <button>
                                        <AiOutlineCopy size={22} />
                                   </button>
                              </p>
                              {itsMe && (
                                   <div className="flex gap-3 items-center">
                                        {participantId && <Controls participate={participantId} />}
                                   </div>
                              )}
                         </div>
                    )}
               </div>
               {itsMe && (
                    <div className="border p-3 flex justify-center items-center border-primary-500 w-full">
                         <p className="font-mono capitalize text-sm text-gray-500">
                              new features for video call app is comming soon!
                         </p>
                    </div>
               )}
               {!webcamOn && itsMe && (
                    <div className={clsx(itsMe ? "30%" : "100%", "py-10 px-5 border border-primary-300 rounded-lg")}>
                         <p className="text-gray-500 font-mono">Please turn on your camera</p>
                    </div>
               )}

               {!webcamOn && !itsMe && (
                    <div className={clsx(itsMe ? "30%" : "100%", "py-10 px-5 border border-primary-300 rounded-lg")}>
                         <p className="text-gray-500 font-mono">Mentor has turned off their camera</p>
                    </div>
               )}
          </div>
     );
};
