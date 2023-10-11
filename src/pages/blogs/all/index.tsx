import React, { useState } from "react";
import { MainLayout } from "../../../layout";
import { useGetAllBlogsQuery } from "../../../app/apis/blogs.api";
import { AppButton, BlogCard } from "../../../component";
export const BlogsPage = () => {
     const { data: blog } = useGetAllBlogsQuery();
     const [sliced, setSliced] = useState<number>(8);
     const LoadMore = () => {
          setSliced(sliced + 6);
     };
     return (
          <MainLayout mode="navigation">
               <div className="flex- flex flex-col justify-start pt-10">
                    <label
                         htmlFor="features"
                         className="text-primary-500 text-center font-semibold uppercase font-montserrat"
                    >
                         blogs
                    </label>
                    <h5 className="xl:text-4xl lg:text-4xl text-2xl text-center">Read what we have written for you</h5>
                    <p className="text-center text-gray-500 px-20">
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ipsa!
                    </p>
               </div>
               <div className="grid grid-cols-12 gap-10 container mx-auto py-20">
                    {blog?.data.slice(0, sliced + sliced).map(({ body, image, label, _id }) => (
                         <div
                              key={_id}
                              className="col-span-12 xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12"
                         >
                              <BlogCard _id={_id as string} key={_id} body={body} image={image} label={label} />
                         </div>
                    ))}
               </div>
               {blog?.data.length && (
                    <div className="flex pb-20 justify-center">
                         <div>
                              <AppButton primary onClick={LoadMore}>
                                   Load more
                              </AppButton>
                         </div>
                    </div>
               )}
          </MainLayout>
     );
};
