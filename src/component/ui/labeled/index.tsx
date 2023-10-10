import React, { FC, ReactNode } from "react";

export interface LabeledProps {
     children: ReactNode;
}

export const Labeled: FC<LabeledProps> = ({ children }) => {
     return <div className="px-10 py-1 bg-primary-100 capitalize text-primary-500 rounded-full">{children}</div>;
};
