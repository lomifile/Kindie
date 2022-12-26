import { testConn } from "../helpers/testConn";
import { Connection } from "typeorm";
import { faker } from "@faker-js/faker";
// import { KinderGarden } from "../orm/entities/Kindergarden";
import { KindergardenResolver } from "../graphql/resolvers/Kindergarden";
import { KinderGardenInput } from "../graphql/inputs";
import { gCall } from "../helpers/gCall";

// TODO: Full rewrite Kindergarden tests

let conn: Connection;
const resolvers = new KindergardenResolver();
const ctx = {
	req: { session: { userId: 1, selectedKindergarden: undefined } },
	res: {}
} as AppContext;

beforeAll(async () => {
	conn = await testConn();
});

afterAll(async () => {
	await conn.close();
});

const kindergarden = {
	name: faker.company.name(),
	city: faker.address.city(),
	address: faker.address.streetAddress(),
	Zipcode: parseInt(faker.address.zipCode())
};

describe("Create kindergarden test", () => {
	const createKindergardenMutation = `
	mutation CreateKindergarden($options: KinderGardenInput!) {
		createKindergarden(options: $options) {
		  data {
			Id
			Name
			Address
			City
			Zipcode
		  }
		  errors {
			field
			message
		  }
		}
	  }
	`;

	test("Should fail user Id is null", async () => {
		ctx.req.session.userId = undefined;
		const response = await resolvers.createKindergarden(kindergarden, ctx);
		expect(response).toHaveProperty("errors");
		expect(response.errors?.[0].field).toBe("QueryFailedError");
	});

	test("[gCall] -> Should fail user Id is null", async () => {
		const response = await gCall({
			source: createKindergardenMutation,
			variableValues: {
				options: kindergarden
			}
		});

		expect(typeof response.errors).toBe("object");
		expect(response.errors?.[0].message).toContain("Not authenticated");
		expect(response.data).toBeNull();
	});

	test("Should fail options is null", async () => {
		const response = await resolvers.createKindergarden(
			{} as KinderGardenInput,
			ctx
		);
		expect(response).toHaveProperty("errors");
		expect(response.errors?.[0].field).toBe("QueryFailedError");
	});

	test("Should pass", async () => {
		const response = await resolvers.createKindergarden(kindergarden, {
			req: { session: { userId: 1 } }
		} as AppContext);
		expect(response).toHaveProperty("data");
		expect(response.data).toHaveProperty("Id");
	});
});

describe("Use kindergarden tests", () => {
	test("Should fail kindergarden doesn't exist", async () => {
		const response = await resolvers.useKindergarden(14, ctx);
		expect(response).toHaveProperty("errors");
		expect(response.errors?.[0].field).toBe("Error");
	});

	test("Should fail user is not in session", async () => {
		const response = await resolvers.useKindergarden(1, {
			req: { session: { userId: undefined } }
		} as AppContext);
		expect(response).toHaveProperty("errors");
		expect(response.errors?.[0].field).toBe("Error");
	});

	test("Should pass", async () => {
		const response = await resolvers.useKindergarden(4, {
			req: { session: { userId: 1 } }
		} as AppContext);
		expect(response).toHaveProperty("data");
		expect(response.data?.Id).toBe(4);
	});
});

describe("Show kindergarden", () => {
	test("Should fail user is not in session", async () => {
		const response = await resolvers.showKindergarden(10, null, {
			req: { session: { userId: undefined } }
		} as AppContext);
		expect(response).toHaveProperty("data");
		expect(response.data).toStrictEqual([]);
	});

	test("Should pass", async () => {
		const response = await resolvers.showKindergarden(10, null, {
			req: { session: { userId: 1 } }
		} as AppContext);
		expect(response).toHaveProperty("data");
	});
});

describe("Delete kindergarden", () => {
	test("Should fail kindergarden doesn't exist", async () => {
		const response = await resolvers.deleteKindergarden(7654);
		expect(response).toBeFalsy();
	});
	test("Should pass", async () => {
		const response = await resolvers.deleteKindergarden(4);
		expect(response).toBeTruthy();
	});
});
