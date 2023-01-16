import { Attendance } from "@root/orm/entities";
import { FieldError } from "@root/utils/Errors";

export const validateAttendance = async (
	id: number
): Promise<FieldError[] | null> => {
	const errors: FieldError[] = [];
	const attendance = await Attendance.findOne({ Id: id });
	if (!attendance) {
		errors.push({
			field: "id",
			message: "There is no attendance by this Id"
		});
	}
	if (attendance?.createdAt !== new Date())
		errors.push({
			field: "Attendance",
			message: "Attendance cannot be marked"
		});

	if (errors.length > 0) return errors;
	return null;
};
