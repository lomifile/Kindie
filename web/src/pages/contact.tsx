import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useSendEmailMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface contactProps {}

const Contact: React.FC<contactProps> = ({}) => {
  const [, sendEmail] = useSendEmailMutation();
  const toast = useToast();
  return (
    <Layout navbarVariant={"normal"} variant="column" navbar={true}>
      <title>Contact us</title>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        // @ts-ignore
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mb={5}
      >
        <Stack
          spacing={4}
          w={{ base: "90%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="blue.400"
            textAlign={["center", "center", "left", "left"]}
          >
            Contact us!
          </Heading>
          <Heading
            as="h2"
            size="md"
            color="primary.800"
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={["center", "center", "left", "left"]}
          >
            Here you can input your email address and send us email if you want
            to talk to us about features, bugs, upgrades, in other terms
            anything you like!
          </Heading>
          <Text
            fontSize="xs"
            mt={2}
            textAlign="center"
            color="primary.800"
            opacity="0.6"
          >
            We love to hear from you!
          </Text>
        </Stack>
        <Flex
          px={10}
          minW="10rem"
          alignItems="normal"
          justifyItems="left"
          justifyContent="left"
          w={{ base: "80%", sm: "60%", md: "50%" }}
          mb={{ base: 12, md: 0 }}
        >
          <Box minW="xl">
            <Formik
              initialValues={{ email: "", subject: "", message: "" }}
              onSubmit={async (values) => {
                const response = await sendEmail({
                  input: {
                    ...values,
                  },
                });

                if (response) {
                  toast({
                    title: "We got your email!",
                    description:
                      "We got your email and we will respond as soon as we can!",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField name="email" label="Your email" type="email" />
                  <Box mt={4}>
                    <InputField name="subject" label="Input your subject" />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      name="message"
                      label="Input your message"
                      textArea={true}
                    />
                  </Box>
                  <Flex>
                    <Button
                      justifySelf="left"
                      alignSelf="start"
                      mt={5}
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
                      Send message
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Contact);
