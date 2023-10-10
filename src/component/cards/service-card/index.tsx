import React, { FC } from "react";
import { IconType } from "react-icons/lib";

export interface ServiceCardProps {
     Icon: IconType;
     label: string;
     desc: string;
}

export const ServiceCard: FC<ServiceCardProps> = ({ Icon, desc, label }) => {
     return (
          <section className="w-[300px] bg-white flex justify-between items-start flex-shrink-0 rounded-md shadow-lg p-6 flex-col gap-3">
               <div className="bg-primary-500 p-3 rounded-lg">
                    <Icon size={40} className="fill-white" />
               </div>
               <div>
                    <p className="text-xl font-semibold">{label}</p>
                    <p className="text-gray-500 text-md font-montserrat">{desc}</p>
               </div>
          </section>
     );
};
