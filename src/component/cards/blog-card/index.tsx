import React, { FC } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AppButton } from "../../button";

export interface BlogCardProps {
     label: string;
     image: string;
     _id: string;
     body: string;
     admin?: any;
}

export const BlogCard: FC<BlogCardProps> = ({ label, image, _id, body, admin }) => {
     return (
          <div className="group flex flex-col flex-wrap w-full">
               <div className="flex justify-center">
                    <img src={image} alt={label} className=" object-cover xl:w-full w-[60%] rounded-lg" />
               </div>
               <Link to={`/blogs/${_id}`}>
                    <p className="xl:text-xl text-md transition-all duration-300 group-hover:text-primary-500 xl:line-clamp-3 mt-3">
                         {label}
                    </p>
                    <p
                         dangerouslySetInnerHTML={{ __html: body }}
                         className="line-clamp-3 text-xs xl:text-sm text-gray-500 my-3"
                    />
                    <div className="flex mt-3 items-center justify-between">
                         <div>
                              <AppButton primary>
                                   <AiOutlineArrowRight size={24} />
                              </AppButton>
                         </div>
                         <div className="flex gap-1 text-sm">
                              Uploaded by
                              <p className="text-gray-500 capitalize">{admin}</p>
                         </div>
                    </div>
               </Link>
          </div>
     );
};
