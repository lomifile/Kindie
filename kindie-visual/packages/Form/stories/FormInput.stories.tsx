import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FormInput from "../src/FormInput";

export default {
  title: "Kindie Visual/Form input",
  component: FormInput,
} as ComponentMeta<typeof FormInput>;

const Template: ComponentStory<typeof FormInput> = (args) => (
  <>
    <FormInput {...args} />
  </>
);

export const FormInputStory = Template.bind({});
FormInputStory.args = {
  size: "sm",
  placeholder: "Test",
};
