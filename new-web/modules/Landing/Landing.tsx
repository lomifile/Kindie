import { Hero } from "./Hero";
import NormalLayout from "../../components/Layouts";
import React from "react";

interface LandingProps {}

export const Landing: React.FC<LandingProps> = ({}) => {
  return (
    <NormalLayout>
      <Hero />
    </NormalLayout>
  );
};
