import { KinderGarden } from "../../orm/entities";
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
import { isKinderGardenSelected, isAuth } from "../../middleware";
import { getConnection } from "typeorm";
import { KinderGardenInput } from "../inputs";
import { FieldError } from "../../utils/Errors";
import { StaffMembers } from "../../orm/entities/StaffMembers";

// TODO: Refactor Kindergarden resolver

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

  // TODO: Remove this function
  @Query(() => KinderGarden, { nullable: true })
  @UseMiddleware(isAuth)
  selectedKindergarden(@Ctx() { req }: AppContext) {
    if (!req.session.selectedKindergarden) {
      return null;
    }

    return KinderGarden.findOne(req.session.selectedKindergarden);
  }

  // TODO: Rewrite this function with better errors
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
        .where(`"kindergardenId" = :ID `, {
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
      req.session.selectedKindergarden = kindergarden!.Id;
    }

    return { kindergarden };
  }

  // TODO: Rewrite function as pagination or better retrun type
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
            field: err.name,
            message: err.message,
          },
        ],
      };
    }
    return { kindergarden };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteKindergarden(@Arg("id", () => Int) id: number): Promise<Boolean> {
    return (await (
      await KinderGarden.delete({ Id: id })
    ).affected)
      ? true
      : false;
  }
}
