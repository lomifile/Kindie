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

@ObjectType()
class MotherFieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class MotherResponse {
  @Field(() => [MotherFieldError], { nullable: true })
  errors?: MotherFieldError[];

  @Field(() => Mother, { nullable: true })
  mother?: Mother;
}

@Resolver(Mother)
export class MotherResolver {
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
