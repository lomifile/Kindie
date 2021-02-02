import { Children } from "../entities/Children";
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
import { isKinderGardenSelected } from "../middleware/isKindergardenSelected";
import { isGroupSelected } from "../middleware/isGroupSelected";
import { getConnection } from "typeorm";
import { ChildrenInput } from "../utils/inputs/ChildrenInput";
import { AppContext } from "src/Types";

@ObjectType()
class ChildrenFieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class ChildrenResponse {
  @Field(() => [ChildrenFieldError], { nullable: true })
  errors?: ChildrenFieldError[];

  @Field(() => Children, { nullable: true })
  children?: Children;
}

@Resolver(Children)
export class ChildrenResolver {
  @Query(() => [Children])
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  @UseMiddleware(isGroupSelected)
  showChildrenFilterNotInGroup(): Promise<Children[]> {
    return Children.find({ where: { inGroup: null } });
  }

  @Query(() => [Children])
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  @UseMiddleware(isGroupSelected)
  showChildren(): Promise<Children[]> {
    return Children.find();
  }

  @Mutation(() => ChildrenResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  @UseMiddleware(isGroupSelected)
  async addChildrenToGroup(
    @Arg("kidId") kidId: number,
    @Ctx() { req }: AppContext
  ): Promise<ChildrenResponse> {
    let children;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Children)
        .set({
          inGroup: req.session.selectedGroup,
        })
        .where("Id=:id", { id: kidId })
        .returning("*")
        .execute();
      children = result.raw[0];
    } catch (err) {
      return {
        errors: [
          {
            field: "Id",
            message: "there is already kid with this Id",
          },
        ],
      };
    }
    return { children };
  }

  @Mutation(() => ChildrenResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async addKid(
    @Arg("options") options: ChildrenInput
  ): Promise<ChildrenResponse> {
    let children;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Children)
        .values({
          Name: options.Name,
          Surname: options.Surname,
          BirthDate: options.BirthDate,
          OIB: options.OIB,
          Remarks: options.Remarks,
          Gender: options.Gender,
          inGroup: null,
          mother: null,
          father: null,
        })
        .returning("*")
        .execute();
      children = result.raw[0];
    } catch (err) {
      return {
        errors: [
          {
            field: "Children",
            message: "There was an error",
          },
        ],
      };
    }

    return { children };
  }
}
