import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetDoctorByIdMutation, useProfileAccountQuery } from "../../../../app/apis";
import { MainLayout } from "../../../../layout";
import { v4 as uuId } from "uuid";
import { AppButton } from "../../../../component";

export const ChatOnBoardPage = () => {
     const [accept, setAccept] = useState<boolean>(false);
     const [GetDoctor, { data, isLoading }] = useGetDoctorByIdMutation();
     const { doctorId } = useParams();
     const { data: user } = useProfileAccountQuery();
     const navigate = useNavigate();
     const userId = user?.data._id;
     const uuid = uuId();
     useEffect(() => {
          if (doctorId) {
               (async () => {
                    await GetDoctor(doctorId);
               })();
          }
     }, [doctorId, GetDoctor]);

     const handleAccept = () => setAccept(!accept);

     const onContinue = () => {
          setAccept(!accept);
          navigate(`/chat/${uuid}/${userId}/${doctorId}`);
     };

     return (
          <MainLayout mode="navigation">
               <div className="my-20">
                    {!isLoading && (
                         <div className="container mx-auto xl:w-[60%] ">
                              <div className="py-5 bg-primary-100 px-3 rounded-t-lg">
                                   <h1 className="text-2xl">
                                        Consult with Mentor {data?.data?.name?.firstName} {data?.data?.name?.lastName}
                                   </h1>
                                   <h6 className="text-xl font-roboto capitalize">
                                        Please start chat by accepting following user & mentor agreement
                                   </h6>
                              </div>
                              <div className="h-[400px] overflow-scroll mx-auto my-5 bg-white">
                                   <p className="whitespace-pre-wrap text-gray-500 px-3">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quibusdam
                                        voluptates ea fuga? Cupiditate praesentium ratione ipsam? Pariatur, obcaecati
                                        unde.
                                        {"\n"}
                                        {"\n"}
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae minima modi
                                        maxime neque ipsum fugiat quia eaque consequuntur sit saepe est natus similique
                                        et tempore dolore assumenda numquam eos suscipit, necessitatibus quod? Dolorem,
                                        voluptates facere deleniti doloremque, magni voluptatem in nostrum aspernatur
                                        neque modi illo. Quo voluptate temporibus placeat officia.
                                        {"\n"}
                                        {"\n"}
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quam
                                        voluptas! Dolores, aperiam labore! Reprehenderit iusto odio nisi aliquid maiores
                                        aliquam exercitationem cupiditate consequuntur inventore quis minima nostrum
                                        mollitia qui, quasi nesciunt provident dolor? Cumque voluptatem eaque error
                                        laborum, voluptate molestias quod obcaecati! Cupiditate consequuntur nam
                                        explicabo sequi, facere aliquid.
                                        {"\n"}
                                        {"\n"}
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo aliquid aliquam,
                                        ducimus recusandae dolore ipsam sapiente quaerat inventore autem porro, rerum
                                        nihil maxime hic quidem. Quibusdam quo sint, dolor sequi iusto in atque facilis
                                        nostrum incidunt autem dolores minima neque harum dolorem delectus assumenda
                                        officiis saepe voluptatum accusamus soluta porro fugiat vel? Nesciunt rem
                                        deleniti hic fugit, animi temporibus consequuntur?
                                        {"\n"}
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam earum debitis
                                        autem cumque harum accusantium. Culpa odio mollitia enim ratione impedit ipsum
                                        ipsam, quia laudantium molestiae praesentium sint provident ex et inventore
                                        voluptatum eius possimus veritatis quaerat, optio eligendi ullam totam. Alias
                                        earum laborum ab accusamus et, non nostrum fugiat, quas maiores delectus,
                                        architecto distinctio? Ad quis exercitationem doloribus excepturi.
                                   </p>
                              </div>
                              <div className="py-5 px-3 bg-primary-100 rounded-b-lg">
                                   <div className="flex items-center">
                                        <input
                                             id="disabled-checkbox"
                                             type="checkbox"
                                             value={accept as any}
                                             onChange={handleAccept}
                                             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checked:bg-red-500"
                                        />
                                        <label
                                             htmlFor="disabled-checkbox"
                                             className="ml-2 text-sm select-none font-medium text-gray-400 dark:text-gray-500"
                                        >
                                             I agree to the Terms and Conditions" or "I agree to the Privacy Policy
                                             until the call ends.
                                        </label>
                                   </div>
                              </div>
                              {accept && (
                                   <div className="flex justify-end items-center gap-5 my-5">
                                        <div>
                                             <Link to="/">Back to home</Link>
                                        </div>
                                        <div>
                                             <AppButton onClick={onContinue} primary>
                                                  Continue
                                             </AppButton>
                                        </div>
                                   </div>
                              )}
                         </div>
                    )}
                    {isLoading && <div>Please wait...</div>}
               </div>
          </MainLayout>
     );
};
