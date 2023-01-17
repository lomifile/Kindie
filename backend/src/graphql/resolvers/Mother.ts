import { Mother } from "@orm/entities";
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
import { isKinderGardenSelected, isAuth } from "@middleware/index";
import { ParentsInput } from "@graphql/inputs";
import { getConnection } from "typeorm";
import { validateMotherFather } from "@graphql/validators";
import { LogAction } from "@root/middleware/LogAction";
import PaginatedResponse from "@root/utils/paginatedResponseObject";
import Response from "@root/utils/repsonseObject";
import BooleanResponse from "@root/utils/booleanResponseObject";
import ManyResponse from "@root/utils/manyResponseObject";

@ObjectType()
class PaginatedMother extends PaginatedResponse<Mother>(Mother) {}

@ObjectType()
class MotherResponse extends Response<Mother>(Mother) {}

@ObjectType()
class MotherBooleanResponse extends BooleanResponse() {}

@ObjectType()
class MotherArrayResponse extends ManyResponse<Mother>(Mother) {}

@Resolver(Mother)
export class MotherResolver {
	@Query(() => PaginatedMother)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async listMother(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Ctx() { req }: AppContext
	): Promise<PaginatedMother> {
		const realLimit = Math.min(10, limit);
		const realLimitPlusOne = realLimit + 1;

		const replacements: any[] = [realLimitPlusOne];
		replacements.push(req.session.selectedKindergarden);

		if (cursor) {
			replacements.push(cursor);
		}

		let data: any[];
		try {
			const response = await getConnection().query(
				`
			select 
				m."Id" ,
				m."Name" ,
				m."Surname" ,
				m."Email" ,
				m."Phone" 
			from mother m 	
			inner join public."kinder_garden" k on k."Id" = m."inKindergardenId"
			where k."Id" = $2
			${cursor ? `and m."createdAt" < $3` : ""}
			order by m."createdAt" DESC
			limit $1
			`,
				replacements
			);
			data = response;
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

	@Mutation(() => MotherBooleanResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async deleteMother(
		@Arg("id", () => Int) id: number
	): Promise<MotherBooleanResponse> {
		let response;
		try {
			response = await getConnection()
				.createQueryBuilder(Mother, "m")
				.softDelete()
				.where(`Id = :id`, { id: id })
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

	@Mutation(() => MotherResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async updateMother(
		@Arg("options") options: ParentsInput,
		@Arg("id", () => Int) id: number,
		@Ctx() { req }: AppContext
	): Promise<MotherResponse> {
		let data;
		try {
			const errors = validateMotherFather(options);
			if (errors) return { errors };
			const result = await getConnection()
				.createQueryBuilder()
				.update(Mother)
				.set({
					Name: options.name,
					Surname: options.surname,
					Email: options.email,
					Phone: options.phone,
					updatedById: req.session.userId
				})
				.where("Id = :id", { id: id })
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

	@Mutation(() => MotherResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async insertMother(
		@Arg("options") options: ParentsInput,
		@Ctx() { req }: AppContext
	): Promise<MotherResponse> {
		let data;
		try {
			const errors = validateMotherFather(options);
			if (errors) {
				return { errors };
			}
			const response = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(Mother)
				.values({
					Name: options.name,
					Surname: options.surname,
					Phone: options.phone,
					Email: options.email,
					createdById: req.session.userId,
					inKindergardenId: req.session.selectedKindergarden
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

	@Query(() => MotherResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async getMotherById(
		@Arg("id", () => Int) id: number,
		@Ctx() { req }: AppContext
	): Promise<MotherResponse> {
		let data;
		try {
			data = await Mother.findOneOrFail({
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

	@Query(() => MotherArrayResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async searchMother(
		@Arg("text", () => String) text: string,
		@Ctx() { req }: AppContext
	): Promise<MotherArrayResponse> {
		let data: Mother[];
		try {
			data = await getConnection()
				.createQueryBuilder(Mother, "m")
				.select()
				.where(
					`document_with_weights @@ to_tsquery(concat(:query::text,':*')) and m."inKindergardenId" = :id`,
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
}
