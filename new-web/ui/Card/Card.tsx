import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  icon?: JSX.Element | string;
}

export const Card: React.FC<CardProps> = ({ title, icon, children }) => {
  return (
    <div className="flex flex-col justify-center items-center p-4 bg-white rounded-lg border shadow-md sm:p-8">
      {icon ? icon : null}
      <h5 className="mb-4 mt-4 text-xl font-medium text-black">{title}</h5>
      {children}
    </div>
  );
};
