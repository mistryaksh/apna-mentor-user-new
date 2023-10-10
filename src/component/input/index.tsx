import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

export interface AppInputProps {
     touched?: boolean;
     error?: string;
     label?: string;
}

type Props = AppInputProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const AppInput: FC<Props> = ({ label, touched, error, ...rest }) => {
     return (
          <div className="flex flex-col gap-1 flex-1">
               <label className="text-sm text-gray-500" htmlFor="firstName">
                    {label}
               </label>
               <input
                    type="text"
                    className="text-md border focus:outline-none px-5 rounded-lg focus:border-primary-500 py-2"
                    {...rest}
               />
               <p className="text-red-500 border-red-500 w-full">{touched && error}</p>
          </div>
     );
};
