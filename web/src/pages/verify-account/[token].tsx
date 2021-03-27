import {
  Flex,
  Box,
  Heading,
  Stack,
  Link,
  Button,
  Divider,
  Text,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useVerifyAccountMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrormap } from "../../utils/toErrorMap";

interface VerifyAccountProps {}

const VerifyAccount: React.FC<VerifyAccountProps> = ({}) => {
  const [checked, setChecked] = useState(false);
  const [, verifyAccount] = useVerifyAccountMutation();
  const router = useRouter();
  const toast = useToast();
  const handleClick = () => {
    setChecked(true);
  };
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
          Verify your account
        </Heading>
        <Formik
          initialValues={{
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await verifyAccount({
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            });
            if (response.data?.verifyAccount.errors) {
              toast({
                title: response.data?.verifyAccount.errors[0].field.toLocaleUpperCase(),
                description: response.data?.verifyAccount.errors[0].message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Your account is verified!",
                description: "You can now login and start working!",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={4} marginBottom="1rem">
                <Checkbox
                  onClick={() => {
                    handleClick();
                  }}
                >
                  I consent to Terms and conditions!
                </Checkbox>
                <Stack marginBottom="1rem">
                  <Button
                    isDisabled={!checked}
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
                    Verify account
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
        <Divider marginBottom="1rem" />
      </Box>
      <Stack isInline marginTop="1.5rem" fontWeight="500" fontSize="sm">
        <Link className="footer-nav-item" href="#" color="secondary.link">
          Terms
        </Link>
        <Link className="footer-nav-item" href="#" color="secondary.link">
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

export default withUrqlClient(createUrqlClient)(VerifyAccount);
