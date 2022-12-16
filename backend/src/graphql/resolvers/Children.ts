import { Children } from "../../orm/entities";
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
import {
    isKinderGardenSelected,
    isAuth,
    isGroupSelected
} from "../../middleware";
import { getConnection } from "typeorm";
import { ChildrenInput } from "../inputs";
import Response from "../../utils/repsonseObject";
import PaginatedResponse from "../../utils/paginatedResponseObject";

@ObjectType()
class ChildrenResponse extends Response<Children>(Children) {}

@ObjectType()
class PaginatedChildren extends PaginatedResponse<Children>(Children) {}

@Resolver(Children)
export class ChildrenResolver {
    @Query(() => PaginatedChildren)
    @UseMiddleware(isAuth)
    @UseMiddleware(isKinderGardenSelected)
    async showChildren(
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
        @Arg("inGroup", () => Int, { nullable: true }) inGroup: number,
        @Ctx() { req }: AppContext
    ): Promise<PaginatedChildren> {
        const realLimit = Math.min(20, limit);
        const realLimitPlusOne = realLimit + 1;

        const replacements: any[] = [realLimitPlusOne];
        replacements.push(req.session.selectedKindergarden);

        if (inGroup) {
            replacements.push(inGroup);
        }

        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }

        const child = await getConnection().query(
            `
        select 
        c."Id"
        , c."Name"
        , c."Surname"
        , c."Gender"
        , c."BirthDate"
        , c."OIB"
        , c."Remarks"
        , c."createdAt"
        , c."updatedAt"
        , c."motherId"
        , c."fatherId"
        , c."inGroupId"
        , c."inKindergardenId"
        , c."createdById"
        , c."updatedById"
        from children c
        inner join public."kinder_garden" k 
        on k."Id" = c."inKindergardenId" where k."Id" = $2 and c."inGroupId" ${
            inGroup ? " = $3" : "is null"
        }
        ${cursor ? `and c."createdAt" < $4` : ""}
        order by c."createdAt" DESC
        limit $1
      `,
            replacements
        );

        return {
            data: child.slice(0, realLimit),
            hasMore: child.length === realLimitPlusOne
        };
    }

    @Query(() => [Children])
    @UseMiddleware(isAuth)
    @UseMiddleware(isKinderGardenSelected)
    async filterChildren(
        @Arg("text") text: string,
        @Ctx() { req }: AppContext
    ): Promise<Children[]> {
        const query = await getConnection()
            .createQueryBuilder(Children, "c")
            .select()
            .where(
                `document_with_weights @@ to_tsquery(concat(:query::text,':*')) and c."inKindergardenId" = :id`,
                { query: text, id: req.session.selectedKindergarden }
            )
            .orderBy(
                "ts_rank(document_with_weights, to_tsquery(concat(:query::text,':*')))",
                "DESC"
            )
            .getMany();
        return query;
    }

    @Mutation(() => ChildrenResponse, { nullable: true })
    @UseMiddleware(isAuth)
    @UseMiddleware(isKinderGardenSelected)
    @UseMiddleware(isGroupSelected)
    async addChildToGroup(
        @Arg("id", () => Int) id: number,
        @Ctx() { req }: AppContext
    ): Promise<ChildrenResponse> {
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .update(Children)
                .set({
                    inGroupId: req.session.selectedGroup,
                    updatedById: req.session.userId
                })
                .where("Id=:id", { id: id })
                .returning("*")
                .execute();
            return { data: result.raw[0] };
        } catch (err) {
            return {
                errors: [
                    {
                        field: err.field,
                        message: err.message
                    }
                ]
            };
        }
    }

    @Mutation(() => ChildrenResponse, { nullable: true })
    @UseMiddleware(isAuth)
    @UseMiddleware(isKinderGardenSelected)
    async updateChild(
        @Arg("kidId", () => Int) kidId: number,
        @Arg("options") options: ChildrenInput,
        @Ctx() { req }: AppContext
    ): Promise<ChildrenResponse> {
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
                    updatedById: req.session.userId
                })
                .where("Id=:id", { id: kidId })
                .returning("*")
                .execute();
            return {
                data: result.raw[0]
            };
        } catch (err) {
            return {
                errors: [
                    {
                        field: err.field,
                        message: err.message
                    }
                ]
            };
        }
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
        @Arg("kidId", () => Int) kidId: number,
        @Arg("motherId", () => Int, { nullable: true }) motherId: number,
        @Arg("fatherId", () => Int, { nullable: true }) fatherId: number,
        @Ctx() { req }: AppContext
    ): Promise<ChildrenResponse> {
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .update(Children)
                .set({
                    motherId: motherId,
                    fatherId: fatherId,
                    updatedById: req.session.userId
                })
                .where("Id=:id", { id: kidId })
                .returning("*")
                .execute();
            return { data: result.raw[0] };
        } catch (err) {
            return {
                errors: [
                    {
                        field: err.field,
                        message: err.message
                    }
                ]
            };
        }
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
            createdById: req.session.userId
        }).save();
    }

    @Mutation(() => Children, { nullable: true })
    @UseMiddleware(isAuth)
    @UseMiddleware(isKinderGardenSelected)
    @UseMiddleware(isGroupSelected)
    async removeChildFromGroup(
        @Arg("Id", () => Int) Id: number
    ): Promise<Children | undefined> {
        const result = await getConnection()
            .createQueryBuilder()
            .update(Children)
            .set({
                inGroupId: null
            })
            .where("Id=:id", { id: Id })
            .returning("*")
            .execute();
        return result.raw[0];
    }
}
