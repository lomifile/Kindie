import { UsernamePasswordInput } from "./inputs/UserInput";

export const ValidateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email",
      },
    ];
  }

  // Possible name errors

  if (options.name.includes("@")) {
    return [
      {
        field: "name",
        message: "Cannot include @",
      },
    ];
  }

  if (options.name.length <= 2) {
    return [
      {
        field: "name",
        message: "Length must be greater than 2",
      },
    ];
  }

  // Possible surname errors

  if (options.surname.includes("@")) {
    return [
      {
        field: "surname",
        message: "Cannot include @",
      },
    ];
  }

  if (options.surname.length <= 2) {
    return [
      {
        field: "surname",
        message: "Length must be greater than 2",
      },
    ];
  }

  // Password

  if (options.password.length <= 8) {
    return [
      {
        field: "password",
        message: "Length must be greater than 8",
      },
    ];
  }

  return null;
};
