import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Floating from "../src/Floating";
import FormInput from "../src/FormInput";

export default {
  title: "Kindie Visual/Floating form input",
  component: Floating,
} as ComponentMeta<typeof Floating>;

const Template: ComponentStory<typeof Floating> = (args) => (
  <>
    <Floating label="Label" {...args}>
      <FormInput placeholder={args.placeholder} />
    </Floating>
  </>
);

export const FormInputStory = Template.bind({});
FormInputStory.args = {
  size: "sm",
  placeholder: "Test",
};
