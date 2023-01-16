import { isAuth } from "@root/middleware";
import { ActivityLog } from "@root/orm/entities/ActivityLog";
import PaginatedResponse from "@root/utils/paginatedResponseObject";
import {
	Arg,
	Int,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";

@ObjectType()
class PaginatedActivityLogResponse extends PaginatedResponse<ActivityLog>(
	ActivityLog
) {}

@Resolver(ActivityLog)
export class ActivityLogResolver {
	private constructWhere(params: {
		[key: string]: string | number | undefined;
	}): { where: string; idx: number; depArray: any[] } {
		let where = "";
		const field = Object.keys(params);
		const values = Object.values(params);
		const depArray = [];
		let idx = 1;
		for (let i = 0; i < field.length; i++) {
			if (values[i]) {
				where += ` and "${field[i]}" = $${idx} `;
				depArray.push(values[i]);
				idx++;
			}
		}
		return { where, idx, depArray };
	}

	@Query(() => PaginatedActivityLogResponse)
	@UseMiddleware(isAuth)
	async showActivity(
		@Arg("limit", () => Int) limit: number,
		@Arg("createdAt", () => String, { nullable: true }) createdAt: string,
		@Arg("kindergardenId", () => Int, { nullable: true })
		kindergardenId?: number,
		@Arg("userId", () => Int, { nullable: true }) userId?: number,
		@Arg("groupId", () => Int, { nullable: true }) groupId?: number
	): Promise<PaginatedActivityLogResponse> {
		let data;
		const realLimit = Math.min(20, limit);
		const realLimitPlusOne = realLimit + 1;

		try {
			const where = this.constructWhere({
				userId,
				groupId,
				kindergardenId,
				createdAt
			});
			const response = await getConnection().query(
				`
                select * from (
                    select
                        al.id,
                        al."userId",
                        al."kindergardenId",
                        al."groupId",
                        al.action,
                        al."createdAt"
                    from public.activity_log as al
                ) as q where 1=1 ${where.where} limit $${where.idx}
            `,
				[...where.depArray, realLimitPlusOne]
			);
			data = response;
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
			data,
			hasMore: data.length === realLimitPlusOne
		};
	}
}
