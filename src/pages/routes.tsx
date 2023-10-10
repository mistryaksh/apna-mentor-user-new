import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import {
     AllDoctorPage,
     BlogsPage,
     BlogDetailsPage,
     ChatOnBoardPage,
     Homepage,
     LoginPage,
     MentorHome,
     MentorLogin,
     MyProfilePage,
     NotFoundPage,
     RegisterPage,
     VerifyMobilePage,
     WaitingChat,
     MentorVideoCallPage,
     UserVideoCallPage,
     MentorMyCallsPage,
     MentorJoinPage,
} from "./";
import { handleToken, useAccountSlice, useVideoChatSlice } from "../app/features";
import { useAppDispatch } from "../app/";
import { useGenerateTokenMutation } from "../app/apis";
import { toast } from "react-toastify";
export const AppRoutes = () => {
     const { mentor, user } = useAccountSlice();
     const { token } = useVideoChatSlice();
     const dispatch = useAppDispatch();
     const [GenerateToken, { data: tokenData, isError: isTokenError, error: tokenError, isSuccess: isTokenSuccess }] =
          useGenerateTokenMutation();

     useEffect(() => {
          (async () => {
               if (!token) {
                    await GenerateToken();
               }
          })();
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
     }, [GenerateToken, token, isTokenError, tokenError, dispatch, isTokenSuccess, tokenData]);
     return (
          <Routes>
               <Route path="/" element={<Homepage />} />
               <Route path="/blogs" element={<BlogsPage />} />
               <Route path="/blogs/:blogId" element={<BlogDetailsPage />} />
               <>
                    <Route element={<Navigate to="/login" />} />
                    <Route path="/mentor/login" element={<MentorLogin />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/verify/mobile/:mobile" element={<VerifyMobilePage />} />
                    <Route path="/doctors/all" element={<AllDoctorPage />} />
               </>
               {user?.loggedIn && (
                    <Route>
                         <Route path="/my-profile" element={<MyProfilePage />} />
                         <Route path="/user-video-call/:doctorId" element={<UserVideoCallPage />} />
                         <Route path="/start-chat/:doctorId" element={<ChatOnBoardPage />} />
                         <Route path="/waiting/:doctorId" element={<WaitingChat />} />
                    </Route>
               )}

               {mentor?.loggedIn && (
                    <Route path="mentor">
                         <Route path="home" element={<MentorHome />} />
                         <Route path="my-calls" element={<MentorMyCallsPage />} />
                         <Route path="join-mentor-meeting/:meetingId" element={<MentorJoinPage />} />
                    </Route>
               )}
               <Route path="*" element={<NotFoundPage />} />
          </Routes>
     );
};
