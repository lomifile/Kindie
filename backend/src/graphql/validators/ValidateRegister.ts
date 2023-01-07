import { UsernamePasswordInput } from "@graphql/inputs/UserInput";
import { FieldError } from "@utils/Errors";

export const ValidateRegister = (
	options: UsernamePasswordInput
): FieldError[] | null => {
	const errors: FieldError[] = [];
	if (!options.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
		errors.push({
			field: "email",
			message: "Invalid email"
		});
	}

	if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(options.name))
		errors.push({
			field: "name",
			message: "Name cannot contaion special characters"
		});

	if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(options.surname))
		errors.push({
			field: "surname",
			message: "Surname cannot contaion special characters"
		});

	if (options.password.length <= 8) {
		errors.push({
			field: "password",
			message: "Length must be greater than 8"
		});
	}

	if (options.password !== options.repeatPassword) {
		errors.push({
			field: "repeatPassword",
			message: "Passwords don't match"
		});
	}
	// console.log(
	// 	errors,
	// 	"Name -> " +
	// 		` ${options.name} ` +
	// 		/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(options.name)
	// );
	if (errors.length > 0) return errors;
	return null;
};
