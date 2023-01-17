import { FieldError } from "@root/utils/Errors";
import { UpdateUserInput } from "../inputs";

export const validateUpdateUser = async (
	options: UpdateUserInput
): Promise<FieldError[] | null> => {
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

	if (errors.length > 0) return errors;
	return null;
};
