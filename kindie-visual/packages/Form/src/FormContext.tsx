import * as React from "react";

interface FormContextOptions {
  controlId?: unknown;
}

const FormContext = React.createContext<FormContextOptions>({});

export default FormContext;
