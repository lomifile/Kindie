import { testConn } from "../helpers/testConn";
import { Connection } from "typeorm";
import { AttendanceResolver } from "../graphql/resolvers";
import { gCall } from "../helpers/gCall";

let conn: Connection;
const resolver = new AttendanceResolver();

beforeAll(async () => {
	conn = await testConn();
});

afterAll(async () => {
	await conn.close();
});

const gErrorObject = (field: string, message: string) => [
	{
		field,
		message
	}
];

describe("Create test", () => {
	const createAttendacneMutation = `
	mutation CreateAttendance($childId: Int!, $complete: Boolean!) {
		createAttendacne(childId:$childId, complete:$complete) {
		  data {
			Id
			childId
			groupId
			kindergardenId
		  }
		  errors {
			field
			message
		  }
		}
	  }
	`;

	test("Should fail child doesn't exist by this id", async () => {
		const ctx = {
			req: {
				session: {
					userId: 1,
					selectedKindergarden: 1,
					selectedGroup: 1
				}
			}
		} as AppContext;
		const response = await resolver.createAttendacne(1, ctx);
		expect(response).toHaveProperty("errors");
	});

	test("[gCall] -> Should fail childId doesn't exist", async () => {
		const response = await gCall({
			source: createAttendacneMutation,
			variableValues: {
				childId: 1,
				complete: true
			},
			userId: 1,
			selectedKindergarden: 1,
			selectedGroup: 1
		});

		expect(response.data?.createAttendacne).toHaveProperty("errors");
		expect(typeof response.data?.createAttendacne.errors[0]).toBe("object");
		expect(response.data?.createAttendacne.errors).toMatchObject(
			gErrorObject("childId", "Child doesn't exist by this id")
		);
		expect(response.data?.createAttendacne.errors[0].field).toBe("childId");
	});
});

describe("Mark attendance test", () => {
	test("Mark attendance test", async () => {
		const response = await resolver.markAttendance(174);
		expect(response).toHaveProperty("errors");
		expect(response.errors?.[0].message).toBe(
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
