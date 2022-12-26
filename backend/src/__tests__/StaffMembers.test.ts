import { testConn } from "../helpers/testConn";
import { KinderGarden, User } from "../orm/entities";
import { Connection } from "typeorm";
import { faker } from "@faker-js/faker";
import argon2 from "argon2";
import { gCall } from "../helpers/gCall";

let conn: Connection;
let kindergarden: KinderGarden;
let staff: User;

beforeAll(async () => {
	conn = await testConn();
	kindergarden = await KinderGarden.create({
		Name: faker.company.name(),
		Address: faker.address.streetAddress(),
		owningId: 1,
		City: faker.address.cityName(),
		Zipcode: parseInt(faker.address.zipCode())
	}).save();

	staff = await User.create({
		Name: faker.name.firstName(),
		Surname: faker.name.lastName(),
		Email: faker.internet.email(),
		Password: await argon2.hash(faker.internet.password()),
		confirmed: true
	}).save();
});

afterAll(async () => {
	await conn.close();
});

describe("Add staff member test", () => {
	const addStaffMutation = `
	mutation AddStaff($role: String!, $id: Int!) {
		addStaff(role:$role, userId: $id) {
		  staff {
				  staffId
			role
		  }
		  errors {
			field
			message
		  }
		}
	  }
	`;

	test("[gCall] -> Should fail user is not authenticated", async () => {
		const response = await gCall({
			source: addStaffMutation,
			variableValues: {
				role: "Test",
				id: 2
			}
		});

		expect(response.data).toBeNull();
		expect(typeof response.errors).toBe("object");
		expect(response.errors?.[0].message).toContain("Not authenticated");
	});

	test("[gCall] -> Should fail userId is not in db", async () => {
		const response = await gCall({
			source: addStaffMutation,
			userId: 1,
			selectedKindergarden: kindergarden.Id,
			variableValues: {
				id: 12345,
				role: "Testr"
			}
		});

		expect(response.data?.addStaff.staff).toBeNull();
		expect(typeof response.data?.addStaff.errors).toBe("object");
		expect(response.data?.addStaff.errors[0].field).toContain(
			"StaffMembers insert"
		);
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: addStaffMutation,
			variableValues: {
				id: staff.Id,
				role: "Test"
			},
			userId: 1,
			selectedKindergarden: kindergarden.Id
		});

		expect(response.data?.addStaff.errors).toBeNull();
		expect(response.data?.addStaff.staff).toHaveProperty("staffId");
	});

	test("[gCall] -> Should fail user is already part of staff", async () => {
		const response = await gCall({
			source: addStaffMutation,
			variableValues: {
				id: staff.Id,
				role: "Test"
			},
			userId: 1,
			selectedKindergarden: 1
		});

		expect(response.data?.addStaff.staff).toBeNull();
		expect(typeof response.data?.addStaff.errors).toBe("object");
		expect(response.data?.addStaff.errors[0].field).toContain("user id");
	});
});

describe("Show staff test", () => {
	const showStaffQuery = `
	query ShowStaff {
		showStaff {
		  staffId
		  kindergardenId
		}
	  }
	`;
	test("[gCall] -> Should fail user is not authenticated", async () => {
		const response = await gCall({
			source: showStaffQuery
		});

		expect(response.data).toBeNull();
		expect(typeof response.errors).toBe("object");
		expect(response.errors?.[0].message).toContain("Not authenticated");
	});

	test("[gCall] -> Should fail kindergarden is not selected", async () => {
		const response = await gCall({
			source: showStaffQuery,
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
			source: showStaffQuery,
			userId: 1,
			selectedKindergarden: kindergarden.Id
		});

		expect(typeof response.data?.showStaff).toBe("object");
		expect(Array.isArray(response.data?.showStaff)).toBeTruthy();
		expect(response.data?.showStaff[0]).toHaveProperty("staffId");
	});
});

describe("Delete staff", () => {
	const deleteStaffMutation = `
	mutation DeleteStaff($id: Int!) {
		deleteStaff(userId: $id)
	  }
	`;

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: deleteStaffMutation,
			selectedKindergarden: kindergarden.Id,
			userId: 1,
			variableValues: {
				id: staff.Id
			}
		});
		expect(response).toBeTruthy();
	});
});
