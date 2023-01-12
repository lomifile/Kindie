import { Father } from "@orm/entities";
import { isKinderGardenSelected, isAuth } from "@middleware/index";
import { ParentsInput } from "@graphql/inputs";
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
import PaginatedResponse from "@utils/paginatedResponseObject";
import Response from "@utils/repsonseObject";
import { validateMotherFather } from "@graphql/validators";
import { LogAction } from "@root/middleware/LogAction";
import ManyResponse from "@root/utils/manyResponseObject";
import BooleanResponse from "@root/utils/booleanResponseObject";

@ObjectType()
class PaginatedFather extends PaginatedResponse<Father>(Father) {}

@ObjectType()
class FatherResponse extends Response<Father>(Father) {}

@ObjectType()
class FatherArrayResponse extends ManyResponse<Father>(Father) {}

@ObjectType()
class FatherBooleanResponse extends BooleanResponse() {}

@Resolver(Father)
export class FatherResolver {
	@Query(() => PaginatedFather)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async listFather(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Ctx() { req }: AppContext
	): Promise<PaginatedFather> {
		const realLimit = Math.min(10, limit);
		const realLimitPlusOne = realLimit + 1;

		const replacements: any[] = [realLimitPlusOne];
		replacements.push(req.session.selectedKindergarden);

		if (cursor) {
			replacements.push(cursor);
		}
		let response: Father[];
		try {
			response = await getConnection().query(
				`
				select 
					f."Id",
					f."Name",
					f."Surname",
					f."Email", 
					f."Phone"
				from father f
				inner join public."kinder_garden" k on k."Id" = f."inKindergardenId"
				where k."Id" = $2
				${cursor ? `and f."createdAt" < $3` : ""}
				order by f."createdAt" DESC
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
			data: response.slice(0, realLimit),
			hasMore: response.length === realLimitPlusOne
		};
	}

	@Query(() => FatherResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async getFatherById(
		@Arg("id", () => Int) id: number,
		@Ctx() { req }: AppContext
	): Promise<FatherResponse> {
		let data: Father;
		try {
			data = await Father.findOneOrFail({
				where: {
					Id: id,
					inKindergardenId: req.session.selectedKindergarden
				}
			});
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

	@Mutation(() => FatherResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async updateFather(
		@Arg("options") options: ParentsInput,
		@Arg("fatherId", () => Int) fatherId: number,
		@Ctx() { req }: AppContext
	): Promise<FatherResponse> {
		let data;
		try {
			const errors = validateMotherFather(options);
			if (errors) return { errors };
			const result = await getConnection()
				.createQueryBuilder()
				.update(Father)
				.set({
					Name: options.name,
					Surname: options.surname,
					Email: options.email,
					Phone: options.phone,
					updatedById: req.session.userId
				})
				.where("Id=:id", { id: fatherId })
				.returning("*")
				.execute();
			data = result.raw[0];
		} catch (err) {
			return {
				errors: [{ field: err.name, message: err.message }]
			};
		}
		return {
			data
		};
	}

	@Mutation(() => FatherResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async insertFather(
		@Arg("options") options: ParentsInput,
		@Ctx() { req }: AppContext
	): Promise<FatherResponse> {
		let data;
		try {
			const errors = validateMotherFather(options);
			if (errors) return { errors };
			data = await Father.create({
				Name: options.name,
				Surname: options.surname,
				Email: options.email,
				Phone: options.phone,
				inKindergardenId: req.session.selectedKindergarden,
				createdById: req.session.userId
			}).save();
		} catch (err) {
			return {
				errors: [{ field: err.name, message: err.message }]
			};
		}
		return {
			data
		};
	}

	@Query(() => FatherArrayResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async searchFather(
		@Arg("text", () => String) text: string,
		@Ctx() { req }: AppContext
	): Promise<FatherArrayResponse> {
		let data: Father[];
		try {
			data = await getConnection()
				.createQueryBuilder(Father, "f")
				.select()
				.where(
					`document_with_weights @@ to_tsquery(concat(:query::text,':*')) and f."inKindergardenId" = :id`,
					{
						query: text,
						id: req.session.selectedKindergarden
					}
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

	@Mutation(() => FatherBooleanResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async deleteFather(
		@Arg("Id", () => Int!) Id: number
	): Promise<FatherBooleanResponse> {
		let response: UpdateResult;
		try {
			response = await getConnection()
				.createQueryBuilder(Father, "f")
				.softDelete()
				.where(`Id = :id`, { id: Id })
				.execute();
		} catch (err) {
			return {
				result: false,
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
