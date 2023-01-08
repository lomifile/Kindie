import { User } from "@root/orm/entities";
import { FieldError } from "@root/utils/Errors";

export const validateForgotPassword = (
	email: string,
	instance?: User
): FieldError[] | null => {
	const errors: FieldError[] = [];
	if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
		errors.push({
			field: "email",
			message: "Email is not valid"
		});
	}

	if (!instance) {
		errors.push({
			field: "email",
			message: "Email does not match email in database"
		});
	}

	if (errors.length > 0) return errors;
	return null;
};
