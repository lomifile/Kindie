import { KinderGarden } from "../entities/Kindergarden";
import {
  Arg,
  Ctx,
  Field,
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
import { FieldError } from "../utils/Errors";
import { isKinderGardenSelected } from "../middleware/isKindergardenSelected";

@ObjectType()
class KindergardenResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => KinderGarden, { nullable: true })
  kindergarden?: KinderGarden;
}

@Resolver(KinderGarden)
export class KindergardenResolver {
  @Query(() => KinderGarden, { nullable: true })
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
      where: { Id: kindergardenId, owningId: req.session.userId },
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
  @UseMiddleware(isKinderGardenSelected)
  async showKinderGardenStaff(): Promise<KinderGarden[]> {
    return await KinderGarden.find({ relations: ["staff"] });

    // let kindergarden;
    // try {
    //   const result = await getConnection()
    //     .createQueryBuilder()
    //     .select("*")
    //     .from(KinderGarden, "kindergarden")
    //     .leftJoinAndSelect("staff_members.kindergardenId", "kindergardenId")
    //     .getMany();
    //   console.log(result);
    // } catch (err) {
    //   console.log(err);
    // }
  }

  @Query(() => [KinderGarden])
  @UseMiddleware(isAuth)
  async showKindergarden(
    @Ctx() { req }: AppContext
  ): Promise<KinderGarden[] | null> {
    return await KinderGarden.find({
      where: { owningId: req.session.userId },
    });
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
