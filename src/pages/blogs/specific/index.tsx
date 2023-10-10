import React, { useEffect } from "react";
import { MainLayout } from "../../../layout";
import { Link, useParams } from "react-router-dom";
import { useGetSpecificBlogsMutation } from "../../../app/apis/blogs.api";
import { toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineHeart, AiOutlineLoading, AiOutlineShareAlt } from "react-icons/ai";
import moment from "moment";

export const BlogDetailsPage = () => {
     const { blogId } = useParams();
     const [BlogDetails, { data, isLoading, error, isError }] = useGetSpecificBlogsMutation();

     useEffect(() => {
          if (isError) {
               if ((error as any).data) {
                    toast.error((error as any).data.message);
               } else {
                    toast.error((error as any).message);
               }
          }
          (async () => {
               await BlogDetails(blogId as string);
          })();
     }, [isError, error, BlogDetails, blogId]);

     return (
          <MainLayout mode="navigation">
               <Link to="/">
                    <div className="flex group items-center container mx-auto my-10 gap-5">
                         <IoMdArrowBack size={30} />{" "}
                         <h6 className="capitalize group-hover:text-secondary-500">Go back</h6>
                    </div>
               </Link>
               {!isLoading && (
                    <div>
                         <div className="w-[60%] p-3 container mx-auto">
                              <img src={data?.data.image} className="rounded-lg w-full" alt="" />
                         </div>
                         <div className="container w-[60%] mx-auto">
                              <h3 className="text-3xl">{data?.data?.label}</h3>
                              <p className="flex gap-2 mt-3">
                                   <AiOutlineHeart size={20} />
                                   <span className="text-gray-500">15k likes</span>
                              </p>
                              <p className="text-gray-500 capitalize my-3 text-sm">
                                   Uploaded by {data?.data?.adminId?.name?.firstName}{" "}
                                   {data?.data?.adminId?.name?.lastName} | Uploaded{" "}
                                   {moment(data?.data?.createdAt).startOf("day").fromNow()}
                              </p>
                              <p className="text-gray-500" dangerouslySetInnerHTML={{ __html: data?.data?.body }} />
                              <div className="flex gap-5 my-3 justify-end">
                                   <button className="px-5 py-2 rounded-lg bg-gray-100">
                                        <AiOutlineHeart size={24} />
                                   </button>
                                   <button className="px-5 py-2 rounded-lg bg-gray-100">
                                        <AiOutlineShareAlt size={24} />
                                   </button>
                              </div>
                         </div>
                    </div>
               )}

               {isLoading && (
                    <div className="flex flex-col justify-center items-center my-10">
                         <AiOutlineLoading size={150} className="animate-spin fill-primary-500" />
                         <p className="text-gray-500 mt-5 capitalize">Loading blog please wait</p>
                    </div>
               )}
          </MainLayout>
     );
};
