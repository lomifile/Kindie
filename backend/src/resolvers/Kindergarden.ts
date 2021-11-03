import { KinderGarden } from "../entities/Kindergarden";
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
import { AppContext } from "../Types";
import { getConnection } from "typeorm";
import { KinderGardenInput } from "../utils/inputs/KindergardenInput";
import { FieldError } from "../utils/Errors";
import { StaffMembers } from "../entities/SatffMembers";

@ObjectType()
class KindergardenResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => KinderGarden, { nullable: true })
  kindergarden?: KinderGarden;
}

@Resolver(KinderGarden)
export class KindergardenResolver {
  @Query(() => KinderGarden)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  owner(@Ctx() { req }: AppContext) {
    return KinderGarden.findOne(req.session.selectedKindergarden);
  }

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
    let kindergarden = await KinderGarden.findOne({
      where: { Id: kindergardenId, owningId: req.session.userId },
    });

    if (kindergarden) {
      req.session.selectedKindergarden = kindergarden.Id;
    } else if (!kindergarden) {
      const result = await getConnection()
        .createQueryBuilder(KinderGarden, "kindergarden")
        .leftJoin(
          StaffMembers,
          "staff_members",
          `kindergarden."Id" = staff_members."kindergardenId" and staff_members."staffId" = :id`,
          { id: req.session.userId }
        )
        .where(`"kindergardenId" = :ID`, {
          ID: kindergardenId,
        })
        .getOne();

      if (!result || result === undefined)
        return {
          errors: [
            {
              field: "kindergardenID",
              message: "Kindergarden does not exist",
            },
          ],
        };

      kindergarden = result;
      req.session.selectedKindergarden = kindergarden?.Id;
    }

    return { kindergarden };
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteKindergarden(@Arg("id", () => Int) id: number): Promise<Boolean> {
    await KinderGarden.delete({ Id: id });
    return true;
  }
}
