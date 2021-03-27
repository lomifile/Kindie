import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { Input, Textarea } from "@chakra-ui/react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textArea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textArea,
  size: _,
  ...props
}) => {
  let InputOrTextArea = Input;
  if (textArea) {
    // @ts-ignore
    InputOrTextArea = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextArea
        style={{ borderRadius: "12px" }}
        {...field}
        {...props}
        id={field.name}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
