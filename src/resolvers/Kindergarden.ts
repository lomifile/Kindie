import { KinderGarden } from "../entities/Kindergarden";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { AppContext } from "../Types";
import { getConnection } from "typeorm";
import { KinderGardenInput } from "../utils/inputs/KindergardenInput";

@ObjectType()
class KindergardenFieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class KindergardenResponse {
  @Field(() => [KindergardenFieldError], { nullable: true })
  errors?: KindergardenFieldError[];

  @Field(() => KinderGarden, { nullable: true })
  kindergarden?: KinderGarden;
}

@Resolver(KinderGarden)
export class KindergardenResolver {
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
          userId: req.session.userId,
        })
        .returning("*")
        .execute();
      kindergarden = result.raw[0];
    } catch (err) {
      return {
        errors: [
          {
            field: "Kindergarden",
            message: "There was an error",
          },
        ],
      };
    }
    return { kindergarden };
  }
}
