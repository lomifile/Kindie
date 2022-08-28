import React, { HTMLAttributes } from "react";

import Navigation from "../Navigation";

interface NormalLayoutProps extends HTMLAttributes<HTMLElement> {}

export const NormalLayout: React.FC<NormalLayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      <div className="w-full">{children}</div>
    </>
  );
};
