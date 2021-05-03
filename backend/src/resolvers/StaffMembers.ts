import { isAuth } from "../middleware/isAuth";
import { isKinderGardenSelected } from "../middleware/isKindergardenSelected";
import { AppContext } from "../Types";
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { StaffMembers } from "../entities/SatffMembers";

@Resolver(StaffMembers)
export class StaffMembersResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async addStaff(
    @Arg("userId", () => Int) userId: number,
    @Ctx() { req }: AppContext
  ) {
    const kindergardenId = req.session.selectedKindergarden;
    const user = await StaffMembers.findOne({
      where: {
        userId,
        kindergardenId,
      },
    });
    if (user) {
      return false;
    }
    await StaffMembers.create({
      userId: userId,
      kindergardenId: kindergardenId,
    }).save();
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async deleteStaff(
    @Arg("userId", () => Int) userId: number
  ): Promise<Boolean> {
    await StaffMembers.delete({
      userId: userId,
    });
    return true;
  }
}
