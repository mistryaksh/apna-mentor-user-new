import React, { FC } from "react";
import { AiOutlineUser } from "react-icons/ai";

export interface CommentCardProps {
     username: string;
     body: string;
}

export const CommentCard: FC<CommentCardProps> = ({ body, username }) => {
     return (
          <section className="w-[40%] bg-white flex justify-between items-start flex-shrink-0 rounded-md shadow-xl border flex-col gap-3 p-3">
               <div className="rounded-lg flex flex-col items-start">
                    <div className="bg-primary-500 p-2 rounded-full">
                         <AiOutlineUser size={30} className="fill-white" />
                    </div>
                    <h6 className="text-xl capitalize py-5">{username}</h6>
                    <p className="text-gray-500 xl:line-clamp-5 lg:line-clamp-5 line-clamp-2">{body}</p>
               </div>
          </section>
     );
};
