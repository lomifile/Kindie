import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  Flex,
  Box,
  toast,
  Stack,
  Button,
  useToast,
  Spinner,
  AlertIcon,
  Alert,
  AlertDescription,
  AlertTitle,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useIsAuth } from "../../utils/useIsAuth";
import { useGetId } from "../../utils/getID";
import {
  useFindChildQuery,
  useUpdateChildMutation,
} from "../../generated/graphql";

interface EditChildProps {}

const EditChild: React.FC<EditChildProps> = ({}) => {
  useIsAuth();
  const id = useGetId();
  const toast = useToast();
  const router = useRouter();

  const [{ data, fetching }] = useFindChildQuery({
    pause: id === -1,
    variables: {
      id,
    },
  });

  const [, updateChild] = useUpdateChildMutation();

  if (fetching) {
    return (
      <Flex
        p={200}
        minHeight="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          minH="250px"
          minW="250px"
        />
      </Flex>
    );
  } else if (!data?.findChild) {
    return (
      <Flex
        p={200}
        minHeight="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            There was an error
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            An error occured while trying to fetch your data!
          </AlertDescription>
        </Alert>
      </Flex>
    );
  }

  return (
    <Layout variant="column" navbarVariant="user">
      <HStack spacing={5}>
        <Button
          bg="blue.400"
          colorScheme="navItem"
          borderRadius="12px"
          py="4"
          px="4"
          lineHeight="1"
          size="md"
          type="submit"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
        <Heading color="blue.400">Edit child</Heading>
      </HStack>
      <Flex
        mt={10}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box width={{ base: "90%", md: "400px" }} rounded="lg">
          <Formik
            initialValues={{
              name: data.findChild.Name,
              surname: data.findChild.Surname,
              gender: data.findChild.Gender,
              birthdate: data.findChild.BirthDate,
              oib: data.findChild.OIB,
              remarks: data.findChild.Remarks,
            }}
            onSubmit={async (values) => {
              const { error } = await updateChild({
                kidId: id,
                options: {
                  Name: values.name,
                  Surname: values.surname,
                  Gender: values.gender,
                  BirthDate: values.birthdate,
                  OIB: values.oib,
                  Remarks: values.remarks,
                },
              });
              if (!error) {
                toast({
                  title: "Child added successfully",
                  description: "We've added your child for you.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                router.back();
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={4} marginBottom="1rem">
                  <InputField
                    name="name"
                    placeholder="Name"
                    label="Input name"
                    type="text"
                    required
                  />
                  <InputField
                    name="surname"
                    placeholder="Last name"
                    label="Input last name"
                    type="text"
                    required
                  />
                  <InputField
                    name="gender"
                    placeholder="Gender"
                    label="Input gender"
                    type="text"
                    required
                  />
                  <InputField
                    name="birthdate"
                    placeholder="Birth date"
                    label="Input birth date"
                    type="date"
                    required
                  />
                  <InputField
                    name="oib"
                    placeholder="PIN"
                    label="Input PIN"
                    type="text"
                    required
                  />
                  <InputField
                    name="remarks"
                    placeholder="Remarks"
                    label="Input Remarks"
                    textArea
                    required
                  />
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
                    Update child
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(EditChild);
