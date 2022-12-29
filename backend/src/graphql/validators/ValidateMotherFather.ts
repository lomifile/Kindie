import { ParentsInput } from "@graphql/inputs";

export const validateMotherFather = (data: ParentsInput) => {
	const errors = [];

	if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
		errors.push({ field: "email", message: "Email is not correct" });

	if (data.name.match(/^([!%@#$^*?_~]+)$/))
		errors.push({
			field: "name",
			message: "Name cannot contaion special characters"
		});

	if (data.surname.match(/^([!%@#$^*?_~]+)$/))
		errors.push({
			field: "surname",
			message: "Surname cannot contaion special characters"
		});

	if (errors.length > 0) {
		return errors;
	}

	return null;
};
