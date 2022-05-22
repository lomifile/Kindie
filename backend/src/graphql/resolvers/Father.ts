import { Father } from "../entities/Father";
import { isAuth } from "../../middleware/isAuth";
import { isKinderGardenSelected } from "../../middleware/isKindergardenSelected";
import { ParentsInput } from "../inputs/ParentsInput";
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
import { getConnection, getRepository } from "typeorm";

// @ObjectType()
// class FatherResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];

//   @Field(() => Father, { nullable: true })
//   father?: Father;
// }

@ObjectType()
class PaginatedFather {
  @Field(() => [Father])
  father: Father[];

  @Field()
  hasMore: boolean;
}

@Resolver(Father)
export class FatherResolver {
  @Query(() => PaginatedFather)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async showFather(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: AppContext
  ): Promise<PaginatedFather> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];
    replacements.push(req.session.selectedKindergarden);

    if (cursor) {
      replacements.push(cursor);
    }

    const father = await getConnection().query(
      `
      select f.*
      from father f
      inner join public."kinder_garden" k on k."Id" = f."inKindergardenId"
      where k."Id" = $2
      ${cursor ? `and f."createdAt" < $3` : ""}
      order by f."createdAt" DESC
      limit $1
    `,
      replacements
    );

    return {
      father: father.slice(0, realLimit),
      hasMore: father.length === realLimitPlusOne,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async deleteFather(@Arg("fatherId", () => Int) fatherId: number) {
    await Father.delete(fatherId);
    return true;
  }

  @Mutation(() => Father)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async updateFather(
    @Arg("options") options: ParentsInput,
    @Arg("fatherId", () => Int) fatherId: number,
    @Ctx() { req }: AppContext
  ): Promise<Father | undefined> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Father)
      .set({
        Name: options.name,
        Surname: options.surname,
        Email: options.email,
        Phone: options.phone,
        updatedById: req.session.userId,
      })
      .where("Id=:id", { id: fatherId })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Father)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async addFather(
    @Arg("options") options: ParentsInput,
    @Ctx() { req }: AppContext
  ): Promise<Father> {
    return Father.create({
      Name: options.name,
      Surname: options.surname,
      Email: options.email,
      Phone: options.phone,
      inKindergardenId: req.session.selectedKindergarden,
      createdById: req.session.userId,
    }).save();
  }

  @Query(() => Father)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  findFather(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: AppContext
  ): Promise<Father | undefined> {
    return Father.findOne({
      where: {
        Id: id,
        inKindergardenId: req.session.selectedKindergarden,
      },
    });
  }

  @Query(() => [Father])
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async filterFather(
    @Arg("text", () => String) text: string,
    @Ctx() { req }: AppContext
  ): Promise<Father[] | undefined> {
    if (text === ".") {
      return Father.find({
        where: {
          inKindergardenId: req.session.selectedKindergarden,
        },
      });
    }
    return await getRepository(Father)
      .createQueryBuilder()
      .where(
        `"Name" = :name or "Surname" = :lastName and "inKindergardenId" = :id`,
        {
          name: text,
          lastName: text,
          id: req.session.selectedKindergarden,
        }
      )
      .getMany();
  }

  @Query(() => [Father])
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  async searchFather(
    @Arg("text", () => String) text: string,
    @Ctx() { req }: AppContext
  ): Promise<Father[] | undefined> {
    return !Father.find({
      where: { Name: text, inKindergardenId: req.session.selectedKindergarden },
    })
      ? Father.find({
          where: {
            Surname: text,
            inKindergardenId: req.session.selectedKindergarden,
          },
        })
      : Father.find({
          where: {
            Name: text,
            inKindergardenId: req.session.selectedKindergarden,
          },
        });
  }
}
