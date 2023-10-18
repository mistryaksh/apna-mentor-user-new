import React, { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
     MentorLogoutState,
     handleAcceptCall,
     handleCallData,
     handleCallReceived,
     handleMentorMeetingId,
     handleSideBar,
     handleToken,
     useMentorLayoutSlice,
     useVideoChatSlice,
} from "../../app/features";
import { useAppDispatch } from "../../app/";
import { useGenerateTokenMutation, useMentorLogoutMutation, useMentorProfileQuery } from "../../app/apis";
import { AppButton, SideNavLink } from "../../component";
import { toast } from "react-toastify";
import clsx from "clsx";
import {
     AiOutlineBell,
     AiOutlineHome,
     AiOutlineMenu,
     AiOutlineMessage,
     AiOutlineSetting,
     AiOutlineUser,
     AiOutlineVideoCamera,
} from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { SocketIo } from "../../service/video-call.api";
import { UserProps } from "../../interface";
import { BsCameraVideo } from "react-icons/bs";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export interface MentorLayoutProps {
     children: ReactNode;
     fullScreenMode?: boolean;
}

export const MentorLayout: FC<MentorLayoutProps> = ({ children, fullScreenMode }) => {
     const { sideBar, callReceived, callStateData, mentorMeeting, CallAccepted } = useMentorLayoutSlice();
     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const { token } = useVideoChatSlice();
     const [Logout, { data, isError, error, isSuccess, isLoading }] = useMentorLogoutMutation();
     const { data: mentorProfile } = useMentorProfileQuery();
     const [GenerateToken, { data: tokenData, isError: isTokenError, error: tokenError, isSuccess: isTokenSuccess }] =
          useGenerateTokenMutation();

     const toggleNavbar = () => {
          dispatch(handleSideBar());
     };

     const MentorLogout = async () => {
          await Logout();
     };

     useEffect(() => {
          if (isError) {
               if ((error as any).data) {
                    toast.error((error as any).data.message);
               } else {
                    toast.error((error as any).message);
               }
          }
          if (isSuccess) {
               dispatch(MentorLogoutState());
               navigate("/", { replace: true });
               toast.success("logging out...");
          }
          SocketIo.on("THROW_CALL_REQUEST", async (data: any) => {
               if (data.data.doctorId === mentorProfile?.data._id) {
                    dispatch(handleAcceptCall(true));
                    dispatch(handleMentorMeetingId(data.data.roomId as string));
                    dispatch(handleCallReceived());
                    dispatch(handleCallData(data.user as UserProps));
               }
          });

          if (!token) {
               (async () => {
                    await GenerateToken();
               })();
          }
          if (isTokenError) {
               if ((tokenError as any).data) {
                    toast.error((tokenError as any).data.message);
               } else {
                    toast.error((tokenError as any).message);
               }
          }
          if (isTokenSuccess) {
               dispatch(handleToken(tokenData?.data));
          }
     }, [
          isSuccess,
          isError,
          error,
          navigate,
          dispatch,
          data,
          mentorProfile,
          callReceived,
          CallAccepted,
          token,
          GenerateToken,
          isTokenError,
          tokenError,
          isTokenSuccess,
          tokenData,
     ]);

     const AcceptCall = () => {
          SocketIo.emit("ACCEPTED_CALL", mentorMeeting);
          navigate(`/mentor/join-mentor-meeting/${mentorMeeting}`);
     };

     const RejectCall = () => {
          SocketIo.emit("REJECT_MEETING", mentorMeeting);
          dispatch(handleAcceptCall(false));
     };

     return (
          <div className="flex h-screen">
               {sideBar && !fullScreenMode && (
                    <div className={clsx("w-[260px] shadow-lg")}>
                         <div>
                              <img src={require("../../assets/image/apna-mentor.jpeg")} alt="" />
                         </div>
                         <div className="flex flex-col justify-between p-3">
                              <div className="flex flex-col gap-3">
                                   <SideNavLink Icon={AiOutlineHome} label="home" path="/mentor/home" />
                                   <SideNavLink Icon={AiOutlineMessage} label="video-calls" path="/mentor/my-calls" />
                                   <SideNavLink
                                        Icon={AiOutlineVideoCamera}
                                        label="Direct Meeting"
                                        path="/mentor/join-mentor-meeting"
                                   />
                                   <SideNavLink Icon={AiOutlineUser} label="profile" path="/mentor/profile" />
                                   <SideNavLink Icon={AiOutlineSetting} label="settings" path="/mentor/settings" />
                              </div>
                         </div>
                    </div>
               )}
               <main className="flex-1 bg-gray-50  overflow-scroll">
                    {!fullScreenMode && (
                         <nav className="bg-white py-4 px-5 shadow-lg flex justify-between items-center">
                              <button type="button" onClick={toggleNavbar}>
                                   <AiOutlineMenu size={24} />
                              </button>

                              <div className="flex gap-5">
                                   <button type="button">
                                        <AiOutlineBell size={26} />
                                   </button>
                                   <button type="button">
                                        <AiOutlineUser size={26} />
                                   </button>
                                   <AppButton secondary loading={isLoading} onClick={MentorLogout} type="button">
                                        <GoSignOut size={26} />
                                   </AppButton>
                              </div>
                         </nav>
                    )}
                    <section className={clsx(!fullScreenMode && "p-5")}>
                         {CallAccepted && (
                              <div className="p-5 border border-secondary-500 mb-3 rounded-lg animate-pulse bg-gradient-to-t from-secondary-100 to-gray-100 flex justify-between items-center">
                                   <div>
                                        <p className="font-mono">call notification</p>
                                        <h6 className="text-2xl">
                                             {callStateData?.callFrom.name.firstName}{" "}
                                             {callStateData?.callFrom.name.lastName}
                                        </h6>
                                        <p>{mentorMeeting}</p>
                                   </div>
                                   <div className="flex gap-5 items-center">
                                        <button
                                             type="submit"
                                             className="bg-primary-500 p-3 rounded-lg"
                                             onClick={AcceptCall}
                                        >
                                             <BsCameraVideo size={26} className="fill-white" />
                                        </button>
                                        <button type="submit" className="bg-primary-500 p-3 rounded-lg">
                                             <AiOutlineMessage size={26} className="fill-white" />
                                        </button>
                                        <button
                                             type="submit"
                                             className="bg-primary-500 p-3 rounded-lg flex items-center gap-2 text-white"
                                             onClick={RejectCall}
                                        >
                                             <IoIosRemoveCircleOutline size={26} />
                                             Decline
                                        </button>
                                   </div>
                              </div>
                         )}
                         {children}
                    </section>
               </main>
          </div>
     );
};
