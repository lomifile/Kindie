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
import { AppContext } from "../Types";
import { FieldError } from "../utils/Errors";

@ObjectType()
class ChildrenResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Children, { nullable: true })
  children?: Children;
}

@Resolver(Children)
export class ChildrenResolver {
  /**
   * Possible paginate
   */

  @Query(() => [Children])
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  @UseMiddleware(isGroupSelected)
  showChildrenFilterNoParents(): Promise<Children[]> {
    return Children.find({ where: { mother: null, father: null } });
  }

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
          inGroupId: req.session.selectedGroup,
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
  async updateKid(
    @Arg("kidId") kidId: number,
    @Arg("options") options: ChildrenInput
  ) {
    let children;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Children)
        .set({
          Name: options.Name,
          Surname: options.Surname,
          BirthDate: options.BirthDate,
          OIB: options.OIB,
          Remarks: options.Remarks,
          Gender: options.Gender,
        })
        .where("Id=:id", { id: kidId })
        .returning("*")
        .execute();
      children = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "Children",
              message: "There was an error",
            },
          ],
        };
      }
    }
    return { children };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async deleteChildern(@Arg("kidId") kidId: number): Promise<Boolean> {
    await Children.delete(kidId);
    return true;
  }

  @Mutation(() => ChildrenResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async updateChildernParents(
    @Arg("kidId") kidId: number,
    @Arg("motherId") motherId: number,
    @Arg("fatherId") fatherId: number
  ) {
    let children;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Children)
        .set({
          motherId: motherId,
          fatherId: fatherId,
        })
        .where("Id=:id", { id: kidId })
        .returning("*")
        .execute();
      children = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "Children",
              message: "There was an error",
            },
          ],
        };
      }
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
          motherId: options.mother,
          fatherId: options.father,
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
