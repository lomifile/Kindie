import { Father } from "../../orm/entities";
import { isKinderGardenSelected, isAuth } from "../../middleware";
import { ParentsInput } from "../inputs";
import {
    Arg,
    Ctx,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import PaginatedResponse from "../../utils/paginatedResponseObject";
// import Response from "../../utils/repsonseObject";

@ObjectType()
class PaginatedFather extends PaginatedResponse<Father>(Father) {}
// class FatherResponse extends Response<Father>(Father) {}

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
      select 
        f."Id",
        f."Name",
        f."Surname",
        f."Email", 
        f."Phone", 
        f."createdById", 
        f."updatedById", 
        f."createdAt", 
        f."updatedAt", 
        f."inKindergardenId"
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
            data: father.slice(0, realLimit),
            hasMore: father.length === realLimitPlusOne
        };
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
                updatedById: req.session.userId
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
            createdById: req.session.userId
        }).save();
    }

    @Query(() => [Father])
    @UseMiddleware(isAuth)
    @UseMiddleware(isKinderGardenSelected)
    async filterFather(
        @Arg("text", () => String) text: string,
        @Ctx() { req }: AppContext
    ): Promise<Father[]> {
        const query = await getConnection()
            .createQueryBuilder(Father, "f")
            .select()
            .where(
                `document_with_weights @@ to_tsquery(concat(:query::text,':*')) and f."inKindergardenId" = :id`,
                {
                    query: text,
                    id: req.session.selectedKindergarden
                }
            )
            .orderBy(
                "ts_rank(document_with_weights, to_tsquery(concat(:query::text,':*')))",
                "DESC"
            )
            .getMany();
        return query;
    }

    // @Mutation(() => FatherResponse)
    // @UseMiddleware(isAuth)
    // @UseMiddleware(isKinderGardenSelected)
    // async archiveFather(
    //   @Arg("Id", () => Int!) Id: number
    // ): Promise<FatherResponse> {
    //   try {
    //     const data = await getConnection()
    //       .createQueryBuilder(Father, "f")
    //       .update()
    //       .set({
    //         archived: new Date(),
    //       })
    //       .where("Id = :id", { id: Id })
    //       .returning("*")
    //       .execute();
    //     return { data: data.raw[0] };
    //   } catch (err) {
    //     return {
    //       errors: [
    //         {
    //           field: err.field,
    //           message: err.message,
    //         },
    //       ],
    //     };
    //   }
    // }
}
