import React, { HTMLAttributes } from "react";

export interface NavProps extends HTMLAttributes<HTMLElement> {}

export const Nav: React.FC<NavProps> = ({ children, ...props }) => {
  return (
    <nav className="p-8 w-full flex flex-row" {...props}>
      {children}
    </nav>
  );
};
