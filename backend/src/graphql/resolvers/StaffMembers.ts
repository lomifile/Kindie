import { isAuth, isKinderGardenSelected } from "@middleware/index";
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
import { StaffMembers, User } from "@orm/entities";
import { getConnection } from "typeorm";
import { LogAction } from "@root/middleware/LogAction";
import Response from "@root/utils/repsonseObject";
import BooleanResponse from "@root/utils/booleanResponseObject";
import { validateAddStaff } from "../validators/validateAddStaff";
import PaginatedResponse from "@root/utils/paginatedResponseObject";

@ObjectType()
class StaffResponse extends Response<StaffMembers>(StaffMembers) {}

@ObjectType()
class PaginatedStaffResponse extends PaginatedResponse<StaffMembers>(
	StaffMembers
) {}

@ObjectType()
class StaffBooleanResponse extends BooleanResponse() {}

@Resolver(StaffMembers)
export class StaffMembersResolver {
	@Mutation(() => StaffResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async addStaff(
		@Arg("userId", () => Int) userId: number,
		@Arg("role", () => String) role: string,
		@Ctx() { req }: AppContext
	): Promise<StaffResponse> {
		let data;
		try {
			const staff = await StaffMembers.findOne({
				where: {
					staffId: userId,
					kindergardenId: req.session.selectedKindergarden
				}
			});
			const user = await User.findOne(userId);
			const errors = validateAddStaff(
				userId,
				req.session.userId as number,
				staff,
				user
			);
			if (errors) {
				return {
					errors
				};
			}
			const result = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(StaffMembers)
				.values({
					staffId: userId,
					kindergardenId: req.session.selectedKindergarden,
					role
				})
				.returning("*")
				.execute();

			data = result.raw[0];
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
			data
		};
	}

	@Query(() => PaginatedStaffResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async listArchivedStaff(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string,
		@Ctx() { req }: AppContext
	): Promise<PaginatedStaffResponse> {
		const data: any[] = [];
		const realLimit = Math.min(20, limit);
		const realLimitPlusOne = realLimit + 1;
		const replacements: unknown[] = [realLimitPlusOne];
		replacements.push(req.session.selectedKindergarden);

		if (cursor) {
			replacements.push(new Date(parseInt(cursor)));
		}
		try {
			const response = await getConnection().query(
				`
			select 
				sm."staffId",
				sm."kindergardenId",
				kg."Name" as kindergarden_name,
				kg."Address" as kindergarden_address,
				kg."City" as kindergarden_city,
				kg."Zipcode" as kindergarden_zipcode,
				u."Name" as user_name,
				u."Surname" as user_surname,
				u."Email" as user_email
			from public.staff_members sm 
			left join public."user" u 
			on u."Id" = sm."staffId" 
			left join public.kinder_garden kg 
			on kg."Id" = sm."kindergardenId"
			where sm.archived is not null and sm."kindergardenId" = $2 ${
				cursor ? ` and sm."createdAt" = $2` : ""
			} 
			limit $1
		`,
				replacements
			);
			for (const el of response) {
				data.push({
					staffId: el.staffId,
					kindergardenId: el.kindergardenId,
					kindergarden: {
						Id: el.kindergardenId,
						Name: el.kindergarden_name,
						Address: el.kindergarden_address,
						City: el.kindergarden_city,
						Zipcode: el.kindergarden_zipcode
					},
					staff: {
						Id: el.staffId,
						Name: el.user_name,
						Surname: el.user_surname,
						Email: el.user_email
					}
				});
			}
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
			data: data.slice(0, realLimit),
			hasMore: data.length === realLimitPlusOne
		};
	}

	@Mutation(() => StaffBooleanResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async deleteStaff(
		@Arg("userId", () => Int) userId: number
	): Promise<StaffBooleanResponse> {
		let response;
		try {
			response = await getConnection()
				.createQueryBuilder(StaffMembers, "sm")
				.softDelete()
				.where("staffId = :id", { id: userId })
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

	@Query(() => PaginatedStaffResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async listStaff(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string,
		@Ctx() { req }: AppContext
	): Promise<PaginatedStaffResponse> {
		const data: any[] = [];
		const realLimit = Math.min(20, limit);
		const realLimitPlusOne = realLimit + 1;
		const replacements: unknown[] = [realLimitPlusOne];
		replacements.push(req.session.selectedKindergarden);

		if (cursor) {
			replacements.push(new Date(parseInt(cursor)));
		}

		try {
			const response = await getConnection().query(
				`
				select
					sm."staffId" ,
					sm."kindergardenId",
					sm."role",
					sm."createdAt",
					sm."updatedAt",
					sm.archived,
					kg."Name" as kindergarden_name,
					kg."Address" as kjindergarden_address,
					kg."City" as kindergarden_city,
					kg."Zipcode" as kindergarden_zipcode,
					kg."createdAt" as kindergarden_created_at,
					kg."updatedAt" as kindergarden_updated_at,
					kg."deletedAt" as kindergarden_deleted_at,
					u."Name" as user_name,
					u."Surname" as user_surname,
					u."Email" as user_email
				from public.staff_members sm
				left join public."user" u 
				on u."Id" = sm."staffId" 
				left join public.kinder_garden kg 
				on kg."Id" = sm."kindergardenId"
				where sm.archived is null and sm."kindergardenId" = $2
				${cursor ? ` and sm.createdAt = $3` : ""}
				limit $1
			`,
				replacements
			);
			for (const el of response) {
				data.push({
					staffId: el.staffId,
					kindergardenId: el.kindergardenId,
					kindergarden: {
						Id: el.kindergardenId,
						Name: el.kindergarden_name,
						Address: el.kindergarden_address,
						City: el.kindergarden_city,
						Zipcode: el.kindergarden_zipcode,
						createdAt: el.kindergarden_created_at,
						updatedAt: el.kindergarden_updated_at,
						deletedAt: el.kindergarden_deleted_at
					},
					staff: {
						Id: el.staffId,
						Name: el.user_name,
						Surname: el.user_surname,
						Email: el.user_email
					}
				});
			}
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
			data: data.slice(0, realLimit),
			hasMore: data.length === realLimitPlusOne
		};
	}
}
