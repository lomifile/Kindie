import { testConn } from "../helpers/testConn";
import { Connection } from "typeorm";
import { KinderGarden } from "../orm/entities";
import { faker } from "@faker-js/faker";
import { gCall } from "../helpers/gCall";

let conn: Connection;
let kindergarden: KinderGarden;

const gErrorObject = (field: string, message: string) => [
	{
		field,
		message
	}
];

beforeAll(async () => {
	conn = await testConn();
	kindergarden = await KinderGarden.create({
		Name: faker.company.name(),
		Address: faker.address.streetAddress(),
		owningId: 1,
		City: faker.address.cityName(),
		Zipcode: parseInt(faker.address.zipCode())
	}).save();
});

afterAll(async () => {
	await conn.close();
});

describe("Create group test", () => {
	const createGroupMutation = `
	mutation CreateGroup($name: String!){
		createGroup(name:$name) {
		  groups {
			Id
			Name
		  }
		  errors{
			field
			message
		  }
		}
	  }
	`;

	test("[gCall] -> Should fail user is not in session", async () => {
		const response = await gCall({
			source: createGroupMutation,
			variableValues: {
				name: "Testing"
			}
		});

		expect(typeof response.errors).toBe("object");
		expect(response.errors?.[0].message).toContain("Not authenticated");
		expect(response.data).toBeNull();
	});

	test("[gCall] -> Should fail selected kindergarden is undefined", async () => {
		const response = await gCall({
			source: createGroupMutation,
			variableValues: {
				name: "Testing"
			},
			userId: 1
		});

		expect(response.data).toBeNull();
		expect(typeof response.errors).toBe("object");
		expect(response.errors?.[0].message).toContain(
			"Kindergraden not selected"
		);
	});

	// test("[gCall] -> Should fail name is empty", async () => {
	// 	const response = await gCall({
	// 		source: createGroupMutation,
	// 		variableValues: {
	// 			name: ""
	// 		},
	// 		userId: 1,
	// 		selectedKindergarden: kindergarden.Id
	// 	});

	// 	console.log(response);
	// 	expect(response.data).toBeNull();
	// 	expect(typeof response.errors).toBe("object");
	// });

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: createGroupMutation,
			variableValues: {
				name: "Testing"
			},
			userId: 1,
			selectedKindergarden: kindergarden.Id
		});

		expect(response.data?.createGroup.errors).toBeNull();
		expect(typeof response.data?.createGroup.groups).toBe("object");
		expect(response.data?.createGroup.groups).toHaveProperty("Id");
	});
});

describe("Show groups test", () => {
	const showGroupsQuery = `
	query ShowGroups {
		showGroups {
		  Id
		  Name
		}
	  }
	`;

	test("[gCall] -> Should fail user is not in session", async () => {
		const response = await gCall({
			source: showGroupsQuery
		});

		expect(typeof response.errors).toBe("object");
		expect(response.errors?.[0].message).toContain("Not authenticated");
		expect(response.data).toBeNull();
	});

	test("[gCall] -> Should fail selected kindergarden is undefined", async () => {
		const response = await gCall({
			source: showGroupsQuery,
			userId: 1
		});

		expect(response.data).toBeNull();
		expect(typeof response.errors).toBe("object");
		expect(response.errors?.[0].message).toContain(
			"Kindergraden not selected"
		);
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: showGroupsQuery,
			userId: 1,
			selectedKindergarden: kindergarden.Id
		});

		expect(typeof response.data?.showGroups).toBe("object");
		expect(Array.isArray(response.data?.showGroups)).toBeTruthy();
		expect(response.data?.showGroups[0]).toHaveProperty("Id");
	});
});

describe("Show selected group", () => {
	const showSelectedGroupQuery = `
	query ShowSelectedGroup {
		showSelectedGroup {
		  Id
		  Name
		}
	  }
	`;

	test("[gCall] -> Should fail because group is not set in session", async () => {
		const response = await gCall({
			source: showSelectedGroupQuery,
			userId: 1,
			selectedKindergarden: kindergarden.Id
		});

		expect(response.data?.showSelectedGroup).toBeNull();
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: showSelectedGroupQuery,
			userId: 1,
			selectedKindergarden: kindergarden.Id,
			selectedGroup: 1
		});

		expect(typeof response.data?.showSelectedGroup).toBe("object");
		expect(response.data?.showSelectedGroup).toHaveProperty("Id");
	});
});

describe("Use group tests", () => {
	const useGroupMutation = `
	mutation UseGroup($id: Float!) {
		useGroup(groupId: $id) {
		  groups {
			Id
			Name
		  }
		  errors {
			field
			message
		  }
		}
	  }
	`;

	test("[gCall] -> Should fail group doesn't exist", async () => {
		const response = await gCall({
			source: useGroupMutation,
			userId: 1,
			selectedKindergarden: kindergarden.Id,
			variableValues: {
				id: 32
			}
		});

		expect(response.data?.useGroup.groups).toBeNull();
		expect(typeof response.data?.useGroup.errors).toBe("object");
		expect(response.data?.useGroup.errors).toMatchObject(
			gErrorObject("Id", "There is no group by this ID")
		);
	});

	test("[gCall] -> Should fail kindergaredn doesn't match", async () => {
		const response = await gCall({
			source: useGroupMutation,
			variableValues: {
				id: 1
			},
			userId: 1,
			selectedKindergarden: 1
		});

		expect(response.data?.useGroup.groups).toBeNull();
		expect(typeof response.data?.useGroup.errors).toBe("object");
		expect(response.data?.useGroup.errors).toMatchObject(
			gErrorObject("Id", "There is no group by this ID")
		);
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: useGroupMutation,
			variableValues: {
				id: 1
			},
			userId: 1,
			selectedKindergarden: kindergarden.Id
		});
		expect(response.data?.useGroup.errors).toBeNull();
		expect(response.data?.useGroup.groups).toHaveProperty("Id");
	});
});

describe("Clear group", () => {
	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: `
				mutation ClearGroup {
					clearGroup
				}
			`,
			userId: 1,
			selectedKindergarden: kindergarden.Id,
			selectedGroup: 1
		});

		expect(response.data?.clearGroup).toBeTruthy();
	});
});

describe("Delete group", () => {
	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: `
			mutation DeleteGroup($id: Int!) {
				deleteGroup(id: $id)
			  }
			`,
			userId: 1,
			selectedKindergarden: kindergarden.Id,
			variableValues: {
				id: 1
			}
		});

		expect(response.data?.deleteGroup).toBeTruthy();
	});
});
