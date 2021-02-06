import { Father } from "../entities/Father";
import { isAuth } from "../middleware/isAuth";
import { isKinderGardenSelected } from "../middleware/isKindergardenSelected";
import { ParentsInput } from "../utils/inputs/ParentsInput";
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { FieldError } from "../utils/Errors";

@ObjectType()
class FatherResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Father, { nullable: true })
  father?: Father;
}

@Resolver(Father)
export class FatherResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async deleteFather(@Arg("fatherId") fatherId: number) {
    await Father.delete(fatherId);
    return true;
  }

  @Mutation(() => FatherResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async updateFather(
    @Arg("options") options: ParentsInput,
    @Arg("fatherId") fatherId: number
  ): Promise<FatherResponse> {
    let father;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Father)
        .set({
          Name: options.name,
          Surname: options.surname,
          Email: options.email,
          Phone: options.phone,
        })
        .where("Id=:id", { id: fatherId })
        .returning("*")
        .execute();
      father = result.raw[0];
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
    return { father };
  }

  @Mutation(() => FatherResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async addFather(
    @Arg("options") options: ParentsInput
  ): Promise<FatherResponse> {
    let father;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Father)
        .values({
          Name: options.name,
          Surname: options.surname,
          Email: options.email,
          Phone: options.phone,
        })
        .returning("*")
        .execute();
      father = result.raw[0];
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
    return { father };
  }
}
