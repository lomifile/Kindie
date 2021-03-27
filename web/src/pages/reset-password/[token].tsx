import {
  Flex,
  Box,
  Heading,
  Stack,
  Link,
  Button,
  Divider,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../../components/InputField";

interface ResetPasswordProps {}

const ResetPassword: React.FC<ResetPasswordProps> = ({}) => {
  const year = new Date().getFullYear();
  return (
    <Flex
      p={200}
      minHeight="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box
        width={{ base: "90%", md: "400px" }}
        rounded="lg"
        p={5}
        border={"1px"}
        borderColor="blue.400"
        borderRadius={"12px"}
      >
        <Heading color={"blue.400"} marginBottom="1.5rem">
          Reset password
        </Heading>
        <Formik
          initialValues={{ password: "", repeatPassword: "" }}
          onSubmit={() => {
            console.log("Hey!");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={4} marginBottom="1rem">
                <Stack justifyContent="space-between">
                  <InputField
                    name="password"
                    placeholder="Password"
                    label="Your password"
                    type="password"
                  />
                  <InputField
                    name="repeatPassword"
                    placeholder="Repeat password"
                    label="Repeat your password"
                    type="password"
                  />
                </Stack>
                <Stack marginBottom="1rem">
                  <Button
                    bg="blue.400"
                    colorScheme="navItem"
                    borderRadius="12px"
                    py="4"
                    px="4"
                    lineHeight="1"
                    size="md"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Reset password
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
      <Stack isInline marginTop="1.5rem" fontWeight="500" fontSize="sm">
        <Link className="footer-nav-item" href="#" color="secondary.link">
          Terms
        </Link>
        <Link
          className="footer-nav-item"
          href="/privacy-policy"
          color="secondary.link"
        >
          Privacy Policy
        </Link>
        <Link
          className="footer-nav-item"
          href="/contact"
          color="secondary.link"
        >
          Contact Us
        </Link>
      </Stack>
      <Stack isInline marginTop="1rem" fontWeight="500" fontSize="sm">
        <Text color="secondary.link">&copy; {year}</Text>
        <Link href="/" color="secondary.link" fontWeight="bold">
          DV Organizator
        </Link>
        <Text color="secondary.link">&mdash; All rights reserved</Text>
      </Stack>
    </Flex>
  );
};

export default ResetPassword;
