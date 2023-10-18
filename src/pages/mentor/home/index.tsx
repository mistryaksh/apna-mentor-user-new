import React from "react";
import { MentorLayout } from "../../../layout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AppButton, CallLogCard } from "../../../component";
import { BsPeople } from "react-icons/bs";
import { MdOutlineContactPage } from "react-icons/md";
import { AiOutlineArrowRight, AiOutlineLoading, AiOutlineSmile } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetMyCallsQuery, useMentorProfileQuery } from "../../../app/apis";

export const MentorHome = () => {
     const { data } = useMentorProfileQuery();
     const { data: callLogs, isLoading: isCallLogLoading } = useGetMyCallsQuery(data?.data._id as string);
     return (
          <MentorLayout>
               <div className="grid grid-cols-12 gap-5 items-start h-full">
                    <div className="col-span-12 lg:col-span-8 xl:col-span-8 rounded-lg md:col-span-6 h-full">
                         <div className="grid grid-cols-12 gap-5 p-4 bg-white rounded-lg shadow-lg border">
                              <div className="col-span-12 xl:col-span-4 lg:col-span-3 sm:col-span-12 md:col-span-6 flex gap-5 items-center">
                                   <BsPeople size={50} className="fill-emerald-500" />
                                   <div>
                                        <p className="text-3xl">212</p>
                                        <p className="text-gray-500">Patients</p>
                                   </div>
                              </div>
                              <div className="col-span-12 xl:col-span-4 lg:col-span-3 sm:col-span-12 md:col-span-6 flex gap-5 items-center">
                                   <MdOutlineContactPage size={50} className="fill-blue-500" />
                                   <div>
                                        <p className="text-3xl">114</p>
                                        <p className="text-gray-500">Reports</p>
                                   </div>
                              </div>
                              <div className="col-span-12 xl:col-span-4 lg:col-span-3 sm:col-span-12 md:col-span-6 flex gap-5 items-center">
                                   <AiOutlineSmile size={50} className="fill-primary-500" />
                                   <div>
                                        <p className="text-3xl">{callLogs?.data.length}</p>
                                        <p className="text-gray-500">Consultations</p>
                                   </div>
                              </div>
                         </div>
                         <div className="mt-5 h-[400px] overflow-y-scroll bg-white p-5 border rounded-lg shadow-lg">
                              <div className="flex justify-between items-center">
                                   <p className="text-xl">Recent Appointments</p>
                                   <Link to="/schedule" className="text-blue-500">
                                        <AiOutlineArrowRight size={26} />
                                   </Link>
                              </div>
                              <hr className="my-5" />
                              <div className="flex flex-col gap-5">
                                   {!isCallLogLoading &&
                                        callLogs?.data
                                             .map(({ userOne, createdAt, status }) => (
                                                  <CallLogCard
                                                       status={status}
                                                       userName={`${userOne.name.firstName} ${userOne.name.lastName}`}
                                                       createdAt={createdAt}
                                                  />
                                             ))
                                             .slice(0, 12)}
                                   {isCallLogLoading && (
                                        <div className="flex justify-center items-center h-full">
                                             <AiOutlineLoading size={100} className="fill-secondary-500 animate-spin" />
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
                    <div className="border col-span-12 lg:col-span-4 xl:col-span-4 md:col-span-6 rounded-lg shadow-lg  bg-white flex flex-col justify-center items-center">
                         <Calendar maxDate={new Date()} className="rounded-lg" selectRange />
                         <div className="flex justify-center my-3">
                              <AppButton secondary>Update States</AppButton>
                         </div>
                    </div>
               </div>
          </MentorLayout>
     );
};
