import React from "react";
import { MainLayout } from "../../../../layout";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useGetAllDoctorsQuery, useProfileAccountQuery } from "../../../../app/apis";
import { DoctorCard } from "../../../../component";

export const AllDoctorPage = () => {
     const { data, isLoading } = useGetAllDoctorsQuery();
     const { data: profile } = useProfileAccountQuery();
     const navigate = useNavigate();
     return (
          <MainLayout mode="navigation">
               <div className="container mx-auto p-3 py-10">
                    <div className="flex items-center gap-5 justify-start flex-wrap">
                         <button className="px-3 py-2" onClick={() => navigate("/")}>
                              <BiArrowBack size={30} />
                         </button>
                         <h6 className="text-2xl">All Mentors</h6>
                    </div>
                    <div className="my-10 flex gap-5 items-center flex-wrap">
                         <h6 className="text-xl">Filter</h6>
                    </div>
                    <div className="py-10">
                         {isLoading && <div>Please wait...</div>}
                         <div className="grid grid-cols-12 xl:gap-10 gap-3">
                              {!isLoading &&
                                   data?.data.map(({ _id, name, comments, workDetails }) => (
                                        <DoctorCard
                                             id={_id as string}
                                             key={_id}
                                             hospital={workDetails.hospital}
                                             name={name}
                                             specialization={workDetails.hospital.specialization}
                                        />
                                   ))}
                         </div>
                    </div>
               </div>
          </MainLayout>
     );
};
