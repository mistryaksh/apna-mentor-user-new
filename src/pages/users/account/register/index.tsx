import React, { useCallback, useEffect } from "react";
import { MainLayout } from "../../../../layout";
import { Formik } from "formik";
import { RegisterInitialValues, RegisterValidationSchema } from "../../../../validation";
import { RegisterProps } from "../../../../interface";
import { AppButton, AppInput } from "../../../../component";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterToAccountMutation, useSendVerificationNumberMutation } from "../../../../app/apis";
import { toast } from "react-toastify";

export const RegisterPage = () => {
     const [RegisterUserAccount, { data, isError, error, isLoading, isSuccess }] = useRegisterToAccountMutation();
     const [SendCodeToNumber, { data: sendCodeData, isError: isSendError, error: sendError, isSuccess: sendSuccess }] =
          useSendVerificationNumberMutation();
     const navigate = useNavigate();
     const handleSubmit = useCallback(
          async ({ email, mobile, firstName, lastName, password }: RegisterProps) => {
               await RegisterUserAccount({ email, mobile, firstName, lastName, password });
          },
          [RegisterUserAccount]
     );

     useEffect(() => {
          (async () => {
               if (isError) {
                    if ((error as any).data) {
                         toast.error((error as any)?.data.message);
                    } else {
                         toast.error((error as any)?.message);
                    }
               }
               if (isSuccess) {
                    SendCodeToNumber(data.data.mobile);
                    navigate(`/verify/mobile/${data.data.mobile}`, { replace: true });
               }
               if (isSendError) {
                    if ((error as any).data) {
                         toast.error((error as any)?.data.message);
                    } else {
                         toast.error((error as any)?.message);
                    }
               }
               if (sendSuccess) {
                    toast.success("OTP has been sent to your number");
               }
          })();
     }, [isError, error, isSuccess, navigate, data, isSendError, sendError, sendSuccess]);

     return (
          <MainLayout mode="full">
               <div className="flex justify-center items-center h-screen bg-gradient-to-t from-primary-50 to-indigo-50">
                    <div className="p-6 shadow-xl rounded-lg border bg-white">
                         <h6 className="text-2xl xl:text-4xl"> Sign up to apna mentor</h6>
                         <Formik
                              initialValues={RegisterInitialValues}
                              validationSchema={RegisterValidationSchema}
                              onSubmit={handleSubmit}
                         >
                              {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                                   <form onSubmit={handleSubmit}>
                                        <div className="flex flex-col gap-5 mt-5">
                                             <div className="flex gap-5 flex-wrap">
                                                  <AppInput
                                                       label="First name"
                                                       placeholder="First name"
                                                       touched={touched?.firstName as boolean}
                                                       error={errors?.firstName as string}
                                                       value={values.firstName}
                                                       onChange={handleChange("firstName")}
                                                       onBlur={handleBlur("firstName")}
                                                  />
                                                  <AppInput
                                                       label="Last name"
                                                       placeholder="Last name"
                                                       touched={touched.lastName as boolean}
                                                       error={errors?.lastName as string}
                                                       value={values.lastName}
                                                       onChange={handleChange("lastName")}
                                                       onBlur={handleBlur("lastName")}
                                                  />
                                             </div>
                                             <div className="flex gap-5 flex-wrap">
                                                  <AppInput
                                                       label="Email address"
                                                       touched={touched.email as boolean}
                                                       error={errors?.email as string}
                                                       value={values.email}
                                                       onChange={handleChange("email")}
                                                       onBlur={handleBlur("email")}
                                                       placeholder="Email address"
                                                  />
                                                  <AppInput
                                                       label="Mobile number"
                                                       touched={touched.mobile as boolean}
                                                       error={errors?.mobile as string}
                                                       value={values.mobile}
                                                       onChange={handleChange("mobile")}
                                                       onBlur={handleBlur("mobile")}
                                                       placeholder="Mobile Number"
                                                  />
                                             </div>
                                             <div className="flex gap-5">
                                                  <AppInput
                                                       label="Password"
                                                       placeholder="Password"
                                                       touched={touched.password as boolean}
                                                       error={errors?.password as string}
                                                       value={values.password}
                                                       onChange={handleChange("password")}
                                                       onBlur={handleBlur("password")}
                                                  />
                                             </div>
                                             <div className="w-full flex-wrap-reverse flex justify-end items-center gap-5">
                                                  <p>
                                                       Already have an account?{" "}
                                                       <Link className="text-blue-500" to="/login">
                                                            Sign In
                                                       </Link>
                                                  </p>
                                                  <AppButton disabled={isLoading} primary>
                                                       Sign up
                                                  </AppButton>
                                             </div>
                                             <hr className="my-5" />
                                             <Link to="/">Go back to home</Link>
                                        </div>
                                   </form>
                              )}
                         </Formik>
                    </div>
               </div>
          </MainLayout>
     );
};
