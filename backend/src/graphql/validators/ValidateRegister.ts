import { UsernamePasswordInput } from "@graphql/inputs/UserInput";

// TODO: Rewrite this validation middleware
export const ValidateRegister = (options: UsernamePasswordInput) => {
	if (!options.email.includes("@")) {
		return [
			{
				field: "email",
				message: "Invalid email"
			}
		];
	}

	// Possible name errors

	if (options.name.includes("@")) {
		return [
			{
				field: "name",
				message: "Cannot include @"
			}
		];
	}

	if (options.name.length === 0) {
		return [
			{
				field: "name",
				message: "Name is empty"
			}
		];
	}

	// Possible surname errors

	if (options.surname.includes("@")) {
		return [
			{
				field: "surname",
				message: "Cannot include @"
			}
		];
	}

	if (options.surname.length === 0) {
		return [
			{
				field: "surname",
				message: "Last name is empty"
			}
		];
	}

	// Password

	if (options.password.length <= 8) {
		return [
			{
				field: "password",
				message: "Length must be greater than 8"
			}
		];
	}

	if (options.password !== options.repeatPassword) {
		return [
			{
				field: "repeatPassword",
				message: "Passwords don't match"
			}
		];
	}

	return null;
};
