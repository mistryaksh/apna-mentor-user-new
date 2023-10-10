import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { MentorLayout } from "../../../../layout";
import { MeetingProvider, useMeeting, useParticipant, usePubSub } from "@videosdk.live/react-sdk";
import { useMentorProfileQuery, useValidateRoomMutation } from "../../../../app/apis";

import ReactPlayer from "react-player";
import { BsCameraVideo, BsCameraVideoOff, BsMic, BsMicMute } from "react-icons/bs";
import { AiOutlineCopy, AiOutlineSend, AiOutlineToTop } from "react-icons/ai";
import clsx from "clsx";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import {
     handleAcceptCall,
     handleDeclineCall,
     handleMeetingId,
     handleMeetingValidation,
     useMentorLayoutSlice,
     useVideoChatSlice,
} from "../../../../app/features";
import { useAppDispatch } from "../../../../app/";
import { SocketIo } from "../../../../service/video-call.api";
import { toast } from "react-toastify";
import { CallProvider } from "../../../../component";

function MentorParticipantView({
     participantId,
     userName,
     meetingId,
}: {
     participantId: string;
     userName: string;
     meetingId: string;
}) {
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
     }, [micStream, micOn]);
     const itsMe = displayName === userName;

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
                              }}
                         />
                    )}
                    {!webcamOn && !itsMe && (
                         <div
                              className={clsx(
                                   itsMe ? "30%" : "100%",
                                   "py-10 px-5 border border-primary-300 rounded-lg"
                              )}
                         >
                              <p className="text-gray-500 font-mono">User has turned off their camera</p>
                         </div>
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
                                        {participantId && (
                                             <Controls micOn={micOn} webcamOn={webcamOn} participate={participantId} />
                                        )}
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
          </div>
     );
}

function MentorMeetingView({
     onMeetingLeave,
     meetingId,
     userName,
}: {
     onMeetingLeave: () => void;
     meetingId: string;
     userName: string;
}) {
     var topic = "CHAT";
     const { end } = useMeeting();
     const dispatch = useAppDispatch();
     const { publish, messages } = usePubSub(topic);
     const [joined, setJoined] = useState<string | null>(null);

     //Get the method which will be used to join the meeting.
     //We will also get the participants list to display all participants
     const { join, participants } = useMeeting({
          //callback for when meeting is joined successfully
          onMeetingJoined: () => {
               setJoined("JOINED");
               SocketIo.emit("ACCEPTED_CALL", meetingId);
          },
          //callback for when meeting is left
          onMeetingLeft: () => {
               onMeetingLeave();
          },
     });
     const navigate = useNavigate();

     useEffect(() => {
          if (meetingId) {
               join();
          }
     }, [meetingId]);

     const SendMessage = () => {
          publish(message, { persist: true });
          setMessage("");
     };
     const [message, setMessage] = useState<string>("");
     const OnMeetingEnd = () => {
          end();
          dispatch(handleDeclineCall());
          SocketIo.emit("END_MEETING", meetingId);
          navigate("/mentor/my-calls", { replace: true });
     };
     return (
          <div className="w-screen h-screen p-3">
               {joined === "JOINED" ? (
                    <div className="flex h-full w-full justify-between">
                         <div className="flex-1 p-3">
                              {/* For rendering all the participants in the meeting */}
                              <div className="flex flex-col-reverse gap-5 h-full w-full">
                                   {[...(participants.keys() as any)].map((participantId) => (
                                        <div key={participantId}>
                                             <MentorParticipantView
                                                  meetingId={meetingId}
                                                  userName={userName}
                                                  participantId={participantId}
                                                  key={participantId}
                                             />
                                        </div>
                                   ))}
                              </div>
                         </div>
                         <div className="flex-1">
                              <div className="flex flex-col justify-between h-full bg-gray-100 rounded-lg">
                                   <div className="bg-gray-900 z-20 py-5 px-4 rounded-lg flex justify-between items-center shadow-lg">
                                        <p className="text-white uppercase">User name {userName}</p>
                                        <button
                                             className="bg-gray-400 px-3 py-1 hover:bg-gray-600 rounded-lg"
                                             onClick={OnMeetingEnd}
                                        >
                                             <span className="text-white">End meeting</span>
                                        </button>
                                   </div>
                                   <div className={clsx("h-[70%] overflow-scroll scroll-smooth")}>
                                        {messages.length !== 0 && (
                                             <div className="flex flex-col gap-5 z-10 px-3">
                                                  {messages.map(({ message, senderName, id, timestamp }) => {
                                                       const myMsg: boolean = senderName === userName;
                                                       return (
                                                            <div
                                                                 key={id}
                                                                 className={clsx(
                                                                      "w-full flex gap-3 items-center",
                                                                      !myMsg ? "justify-start" : "justify-end"
                                                                 )}
                                                            >
                                                                 <div
                                                                      className={clsx(
                                                                           "w-[70%] p-2 rounded-lg flex flex-col border ",
                                                                           myMsg
                                                                                ? "bg-secondary-100 text-secondary-500 text-right border-secondary-500"
                                                                                : "bg-gray-100 border-secondary-500 text-gray-900 text-left"
                                                                      )}
                                                                 >
                                                                      <p
                                                                           className={clsx(
                                                                                "text-xs capitalize",
                                                                                myMsg
                                                                                     ? "text-secondary-500"
                                                                                     : "text-primary-500"
                                                                           )}
                                                                      >
                                                                           {senderName}
                                                                      </p>
                                                                      <p className="text-md text-gray-900">{message}</p>
                                                                      {myMsg && (
                                                                           <div className="text-xs text-gray-400 uppercase text-left mt-2">
                                                                                {moment(timestamp).format("hh:mm a")}
                                                                           </div>
                                                                      )}
                                                                      {!myMsg && (
                                                                           <div className="text-xs text-gray-100 uppercase text-right mt-2">
                                                                                {moment(timestamp).format("hh:mm a")}
                                                                           </div>
                                                                      )}
                                                                 </div>
                                                            </div>
                                                       );
                                                  })}
                                             </div>
                                        )}
                                   </div>
                                   <div className="flex gap-3 items-center p-3">
                                        <input
                                             className=" border border-transparent w-full px-5 py-3 rounded-full focus:border-primary-500 focus:outline-none"
                                             type="text"
                                             placeholder="Send message"
                                             value={message}
                                             onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <button className="bg-gray-900 rounded-lg p-3">
                                             <AiOutlineToTop size={24} className="fill-primary-500" />
                                        </button>
                                        <button onClick={SendMessage} className="bg-gray-900 rounded-lg p-3">
                                             <AiOutlineSend size={24} className="fill-primary-500" />
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               ) : (
                    joined === "JOINING" && <p>Joining the meeting...</p>
               )}
          </div>
     );
}

