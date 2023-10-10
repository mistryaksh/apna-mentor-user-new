import React, { useCallback, useEffect } from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { useAppDispatch } from "../../../../app/";
import { useLoginToAccountMutation } from "../../../../app/apis";
import { LoginProps } from "../../../../interface";
import { MainLayout } from "../../../../layout";
import { UserLoggedInState } from "../../../../app/features";
import { LoginValidationSchema, initialLoginValues } from "../../../../validation";

export const LoginPage = () => {
     const dispatch = useAppDispatch();
     const [
          LoginToAccount,
          {
               data: loginSuccess,
               isError: isLoginError,
               isLoading: isLoginLoading,
               isSuccess: isLoginSuccess,
               error: loginError,
          },
     ] = useLoginToAccountMutation();
     const navigate = useNavigate();

     const handleSubmit = useCallback(
          async (e: LoginProps) => {
               await LoginToAccount(e);
          },
          [LoginToAccount]
     );

     useEffect(() => {
          if (isLoginError) {
               if ((loginError as any).data) {
                    toast.error((loginError as any).data.message);
               }
          }
          if (isLoginSuccess) {
               toast.success("Logged In Successfully");
               dispatch(UserLoggedInState(loginSuccess?.data));
               navigate("/", { replace: true });
          }
     }, [isLoginError, loginError, isLoginSuccess, loginSuccess, navigate, dispatch]);

     return (
          <MainLayout mode="full">
               <div className="flex h-screen mx-auto justify-center items-center ">
                    <div className="xl:w-[50%] lg:w-[60%] md:w-[60%] px-5 py-10 bg-gray-100 rounded-lg shadow-lg flex flex-col justify-center">
                         <h6 className="text-3xl">Login to your account</h6>
                         <Formik
                              initialValues={initialLoginValues}
                              validationSchema={LoginValidationSchema}
                              onSubmit={handleSubmit}
                         >
                              {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                                   <form onSubmit={handleSubmit}>
                                        <div className="flex flex-col gap-3 mt-10">
                                             <div className="flex flex-col">
                                                  <label className="text-gray-500 text-sm" htmlFor="mobile">
                                                       Mobile Number
                                                  </label>
                                                  <input
                                                       type="number"
                                                       placeholder="1234567890"
                                                       className="appearance-none px-5 py-2 border focus:outline-none rounded-lg focus:border-primary-500"
                                                       value={values.mobile}
                                                       onChange={handleChange("mobile")}
                                                       onBlur={handleBlur("mobile")}
                                                  />
                                                  {touched.mobile && (
                                                       <p className="text-xs text-rose-500 text-right">
                                                            {errors.mobile}
                                                       </p>
                                                  )}
                                             </div>
                                             <div className="flex flex-col">
                                                  <label htmlFor="mobile" className="text-gray-500 text-sm">
                                                       Password
                                                  </label>
                                                  <input
                                                       type="password"
                                                       placeholder="1234567890"
                                                       className="appearance-none px-5 py-2 border focus:outline-none rounded-lg focus:border-primary-500"
                                                       value={values.password}
                                                       onChange={handleChange("password")}
                                                       onBlur={handleBlur("password")}
                                                  />
                                                  {touched.password && (
                                                       <p className="text-xs text-rose-500 text-right">
                                                            {errors.password}
                                                       </p>
                                                  )}
                                             </div>
                                             <div className="flex justify-between items-center">
                                                  <Link to="/register">
                                                       <span className="text-blue-500">Forgot Password?</span>
                                                  </Link>
                                                  <button
                                                       type="submit"
                                                       disabled={isLoginLoading}
                                                       className="px-10 py-2 disabled:bg-gray-300 bg-primary-500 rounded-md"
                                                  >
                                                       {isLoginLoading ? (
                                                            <span>
                                                                 <AiOutlineLoading size={22} className="animate-spin" />
                                                            </span>
                                                       ) : (
                                                            <span className="text-white">Continue</span>
                                                       )}
                                                  </button>
                                             </div>
                                             <hr className="mt-5" />
                                             <div className="">
                                                  <p className="capitalize text-center text-gray-500">
                                                       not have an account?{" "}
                                                       <Link to="/register">
                                                            <span className="text-blue-500">Sign up</span>
                                                       </Link>
                                                  </p>
                                             </div>
                                             <hr className="mt-5" />
                                             <div className="flex justify-center items-center gap-5 flex-wrap">
                                                  <p className="text-sm text-blue-500">
                                                       <Link to="/mentor/login">i am mentor</Link>
                                                  </p>
                                                  <p className="text-sm text-blue-500">My data with Apna mentor</p>
                                                  <p className="text-sm text-blue-500">Terms & Conditions</p>
                                                  <p className="text-sm text-blue-500">Privacy Policy</p>
                                             </div>
                                        </div>
                                   </form>
                              )}
                         </Formik>
                    </div>
               </div>
          </MainLayout>
     );
};
