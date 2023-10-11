import React, { useEffect } from "react";
import { MainLayout } from "../../../layout";
import { useNavigate, useParams } from "react-router-dom";
import {
     useCreateMeetingMutation,
     useGetDoctorByIdMutation,
     useProfileAccountQuery,
     useSaveChatMutation,
} from "../../../app/apis";
import { toast } from "react-toastify";
import { handleMeetingId, handleMice, handleVideoCam, useVideoChatSlice } from "../../../app/features";
import { useAppDispatch } from "../../../app/";
import { BsCameraVideo, BsCameraVideoOff, BsMic, BsMicMute } from "react-icons/bs";
import { AppButton, CallProvider } from "../../../component";
import { UserMeetingView } from "../../video-call";
import { SocketIo } from "../../../service/video-call.api";

export const UserVideoCallPage = () => {
     const { doctorId } = useParams();
     const [Profile, { data: doctor, isError, error }] = useGetDoctorByIdMutation();
     const { data: user } = useProfileAccountQuery();
     const { meetingId, mic, videoCamera, joined, token } = useVideoChatSlice();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const [
          CreateMeeting,
          { data: meetingData, isError: isMeetingError, error: meetingError, isSuccess: isMeetingSuccess },
     ] = useCreateMeetingMutation();
     const [
          SavingChat,
          {
               data,
               isError: isSaveChatError,
               isLoading: isSaveChatLoading,
               isSuccess: isSaveChatSuccess,
               error: saveChatError,
          },
     ] = useSaveChatMutation();

     useEffect(() => {
          if (doctorId) {
               (async () => {
                    await Profile(doctorId as string);
               })();
          }

          if (isError) {
               if ((error as any).data) {
                    toast.error((error as any).data.message);
               } else {
                    toast.error((error as any).message);
               }
          }

          if (isMeetingError) {
               if ((meetingError as any).data) {
                    toast.error((meetingError as any).data.message);
               } else {
                    toast.error((meetingError as any).message);
               }
          }

          if (isMeetingSuccess) {
               SocketIo.emit("GET_CALL_REQUEST", {
                    doctorId,
                    roomId: meetingData?.data?.roomId,
                    userId: user?.data._id,
               });

               if (meetingData) {
                    dispatch(handleMeetingId(meetingData?.data?.roomId));
                    (async () => {
                         await SavingChat({
                              doctorId: doctorId as string,
                              roomId: meetingData?.data?.roomId,
                              userId: user?.data._id as string,
                         });
                    })();
               }
          }
     }, [
          Profile,
          dispatch,
          doctorId,
          error,
          isError,
          isMeetingError,
          meetingError,
          isMeetingSuccess,
          meetingData,
          user,
          SavingChat,
     ]);

     const StartJoinMeeting = async () => {
          if (!token) {
               toast.error("Something went wrong please contact to admin");
          } else {
               await CreateMeeting(token);
          }
     };

     const onMeetingLeave = () => {
          dispatch(handleMeetingId(null));
     };

     return (
          <MainLayout mode="full">
               {
                    <div className="h-screen flex flex-col justify-center items-center">
                         {token && meetingId ? (
                              <div className="w-full h-full">
                                   <CallProvider
                                        userId={user?.data._id as string}
                                        meetingId={meetingId}
                                        token={token}
                                        mic={mic}
                                        webcam={videoCamera}
                                        username={`${user?.data.name.firstName} ${user?.data.name.lastName}`}
                                   >
                                        <div className="h-full w-full">
                                             <UserMeetingView
                                                  joined={joined || null}
                                                  meetingId={meetingId}
                                                  onMeetingLeave={onMeetingLeave}
                                                  userName={`${user?.data.name.firstName} ${user?.data.name.lastName}`}
                                             />
                                        </div>
                                   </CallProvider>
                              </div>
                         ) : (
                              <div className="w-[60%] p-5 shadow-lg rounded-lg border">
                                   <h6 className="text-3xl capitalize">
                                        Are you ready join with{" "}
                                        <span className="text-secondary-500 underline">
                                             {doctor?.data.name.firstName} {doctor?.data.name.lastName}
                                        </span>
                                        ?
                                   </h6>
                                   <div className="py-5 flex flex-col gap-4">
                                        <div className="flex gap-3 items-center">
                                             <button id="camera">
                                                  {videoCamera ? (
                                                       <BsCameraVideo size={24} />
                                                  ) : (
                                                       <BsCameraVideoOff size={24} />
                                                  )}
                                             </button>
                                             <label
                                                  onClick={() => dispatch(handleVideoCam())}
                                                  htmlFor="camera"
                                                  className="select-none capitalize text-gray-500"
                                             >
                                                  Start video camera {videoCamera ? "on" : "off"} on start meeting
                                             </label>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                             <button id="mic">
                                                  {mic ? <BsMic size={24} /> : <BsMicMute size={24} />}
                                             </button>
                                             <label
                                                  onClick={() => dispatch(handleMice())}
                                                  htmlFor="mic"
                                                  className="select-none capitalize text-gray-500"
                                             >
                                                  Start mice {mic ? "on" : "off"} on start meeting
                                             </label>
                                        </div>
                                   </div>
                                   <AppButton
                                        type="button"
                                        outlinedPrimary
                                        onClick={() => navigate("/", { replace: true })}
                                   >
                                        Cancel
                                   </AppButton>{" "}
                                   <AppButton primary onClick={StartJoinMeeting} type="button">
                                        Yes Please Continue
                                   </AppButton>
                              </div>
                         )}
                    </div>
               }
          </MainLayout>
     );
};
