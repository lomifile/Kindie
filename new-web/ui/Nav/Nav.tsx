import React, { HTMLAttributes } from "react";

export interface NavProps extends HTMLAttributes<HTMLElement> {}

export const Nav: React.FC<NavProps> = ({ children, ...props }) => {
  return <nav {...props}>{children}</nav>;
};
