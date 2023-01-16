import { Groups } from "@orm/entities";
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
import { UpdateResult, getConnection } from "typeorm";
import {
	isKinderGardenSelected,
	isAuth,
	isGroupSelected
} from "@middleware/index";
import { LogAction } from "@root/middleware/LogAction";
import Response from "@root/utils/repsonseObject";
import ManyResponse from "@root/utils/manyResponseObject";
import BooleanResponse from "@root/utils/booleanResponseObject";

@ObjectType()
class GroupsResponse extends Response<Groups>(Groups) {}

@ObjectType()
class ArrayGroupResponse extends ManyResponse<Groups>(Groups) {}

@ObjectType()
class GroupsBooleanResponse extends BooleanResponse() {}

@Resolver(Groups)
export class GroupsResolver {
	@Query(() => GroupsResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, isGroupSelected, LogAction)
	async showSelectedGroup(
		@Ctx() { req }: AppContext
	): Promise<GroupsResponse> {
		let data: Groups;
		try {
			data = await Groups.findOneOrFail(req.session.selectedGroup);
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

	@Mutation(() => GroupsResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async useGroup(
		@Arg("id") id: number,
		@Ctx() { req }: AppContext
	): Promise<GroupsResponse> {
		let data: Groups;
		try {
			data = await Groups.findOneOrFail({
				where: {
					Id: id,
					inKindergardenId: req.session.selectedKindergarden
				}
			});
			req.session.selectedGroup = data.Id;
		} catch (err) {
			return {
				errors: [
					{
						field: "Id",
						message: "There is no group by this ID"
					}
				]
			};
		}
		return { data };
	}

	@Query(() => ArrayGroupResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async listGroups(@Ctx() { req }: AppContext): Promise<ArrayGroupResponse> {
		let data: Groups[];
		try {
			data = await getConnection()
				.createQueryBuilder(Groups, "g")
				.where("g.inKindergardenId = :id", {
					id: req.session.selectedKindergarden
				})
				.getMany();
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

	@Mutation(() => GroupsResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async createGroup(
		@Arg("name") name: string,
		@Ctx() { req }: AppContext
	): Promise<GroupsResponse> {
		let data;
		if (name.length === 0)
			return {
				errors: [
					{
						field: "name",
						message: "Name cannot be empty"
					}
				]
			};
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(Groups)
				.values({
					Name: name,
					inKindergardenId: req.session.selectedKindergarden
				})
				.returning("*")
				.execute();
			data = result.raw[0];
		} catch (err) {
			return {
				errors: [
					{
						field: "Groups",
						message: "There was an error"
					}
				]
			};
		}
		return { data };
	}

	@Mutation(() => Boolean)
	@UseMiddleware(LogAction)
	clearGroup(@Ctx() { req }: AppContext): boolean {
		if (req.session.selectedGroup) {
			req.session.selectedGroup = NaN;
		}
		return true;
	}

	@Mutation(() => GroupsBooleanResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async deleteGroup(
		@Arg("id", () => Int) id: number
	): Promise<GroupsBooleanResponse> {
		let response: UpdateResult;
		try {
			response = await getConnection()
				.createQueryBuilder()
				.softDelete()
				.from(Groups, "g")
				.where({
					Id: id
				})
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
