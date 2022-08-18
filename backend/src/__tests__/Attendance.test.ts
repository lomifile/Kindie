import { testConn } from "../helpers/testConn";
import { Connection } from "typeorm";
import { AttendanceResolver } from "../graphql/resolvers";

let conn: Connection;
const resolver = new AttendanceResolver();

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

describe("Create test", () => {
  test("Should fail child doesn't exist by this id", async () => {
    const ctx = {
      req: {
        session: {
          userId: 1,
          selectedKindergarden: 1,
          selectedGroup: 1,
        },
      },
    } as AppContext;
    const response = await resolver.createAttendacne(1, ctx);
    expect(response).toHaveProperty("errors");
  });
});

describe("Mark attendance test", () => {
  test("Mark attendance test", async () => {
    const response = await resolver.markAttendance(174);
    expect(response).toHaveProperty("errors");
    expect(response.errors![0].message).toBe(
      "There is no attendance by this Id"
    );
  });
});

describe("Select test", () => {
  test("Should return array with 0 length and hasMore to be false", async () => {
    const response = await resolver.showAllAttendance(10, null);
    expect(response.data).toHaveLength(0);
    expect(response.hasMore).toBeFalsy();
  });
});

describe("Delete test", () => {
  test("Delete test", async () => {
    const response = await resolver.delete(1);
    expect(response).toBeTruthy();
  });
});
