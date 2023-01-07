import { Groups } from "@orm/entities";
import {
	Arg,
	Ctx,
	Field,
	Int,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { isKinderGardenSelected, isAuth } from "@middleware/index";
import { FieldError } from "@utils/Errors";
import { LogAction } from "@root/middleware/LogAction";

@ObjectType()
class GroupsResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Groups, { nullable: true })
	groups?: Groups;
}

@Resolver(Groups)
export class GroupsResolver {
	@Query(() => Groups, { nullable: true })
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	showSelectedGroup(@Ctx() { req }: AppContext) {
		if (!req.session.selectedGroup) {
			return null;
		}

		return Groups.findOne({ where: { Id: req.session.selectedGroup } });
	}

	@Mutation(() => GroupsResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async useGroup(
		@Arg("groupId") groupId: number,
		@Ctx() { req }: AppContext
	): Promise<GroupsResponse> {
		const groups = await Groups.findOne({
			where: {
				Id: groupId,
				inKindergardenId: req.session.selectedKindergarden
			}
		});

		if (!groups) {
			return {
				errors: [
					{
						field: "Id",
						message: "There is no group by this ID"
					}
				]
			};
		}

		req.session.selectedGroup = groups.Id;

		return { groups };
	}

	@Query(() => [Groups])
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async showGroups(@Ctx() { req }: AppContext): Promise<Groups[] | null> {
		return await Groups.find({
			where: { inKindergardenId: req.session.selectedKindergarden }
		});
	}

	@Mutation(() => GroupsResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async createGroup(@Arg("name") name: string, @Ctx() { req }: AppContext) {
		let groups;
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
			groups = result.raw[0];
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
		return { groups };
	}

	@Mutation(() => Boolean)
	@UseMiddleware(LogAction)
	clearGroup(@Ctx() { req }: AppContext) {
		if (req.session.selectedGroup) {
			req.session.selectedGroup = NaN;
		}
		return true;
	}

	// TODO: Rewrite this function
	@Mutation(() => Boolean)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async deleteGroup(@Arg("id", () => Int) id: number): Promise<Boolean> {
		await Groups.delete({ Id: id });
		return true;
	}
}
