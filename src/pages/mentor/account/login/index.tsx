import { Formik } from "formik";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMentorLoginMutation } from "../../../../app/apis";
import { useAppDispatch } from "../../../../app/";
import { MentorLoginState } from "../../../../app/features";
import { IMentorLoginProps } from "../../../../interface";
import { MentorLoginInitialState, MentorLoginValidationSchema } from "../../../../validation";
import { AppButton, AppInput } from "../../../../component";

export const MentorLogin = () => {
     const [LoginToAccount, { isError, isLoading, isSuccess, data, error }] = useMentorLoginMutation();
     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     useEffect(() => {
          if (isError) {
               if ((error as any).data) {
                    toast.error((error as any).data.message);
               } else {
                    toast.error((error as any).message);
               }
          }
          if (isSuccess) {
               toast.success(data.data.message);
               dispatch(MentorLoginState(data.data));
               navigate("/mentor/home", { replace: true });
          }
     }, [isError, error, isSuccess, data, navigate, dispatch]);

     const handleSubmit = async ({ password, username }: IMentorLoginProps) => {
          await LoginToAccount({ password, username });
     };
     return (
          <div className="h-screen flex items-center justify-center">
               <div className="w-[50%] p-5 shadow-lg rounded-lg">
                    <h6 className="text-xl capitalize mb-5">Hey! mentor please enter your details</h6>
                    <Formik
                         initialValues={MentorLoginInitialState}
                         onSubmit={handleSubmit}
                         validationSchema={MentorLoginValidationSchema}
                    >
                         {({ handleBlur, handleChange, handleSubmit, values, touched, errors }) => (
                              <form onSubmit={handleSubmit}>
                                   <div className="flex flex-col gap-5">
                                        <AppInput
                                             label="Your username"
                                             placeholder="karl123"
                                             value={values.username}
                                             touched={touched.username}
                                             error={errors.username}
                                             onBlur={handleBlur("username")}
                                             onChange={handleChange("username")}
                                        />
                                        <AppInput
                                             label="Password"
                                             placeholder="******"
                                             value={values.password}
                                             touched={touched.password}
                                             error={errors.password}
                                             onBlur={handleBlur("password")}
                                             onChange={handleChange("password")}
                                        />
                                        <div className="flex items-center gap-3 justify-end">
                                             <p className="text-blue-500">
                                                  <Link to="/some-link">Want to apply as mentor?</Link>
                                             </p>
                                             <div>
                                                  <AppButton loading={isLoading} type="submit" secondary>
                                                       Continue
                                                  </AppButton>
                                             </div>
                                        </div>
                                   </div>
                              </form>
                         )}
                    </Formik>
                    <hr className="my-5" />
                    <div className="text-center mt-5">
                         <Link to="/" className="text-center capitalize">
                              back to home
                         </Link>
                    </div>
               </div>
          </div>
     );
};
