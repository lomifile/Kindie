import { KinderGarden } from "@orm/entities";
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
import { UpdateResult, getConnection } from "typeorm";
import { KinderGardenInput } from "@graphql/inputs";
import Response from "@utils/repsonseObject";
import PaginatedResponse from "@utils/paginatedResponseObject";
import { LogAction } from "@root/middleware/LogAction";
import BooleanResponse from "@root/utils/booleanResponseObject";

@ObjectType()
class KindergardenResponse extends Response<KinderGarden>(KinderGarden) {}

@ObjectType()
class KindergardenPaginatedResponse extends PaginatedResponse<KinderGarden>(
	KinderGarden
) {}

@ObjectType()
class KindergardenBooleanResponse extends BooleanResponse() {}

@Resolver(KinderGarden)
export class KindergardenResolver {
	@Query(() => KindergardenResponse)
	@UseMiddleware(isAuth, LogAction)
	async getKindergardenById(
		@Arg("id", () => Int) id: number
	): Promise<KindergardenResponse> {
		let data: KinderGarden;
		try {
			data = await KinderGarden.findOneOrFail(id);
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

	@Query(() => KindergardenResponse)
	@UseMiddleware(isAuth, isKinderGardenSelected, LogAction)
	async getOwner(@Ctx() { req }: AppContext): Promise<KindergardenResponse> {
		let data: KinderGarden;
		try {
			data = await KinderGarden.findOneOrFail(
				req.session.selectedKindergarden
			);
		} catch (err) {
			return {
				errors: [{ field: err.name, message: err.message }]
			};
		}
		return {
			data
		};
	}

	@Mutation(() => KindergardenResponse)
	@UseMiddleware(isAuth, LogAction)
	async useKindergarden(
		@Arg("id") id: number,
		@Ctx() { req }: AppContext
	): Promise<KindergardenResponse> {
		let data: KinderGarden | undefined;
		try {
			data = await KinderGarden.findOne({
				where: { Id: id, owningId: req.session.userId }
			});

			if (data) {
				req.session.selectedKindergarden = data.Id;
			} else {
				data = await getConnection().query(
					`
                        select 
                        from kinder_garden k
                        left join 
                            staff_members sm
                        on 
                            k."Id" = sm."kindergardenId"
                        and
                            sm."staffId" = $1
                        where sm."kindergardenId" = $2
                        limit 1
                    `,
					[req.session.userId, id]
				);
				if (data) throw new Error("Kindergarden doesn't exist");
				req.session.selectedKindergarden = data!.Id;
			}
		} catch (err) {
			return {
				errors: [{ field: err.name, message: err.message }]
			};
		}
		return { data };
	}

	@Query(() => KindergardenPaginatedResponse)
	@UseMiddleware(isAuth, LogAction)
	async listKindergarden(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Ctx() { req }: AppContext
	): Promise<KindergardenPaginatedResponse> {
		let data;
		const realLimit = Math.min(10, limit);
		const reallimitPlusOne = realLimit + 1;

		try {
			const replacements: any[] = [reallimitPlusOne];
			replacements.push(req.session.userId);

			if (cursor) {
				replacements.push(cursor);
			}

			const query = await getConnection().query(
				`
                select 
                    k."Id"
                    , k."Name"
                    , k."Address"
                    , k."City"
                    , k."Zipcode"
                    , k."owningId" 
                from 
                    kinder_garden 
                k 
                inner join 
                    public.user u 
                on 
                    k."owningId" = $2 
                ${cursor ? `where k."createdAt" < $3` : ""} order by 2 limit $1
        `,
				replacements
			);
			data = query;
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
			hasMore: data.length === reallimitPlusOne
		};
	}

	@Mutation(() => KindergardenResponse)
	@UseMiddleware(isAuth, LogAction)
	async createKindergarden(
		@Arg("options") options: KinderGardenInput,
		@Ctx() { req }: AppContext
	): Promise<KindergardenResponse> {
		let kindergarden;
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(KinderGarden)
				.values({
					Name: options.name,
					owningId: req.session.userId,
					City: options.city,
					Zipcode: options.Zipcode,
					Address: options.address
				})
				.returning("*")
				.execute();
			kindergarden = result.raw[0];
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
		return { data: kindergarden };
	}

	@Mutation(() => KindergardenBooleanResponse)
	@UseMiddleware(isAuth, LogAction)
	async deleteKindergarden(
		@Arg("id", () => Int) id: number
	): Promise<KindergardenBooleanResponse> {
		let response: UpdateResult;
		try {
			response = await getConnection()
				.createQueryBuilder()
				.softDelete()
				.from(KinderGarden, "k")
				.where({
					Id: id
				})
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
