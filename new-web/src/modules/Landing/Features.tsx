import React from "react";
import { FeaturesBox } from "../../ui/Features";

interface FeaturesProps {}

export const Features: React.FC<FeaturesProps> = ({}) => {
  return (
    <div className="mt-10">
      <fieldset className="pb-10">
        <legend className="mx-auto px-4 text-primary text-4xl font-bold mb-10">
          Features
        </legend>
        <ol className="grid grid-cols-1 justify-center items-center gap-2 md:grid-cols-1 xs:grid-cols-1 xl:grid-cols-1 px-16">
          <FeaturesBox
            imgSrc="/features_1.svg"
            imgPosition="left"
            title="Organize your needs"
          >
            Organize your kindergarden the way you like it. Give your
            kindergarden a good digital tool to help you take control of your
            staff and children and also to keep track of all of your needed
            data.
          </FeaturesBox>
          <FeaturesBox
            imgSrc="/features_2.svg"
            imgPosition="right"
            title="Show your progress"
          >
            Share your progress and fun stuff you are working on with your
            children. Show parents how much fun kindergarden time is. Also track
            parents responses and engagement.
          </FeaturesBox>
          <FeaturesBox imgSrc="/features_3.svg" imgPosition="left" title="Grow">
            Track all of the data you need. Organize your iternal structure the
            way you feel most comfortable, also track attendance by groups. Grow
            your need to expand and look at it fly!
          </FeaturesBox>
          <FeaturesBox
            imgSrc="/features_4.svg"
            imgPosition="right"
            title="All of your data is stored in cloud"
          >
            You don't have to worry about where is your data. Everything is
            stored in cloud and always ready for you to do whatever you have in
            your mind, focus on having those fun moments and rest leave to us.
          </FeaturesBox>
        </ol>
      </fieldset>
    </div>
  );
};
