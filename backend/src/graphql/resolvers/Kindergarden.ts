import { KinderGarden } from "../../orm/entities";
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
import { isKinderGardenSelected, isAuth } from "../../middleware";
import { getConnection } from "typeorm";
import { KinderGardenInput } from "../inputs";
import { StaffMembers } from "../../orm/entities/StaffMembers";
import Response from "../../utils/repsonseObject";
import PaginatedResponse from "../../utils/paginatedResponseObject";

@ObjectType()
class KindergardenResponse extends Response<KinderGarden>(KinderGarden) {}

@ObjectType()
class KindergardenPaginatedResponse extends PaginatedResponse<KinderGarden>(
    KinderGarden
) {}

@Resolver(KinderGarden)
export class KindergardenResolver {
    @Query(() => KinderGarden)
    @UseMiddleware(isAuth)
    @UseMiddleware(isKinderGardenSelected)
    owner(@Ctx() { req }: AppContext) {
        return KinderGarden.findOne(req.session.selectedKindergarden);
    }

    // TODO: Rewrite this function with better errors
    // Maybe separete, need to figure out if we need to store Id in session or not
    @Mutation(() => KindergardenResponse)
    @UseMiddleware(isAuth)
    async useKindergarden(
        @Arg("kindergadenID") kindergardenId: number,
        @Ctx() { req }: AppContext
    ): Promise<KindergardenResponse> {
        let kindergarden = await KinderGarden.findOne({
            where: { Id: kindergardenId, owningId: req.session.userId }
        });

        if (kindergarden) {
            req.session.selectedKindergarden = kindergarden.Id;
        } else {
            try {
                const result = await getConnection()
                    .createQueryBuilder(KinderGarden, "kindergarden")
                    .leftJoin(
                        StaffMembers,
                        "staff_members",
                        `kindergarden."Id" = staff_members."kindergardenId" and staff_members."staffId" = :id`,
                        { id: req.session.userId }
                    )
                    .where(`"kindergardenId" = :ID `, {
                        ID: kindergardenId
                    })
                    .getOne();

                kindergarden = result;
                req.session.selectedKindergarden = kindergarden!.Id;
            } catch (err) {
                return {
                    errors: [
                        {
                            field: err.name,
                            message: err.message
                        }
                    ]
                };
            }
        }

        return { data: kindergarden };
    }

    @Query(() => KindergardenPaginatedResponse)
    @UseMiddleware(isAuth)
    async showKindergarden(
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
        @Ctx() { req }: AppContext
    ): Promise<KindergardenPaginatedResponse> {
        let data;
        let realLimit = Math.min(10, limit);
        let reallimitPlusOne = realLimit + 1;

        try {
            const replacements: any[] = [reallimitPlusOne];
            replacements.push(req.session.userId);

            if (cursor) {
                replacements.push(cursor);
            }

            const query = await getConnection().query(
                `
                select 
                    k."Id"
                    , k."Name"
                    , k."Address"
                    , k."City"
                    , k."Zipcode"
                    , k."owningId" 
                from 
                    kinder_garden 
                k 
                inner join 
                    public.user u 
                on 
                    k."owningId" = $2 
                ${cursor ? `where k."createdAt" < $3` : ""} order by 2 limit $1
        `,
                replacements
            );
            data = query;
        } catch (err) {
            return {
                errors: [
                    {
                        field: err.name,
                        message: err.message
                    }
                ]
            };
        }

        return {
            data: data.slice(0, realLimit),
            hasMore: data.length === reallimitPlusOne
        };
    }

    @Mutation(() => KindergardenResponse)
    @UseMiddleware(isAuth)
    async createKindergarden(
        @Arg("options") options: KinderGardenInput,
        @Ctx() { req }: AppContext
    ): Promise<KindergardenResponse> {
        let kindergarden;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(KinderGarden)
                .values({
                    Name: options.name,
                    owningId: req.session.userId,
                    City: options.city,
                    Zipcode: options.Zipcode,
                    Address: options.address
                })
                .returning("*")
                .execute();
            kindergarden = result.raw[0];
        } catch (err) {
            return {
                errors: [
                    {
                        field: err.name,
                        message: err.message
                    }
                ]
            };
        }
        return { data: kindergarden };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteKindergarden(
        @Arg("id", () => Int) id: number
    ): Promise<Boolean | KindergardenResponse> {
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .softDelete()
                .from(KinderGarden, "k")
                .where({
                    Id: id
                })
                .execute();
            if (result.affected! > 0) {
                return true;
            }
        } catch (err) {
            return {
                errors: [
                    {
                        field: err.name,
                        message: err.message
                    }
                ]
            };
        }
        return false;
    }
}
