import Button from "../../ui/Button";
import { KindieArrow } from "../../ui/Icons";
import React from "react";

interface HeroProps {}

export const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <div
      className="flex flex-row p-20 xs:p-10 xs:justify-center xs:items-center
           md:flex-row xs:flex-col-reverse sm:flex-col-reverse"
    >
      <div className="mr-auto w-full xs:w-full md:w1/2 md:p-5 sm:w-full">
        <h1 className="text-4xl font-bold">
          Kindie, <br />
          the way to organize your kindergarden.
        </h1>
        <p className="text-xl mt-5">
          Kindie is a great way to help you organize your ways,
          <br /> while working with children.
          <br /> It also help you to comunicate with parents and <br /> track
          and plan activities for your kindergarden.
        </p>
        <Button className="flex flex-row items-center w-52 text-white bg-primary text-xl rounded-lg px-5 py-2.5 text-center mt-10">
          Get started <KindieArrow />
        </Button>
      </div>
      <div className="w-full ml-auto lg:block xl:block md:hidden md:w-full md:ml-auto sm:ml-0 sm:mb-10 xs:mb-10 sm:w-full xs:w-full">
        <img src="/HeroSvg.svg" />
      </div>
    </div>
  );
};
