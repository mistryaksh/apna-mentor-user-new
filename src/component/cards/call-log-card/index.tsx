import clsx from "clsx";
import moment from "moment";
import React, { FC } from "react";
import { AiOutlineRight, AiOutlineVideoCamera } from "react-icons/ai";
import { BsArrowDownLeft, BsHandThumbsUp } from "react-icons/bs";

export interface CallLogCardProps {
     status: string;
     userName: string;
     createdAt?: string;
}

export const CallLogCard: FC<CallLogCardProps> = ({ status, userName, createdAt }) => {
     return (
          <div className="flex justify-between items-center gap-5">
               <div className="flex gap-3 items-center">
                    <div className="px-5 py-2 flex gap-2 items-center bg-gray-100 rounded-lg text-primary-500">
                         <AiOutlineVideoCamera size={24} />
                    </div>
                    <div>
                         <p className={clsx("text-lg", status === "REJECTED" && "text-red-500")}>{userName}</p>
                         <div className="flex gap-2 items-center">
                              {status === "REJECTED" && <BsArrowDownLeft size={14} className="fill-red-500" />}
                              {status === "COMPLETED" && <BsHandThumbsUp size={14} className="fill-green-500" />}
                              <p className="text-xs text-gray-500">
                                   {moment(createdAt as string).format("MMMM Do YYYY, h:mm A")}
                              </p>
                         </div>
                    </div>
               </div>
               <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-lg group hover:cursor-pointer">
                    <p className="uppercase text-gray-500 text-xs group-hover:text-gray-900">Details</p>
                    <AiOutlineRight size={20} />
               </div>
          </div>
     );
};
