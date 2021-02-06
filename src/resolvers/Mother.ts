import { Mother } from "../entities/Mother";
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { isKinderGardenSelected } from "../middleware/isKindergardenSelected";
import { ParentsInput } from "../utils/inputs/ParentsInput";
import { getConnection } from "typeorm";
import { FieldError } from "../utils/Errors";

@ObjectType()
class MotherResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Mother, { nullable: true })
  mother?: Mother;
}

@Resolver(Mother)
export class MotherResolver {
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

  @Mutation(() => MotherResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async addMother(
    @Arg("options") options: ParentsInput
  ): Promise<MotherResponse> {
    let mother;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Mother)
        .values({
          Name: options.name,
          Surname: options.surname,
          Email: options.email,
          Phone: options.phone,
        })
        .returning("*")
        .execute();
      mother = result.raw[0];
    } catch (err) {
      return {
        errors: [
          {
            field: "Children",
            message: "There was an error",
          },
        ],
      };
    }

    return { mother };
  }
}
