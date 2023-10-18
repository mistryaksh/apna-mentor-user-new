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
     UserVideoCallPage,
     MentorMyCallsPage,
     MentorJoinPage,
     DoctorProfilePage,
} from "./";
import { useAccountSlice } from "../app/features";

export const AppRoutes = () => {
     const { mentor, user } = useAccountSlice();

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
                    <Route path="/doctor/:doctorId" element={<DoctorProfilePage />} />
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
