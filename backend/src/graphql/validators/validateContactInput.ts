import { FieldError } from "@root/utils/Errors";
import { ContactInput } from "../inputs";

export const validateContactInput = (
	options: ContactInput
): FieldError[] | null => {
	const errors: FieldError[] = [];

	if (!options.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
		errors.push({
			field: "email",
			message: "Email is not valid"
		});

	if (!options.subject)
		errors.push({
			field: "subject",
			message: "Every email should have subject"
		});

	if (errors.length > 0) return errors;
	return null;
};
