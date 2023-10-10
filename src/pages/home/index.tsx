import React, { useEffect } from "react";
import { MainLayout } from "../../layout";
import { AppButton, AppInput, BlogCard, DoctorCard } from "../../component";
import { useGetTopDoctorsListQuery, useProfileAccountQuery } from "../../app/apis";
import { useGetAllBlogsQuery } from "../../app/apis/blogs.api";
import { useNavigate } from "react-router-dom";
import { Labeled } from "../../component/ui";
import { handleActiveFaq, useLayoutSlice } from "../../app/features";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "../../app/";

export const Homepage = () => {
     const { data: topDoctors, isError, error, isLoading } = useGetTopDoctorsListQuery();
     const { data: blog } = useGetAllBlogsQuery();
     const navigate = useNavigate();
     const { faqs, activeFaq } = useLayoutSlice();
     const dispatch = useAppDispatch();

     const { data } = useProfileAccountQuery();
     useEffect(() => {
          if (isError) {
               console.log(error);
          }
     }, [isError, error]);

     return (
          <MainLayout loading={isLoading} mode="navigation">
               <div className="container mx-auto py-10 gap-5 p-4">
                    <div className="grid grid-cols-12 items-center">
                         <div className="col-span-12 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 flex flex-col items-start gap-5">
                              <Labeled>Best mentorship consultant in the country</Labeled>
                              <h1 className="text-5xl capitalize font-semibold leading-[4.5rem]">
                                   Assisting your mental health with our best services
                              </h1>
                              <p className="text-gray-500">
                                   We experienced in psychology consultation for a couple of decades with our services
                                   we believe we can achieve better for your mental.
                              </p>
                              <AppButton onClick={() => navigate("/login")} primary>
                                   Book consultation now
                              </AppButton>
                         </div>
                         <div className="col-span-12 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 ">
                              <img
                                   src="https://images.pexels.com/photos/9064729/pexels-photo-9064729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                   alt=""
                                   className="w-full h-[550px] rounded-lg resize-none object-cover object-top"
                              />
                         </div>
                    </div>
               </div>
               <div className="container mx-auto p-3 xl:w-[70%]">
                    <h6 className="text-center text-3xl">
                         <span className="text-primary-500">Apna</span>{" "}
                         <span className="text-secondary-500">mentor</span> has experienced in mentorship, mentoring
                         health assistance, and healing a lot of people
                    </h6>
                    <div className="flex gap-5 divide-x-2 justify-center my-20">
                         <div className="px-3 flex-1 flex flex-col items-center gap-3">
                              <h6 className="text-4xl text-center font-semibold text-primary-500">6700+</h6>
                              <p className="text-xl text-center capitalize text-gray-500">Users registered</p>
                         </div>
                         <div className="px-3 flex-1 flex flex-col items-center gap-3">
                              <h6 className="text-4xl text-center font-semibold text-primary-500">27+</h6>
                              <p className="text-xl text-center capitalize text-gray-500">Years of experience</p>
                         </div>
                         <div className="px-3 flex-1 flex flex-col items-center gap-3">
                              <h6 className="text-4xl text-center font-semibold text-primary-500">8521+</h6>
                              <p className="text-xl text-center capitalize text-gray-500">Hours of work</p>
                         </div>
                    </div>
               </div>
               <div className="flex flex-col gap-5 items-center py-20 w-full xl:px-10 px-5">
                    <Labeled>Our top mentors</Labeled>
                    <h6 className="text-3xl">
                         Our best <span className="text-secondary-500">Mentor</span>'s that assist you the best
                    </h6>
                    <div className="grid grid-cols-12 gap-5 w-full py-10">
                         {topDoctors?.data.map(({ doctorId, _id }) => (
                              <DoctorCard
                                   user={data?.data._id as string}
                                   key={_id}
                                   comments={doctorId?.comments?.length as number}
                                   hospital={doctorId.workDetails.hospital}
                                   name={doctorId.name}
                                   id={_id as string}
                                   specialization={doctorId.workDetails.hospital.specialization}
                              />
                         ))}
                    </div>
                    <div>
                         <AppButton outlinedPrimary>Show more</AppButton>
                    </div>
               </div>
               <div className="container mx-auto p-3 mb-20">
                    <div className="flex justify-center">
                         <Labeled>we are here to help you</Labeled>
                    </div>
                    <h6 className="text-4xl text-center">
                         We have the best mentorship service in the country with high and international standard
                    </h6>
                    <div className="grid grid-cols-12 gap-10 py-20 items-center">
                         <div className="col-span-12 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12">
                              <img
                                   src="https://images.pexels.com/photos/4339867/pexels-photo-4339867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                   className="w-full h-[550px] rounded-lg resize-none object-cover object-center"
                                   alt=""
                              />
                         </div>
                         <div className="col-span-12 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12">
                              <div className="flex flex-col gap-10 w-full">
                                   <div className="flex flex-col gap-3 divide-y-2 bg-gray-100 p-5 rounded-lg hover:bg-primary-100">
                                        <h5 className="text-3xl font-semibold capitalize">
                                             online 1 to 1 consultation
                                        </h5>
                                        <p className="text-gray-500 capitalize pt-5">
                                             The best online therapy & counselling experience from the verified
                                             professionals. top therapist for your mentorship
                                        </p>
                                   </div>
                                   <div className="flex flex-col gap-3 divide-y-2 bg-gray-100 p-5 rounded-lg hover:bg-primary-100">
                                        <h5 className="text-3xl font-semibold capitalize">supervision</h5>
                                        <p className="text-gray-500 capitalize pt-5">
                                             supervision is an act or instance of directing, managing or oversight. we
                                             can help get you back on track.
                                        </p>
                                   </div>
                                   <div className="flex flex-col gap-3 divide-y-2 bg-gray-100 p-5 rounded-lg hover:bg-primary-100">
                                        <h5 className="text-3xl font-semibold capitalize">psycho education</h5>
                                        <p className="text-gray-500 capitalize pt-5">
                                             phycho education can include: information given verbally in a therapy
                                             session. written material in the form of phychology tools information
                                             handouts.
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="bg-gray-100 py-10">
                    <div className="container mx-auto p-3">
                         <div className="flex justify-center">
                              <h6 className="text-2xl text-gray-900 font-semibold">Frequently asked questions</h6>
                         </div>
                         <div className="my-10">
                              <div className="grid grid-cols-12 gap-5">
                                   {faqs.map(({ label, desc }, i) => (
                                        <div
                                             className="col-span-12 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12"
                                             key={i}
                                        >
                                             <div
                                                  className="bg-white p-5 rounded-lg"
                                                  onClick={() => dispatch(handleActiveFaq(i))}
                                             >
                                                  <div className="flex justify-between cursor-pointer">
                                                       <label
                                                            htmlFor={label}
                                                            className="capitalize font-semibold text-md"
                                                       >
                                                            {label}
                                                       </label>
                                                       <AiOutlinePlus size={24} />
                                                  </div>

                                                  {activeFaq === i && (
                                                       <div>
                                                            <hr className="my-3" />
                                                            <p>{desc}</p>
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                   ))}
                              </div>
                              <div className="flex justify-center">
                                   <div className="mt-10">
                                        <AppButton outlinedPrimary>Ask another question</AppButton>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="py-20 px-5">
                    <div className="flex justify-center">
                         <Labeled>Read our article</Labeled>
                    </div>
                    <h6 className="text-center text-3xl mt-2">Read our featured articles</h6>
                    <div className="grid grid-cols-12 gap-5 mt-10 w-full">
                         {blog?.data
                              .map(({ label, image, body, _id, adminId }) => (
                                   <div className="col-span-12 xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12">
                                        <BlogCard
                                             label={label}
                                             _id={_id as string}
                                             body={body}
                                             image={image}
                                             key={_id}
                                             admin={`${adminId.name.firstName} ${adminId.name.lastName}`}
                                        />
                                   </div>
                              ))
                              .splice(0, 4)}
                    </div>
               </div>
               <div className="bg-primary-500 py-20">
                    <div className="xl:w-[40%] mx-auto p-3">
                         <h6 className="text-3xl text-white text-center capitalize">Subscribe to our news letter</h6>
                         <p className="text-gray-300">
                              Don't miss the future updates & more consultation ideas from our articles and mentors
                         </p>
                         <AppInput placeholder="Email address" />
                         <div className="flex  justify-end">
                              <div>
                                   <AppButton outlinedPrimary>Subscribe</AppButton>
                              </div>
                         </div>
                    </div>
               </div>
          </MainLayout>
     );
};
