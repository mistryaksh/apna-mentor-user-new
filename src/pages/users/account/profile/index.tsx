import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { useProfileAccountQuery } from "../../../../app/apis";
import { MainLayout } from "../../../../layout";
import { ProfileValidationSchema } from "../../../../validation";
import { AppButton, AppInput } from "../../../../component";

export const MyProfilePage = () => {
     const { isLoading, data: profile } = useProfileAccountQuery();
     const updateProfile = (e: any) => {
          console.log(e);
     };
     return (
          <MainLayout mode="navigation">
               <div className="py-20 flex-wrap flex justify-center items-center">
                    {isLoading ? (
                         <div>Loading...</div>
                    ) : (
                         <div className="xl:w-[60%] w-full mx-auto border p-3 rounded-lg shadow-lg">
                              <h6 className="capitalize text-2xl">
                                   Profile {profile?.data.name.firstName} {profile?.data.name.lastName}
                              </h6>
                              <Formik
                                   enableReinitialize
                                   onSubmit={updateProfile}
                                   initialValues={{
                                        name: {
                                             firstName: profile?.data.name.firstName || "",
                                             lastName: profile?.data.name.lastName || "",
                                        },
                                        email: profile?.data.email || "",
                                        mobile: profile?.data.mobile || "",
                                   }}
                                   validationSchema={ProfileValidationSchema}
                              >
                                   {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
                                        <form onSubmit={handleSubmit}>
                                             <div className="flex gap-5 flex-col">
                                                  <div className="flex gap-5 flex-wrap">
                                                       <AppInput
                                                            touched={touched.name?.firstName}
                                                            onChange={handleChange("name.firstName")}
                                                            onBlur={handleBlur("name.firstName")}
                                                            error={errors.name?.firstName}
                                                            value={values.name?.firstName}
                                                            label="First name"
                                                       />
                                                       <AppInput
                                                            touched={touched.name?.lastName}
                                                            onChange={handleChange("name.lastName")}
                                                            onBlur={handleBlur("name.lastName")}
                                                            error={errors.name?.lastName}
                                                            value={values.name?.lastName}
                                                            label="Last name"
                                                       />
                                                  </div>
                                                  <div>
                                                       <AppInput label="Email address" value={values.email} />
                                                  </div>
                                                  <div>
                                                       <AppInput label="Mobile Number" value={values.mobile} />
                                                  </div>
                                                  <div>
                                                       <AppInput
                                                            label="Registered since"
                                                            value={moment(profile?.data.createdAt).format(
                                                                 "DD/MM/YYYY HH:MM A"
                                                            )}
                                                            disabled
                                                            readOnly
                                                       />
                                                  </div>
                                                  <div className="flex justify-end items-center gap-3">
                                                       <div>
                                                            <Link to="/reset-password" className="text-blue-500">
                                                                 Reset password?
                                                            </Link>
                                                       </div>
                                                       <div>
                                                            <AppButton type="submit" primary>
                                                                 Update details
                                                            </AppButton>
                                                       </div>
                                                  </div>
                                             </div>
                                        </form>
                                   )}
                              </Formik>
                         </div>
                    )}
               </div>
          </MainLayout>
     );
};
