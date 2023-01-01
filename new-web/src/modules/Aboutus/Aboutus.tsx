import NormalLayout from "../../components/Layouts";
import React from "react";

interface AboutusProps {}

export const Aboutus: React.FC<AboutusProps> = ({}) => {
  return (
    <NormalLayout>
      <div className="flex flex-row p-20">
        <div className="flex mr-auto">
          <h1 className="text-4xl font-bold text-primary">Our story</h1>
        </div>
      </div>
      <div className="flex flex-row mr-auto px-20 ">
        <div className="flex mr-2">
          <p className="text-xl">
            In simple terms, we are just another app that helps you get
            organized. Throughout my life I saw how progress and paperwork for
            children in kindergarten gets bigger and bigger and the fact that
            storing that much data physically is impossible and that is where I
            got and idea to just try to improve that kind of problem this is
            where I got some of the ideas and what I turned into a project.
          </p>
        </div>
        <div className="flex ml-2">
          <p className="text-xl">
            In simple terms, we are just another app that helps you get
            organized. Throughout my life I saw how progress and paperwork for
            children in kindergarten gets bigger and bigger and the fact that
            storing that much data physically is impossible and that is where I
            got and idea to just try to improve that kind of problem this is
            where I got some of the ideas and what I turned into a project.
          </p>
        </div>
      </div>
      <div className="flex flex-row mr-auto p-20 justify-center items-center">
        <div className="flex">
          <h1 className="text-4xl font-bold text-primary">Meet the team</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start px-20 mb-20">
        <div className="flex flex-row">
          <img
            className="rounded-full w-[250px] h-[250px] shadow-sm"
            src={"/FilipIvanusec.jpeg"}
            alt="FilipIvanusec"
          />
          <div className="flex flex-col w-1/2 h-1/2 p-10">
            <h1 className="text-xl font-bold">"Process is now better!"</h1>
            <p className="text-l mt-5">
              Hi! My name is Filip. I've been developing apps since I was 18
              years old when I saw how things around kindergarten and how much
              paperwork is about children are I wanted to find a way to make it
              simpler I hope the solution you see here is something that is
              going to help you in your business. Kind regards, Filip!
            </p>
            <p className="text-gray-500 font-italic mt-5">Filip Ivanusec</p>
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <img
            className="rounded-full w-[250px] h-[250px] shadow-sm"
            src={"/FilipIvanusec.jpeg"}
            alt="FilipIvanusec"
          />
          <div className="flex flex-col w-1/2 h-1/2 p-10">
            <h1 className="text-xl font-bold">"Process is now better!"</h1>
            <p className="text-l mt-5">
              Hi! My name is Filip. I've been developing apps since I was 18
              years old when I saw how things around kindergarten and how much
              paperwork is about children are I wanted to find a way to make it
              simpler I hope the solution you see here is something that is
              going to help you in your business. Kind regards, Filip!
            </p>
            <p className="text-gray-500 font-italic mt-5">Filip Ivanusec</p>
          </div>
        </div>
      </div>
    </NormalLayout>
  );
};
