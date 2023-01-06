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
import { getConnection } from "typeorm";
import { KinderGardenInput } from "@graphql/inputs";
import Response from "@utils/repsonseObject";
import PaginatedResponse from "@utils/paginatedResponseObject";
import { LogAction } from "@root/middleware/LogAction";

@ObjectType()
class KindergardenResponse extends Response<KinderGarden>(KinderGarden) {}

@ObjectType()
class KindergardenPaginatedResponse extends PaginatedResponse<KinderGarden>(
	KinderGarden
) {}

@Resolver(KinderGarden)
export class KindergardenResolver {
	@Query(() => KinderGarden)
	@UseMiddleware(isAuth)
	@UseMiddleware(isKinderGardenSelected)
	owner(@Ctx() { req }: AppContext) {
		return KinderGarden.findOne(req.session.selectedKindergarden);
	}

	@Mutation(() => KindergardenResponse)
	@UseMiddleware(isAuth)
	async useKindergarden(
		@Arg("kindergadenID") kindergardenId: number,
		@Ctx() { req }: AppContext
	): Promise<KindergardenResponse> {
		let kindergarden = await KinderGarden.findOne({
			where: { Id: kindergardenId, owningId: req.session.userId }
		});

		if (kindergarden) {
			req.session.selectedKindergarden = kindergarden.Id;
		} else {
			try {
				kindergarden = await getConnection().query(
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
					[req.session.userId, kindergardenId]
				);
				if (kindergarden) throw new Error("Kindergarden doesn't exist");
				req.session.selectedKindergarden = kindergarden!.Id;
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
		}

		return { data: kindergarden };
	}

	@Query(() => KindergardenPaginatedResponse)
	@UseMiddleware(isAuth, LogAction)
	async showKindergarden(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Ctx() { req }: AppContext
	): Promise<KindergardenPaginatedResponse> {
		let data;
		let realLimit = Math.min(10, limit);
		let reallimitPlusOne = realLimit + 1;

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
	@UseMiddleware(isAuth)
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

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async deleteKindergarden(
		@Arg("id", () => Int) id: number
	): Promise<Boolean | KindergardenResponse> {
		try {
			const result = await getConnection()
				.createQueryBuilder()
				.softDelete()
				.from(KinderGarden, "k")
				.where({
					Id: id
				})
				.execute();
			if (result.affected! > 0) {
				return true;
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
		return false;
	}
}
