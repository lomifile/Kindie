import {
  FirstCardIcon,
  FourthCardIcon,
  SecondCardIcon,
  ThirdCardIcon,
} from "../../ui/Icons";

import Card from "../../ui/Card";
import React from "react";
import { VscArchive } from "react-icons/vsc";

interface FeaturesProps {}

export const Features: React.FC<FeaturesProps> = ({}) => {
  return (
    <div className="mt-10">
      <fieldset className="pb-10">
        <legend className="mx-auto px-4 text-primary text-4xl font-bold mb-10">
          Features
        </legend>
        <div className="grid grid-cols-2 justify-center items-center gap-4 md:grid-cols-2 xs:grid-cols-1 xl:grid-cols-2 px-16">
          <Card title="1. Organize your needs" icon={<FirstCardIcon />}>
            <span className="text-base font-normal leading-tight text-accent">
              Organize your kindergarden the way you like it. Give your
              kindergarden a good digital tool to help you take control of your
              staff and children and also to keep track of all of your needed
              data.
            </span>
          </Card>
          <Card title="2. Show your progress" icon={<SecondCardIcon />}>
            <span className="text-base font-normal leading-tight text-accent">
              Share your progress and fun stuff you are working on with your
              children. Show parents how much fun kindergarden time is. Also
              track parents responses and engagement.
            </span>
          </Card>
          <Card title="3. Show your progress" icon={<ThirdCardIcon />}>
            <span className="text-base font-normal leading-tight text-accent">
              Track all of the data you need. Organize your iternal structure
              the way you feel most comfortable, also track attendance by
              groups.
            </span>
          </Card>
          <Card
            title="4. All of your data is stored in cloud"
            icon={<VscArchive className="w-[3rem] h-[3rem] text-primary" />}
          >
            <span className="text-base font-normal leading-tight text-accent">
              You don't have to worry about where is your data. Everything is
              stored in cloud and always ready for you to do whatever you have
              in your mind.
            </span>
          </Card>
        </div>
      </fieldset>
    </div>
  );
};
