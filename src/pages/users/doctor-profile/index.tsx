import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../layout";
import { useParams } from "react-router-dom";
import {
     useAddCommentsToDoctorProfileMutation,
     useDeleteCommentByUserIdMutation,
     useGetCommentsByDoctorIdQuery,
     useGetDoctorByIdMutation,
     useProfileAccountQuery,
} from "../../../app/apis";
import { toast } from "react-toastify";
import { AiOutlineComment, AiOutlineDelete, AiOutlineLoading } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsCameraVideo } from "react-icons/bs";
import { AppButton, AppInput } from "../../../component";
import moment from "moment";

export const DoctorProfilePage = () => {
     const [comment, setComment] = useState<string>("");
     const { doctorId } = useParams();
     const [Doctor, { data: doctorData, isError: isDoctorError, isLoading: isDoctorLoading, error: doctorDataError }] =
          useGetDoctorByIdMutation();
     const { data: profile } = useProfileAccountQuery();
     const [
          CreateComment,
          {
               data: createCommentData,
               isError: isCreateCommentError,
               error: createCommentError,
               isLoading: isCreateCommentLoading,
          },
     ] = useAddCommentsToDoctorProfileMutation();
     const {
          data: comments,
          isError: isCommentError,
          error: commentError,
          isLoading: isCommentLoading,
          isSuccess: isCommentSuccess,
     } = useGetCommentsByDoctorIdQuery(doctorId as string);
     const [
          DeleteComment,
          {
               data: deleteComment,
               isError: isDeleteError,
               isSuccess: isDeleteSuccess,
               isLoading: isDeleteLoading,
               error: deleteError,
          },
     ] = useDeleteCommentByUserIdMutation();

     useEffect(() => {
          if (doctorId) {
               (async () => {
                    Doctor(doctorId as string);
               })();
          }

          if (isDoctorError) {
               if ((doctorDataError as any).data) {
                    toast.error((doctorDataError as any).data.message);
               } else {
                    toast.error((doctorDataError as any).message);
               }
          }

          if (isCommentError) {
               if ((commentError as any).data) {
                    console.log((commentError as any).data.message);
                    toast.error((commentError as any).data.message);
               } else {
                    console.log((commentError as any).message);
                    toast.error((commentError as any).message);
               }
          }
          if (isCreateCommentError) {
               if ((createCommentError as any).data) {
                    toast.error((createCommentError as any).data.message);
               } else {
                    toast.error((createCommentError as any).message);
               }
          }
          if (isDeleteError) {
               if ((deleteError as any).data) {
                    toast.error((deleteError as any).data.message);
               } else {
                    toast.error((deleteError as any).message);
               }
          }
          if (isCommentSuccess) {
               toast.success(createCommentData?.data);
          }
          if (isDeleteSuccess) {
               toast.success(deleteComment.data);
          }
     }, [
          Doctor,
          commentError,
          createCommentData,
          createCommentError,
          deleteComment,
          deleteError,
          doctorDataError,
          doctorId,
          isCommentError,
          isCommentSuccess,
          isCreateCommentError,
          isDeleteError,
          isDeleteSuccess,
          isDoctorError,
     ]);

     const NewComment = async () => {
          if (!comment) {
               toast.error("please enter some comment");
          } else {
               await CreateComment({
                    body: { desc: comment },
                    doctorId: doctorId as string,
                    userId: profile?.data._id as string,
               });
               setComment("");
          }
     };

     const DeletingComment = async () => {
          await DeleteComment({
               doctorId: doctorData?.data._id,
               userId: profile?.data._id,
          });
     };

     return (
          <MainLayout mode="navigation">
               {!isDoctorLoading && (
                    <div className="container mx-auto p-3 my-5 rounded-lg">
                         <div className="flex items-center gap-5 my-10">
                              <BiArrowBack size={30} />
                              <p className="capitalize text-xl">
                                   Mentor {doctorData?.data?.name?.firstName} {doctorData?.data?.name?.lastName}
                              </p>
                         </div>
                         <div className="flex items-center gap-5">
                              <img
                                   src="https://www.pngitem.com/pimgs/m/111-1115620_transparent-medical-doctor-png-indian-doctor-images-png.png"
                                   alt={doctorData?.data?.name?.firstName}
                                   className="w-[20%] rounded-lg"
                              />
                              <div className="flex-1">
                                   <h5 className="text-3xl capitalize">
                                        {doctorData?.data?.name?.firstName} {doctorData?.data?.name?.lastName}
                                   </h5>
                                   <p className="my-3 capitalize text-xl">
                                        <span className="underline">Providing service at</span>{" "}
                                        {doctorData?.data?.workDetails?.hospital?.name}
                                   </p>
                                   <address>{doctorData?.data?.workDetails?.hospital?.address}</address>
                                   <div className="my-2">
                                        <p className="text-gray-500 capitalize">
                                             {doctorData?.data?.workDetails?.hospital?.specialization.join(", ")}
                                        </p>
                                   </div>
                                   <hr />
                                   <div className="flex items-center my-5 justify-start gap-10">
                                        <div className="flex items-center gap-3">
                                             <AiOutlineComment size={50} className="fill-secondary-500" />
                                             <p className="uppercase">10 Comments</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                             <BsCameraVideo size={50} className="fill-secondary-500" />
                                             <p className="uppercase">50 Conference</p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="w-[60%] my-10 pl-12 border-l-2 border-secondary-500">
                              {!isCommentLoading && comments?.data?.length !== 0 && (
                                   <div className="flex flex-col gap-10">
                                        {comments?.data.map(({ body, userId, createdAt, _id }) => (
                                             <div
                                                  key={_id}
                                                  className="flex justify-between p-3 flex-col bg-gray-50 rounded-lg gap-3"
                                             >
                                                  <div className="flex items-center justify-between">
                                                       <p className="capitalize text-xl">
                                                            {userId.name.firstName} {userId.name.lastName}
                                                       </p>
                                                       <button type="button" onClick={DeletingComment}>
                                                            <AiOutlineDelete size={22} className="hover:fill-red-500" />
                                                       </button>{" "}
                                                  </div>
                                                  <p className="text-gray-500 text-md">- {body.desc}</p>
                                                  <p className="text-right font-mono text-sm">
                                                       {moment(createdAt).startOf("minutes").fromNow()}
                                                  </p>
                                             </div>
                                        ))}
                                   </div>
                              )}
                              {comments?.data.length === 0 && (
                                   <div className="text-gray-500 border p-5 rounded-lg">
                                        Be the first to comment on{" "}
                                        <span className="capitalize">
                                             {doctorData?.data?.name?.firstName} {doctorData?.data?.name?.lastName}
                                        </span>
                                        's profile
                                   </div>
                              )}
                              {isCreateCommentLoading && (
                                   <div className="text-center flex flex-col gap-5 justify-center items-center my-10">
                                        <AiOutlineLoading size={100} className="fill-secondary-500 animate-spin" />
                                        Posting comment
                                   </div>
                              )}
                              {!isCreateCommentLoading && (
                                   <div className="flex items-center gap-5 mt-5">
                                        <AppInput
                                             value={comment}
                                             onChange={(e) => setComment(e.target.value)}
                                             placeholder="What do you think about this mentor?"
                                        />
                                        <div>
                                             <AppButton onClick={NewComment} outlinedSecondary>
                                                  <div className="flex items-center gap-3">
                                                       <AiOutlineComment size={26} />
                                                       Post
                                                  </div>
                                             </AppButton>
                                        </div>
                                   </div>
                              )}
                         </div>
                    </div>
               )}
               {isDoctorLoading && (
                    <div className="text-center flex flex-col gap-5 justify-center items-center my-10">
                         <AiOutlineLoading size={100} className="fill-secondary-500 animate-spin" />
                         <p>Profile is Loading Please wait...</p>
                    </div>
               )}
          </MainLayout>
     );
};
