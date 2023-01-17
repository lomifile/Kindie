import Response from "@utils/repsonseObject";
import {
	Arg,
	Ctx,
	Int,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware
} from "type-graphql";
import { Attendance, Children } from "@orm/entities";
import {
	isAuth,
	isGroupSelected,
	isKinderGardenSelected
} from "@middleware/index";
import PaginatedResponse from "@utils/paginatedResponseObject";
import { UpdateResult, getConnection } from "typeorm";
import { LogAction } from "@root/middleware/LogAction";
import BooleanResponse from "@root/utils/booleanResponseObject";

@ObjectType()
class AttedanceResponse extends Response<Attendance>(Attendance) {}

@ObjectType()
class PaginatedAttendacne extends PaginatedResponse<Attendance>(Attendance) {}

@ObjectType()
class AttendanceBooleanResponse extends BooleanResponse() {}

@Resolver(Attendance)
export class AttendanceResolver {
	@Query(() => PaginatedAttendacne)
	@UseMiddleware(isAuth, isGroupSelected, isKinderGardenSelected, LogAction)
	async listAttendance(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Arg("marked", () => Boolean, { nullable: true }) marked: boolean | null
	): Promise<PaginatedAttendacne> {
		const realLimit = Math.min(20, limit);
		const realLimitPlusOne = realLimit + 1;

		const replacements: unknown[] = [realLimitPlusOne];

		if (cursor) {
			replacements.push(cursor);
		}

		let result;
		try {
			result = await getConnection().query(
				`
				select 
					a."Id"
					, a."childId"
					, a."groupId"
					, a."kindergardenId"
					, a."groupsId" 
					, a.attendance
					, a."createdAt"
					, a."updatedAt"
					, a."deletedAt"
				from
					attendance a 
				left join "kinder_garden" k on k."Id" = a."kindergardenId"
				left join groups g on g."inKindergardenId" = k."Id"
				where a."deletedAt" is null
				${cursor ? ` and a."createdAt" < $2` : ""}
				${marked === true ? ` and a.attendance is true` : " and a.attendance is false"}
				order by a."createdAt" limit $1
				`,
				replacements
			);
		} catch (err) {
			return {
				errors: [
					{
						field: err.name,
						message: err.message
					}
				]
			};
		}
		return {
			data: result.slice(0, realLimit),
			hasMore: result.length === realLimitPlusOne
		};
	}

	@Mutation(() => AttedanceResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, isGroupSelected, LogAction)
	async createAttendance(
		@Arg("childId", () => Int) childId: number,
		@Ctx() { req }: AppContext,
		@Arg("complete", { nullable: true }) complete?: boolean
	): Promise<AttedanceResponse> {
		let data;
		try {
			const child = await Children.findOne({ where: { Id: childId } });
			if (!child) {
				return {
					errors: [
						{
							field: "childId",
							message: "Child doesn't exist by this id"
						}
					]
				};
			}

			data = await Attendance.create({
				childId,
				attendance: complete ?? false,
				kindergardenId: req.session.selectedKindergarden,
				groupId: req.session.selectedGroup
			}).save();
		} catch (err) {
			return {
				errors: [
					{
						field: err.field,
						message: err.message
					}
				]
			};
		}
		return {
			data
		};
	}

	@Mutation(() => AttedanceResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, isGroupSelected, LogAction)
	async markAttendance(
		@Arg("id", () => Int) id: number
	): Promise<AttedanceResponse> {
		let data: Attendance;
		try {
			const response = await getConnection()
				.createQueryBuilder()
				.update(Attendance)
				.set({
					attendance: true
				})
				.where(`Id = :id`, { id: id })
				.returning("*")
				.execute();

			data = response.raw[0];
		} catch (err) {
			return {
				errors: [
					{
						field: err.field,
						message: err.message
					}
				]
			};
		}

		return {
			data
		};
	}

	@Mutation(() => AttendanceBooleanResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, isGroupSelected)
	async deleteAttendance(
		@Arg("id", () => Int) id: number
	): Promise<AttendanceBooleanResponse> {
		let response: UpdateResult;
		try {
			response = await getConnection()
				.createQueryBuilder()
				.softDelete()
				.from(Attendance)
				.where("Id = :id", { id: id })
				.execute();
		} catch (err) {
			return {
				errors: [
					{
						field: err.name,
						message: err.message
					}
				]
			};
		}
		return {
			result: response.affected! > 0
		};
	}
}
