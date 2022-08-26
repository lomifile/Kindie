import React from "react";
import NormalLayout from "../../components/Layouts";

interface LandingProps {}

export const Landing: React.FC<LandingProps> = ({}) => {
  return (
    <NormalLayout>
      {[...new Array(50)].map((e, idx) => (
        <p key={idx} className="p-5 ">
          Ovo je test
        </p>
      ))}
    </NormalLayout>
  );
};
