import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { FC, useEffect, useRef, useState } from "react";
import { UserParticipantView } from "../participate-view";
import { useAppDispatch } from "../../../app/";
import { handleJoined, handleMeetingId } from "../../../app/features";
import { AiOutlineSend, AiOutlineToTop } from "react-icons/ai";
import { toast } from "react-toastify";
import clsx from "clsx";
import { AppButton } from "../../../component";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export interface UserMeetingViewProps {
     onMeetingLeave: () => void;
     meetingId: string;
     joined: string | null;
     userName: string;
     doctorName: string;
}

export const UserMeetingView: FC<UserMeetingViewProps> = ({
     onMeetingLeave,
     meetingId,
     joined,
     doctorName,
     userName,
}) => {
     var topic = "CHAT";
     const messagesEndRef = useRef(null) as any;
     const { leave } = useMeeting();

     const navigate = useNavigate();
     const { publish, messages } = usePubSub(topic);
     const dispatch = useAppDispatch();
     //Get the method which will be used to join the meeting.
     //We will also get the participants list to display all participants
     const { join, participants, meeting } = useMeeting({
          //callback for when meeting is joined successfully
          onMeetingJoined: () => {
               dispatch(handleJoined("JOINED"));
          },
          //callback for when meeting is left
          onMeetingLeft: () => {
               dispatch(handleMeetingId(null));
               onMeetingLeave();
               navigate("/", { replace: true });
          },
     });

     const joinMeeting = () => {
          dispatch(handleJoined("JOINED"));
          join();
     };

     const [message, setMessage] = useState<string>("Hi");
     const SendMessage = () => {
          publish(message, { persist: true });
          setMessage("");
     };
     const scrollToBottom = () => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
     };

     useEffect(() => {
          meeting?.on("connection-open", () => {
               toast.success("meeting initiated");
          });
          scrollToBottom();
     }, [meeting, messagesEndRef]);

     return (
          <div className="h-full w-full">
               {joined && joined === "JOINED" ? (
                    <div className="p-5 flex gap-5 items-start justify-end h-full">
                         {/* For rendering all the participants in the meeting */}
                         <div className="flex-1 flex flex-col-reverse gap-5  justify-end bg-gray-100 rounded-lg h-[100%]">
                              {[...(participants.keys() as any)].map((participantId) => (
                                   <div key={participantId}>
                                        <UserParticipantView
                                             meetingId={meetingId}
                                             userName={userName}
                                             participantId={participantId}
                                             key={participantId}
                                        />
                                   </div>
                              ))}
                         </div>
                         <div className="flex-1 h-full">
                              <div className="flex flex-col justify-between h-full bg-gray-100 rounded-lg">
                                   <div className="bg-gray-900 z-20 py-5 px-4 rounded-lg flex justify-between items-center shadow-lg">
                                        <p className="text-white uppercase">Mentor {doctorName}</p>
                                        <button
                                             className="bg-gray-400 px-3 py-1 hover:bg-gray-600 rounded-lg"
                                             onClick={() => leave()}
                                        >
                                             <span className="text-white">Leave</span>
                                        </button>
                                   </div>
                                   <div className={clsx("h-[70%] overflow-scroll scroll-smooth")} ref={messagesEndRef}>
                                        {messages.length !== 0 && (
                                             <div className="flex flex-col gap-5 z-10 pb-2 px-3">
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
                                                                                ? "bg-primary-100 text-primary-500 text-right border-primary-500"
                                                                                : "bg-gray-100 border-secondary-500 text-gray-900 text-left"
                                                                      )}
                                                                 >
                                                                      <p
                                                                           className={clsx(
                                                                                "text-xs capitalize",
                                                                                myMsg
                                                                                     ? "text-primary-500"
                                                                                     : "text-secondary-500"
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
                                        {messages.length === 0 && (
                                             <div className="text-center my-20">
                                                  <p className="text-gray-500 capitalize font-mono">
                                                       Start sending messages to the mentor
                                                  </p>
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
               ) : joined && joined === "JOINING" ? (
                    <p>Joining the meeting...</p>
               ) : (
                    <div className="p-3 flex flex-col justify-center items-center h-[60%]">
                         <p className="text-xl font-mono">
                              Your meeting has been initialized please click to join meeting
                         </p>
                         <div className="mt-5">
                              <AppButton primary onClick={joinMeeting}>
                                   Start meeting
                              </AppButton>
                         </div>
                    </div>
               )}
          </div>
     );
};
