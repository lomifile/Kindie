import { Mother } from "../entities/Mother";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { isKinderGardenSelected } from "../middleware/isKindergardenSelected";
import { ParentsInput } from "../utils/inputs/ParentsInput";
import { getConnection } from "typeorm";
import { FieldError } from "../utils/Errors";
import { AppContext } from "src/Types";

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
      replacements.push(new Date(parseInt(cursor)));
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
      hasMore: mom.length === realLimitPlusOne,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async deleteMother(@Arg("motherId") motherId: number) {
    await Mother.delete(motherId);
    return true;
  }

  @Mutation(() => MotherResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async updateMother(
    @Arg("options") options: ParentsInput,
    @Arg("motherId") motherId: number
  ): Promise<MotherResponse> {
    let mother;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Mother)
        .set({
          Name: options.name,
          Surname: options.surname,
          Email: options.email,
          Phone: options.phone,
        })
        .where("Id=:id", { id: motherId })
        .returning("*")
        .execute();
      mother = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "Children",
              message: "There was an error",
            },
          ],
        };
      }
    }
    return { mother };
  }

  @Mutation(() => Mother)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async addMother(
    @Arg("options") options: ParentsInput,
    @Ctx() { req }: AppContext
  ): Promise<Mother> {
    return Mother.create({
      Name: options.name,
      Surname: options.surname,
      Email: options.email,
      Phone: options.phone,
      inKindergardenId: req.session.selectedKindergarden,
    }).save();
  }
}
