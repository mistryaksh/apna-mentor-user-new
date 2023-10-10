import clsx from "clsx";
import React, { FC } from "react";
import { IconType } from "react-icons";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export interface SideNavLinkProps {
     Icon: IconType;
     label: string;
     path: string;
}

export const SideNavLink: FC<SideNavLinkProps> = ({ Icon, label, path }) => {
     const resolved = useResolvedPath(path);
     const match = useMatch({ path: resolved.pathname, end: true });
     return (
          <Link
               to={path}
               className={clsx(
                    "rounded-lg p-3 hover:bg-secondary-200 group flex items-center gap-3",
                    match && "bg-secondary-200 "
               )}
          >
               <Icon
                    size={24}
                    className={clsx("group-hover:text-secondary-900", match ? "text-gray-900" : "text-gray-500")}
               />
               <p
                    className={clsx(
                         "capitalize group-hover:text-secondary-900",
                         match ? "text-gray-900" : "text-gray-500"
                    )}
               >
                    {label}
               </p>
          </Link>
     );
};
