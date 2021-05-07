import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";
import { AlertTypes } from "../utils/types";

interface CustomAlertProps {
  name: string;
  data: string;
  status: AlertTypes;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  name,
  data,
  status,
}) => {
  return (
    <Flex
      p={[0, 0, 0, 200, 200]}
      alignItems="center"
      minHeight="100%"
      width="100%"
      justifyContent="center"
      justifySelf="center"
      justify={{
        s: "center",
        md: "center",
        xl: "center",
      }}
      flexDirection="column"
      mt={["-0", "-0", "-0", "auto", "auto"]}
      mb={["-0", "-0", "-0", "auto", "auto"]}
    >
      <Alert
        status={status}
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {name}
        </AlertTitle>
        <AlertDescription maxWidth="sm">{data}</AlertDescription>
      </Alert>
    </Flex>
  );
};
