import { FC, ReactNode, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { AppButton, AppNavLink } from "../../component";
import { Transition } from "@headlessui/react";
import {
     UserLogoutState,
     handleNavbar,
     handleToken,
     useAccountSlice,
     useLayoutSlice,
     useVideoChatSlice,
} from "../../app/features";
import { useAppDispatch } from "../../app/";
import { useNavigate } from "react-router-dom";
import { useGenerateTokenMutation, useLogoutToAccountMutation } from "../../app/apis";
import { toast } from "react-toastify";

export interface MainLayoutProps {
     children: ReactNode;
     loading?: boolean;
     mode?: "navigation" | "full";
}

const GeneralMenuData = [
     {
          label: "home",
          path: "/",
     },
     {
          label: "diagnostic",
          path: "/doctors/all",
     },
     {
          label: "article",
          path: "/blogs",
     },

     {
          label: "i am mentor",
          path: "/mentor/login",
     },
     {
          label: "About us",
          path: "/about-us",
     },
];

const UserMenuData = [
     {
          label: "home",
          path: "/",
     },
     {
          label: "diagnostic",
          path: "/doctors/all",
     },
     {
          label: "chats",
          path: "/chats",
     },

     {
          label: "Video calls",
          path: "/user-video-call",
     },
     {
          label: "consultancy",
          path: "/consultancy",
     },
     {
          label: "My Profile",
          path: "/profile",
     },
];

export const MainLayout: FC<MainLayoutProps> = ({ children, loading, mode }) => {
     const { navBar } = useLayoutSlice();
     const { user } = useAccountSlice();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const { token } = useVideoChatSlice();
     const [Logout, { isError, error, isSuccess, data }] = useLogoutToAccountMutation();
     const [GenerateToken, { data: tokenData, isError: isTokenError, error: tokenError, isSuccess: isTokenSuccess }] =
          useGenerateTokenMutation();

     useEffect(() => {
          if (isError) {
               if ((error as any).data) {
                    toast.error((error as any).data.message);
               } else {
                    toast.error((error as any).message);
               }
          }
          if (isSuccess) {
               toast.success(data.data);
               dispatch(UserLogoutState());
               navigate("/", { replace: true });
          }

          if (!token) {
               (async () => {
                    await GenerateToken();
               })();
          }
          if (isTokenError) {
               if ((tokenError as any).data) {
                    toast.error((tokenError as any).data.message);
               } else {
                    toast.error((tokenError as any).message);
               }
          }
          if (isTokenSuccess) {
               dispatch(handleToken(tokenData?.data));
          }
     }, [
          isError,
          error,
          isSuccess,
          data,
          dispatch,
          navigate,
          isTokenError,
          tokenError,
          isTokenSuccess,
          GenerateToken,
          token,
          tokenData,
     ]);

     const onLogout = async () => {
          await Logout();
     };

     return (
          <div>
               {mode !== "full" && (
                    <nav className="bg-white">
                         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                              <div className="flex items-center justify-between h-16">
                                   <div className="flex items-center justify-between w-full gap-5">
                                        <div className="flex-shrink-0">
                                             <h6 className="text-3xl font-semibold">
                                                  <span className="text-primary-500">Apna</span>{" "}
                                                  <span className="text-secondary-500">mentor</span>
                                             </h6>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                             <div className="hidden md:block">
                                                  <div className="flex items-baseline space-x-2">
                                                       {!user.loggedIn &&
                                                            GeneralMenuData.map(({ label, path }, i) => (
                                                                 <AppNavLink label={label} key={i} path={path} />
                                                            ))}
                                                       {user.loggedIn &&
                                                            UserMenuData.map(({ label, path }, i) => (
                                                                 <AppNavLink key={i} label={label} path={path} />
                                                            ))}
                                                       {user.loggedIn && (
                                                            <button
                                                                 type="button"
                                                                 className="text-sm capitalize text-gray-500"
                                                                 onClick={onLogout}
                                                            >
                                                                 sign out
                                                            </button>
                                                       )}
                                                  </div>
                                             </div>
                                             <div className=" mr-2">
                                                  {!user.loggedIn && (
                                                       <div className="flex items-center gap-5">
                                                            <AppButton outlinedPrimary>Contact</AppButton>
                                                            <AppButton onClick={() => navigate("/login")} primary>
                                                                 Login
                                                            </AppButton>
                                                       </div>
                                                  )}
                                                  {user.loggedIn && (
                                                       <div>
                                                            <AppButton onClick={() => navigate("/login")} primary>
                                                                 Settings
                                                            </AppButton>
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                   </div>
                                   <div className="flex md:hidden">
                                        <button
                                             onClick={() => dispatch(handleNavbar())}
                                             type="button"
                                             className="bg-primary-500 inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white"
                                             aria-controls="mobile-menu"
                                             aria-expanded="false"
                                        >
                                             <span className="sr-only">Open main menu</span>
                                             {!navBar ? (
                                                  <svg
                                                       className="block h-6 w-6"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       fill="none"
                                                       viewBox="0 0 24 24"
                                                       stroke="currentColor"
                                                       aria-hidden="true"
                                                  >
                                                       <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 6h16M4 12h16M4 18h16"
                                                       />
                                                  </svg>
                                             ) : (
                                                  <svg
                                                       className="block h-6 w-6"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       fill="none"
                                                       viewBox="0 0 24 24"
                                                       stroke="currentColor"
                                                       aria-hidden="true"
                                                  >
                                                       <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M6 18L18 6M6 6l12 12"
                                                       />
                                                  </svg>
                                             )}
                                        </button>
                                   </div>
                              </div>
                         </div>

                         <Transition
                              show={navBar}
                              enter="transition ease-out duration-100 transform"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="transition ease-in duration-75 transform"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                         >
                              {(ref) => (
                                   <div className="md:hidden" id="mobile-menu">
                                        <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                             <AppNavLink label="Home" path="/" />
                                             <AppNavLink label="Diagnostic" path="/doctors" />
                                             <AppNavLink label="Article" path="/blogs" />
                                             <AppNavLink label="About us" path="/about-us" />
                                        </div>
                                   </div>
                              )}
                         </Transition>
                    </nav>
               )}
               {loading ? (
                    <div className="h-screen flex flex-col justify-center items-center">
                         <AiOutlineLoading size={150} className="fill-primary-500 animate-spin" />
                         <p className="mt-5 text-gray-500 text-2xl">Loading...</p>
                    </div>
               ) : (
                    children
               )}
               {mode !== "full" && (
                    <footer className="bg-primary-100 py-20">
                         <div className="container mx-auto">
                              <h6 className="text-2xl">Apna Mentor</h6>
                         </div>
                    </footer>
               )}
          </div>
     );
};
