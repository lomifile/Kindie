import React, { HTMLAttributes } from "react";

import Footer from "../Footer";
import Navigation from "../Navigation";

interface NormalLayoutProps extends HTMLAttributes<HTMLElement> {}

export const NormalLayout: React.FC<NormalLayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      <div className="w-full mt-16">{children}</div>
      <Footer />
    </>
  );
};
