import React, { FC } from "react";
import { AiOutlineMessage, AiOutlineVideoCamera } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AppButton } from "../../button";

export interface DoctorCardProps {
     name: {
          firstName: string;
          lastName: string;
     };
     specialization: string[];
     id: string;
     hospital: any;
}

export const DoctorCard: FC<DoctorCardProps> = ({ name, specialization, hospital, id }) => {
     const navigate = useNavigate();
     return (
          <div
               key={id}
               className="col-span-12 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-12 hover:shadow-xl rounded-lg p-3 flex flex-col gap-2"
          >
               <div className="relative">
                    <img
                         src="https://www.pngitem.com/pimgs/m/111-1115620_transparent-medical-doctor-png-indian-doctor-images-png.png"
                         alt={name.firstName}
                         className="rounded-lg"
                    />
                    <div className="p-2 absolute text-sm bottom-0 flex flex-wrap gap-3 bg-white">
                         {specialization.join(", ")}
                    </div>
               </div>
               <h6 className="text-xl capitalize">
                    MENTOR {name.firstName} {name.lastName}
               </h6>
               <p className="capitalize text-sm">{hospital.name}</p>

               <div className="flex justify-between items-center gap-5">
                    <AppButton onClick={() => navigate(`/doctor/${id}`)} primary>
                         View Profile
                    </AppButton>
                    <div>
                         <AppButton
                              outlinedPrimary
                              onClick={() => {
                                   navigate(`/user-video-call/${id}`);
                              }}
                         >
                              <AiOutlineVideoCamera size={20} />
                         </AppButton>
                    </div>
                    <div>
                         <AppButton outlinedPrimary>
                              <AiOutlineMessage size={20} />
                         </AppButton>
                    </div>
               </div>
          </div>
     );
};
