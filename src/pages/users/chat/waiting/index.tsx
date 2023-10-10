import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { useGetDoctorByIdMutation } from "../../../../app/apis";
import { MainLayout } from "../../../../layout";
import { AppButton } from "../../../../component";

export const WaitingChat = () => {
     const { doctorId } = useParams();
     const [GetDoctor, { data, isLoading }] = useGetDoctorByIdMutation();

     useEffect(() => {
          (async () => {
               await GetDoctor(doctorId as string);
          })();
     }, [GetDoctor, doctorId]);

     return (
          <MainLayout mode="full">
               {!isLoading && (
                    <div className="h-screen flex items-center justify-center">
                         <div className="w-[40%] shadow-lg p-5 rounded-lg">
                              <h5 className="capitalize text-2xl text-center">
                                   Waiting to accept your request by mentor {data?.data.name.firstName}{" "}
                                   {data?.data.name.lastName}
                              </h5>
                              <p className="text-gray-500 text-center my-5">
                                   Mentor will notified your request they please wait until they accept your request,
                                   when they accept <span className="text-primary-500">join now</span> button will
                                   appear.
                              </p>
                              <div className="flex justify-between items-center">
                                   <div>
                                        <Link to="/">Cancel</Link>
                                   </div>
                                   <div>
                                        <AppButton primary>Join now</AppButton>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}
               {isLoading && (
                    <div className="h-screen flex items-center justify-center">
                         <div className="w-[40%] shadow-lg p-5 rounded-lg flex flex-col items-center">
                              <AiOutlineLoading size={100} className="animate-spin fill-primary-500 mb-5" />
                              <h6>Please wait...</h6>
                         </div>
                    </div>
               )}
          </MainLayout>
     );
};
