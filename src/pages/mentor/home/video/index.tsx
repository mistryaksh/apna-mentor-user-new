import React from "react";
import { MentorLayout } from "../../../../layout";
import { AppButton } from "../../../../component";
import { useNavigate } from "react-router-dom";
import { useGetMyCallsQuery, useMentorProfileQuery } from "../../../../app/apis";

export const MentorVideoCallPage = () => {
     const navigate = useNavigate();
     const { data } = useMentorProfileQuery();
     const { data: calls } = useGetMyCallsQuery(data?.data._id as string);
     return (
          <MentorLayout>
               <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-12 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6">
                         <div className="p-5 border rounded-md">
                              <h6 className="text-5xl">{calls?.data?.length}</h6>
                              <p className="text-gray-500">Calls Attained</p>
                              <hr className="my-3" />
                              <AppButton secondary onClick={() => navigate("/mentor/my-calls")}>
                                   Details
                              </AppButton>
                         </div>
                    </div>
                    <div className="col-span-12 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6">1</div>
                    <div className="col-span-12 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-6">1</div>
               </div>
          </MentorLayout>
     );
};