interface ControlProps {
     micOn: boolean;
     webcamOn: boolean;
     participate: string;
}

const Controls: FC<ControlProps> = ({ webcamOn, micOn }) => {
     const { toggleMic, toggleWebcam } = useMeeting();
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

export const MentorJoinPage = () => {
     // const [roomId, setRoomId] = useState<string | null>(null);
     const dispatch = useAppDispatch();
     const { data: mentor } = useMentorProfileQuery();
     const { token } = useVideoChatSlice();
     const { meetingIsValid } = useMentorLayoutSlice();
     const { meetingId } = useParams();
     const { data: doctor } = useMentorProfileQuery();
     const userName = `${doctor?.data.name.firstName} ${doctor?.data.name.lastName}`;
     const [
          ValidateMeetingIdAndToken,
          { isError: isValidateError, error: validateError, isSuccess: isValidateSuccess, data: validateData },
     ] = useValidateRoomMutation();

     useEffect(() => {
          dispatch(handleDeclineCall());
          if (meetingId && token && !meetingIsValid) {
               (async () => {
                    await ValidateMeetingIdAndToken({ meetingId, token });
               })();
          }
          if (isValidateSuccess) {
               if (validateData?.data?.roomId) {
                    dispatch(handleMeetingValidation());
               }
          }

          if (isValidateError) {
               if ((validateError as any).data) {
                    toast.error((validateError as any).data.message);
               } else {
                    toast.error((validateError as any).message);
               }
          }
     }, [
          meetingId,
          dispatch,
          token,
          ValidateMeetingIdAndToken,
          isValidateSuccess,
          validateError,
          isValidateError,
          meetingIsValid,
          validateData,
     ]);
     //This will set Meeting Id to null when meeting is left or ended
     const onMeetingLeave = () => {
          dispatch(handleMeetingId(null));
     };
     return (
          <MentorLayout fullScreenMode>
               <div className="flex border h-screen w-screen">
                    <div className="flex w-full h-full border">
                         {meetingId && token ? (
                              <div>
                                   <CallProvider
                                        meetingId={meetingId}
                                        token={token}
                                        mic
                                        webcam
                                        username={`${mentor?.data.name.firstName} ${mentor?.data.name.lastName}`}
                                   >
                                        <MentorMeetingView
                                             userName={userName}
                                             meetingId={meetingId as string}
                                             onMeetingLeave={onMeetingLeave}
                                        />
                                   </CallProvider>
                              </div>
                         ) : (
                              <div>no meeting ID & token provided</div>
                         )}
                    </div>
               </div>
          </MentorLayout>
     );
};
