import { Features } from "./Features";
import { Hero } from "./Hero";
import NormalLayout from "../../components/Layouts";
import React from "react";
import { GetStarted } from "./GetStarted";

interface LandingProps {}

export const Landing: React.FC<LandingProps> = ({}) => {
  return (
    <NormalLayout>
      <Hero />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#68a7ad"
          fillOpacity="1"
          d="M0,288L48,277.3C96,267,192,245,288,229.3C384,213,480,203,576,170.7C672,139,768,85,864,101.3C960,117,1056,203,1152,245.3C1248,288,1344,288,1392,288L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <Features />
      <GetStarted />
    </NormalLayout>
  );
};
