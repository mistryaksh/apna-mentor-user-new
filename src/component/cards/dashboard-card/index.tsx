import React, { FC } from "react";
import { Link } from "react-router-dom";

export interface DashboardCardProps {
     label: string;
     values: string;
     path: string;
}

export const DashboardCard: FC<DashboardCardProps> = ({ label, values, path }) => {
     return (
          <div className=" p-3 flex flex-col gap-3 shadow-lg border rounded-lg">
               <h5 className="text-xl text-primary-500">
                    {label} <sub className="text-xs">(This month)</sub>{" "}
               </h5>
               <h6 className="text-5xl font-bold font-roboto">{values}</h6>
               <Link to={path} className="text-blue-500">
                    Get Details?
               </Link>
          </div>
     );
};
