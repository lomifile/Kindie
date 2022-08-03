import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import Label from "../src/Label";

export default {
  title: "Kindie Visual/Label",
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const LabelInputStory = Template.bind({});
LabelInputStory.args = {
  children: "test",
};
