import { testConn } from "../helpers/testConn";
import { KinderGarden, User } from "../orm/entities";
import { Connection } from "typeorm";
import { StaffMembersResolver } from "../graphql/resolvers";
import { faker } from "@faker-js/faker";
import argon2 from "argon2";

let conn: Connection;
let kindergarden: KinderGarden;
let staff: User;
const resolver = new StaffMembersResolver();

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
	test("Should fail unknown user Id", async () => {
		const response = await resolver.addStaff(43, "Test", {
			req: { session: { selectedKindergarden: 79 } }
		} as AppContext);
		expect(response).toHaveProperty("errors");
		expect(response.errors?.[0].field).toBe("StaffMembers insert");
	});

	test("Should pass", async () => {
		const response = await resolver.addStaff(staff.Id, "Test", {
			req: { session: { selectedKindergarden: kindergarden.Id } }
		} as AppContext);
		expect(response).toHaveProperty("staff");
		expect(response.staff).toHaveProperty("staffId");
	});

	test("Should fail user is already part of staff", async () => {
		const response = await resolver.addStaff(staff.Id, "Test", {
			req: { session: { selectedKindergarden: kindergarden.Id } }
		} as AppContext);

		expect(response).toHaveProperty("errors");
		expect(response.errors?.[0].field).toBe("user id");
	});
});

describe("Show staff test", () => {
	test("Should fail no kindergarden is selected", async () => {
		const response = await resolver.showStaff({
			req: { session: { selectedKindergarden: undefined } }
		} as AppContext);
		expect(response).toStrictEqual([]);
	});

	test("Should pass", async () => {
		const response = await resolver.showStaff({
			req: { session: { selectedKindergarden: kindergarden.Id } }
		} as AppContext);
		expect(response).toHaveLength(1);
	});
});

describe("Delete staff", () => {
	test("Should pass", async () => {
		const response = await resolver.deleteStaff(staff.Id);
		expect(response).toBeTruthy();
	});
});
