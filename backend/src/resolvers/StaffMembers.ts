import { isAuth } from "../middleware/isAuth";
import { isKinderGardenSelected } from "../middleware/isKindergardenSelected";
import { AppContext } from "../Types";
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
import { StaffMembers } from "../entities/SatffMembers";
import { FieldError } from "../utils/Errors";
import { getConnection } from "typeorm";

@ObjectType()
class StaffResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => StaffMembers, { nullable: true })
  staff?: StaffMembers;
}

@Resolver(StaffMembers)
export class StaffMembersResolver {
  @Mutation(() => StaffResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async addStaff(
    @Arg("userId", () => Int) userId: number,
    @Arg("role", () => String) role: string,
    @Ctx() { req }: AppContext
  ): Promise<StaffResponse> {
    let staff;
    const user = await StaffMembers.findOne({
      where: {
        staffId: userId,
        kindergardenId: req.session.selectedKindergarden,
      },
    });

    if (user) {
      return {
        errors: [
          {
            field: "user id",
            message: "User already is part of staff",
          },
        ],
      };
    }

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(StaffMembers)
        .values({
          staffId: userId,
          kindergardenId: req.session.selectedKindergarden,
          role,
        })
        .returning("*")
        .execute();

      staff = result.raw[0];
    } catch (err) {
      return {
        errors: [
          {
            field: "StaffMembers insert",
            message: "There was an error while inserting.",
          },
        ],
      };
    }

    return {
      staff,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async deleteStaff(
    @Arg("userId", () => Int) userId: number
  ): Promise<Boolean> {
    await StaffMembers.delete({
      staffId: userId,
    });
    return true;
  }

  @Query(() => [StaffMembers])
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async showStaff(
    @Ctx() { req }: AppContext
  ): Promise<StaffMembers[] | undefined> {
    return StaffMembers.find({
      where: {
        kindergardenId: req.session.selectedKindergarden,
      },
    });
  }

  @Query(() => StaffMembers)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async filterStaff(
    @Ctx() { req }: AppContext
  ): Promise<StaffMembers | undefined> {
    return await StaffMembers.findOne({
      where: {
        staffId: req.session.userId,
        kindergardenId: req.session.selectedKindergarden,
      },
    });
  }
}
