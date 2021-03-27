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

    await StaffMembers.insert({
      userId: userId,
      kindergardenId: kindergardenId,
    });
    return true;
  }
}
