import { Children } from "../entities/Children";
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

@ObjectType()
class PaginatedChildren {
  @Field(() => [Children])
  children: Children[];

  @Field()
  hasMore: boolean;
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

  @Query(() => PaginatedChildren)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async showChildrenFilterNotInGroup(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: AppContext
  ): Promise<PaginatedChildren> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];
    replacements.push(req.session.selectedKindergarden);

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const child = await getConnection().query(
      `
      select c.*
      from children c
      inner join public."kinder_garden" k on k."Id" = c."inKindergardenId" 
      where k."Id" = $2 and c."inGroupId" is null
      ${cursor ? `and c."createdAt" < $3` : ""}
      order by c."createdAt" DESC
      limit $1
      `,
      replacements
    );

    return {
      children: child.slice(0, realLimit),
      hasMore: child.length === realLimitPlusOne,
    };
  }

  @Query(() => PaginatedChildren)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  @UseMiddleware(isGroupSelected)
  async showChildrenFilterInGroup(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: AppContext
  ): Promise<PaginatedChildren> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];
    replacements.push(req.session.selectedKindergarden);
    replacements.push(req.session.selectedGroup);

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const child = await getConnection().query(
      `
      select c.*
      from children c
      inner join public."kinder_garden" k on k."Id" = c."inKindergardenId" where k."Id" = $2 and c."inGroupId" = $3
      ${cursor ? `and c."createdAt" < $4` : ""}
      order by c."createdAt" DESC
      limit $1
      `,
      replacements
    );

    return {
      children: child.slice(0, realLimit),
      hasMore: child.length === realLimitPlusOne,
    };
  }

  @Query(() => [Children])
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  @UseMiddleware(isGroupSelected)
  showChildren(
    @Arg("text") text: string,
    @Ctx() { req }: AppContext
  ): Promise<Children[]> {
    if (text === ".") {
      return Children.find({
        where: {
          inKindergardenId: req.session.selectedKindergarden,
          inGroupId: null,
        },
      });
    }
    return Children.find({
      where: {
        Name: text,
        inKindergardenId: req.session.selectedKindergarden,
        inGroupId: null,
      },
    });
  }

  @Mutation(() => Children, { nullable: true })
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  @UseMiddleware(isGroupSelected)
  async addChildToGroup(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: AppContext
  ): Promise<Children | undefined> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Children)
      .set({
        inGroupId: req.session.selectedGroup,
      })
      .where("Id=:id", { id: id })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Children, { nullable: true })
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async updateChild(
    @Arg("kidId", () => Int) kidId: number,
    @Arg("options") options: ChildrenInput
  ): Promise<Children | undefined> {
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
    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async deleteChildren(@Arg("id", () => Int) id: number): Promise<Boolean> {
    await Children.delete({ Id: id });
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

  @Query(() => Children, { nullable: true })
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  findChild(@Arg("id", () => Int) id: number): Promise<Children | undefined> {
    return Children.findOne({ Id: id });
  }

  @Mutation(() => Children)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async createChild(
    @Arg("options") options: ChildrenInput,
    @Ctx() { req }: AppContext
  ): Promise<Children> {
    return Children.create({
      Name: options.Name,
      Surname: options.Surname,
      BirthDate: options.BirthDate,
      OIB: options.OIB,
      Remarks: options.Remarks,
      Gender: options.Gender,
      motherId: options.mother,
      fatherId: options.father,
      inKindergardenId: req.session.selectedChildren,
    }).save();
  }

  @Mutation(() => ChildrenResponse)
  async useChildren(@Ctx() { req }: AppContext): Promise<ChildrenResponse> {
    //@ts-ignore
    const children = await Children.findOne({
      where: {
        inKindergardenId: req.session.selectedKindergarden,
      },
    });

    req.session.selectedChildren = req.session.selectedKindergarden;
    return { children };
  }
}
