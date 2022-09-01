import Response from "../../utils/repsonseObject";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Attendance, Children } from "../../orm/entities";
import {
  isAuth,
  isGroupSelected,
  isKinderGardenSelected,
} from "../../middleware";
import PaginatedResponse from "../../utils/paginatedResponseObject";
import { getConnection } from "typeorm";

@ObjectType()
class AttedanceResponse extends Response<Attendance>(Attendance) {}

@ObjectType()
class PaginatedAttendacne extends PaginatedResponse<Attendance>(Attendance) {}

@Resolver(Attendance)
export class AttendanceResolver {
  @Query(() => PaginatedAttendacne)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  @UseMiddleware(isGroupSelected)
  async showAllAttendance(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String) cursor: string | null
  ): Promise<PaginatedAttendacne> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(cursor);
    }

    const attendance = await getConnection().query(
      `
      select 
        a."Id"
        , a."childId"
        , a."groupId"
        , a."kindergardenId"
        , a.attendance
        , a."createdAt"
        , a."updatedAt"
        , a."groupsId" 
      from
        attendance a 
      left join "kinder_garden" k on k."Id" = a."kindergardenId"
      left join groups g on g."inKindergardenId" = k."Id"
      ${cursor ? `where a."createdAt" < $2` : ""}
      order by a."createdAt" limit $1
    `,
      replacements
    );

    return {
      data: attendance.slice(0, realLimit),
      hasMore: attendance.length === realLimitPlusOne,
    };
  }

  @Mutation(() => AttedanceResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  @UseMiddleware(isGroupSelected)
  async createAttendacne(
    @Arg("childId", () => Int) childId: number,
    @Ctx() { req }: AppContext,
    @Arg("complete", { nullable: true }) complete?: boolean
  ): Promise<AttedanceResponse> {
    const child = await Children.findOne({ where: { Id: childId } });
    if (!child) {
      return {
        errors: [
          {
            field: "childId",
            message: "Child doesn't exist by this id",
          },
        ],
      };
    }

    const attendance = await Attendance.create({
      childId,
      attendance: complete ?? false,
      kindergardenId: req.session.selectedKindergarden,
      groupId: req.session.selectedGroup,
    }).save();

    return {
      data: attendance,
    };
  }

  @Mutation(() => AttedanceResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  @UseMiddleware(isGroupSelected)
  async markAttendance(
    @Arg("attendanceId", () => Int) attendanceId: number
  ): Promise<AttedanceResponse> {
    let data: Attendance;
    const attendance = await Attendance.findOne({ Id: attendanceId });
    if (!attendance) {
      return {
        errors: [
          {
            field: "attendanceId",
            message: "There is no attendance by this Id",
          },
        ],
      };
    }
    if (attendance.createdAt !== new Date())
      return {
        errors: [
          { field: "Attendance", message: "Attendance cannot be marked" },
        ],
      };
    try {
      const response = await getConnection()
        .createQueryBuilder()
        .update(Attendance)
        .set({
          attendance: true,
        })
        .where(`"Id"=:id`, { attendanceId })
        .returning("*")
        .execute();
      data = response.raw[0];
    } catch (err) {
      return {
        errors: [
          {
            field: err.field,
            message: err.message,
          },
        ],
      };
    }

    return {
      data,
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isKinderGardenSelected)
  @UseMiddleware(isGroupSelected)
  async delete(
    @Arg("attendanceId", () => Int) attendanceId: number
  ): Promise<boolean> {
    const result = await Attendance.delete({ Id: attendanceId });

    if (!result.raw[0]) {
      return true;
    }
    return false;
  }
}
