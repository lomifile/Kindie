import { KinderGarden } from "../entities/Kindergarden";
import {
  Arg,
  Ctx,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
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
  @Query(() => KinderGarden)
  @UseMiddleware(isAuth)
  selectedKindergarden(@Ctx() { req }: AppContext) {
    if (!req.session.selectedKindergarden) {
      return null;
    }

    return KinderGarden.findOne(req.session.selectedKindergarden);
  }

  @Mutation(() => KindergardenResponse)
  @UseMiddleware(isAuth)
  async useKindergarden(
    @Arg("kindergadenID") kindergardenId: number,
    @Ctx() { req }: AppContext
  ): Promise<KindergardenResponse> {
    const kindergarden = await KinderGarden.findOne({
      where: { Id: kindergardenId, userId: req.session.userId },
    });
    if (!kindergarden) {
      return {
        errors: [
          {
            field: "id",
            message: "Kindergarden with given id doesn't exist",
          },
        ],
      };
    }

    req.session.selectedKindergarden = kindergarden.Id;

    return { kindergarden };
  }

  @Query(() => [KinderGarden])
  @UseMiddleware(isAuth)
  async showKindergarden(
    @Ctx() { req }: AppContext
  ): Promise<KinderGarden[] | null> {
    return await KinderGarden.find({ where: `"userId"=${req.session.userId}` });
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
          userId: req.session.userId,
          City: options.city,
          Zipcode: options.Zipcode,
          Address: options.address,
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
