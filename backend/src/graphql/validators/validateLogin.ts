import { User } from "@root/orm/entities";
import { FieldError } from "@root/utils/Errors";
import argon2 from "argon2";

type PassedData = {
	email: string;
	password: string;
};
export const validateLogin = async (
	options: PassedData,
	instance?: User
): Promise<FieldError[] | null> => {
	const errors: FieldError[] = [];

	if (!instance)
		errors.push({
			field: "email",
			message: "Email you enterd does not exist in database"
		});

	if (!instance?.confirmed) {
		errors.push({
			field: "confirmation",
			message:
				"Your account need verification! Please check your email for verification!"
		});
	}

	if (!options.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
		errors.push({
			field: "email",
			message: "Email is not valid"
		});

	if (!(await argon2.verify(instance?.Password as string, options.password)))
		errors.push({
			field: "password",
			message: "Password you entered is not matching one in database"
		});

	if (errors.length > 0) return errors;
	return null;
};
