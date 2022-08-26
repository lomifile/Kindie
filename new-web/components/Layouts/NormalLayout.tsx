import React, { HTMLAttributes } from "react";
import Navigation from "../Navigation";

interface NormalLayoutProps extends HTMLAttributes<HTMLElement> {}

export const NormalLayout: React.FC<NormalLayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="p-20 w-full">{children}</main>
    </>
  );
};
