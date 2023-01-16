import { testConn } from "../helpers/testConn";
import { Connection } from "typeorm";
import { faker } from "@faker-js/faker";
import { gCall } from "../helpers/gCall";

let conn: Connection;

const gErrorObject = (field: string, message: string) => [
	{
		field,
		message
	}
];

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

	test("[gCall] -> Should fail options is empty", async () => {
		const response = await gCall({
			source: createKindergardenMutation,
			userId: 1,
			variableValues: {
				options: {}
			}
		});

		expect(response).toHaveProperty("errors");
		expect(response.errors).not.toBeNull();
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: createKindergardenMutation,
			userId: 1,
			variableValues: {
				options: kindergarden
			}
		});

		expect(response.data?.createKindergarden.errors).toBeNull();
		expect(response.data?.createKindergarden.data).toHaveProperty("Id");
	});
});

describe("Use kindergarden tests", () => {
	const useKindergardenMutation = `
	mutation UseKindergarden($id: Float!) {
		useKindergarden(id: $id) {
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

	test("[gCall] -> Should fail kindergarden doesn't exist", async () => {
		const response = await gCall({
			source: useKindergardenMutation,
			userId: 1,
			variableValues: {
				id: 1234
			}
		});

		expect(typeof response.data?.useKindergarden.errors).toBe("object");
		expect(response.data?.useKindergarden.errors).toMatchObject(
			gErrorObject("Error", "Kindergarden doesn't exist")
		);
		expect(response.data?.useKindergarden.data).toBeNull();
	});

	test("[gCall] -> Should fail user is not in session", async () => {
		const response = await gCall({
			source: useKindergardenMutation,
			variableValues: {
				id: 1
			}
		});

		expect(typeof response.errors).toBe("object");
		expect(response.errors?.[0].message).toContain("Not authenticated");
		expect(response.data).toBeNull();
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: useKindergardenMutation,
			userId: 1,
			variableValues: {
				id: 1
			}
		});

		expect(response.data?.useKindergarden.data).not.toBeNull();
		expect(response.data?.useKindergarden.errors).toBeNull();
		expect(response.data?.useKindergarden.data).toHaveProperty("Id");
	});
});

describe("Show kindergarden", () => {
	const listKindergardenQuery = `
	query ListKindergarden {
		listKindergarden(limit: 15) {
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
		  hasMore
		}
	  }
	`;

	test("[gCall] -> Should fail user is not in session", async () => {
		const response = await gCall({
			source: listKindergardenQuery
		});

		expect(response.data).toBeNull();
		expect(response.errors).not.toBeNull();
		expect(response.errors?.[0].message).toContain("Not authenticated");
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: listKindergardenQuery,
			userId: 1
		});

		expect(response.data).toHaveProperty("listKindergarden");
		expect(response.data?.listKindergarden).toHaveProperty("data");
		expect(response.data?.listKindergarden).toHaveProperty("errors");
		expect(response.data?.listKindergarden.errors).toBeNull();
		expect(response.data?.listKindergarden).toHaveProperty("hasMore");
		expect(typeof response.data?.listKindergarden.hasMore).toBe("boolean");
	});
});

describe("Delete kindergarden", () => {
	const deleteKindergardenMutation = `
	mutation DeleteKindergarden($id: Int!) {
		deleteKindergarden(id: $id) {
			result
			errors {
				field
				message
			}
		}
	  }
	`;

	test("[gCall] -> Should fail user is not authenticated", async () => {
		const response = await gCall({
			source: deleteKindergardenMutation,
			variableValues: {
				id: 1
			}
		});

		expect(response.data).toBeNull();
		expect(typeof response.errors).toBe("object");
		expect(response.errors?.[0].message).toContain("Not authenticated");
	});

	test("[gCall] -> Should fail kindergarden doesn't exist", async () => {
		const response = await gCall({
			source: deleteKindergardenMutation,
			variableValues: {
				id: 1234
			},
			userId: 1
		});

		expect(response.data).toHaveProperty("deleteKindergarden");
		expect(response.data?.deleteKindergarden.result).toBeFalsy();
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: deleteKindergardenMutation,
			variableValues: {
				id: 2
			},
			userId: 1
		});

		expect(response.data).toHaveProperty("deleteKindergarden");
		expect(response.data?.deleteKindergarden.result).toBeTruthy();
	});
});
