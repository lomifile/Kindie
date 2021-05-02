import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  Input,
  Textarea,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { bgColor } from "../utils/colorModeColors";

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
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("primary.800", "brand.200");
  const btnColor = useColorModeValue("transparent", "transparent");
  const btnBorderColor = useColorModeValue("gray.200", "brand.200");
  let InputOrTextArea = Input;
  if (textArea) {
    // @ts-ignore
    InputOrTextArea = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel color={textColor} htmlFor={field.name}>
        {label}
      </FormLabel>
      <InputOrTextArea
        bg={btnColor}
        color={textColor}
        style={{ borderRadius: "12px" }}
        borderColor={btnBorderColor}
        {...field}
        {...props}
        id={field.name}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
