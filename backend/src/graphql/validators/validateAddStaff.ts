import { StaffMembers, User } from "@root/orm/entities";
import { FieldError } from "@root/utils/Errors";

export const validateAddStaff = (
	userId: number,
	ctxId: number,
	instance?: StaffMembers,
	user?: User
): FieldError[] | null => {
	const errors: FieldError[] = [];
	if (userId === ctxId)
		errors.push({
			field: "userId",
			message: "User id same as one in session"
		});

	if (instance)
		errors.push({
			field: "userId",
			message: "User is already part of staff"
		});

	if (!user)
		errors.push({
			field: "userId",
			message: "User doesn't exist by this id"
		});

	if (errors.length > 0) return errors;
	return null;
};
