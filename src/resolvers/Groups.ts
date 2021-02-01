import { Groups } from "../entities/Groups";
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
import { isKinderGardenSelected } from "../middleware/isKindergardenSelected";

@ObjectType()
class GroupsFieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class GroupsResponse {
  @Field(() => [GroupsFieldError], { nullable: true })
  errors?: GroupsFieldError[];

  @Field(() => Groups, { nullable: true })
  groups?: Groups;
}

@Resolver(Groups)
export class GroupsResolver {
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
          inKindergarden: req.session.selectedKindergarden,
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
