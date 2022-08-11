import { Form, Formik } from "formik";
import * as React from "react";
import Button from "../ui/Button";
import { FormInput } from "../ui/Form/FormInput";

const Home: React.FC = () => {
  return (
    <div className="w-[50%]">
      <Formik
        initialValues={{ home: "" }}
        onSubmit={(values) => {
          console.log(values.home);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormInput name="home" type="password" label="Test" />
            <Button isLoading={isSubmitting} type="submit">
              Test form
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Home;
