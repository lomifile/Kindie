import { testConn } from "../helpers/testConn";
import { Connection } from "typeorm";
import { gCall } from "../helpers/gCall";

let conn: Connection;

beforeAll(async () => {
	conn = await testConn();
});

afterAll(async () => {
	await conn.close();
});

// const gErrorObject = (field: string, message: string) => [
// 	{
// 		field,
// 		message
// 	}
// ];

describe("Create test", () => {
	const createAttendanceMutation = `
	mutation CreateAttendance($childId: Int!, $complete: Boolean!) {
		createAttendance(childId:$childId, complete:$complete) {
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

	test("[gCall] -> Should fail child doesn't exist by this id", async () => {
		const response = await gCall({
			source: createAttendanceMutation,
			userId: 1,
			selectedKindergarden: 1,
			selectedGroup: 1,
			variableValues: {
				childId: 1242131,
				complete: false
			}
		});

		expect(response.data?.createAttendance.data).toBeNull();
		expect(response.data?.createAttendance.errors.length).toBe(1);
		expect(response.data?.createAttendance.errors[0].field).toContain(
			"childId"
		);
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: createAttendanceMutation,
			variableValues: {
				childId: 3,
				complete: true
			},
			userId: 1,
			selectedKindergarden: 1,
			selectedGroup: 1
		});

		expect(response.data?.createAttendance.errors).toBeNull();
		expect(response.data?.createAttendance.data).toHaveProperty("Id");
	});
});

describe("Mark attendance test", () => {
	const markAttendanceMutation = `
		mutation MarkAttendance($id: Int!) {
			markAttendance(id: $id) {
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

	test("[gCall] -> Should fail id is not correct", async () => {
		const response = await gCall({
			source: markAttendanceMutation,
			userId: 1,
			selectedGroup: 1,
			selectedKindergarden: 1,
			variableValues: {
				id: 127381923
			}
		});

		expect(response.data?.markAttendance.data).toBeNull();
		expect(response.data?.markAttendance.errors).toBeNull();
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: markAttendanceMutation,
			userId: 1,
			selectedGroup: 1,
			selectedKindergarden: 1,
			variableValues: {
				id: 1
			}
		});

		expect(response.data?.markAttendance.data).toHaveProperty("Id");
		expect(response.data?.markAttendance.errors).toBeNull();
	});
});

describe("List attendance test", () => {
	const listAttendanceQuery = `
	query ListAttedance($limit: Int!, $cursor: String, $marked: Boolean) {
		listAttendance(limit: $limit, cursor: $cursor, marked: $marked) {
		  data {
			Id
			childId
			groupId
			kindergardenId
			attendance
			deletedAt
		  }
		  errors {
			field
			message
		  }
		}
	  }
	  
	`;

	test("[gCall] -> Should pass with empty array and hasMore false", async () => {
		const response = await gCall({
			source: listAttendanceQuery,
			userId: 1,
			selectedGroup: 1,
			selectedKindergarden: 1,
			variableValues: {
				limit: 10
			}
		});

		expect(response.data?.listAttendance.data).toMatchObject([]);
		expect(response.data?.listAttendance.hasMore).toBeFalsy();
		expect(response.data?.listAttendance.errors).toBeNull();
	});

	test("[gCall] -> Should pass with array length 1 and hasMore false", async () => {
		const response = await gCall({
			source: listAttendanceQuery,
			userId: 1,
			selectedGroup: 1,
			selectedKindergarden: 1,
			variableValues: {
				limit: 10,
				marked: true
			}
		});

		expect(response.data?.listAttendance.data).toHaveLength(1);
		expect(response.data?.listAttendance.hasMore).toBeFalsy();
		expect(response.data?.listAttendance.errors).toBeNull();
	});
});

describe("Delete test", () => {
	const deleteAttendanceMutation = `
		mutation DeleteAttendance($id: Int!) {
			deleteAttendance(id: $id) {
				result
				errors {
					field
					message
				}
			}
		}
	`;
	test("[gCall] -> Should fail id doesn't exist", async () => {
		const response = await gCall({
			source: deleteAttendanceMutation,
			userId: 1,
			selectedGroup: 1,
			selectedKindergarden: 1,
			variableValues: {
				id: 12345123
			}
		});

		expect(response.data?.deleteAttendance.result).toBeFalsy();
		expect(response.data?.deleteAttendance.errors).toBeNull();
	});

	test("[gCall] -> Should fail pass", async () => {
		const response = await gCall({
			source: deleteAttendanceMutation,
			userId: 1,
			selectedGroup: 1,
			selectedKindergarden: 1,
			variableValues: {
				id: 1
			}
		});

		expect(response.data?.deleteAttendance.result).toBeTruthy();
		expect(response.data?.deleteAttendance.errors).toBeNull();
	});
});
