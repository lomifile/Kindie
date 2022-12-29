import { Mother } from "@orm/entities";
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
import { isKinderGardenSelected, isAuth } from "@middleware/index";
import { ParentsInput } from "@graphql/inputs";
import { getConnection, getRepository } from "typeorm";
import { validateMotherFather } from "@graphql/validators";
import { FieldError } from "@utils/Errors";

@ObjectType()
class MotherResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Mother, { nullable: true })
	mother?: Mother;
}

@ObjectType()
class PaginatedMother {
	@Field(() => [Mother])
	mother: Mother[];

	@Field()
	hasMore: boolean;
}

@Resolver(Mother)
export class MotherResolver {
	@Query(() => PaginatedMother)
	@UseMiddleware(isAuth)
	@UseMiddleware(isKinderGardenSelected)
	async showMother(
		@Arg("limit", () => Int) limit: number,
		@Arg("cursor", () => String, { nullable: true }) cursor: string | null,
		@Ctx() { req }: AppContext
	): Promise<PaginatedMother> {
		const realLimit = Math.min(20, limit);
		const realLimitPlusOne = realLimit + 1;

		const replacements: any[] = [realLimitPlusOne];
		replacements.push(req.session.selectedKindergarden);

		if (cursor) {
			replacements.push(cursor);
		}

		const mom = await getConnection().query(
			`
      select m.*
      from mother m
      inner join public."kinder_garden" k on k."Id" = m."inKindergardenId"
      where k."Id" = $2
      ${cursor ? `and m."createdAt" < $3` : ""}
      order by m."createdAt" DESC
      limit $1
    `,
			replacements
		);

		return {
			mother: mom.slice(0, realLimit),
			hasMore: mom.length === realLimitPlusOne
		};
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	@UseMiddleware(isKinderGardenSelected)
	async deleteMother(@Arg("motherId", () => Int) motherId: number) {
		await Mother.delete(motherId);
		return true;
	}

	@Mutation(() => MotherResponse)
	@UseMiddleware(isAuth)
	@UseMiddleware(isKinderGardenSelected)
	async updateMother(
		@Arg("options") options: ParentsInput,
		@Arg("motherId", () => Int) motherId: number,
		@Ctx() { req }: AppContext
	): Promise<MotherResponse> {
		let mother;
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
				.where("Id = :id", { id: motherId })
				.returning("*")
				.execute();
			mother = result.raw[0];
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
			mother
		};
	}

	@Mutation(() => MotherResponse)
	@UseMiddleware(isAuth)
	@UseMiddleware(isKinderGardenSelected)
	async addMother(
		@Arg("options") options: ParentsInput,
		@Ctx() { req }: AppContext
	): Promise<MotherResponse> {
		let mother;
		try {
			const errors = validateMotherFather(options);
			if (errors) {
				return { errors };
			}

			mother = await Mother.create({
				Name: options.name,
				Surname: options.surname,
				Email: options.email,
				Phone: options.phone,
				inKindergardenId: req.session.selectedKindergarden,
				createdById: req.session.userId
			}).save();
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
			mother
		};
	}

	@Query(() => Mother)
	@UseMiddleware(isAuth)
	@UseMiddleware(isKinderGardenSelected)
	findMother(
		@Arg("id", () => Int) id: number,
		@Ctx() { req }: AppContext
	): Promise<Mother | undefined> {
		return Mother.findOne({
			where: {
				Id: id,
				inKindergardenId: req.session.selectedKindergarden
			}
		});
	}

	// TODO: Rewrite this function fully
	@Query(() => [Mother])
	@UseMiddleware(isAuth)
	@UseMiddleware(isKinderGardenSelected)
	async filterMother(
		@Arg("text", () => String) text: string,
		@Ctx() { req }: AppContext
	): Promise<Mother[] | undefined> {
		if (text === ".") {
			return Mother.find({
				where: {
					inKindergardenId: req.session.selectedKindergarden
				}
			});
		}
		return await getRepository(Mother)
			.createQueryBuilder()
			.where(
				`"Name" = :name or "Surname" = :lastName and "inKindergardenId" = :id`,
				{
					name: text,
					lastName: text,
					id: req.session.selectedKindergarden
				}
			)
			.getMany();
	}

	@Query(() => [Mother])
	@UseMiddleware(isAuth)
	@UseMiddleware(isKinderGardenSelected)
	async searchMother(
		@Arg("text", () => String) text: string,
		@Ctx() { req }: AppContext
	): Promise<Mother[] | undefined> {
		return !Mother.find({
			where: {
				Name: text,
				inKindergardenId: req.session.selectedKindergarden
			}
		})
			? Mother.find({
					where: {
						Surname: text,
						inKindergardenId: req.session.selectedKindergarden
					}
			  })
			: Mother.find({
					where: {
						Name: text,
						inKindergardenId: req.session.selectedKindergarden
					}
			  });
	}
}
