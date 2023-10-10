import clsx from "clsx";
import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export interface AppButtonProps {
     primary?: boolean;
     secondary?: boolean;
     danger?: boolean;
     loading?: boolean;
     outlinedPrimary?: boolean;
     outlinedSecondary?: boolean;
}

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & AppButtonProps;

export const AppButton: FC<Props> = ({
     children,
     primary,
     secondary,
     outlinedPrimary,
     outlinedSecondary,
     loading,
     ...rest
}) => {
     return (
          <button
               className={clsx(
                    primary && `bg-primary-500 text-white`,
                    secondary && `bg-secondary-500 text-white`,
                    outlinedPrimary && `border border-primary-500 text-primary-500 bg-white`,
                    outlinedSecondary && `border border-secondary-500`,
                    "flex-1 p-3 rounded-lg"
               )}
               {...rest}
          >
               {loading ? <AiOutlineLoading size={24} className="animate-spin" /> : children}
          </button>
     );
};
