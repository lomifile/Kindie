import { FieldError } from "@root/utils/Errors";
import { UpdatePassword } from "../inputs";

export const validateUpdatePassword = (
	options: UpdatePassword
): FieldError[] | null => {
	const errors: FieldError[] = [];

	if (options.password.length < 8)
		errors.push({
			field: "password",
			message: "Passwords should be longer than 8 characters"
		});

	if (options.password !== options.repeatPassword)
		errors.push({
			field: "repeatPassword",
			message: "Passwords don't match"
		});

	if (errors.length > 0) return errors;
	return null;
};
