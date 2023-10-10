import React, { useEffect } from "react";
import { MainLayout } from "../../../layout";
import { AppButton } from "../../../component";
import { Link, useNavigate } from "react-router-dom";
import { GetLocalToken } from "../../../utils";
import { useAppDispatch } from "../../../app/";
import { UserLogoutState } from "../../../app/features";

export const TokenError = () => {
     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const token = GetLocalToken;

     useEffect(() => {
          dispatch(UserLogoutState());
     }, [token, dispatch]);

     return (
          <MainLayout>
               <div className="flex flex-col gap-3 h-screen w-screen justify-center items-center">
                    <h1 className="text-4xl">
                         <span className="text-primary-500">400</span> (Bad Request)
                    </h1>
                    Something went wrong! please login again to continue
                    <div className="flex gap-3 items-center">
                         <AppButton onClick={() => navigate("/login")} primary type="button">
                              Login
                         </AppButton>
                         <Link to="/" className="text-blue-500">
                              Go back to homepage
                         </Link>
                    </div>
               </div>
          </MainLayout>
     );
};
