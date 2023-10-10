import React, { FC } from "react";
import { Link } from "react-router-dom";

export interface AppNavLinkProps {
     label: string;
     path: string;
}

export const AppNavLink: FC<AppNavLinkProps> = ({ label, path }) => {
     return (
          <div>
               <Link
                    to={path}
                    className="text-gray-600 hover:bg-primary-500 hover:text-white block px-3 py-2 rounded-md text-sm capitalize"
               >
                    {label}
               </Link>
          </div>
     );
};
