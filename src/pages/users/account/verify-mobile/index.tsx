import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../../layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import OTPInput from "react-otp-input";
import { AppButton } from "../../../../component";
import { useVerifyMobileNumberUserMutation } from "../../../../app/apis";
import { toast } from "react-toastify";

export const VerifyMobilePage = () => {
     const { mobile } = useParams();
     const [otpInput, setOtpInput] = useState<string>();
     const [VerifyNow, { data, isError, isLoading, isSuccess, error }] = useVerifyMobileNumberUserMutation();
     const navigate = useNavigate();

     useEffect(() => {
          if (isError) {
               if ((error as any)?.data) {
                    toast.error((error as any).data.message);
               } else {
                    toast.error((error as any).message);
               }
          }
          if (isSuccess) {
               toast.success("your account is successfully registered! please login");
               navigate("/login", { replace: true });
          }
     }, [isError, error, isSuccess, navigate]);

     const VerifyMobile = async () => {
          if (!otpInput) {
               toast.error("please enter otp first");
          }
          await VerifyNow({ code: otpInput as string, mobile: mobile as string });
     };

     return (
          <MainLayout mode="full">
               <div className="h-screen flex justify-center items-center">
                    <div className="xl:w-[60%] xl:h-[50%] flex justify-between p-3 border xl:p-6 lg:p-6 flex-col gap-4 rounded-lg">
                         <label htmlFor="verify" className="text-gray-500 text-2xl">
                              Verify your {mobile} number to continue
                         </label>
                         <OTPInput
                              numInputs={6}
                              inputStyle={{ height: 50, width: 50 }}
                              value={otpInput}
                              inputType="password"
                              onChange={(e) => setOtpInput(e)}
                              containerStyle={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}
                              renderInput={({ ...rest }) => (
                                   <input
                                        {...rest}
                                        className="rounded-lg focus:outline-none focus:border-primary-500 border flex justify-center items-center text-xl text-primary-500"
                                   />
                              )}
                         />
                         <p>Resend In : 30s</p>
                         <div className="flex justify-end items-center gap-5">
                              <div>
                                   <AppButton loading={isLoading} onClick={VerifyMobile} type="submit" primary>
                                        Verify
                                   </AppButton>
                              </div>
                              <Link to="/login">Skip for now</Link>
                         </div>
                    </div>
               </div>
          </MainLayout>
     );
};
