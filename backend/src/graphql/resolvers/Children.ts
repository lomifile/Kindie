import { Children } from "@orm/entities";
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
import {
	isKinderGardenSelected,
	isAuth,
	isGroupSelected
} from "@middleware/index";
import { UpdateResult, getConnection } from "typeorm";
import { ChildrenInput } from "@graphql/inputs";
import Response from "@utils/repsonseObject";
import PaginatedResponse from "@utils/paginatedResponseObject";
import { LogAction } from "@root/middleware/LogAction";
import ManyResponse from "@root/utils/manyResponseObject";
import BooleanResponse from "@root/utils/booleanResponseObject";

@ObjectType()
class ChildrenResponse extends Response<Children>(Children) {}

@ObjectType()
class ArrayChildrenResponse extends ManyResponse<Children>(Children) {}

@ObjectType()
class PaginatedChildren extends PaginatedResponse<Children>(Children) {}

@ObjectType()
class ChildrenBooleanResponse extends BooleanResponse() {}

@Resolver(Children)
export class ChildrenResolver {
	@Query(() => PaginatedChildren)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async listChildren(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Arg("inGroup", () => Int, { nullable: true }) inGroup: number,
		@Ctx() { req }: AppContext
	): Promise<PaginatedChildren> {
		const realLimit = Math.min(20, limit);
		const realLimitPlusOne = realLimit + 1;

		const replacements: unknown[] = [realLimitPlusOne];
		replacements.push(req.session.selectedKindergarden);

		if (inGroup) {
			replacements.push(inGroup);
		}

		if (cursor) {
			replacements.push(new Date(parseInt(cursor)));
		}
		let result;
		try {
			result = await getConnection().query(
				`
				select 
				c."Id"
				, c."Name"
				, c."Surname"
				, c."Gender"
				, c."BirthDate"
				, c."OIB"
				, c."Remarks"
				, c."createdAt"
				, c."updatedAt"
				, c."motherId"
				, c."fatherId"
				, c."inGroupId"
				, c."inKindergardenId"
				, c."createdById"
				, c."updatedById"
				from children c
				inner join public."kinder_garden" k 
				on k."Id" = c."inKindergardenId" where k."Id" = $2 and c."inGroupId" ${
					inGroup ? " = $3" : "is null"
				}
				${cursor ? `and c."createdAt" < $4` : ""}
				order by c."createdAt" DESC
				limit $1
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

	@Query(() => ArrayChildrenResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async filterChildren(
		@Arg("text") text: string,
		@Ctx() { req }: AppContext
	): Promise<ArrayChildrenResponse> {
		let data: Children[];
		try {
			data = await getConnection()
				.createQueryBuilder(Children, "c")
				.select()
				.where(
					`document_with_weights @@ to_tsquery(concat(:query::text,':*')) and c."inKindergardenId" = :id`,
					{ query: text, id: req.session.selectedKindergarden }
				)
				.orderBy(
					"ts_rank(document_with_weights, to_tsquery(concat(:query::text,':*')))",
					"DESC"
				)
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

	@Mutation(() => ChildrenResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, isGroupSelected, LogAction)
	async addChildToGroup(
		@Arg("id", () => Int) id: number,
		@Ctx() { req }: AppContext
	): Promise<ChildrenResponse> {
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.update(Children)
				.set({
					inGroupId: req.session.selectedGroup,
					updatedById: req.session.userId
				})
				.where("Id=:id", { id: id })
				.returning("*")
				.execute();
			return { data: result.raw[0] };
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
	}

	@Mutation(() => ChildrenResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async updateChild(
		@Arg("kidId", () => Int) kidId: number,
		@Arg("options") options: ChildrenInput,
		@Ctx() { req }: AppContext
	): Promise<ChildrenResponse> {
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.update(Children)
				.set({
					Name: options.Name,
					Surname: options.Surname,
					BirthDate: options.BirthDate,
					OIB: options.OIB,
					Remarks: options.Remarks,
					Gender: options.Gender,
					updatedById: req.session.userId
				})
				.where("Id=:id", { id: kidId })
				.returning("*")
				.execute();
			return {
				data: result.raw[0]
			};
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
	}

	@Mutation(() => ChildrenBooleanResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async deleteChildren(
		@Arg("id", () => Int) id: number
	): Promise<ChildrenBooleanResponse> {
		let response: UpdateResult;
		try {
			response = await getConnection()
				.createQueryBuilder(Children, "c")
				.softDelete()
				.where(`Id = :id`, { id: id })
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

	@Mutation(() => ChildrenResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async updateChildernParents(
		@Arg("kidId", () => Int) kidId: number,
		@Arg("motherId", () => Int, { nullable: true }) motherId: number,
		@Arg("fatherId", () => Int, { nullable: true }) fatherId: number,
		@Ctx() { req }: AppContext
	): Promise<ChildrenResponse> {
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.update(Children)
				.set({
					motherId: motherId,
					fatherId: fatherId,
					updatedById: req.session.userId
				})
				.where("Id=:id", { id: kidId })
				.returning("*")
				.execute();
			return { data: result.raw[0] };
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
	}

	@Query(() => ChildrenResponse)
	@UseMiddleware(isAuth)
	@UseMiddleware(isKinderGardenSelected)
	async findChildById(
		@Arg("id", () => Int) id: number
	): Promise<ChildrenResponse> {
		let data: Children;
		try {
			data = await Children.findOneOrFail(id);
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

	@Mutation(() => ChildrenResponse)
	@UseMiddleware(isAuth)
	@UseMiddleware(isKinderGardenSelected)
	async createChild(
		@Arg("options") options: ChildrenInput,
		@Ctx() { req }: AppContext
	): Promise<ChildrenResponse> {
		let data;
		try {
			const response = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(Children)
				.values({
					Name: options.Name,
					Surname: options.Surname,
					BirthDate: options.BirthDate,
					createdById: req.session.userId,
					inKindergardenId: req.session.selectedKindergarden,
					Gender: options.Gender,
					OIB: options.OIB,
					Remarks: options.Remarks,
					motherId: options.mother,
					fatherId: options.father
				})
				.returning("*")
				.execute();
			data = response.raw[0];
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

	@Mutation(() => ChildrenResponse)
	@UseMiddleware(isAuth)
	@UseMiddleware(isKinderGardenSelected)
	async removeChildFromGroup(
		@Arg("Id", () => Int) Id: number
	): Promise<ChildrenResponse> {
		let data;
		try {
			data = await getConnection()
				.createQueryBuilder()
				.update(Children)
				.set({
					inGroupId: null
				})
				.where("Id=:id", { id: Id })
				.returning("*")
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
			data: data.raw[0]
		};
	}
}
