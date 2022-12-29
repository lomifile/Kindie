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
	mutation UseKindergarden($kindergardenID: Float!) {
		useKindergarden(kindergadenID: $kindergardenID) {
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
				kindergardenID: 1234
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
				kindergardenID: 1
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
				kindergardenID: 1
			}
		});

		expect(response.data?.useKindergarden.data).not.toBeNull();
		expect(response.data?.useKindergarden.errors).toBeNull();
		expect(response.data?.useKindergarden.data).toHaveProperty("Id");
	});
});

describe("Show kindergarden", () => {
	const showKindergardenQuery = `
	query ShowKindergarden {
		showKindergarden(limit: 15) {
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
			source: showKindergardenQuery
		});

		expect(response.data).toBeNull();
		expect(response.errors).not.toBeNull();
		expect(response.errors?.[0].message).toContain("Not authenticated");
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: showKindergardenQuery,
			userId: 1
		});

		expect(response.data).toHaveProperty("showKindergarden");
		expect(response.data?.showKindergarden).toHaveProperty("data");
		expect(response.data?.showKindergarden).toHaveProperty("errors");
		expect(response.data?.showKindergarden.errors).toBeNull();
		expect(response.data?.showKindergarden).toHaveProperty("hasMore");
		expect(typeof response.data?.showKindergarden.hasMore).toBe("boolean");
	});
});

describe("Delete kindergarden", () => {
	const deleteKindergardenMutation = `
	mutation DeleteKindergarden($id: Int!) {
		deleteKindergarden(id: $id) 
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
		expect(response.data?.deleteKindergarden).toBeFalsy();
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
		expect(response.data?.deleteKindergarden).toBeTruthy();
	});
});
