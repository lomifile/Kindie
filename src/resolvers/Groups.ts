import { Groups } from "../entities/Groups";
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
import { isKinderGardenSelected } from "../middleware/isKindergardenSelected";
import { FieldError } from "../utils/Errors";

@ObjectType()
class GroupsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Groups, { nullable: true })
  groups?: Groups;
}

@Resolver(Groups)
export class GroupsResolver {
  @Query(() => Groups, { nullable: true })
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  showSelectedGroup(@Ctx() { req }: AppContext) {
    if (!req.session.selectedGroup) {
      return null;
    }

    return Groups.findOne({ where: { Id: req.session.selectedGroup } });
  }

  @Mutation(() => GroupsResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async useGroup(
    @Arg("groupId") groupId: number,
    @Ctx() { req }: AppContext
  ): Promise<GroupsResponse> {
    const groups = await Groups.findOne({
      where: {
        Id: groupId,
        inKindergardenId: req.session.selectedKindergarden,
      },
    });

    if (!groups) {
      return {
        errors: [
          {
            field: "Id",
            message: "There is no group by this ID",
          },
        ],
      };
    }

    req.session.selectedGroup = groups.Id;

    return { groups };
  }

  @Query(() => [Groups])
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  showGroups(@Ctx() { req }: AppContext): Promise<Groups[] | null> {
    return Groups.find({
      where: { inKindergardenId: req.session.selectedKindergarden },
    });
  }

  @Mutation(() => GroupsResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async createGroup(@Arg("name") name: string, @Ctx() { req }: AppContext) {
    let groups;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Groups)
        .values({
          Name: name,
          inKindergardenId: req.session.selectedKindergarden,
        })
        .returning("*")
        .execute();
      groups = result.raw[0];
    } catch (err) {
      return {
        errors: [
          {
            field: "Groups",
            message: "There was an error",
          },
        ],
      };
    }
    return { groups };
  }
}
