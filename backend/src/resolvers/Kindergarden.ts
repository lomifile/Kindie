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
    let kindergarden = await KinderGarden.findOne({
      where: { Id: kindergardenId, owningId: req.session.userId },
    });

    if (kindergarden) {
      req.session.selectedKindergarden = kindergarden.Id;
    } else if (!kindergarden) {
      const replacements: any = [];
      replacements.push(req.session.userId);
      replacements.push(kindergardenId);
      const result = await getConnection().query(
        `select * from kinder_garden 
        left join staff_members 
        on kinder_garden."Id" = staff_members."kindergardenId" 
        and staff_members."userId" = $1 where "kindergardenId"=$2`,
        replacements
      );
      kindergarden = result[0];
      // @ts-ignore
      req.session.selectedKindergarden = kindergarden.Id;
    }

    return { kindergarden };
  }

  @Query(() => KinderGarden)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async showKinderGardenStaff(
    @Ctx() { req }: AppContext
  ): Promise<KinderGarden | undefined> {
    return await KinderGarden.findOne({
      where: {
        Id: req.session.selectedKindergarden,
      },
    });
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
  clearKindergarden(@Ctx() { req }: AppContext) {
    if (req.session.selectedKindergarden) {
      req.session.selectedKindergarden = NaN;
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteKindergarden(@Arg("id", () => Int) id: number): Promise<Boolean> {
    await KinderGarden.delete({ Id: id });
    return true;
  }
}
