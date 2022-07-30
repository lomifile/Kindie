import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "../src/Button";
import type { ButtonTypes } from "../src/types";

export default {
  title: "ReactComponentLibrary/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const HelloWorld = Template.bind({});
HelloWorld.args = {
  variant: "fill-primary" as ButtonTypes,
  children: "Hello world!",
  isLoading: false,
  disabled: false,
};
