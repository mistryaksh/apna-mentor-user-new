import React, { Fragment, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppStore } from "../app/";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(AppStore);

export const AppProvider = ({ children }: { children: ReactNode }) => {
     return (
          <Fragment>
               <ToastContainer bodyClassName="capitalize" autoClose={2000} />
               <Provider store={AppStore}>
                    <PersistGate persistor={persistor}>
                         <BrowserRouter basename="/" future={{ v7_startTransition: true }}>
                              {children}
                         </BrowserRouter>
                    </PersistGate>
               </Provider>
          </Fragment>
     );
};
