import { testConn } from "../helpers/testConn";
import { Connection } from "typeorm";
import { gCall } from "../helpers/gCall";
import { faker } from "@faker-js/faker";
import { ParentsInput } from "../graphql/inputs";

let conn: Connection;

// const gErrorObject = (field: string, message: string) => [
// 	{
// 		field,
// 		message
// 	}
// ];

beforeAll(async () => {
	conn = await testConn();
});

afterAll(async () => {
	await conn.close();
});

describe("Create Father test", () => {
	const addFatherMutation = `
    mutation CreateFather($options: ParentsInput!) {
        addFather(options: $options) {
          Id
          Name
          Surname
          Email
          Phone
        }
      }
    `;
	test("[gCall] -> Should fail kindergarden is not selected", async () => {
		const response = await gCall({
			source: addFatherMutation,
			userId: 1,
			variableValues: {
				options: {
					name: faker.name.firstName(),
					surname: faker.name.lastName(),
					email: faker.internet.email(),
					phone: 12321313
				} as ParentsInput
			}
		});

		expect(response.data).toBeNull();
		expect(response.errors?.[0].message).toContain(
			"Kindergraden not selected"
		);
	});

	test("[gCall] -> Should fail data is not correct", async () => {
		const response = await gCall({
			source: addFatherMutation,
			userId: 1,
			selectedKindergarden: 4,
			variableValues: {
				options: {
					name: faker.name.firstName(),
					surname: faker.name.lastName(),
					email: "asdasda",
					phone: 12321313
				} as ParentsInput
			}
		});

		expect(response.data).toBeNull();
		expect(response.errors?.[0].message).toContain(
			"insert or update on table"
		);
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: addFatherMutation,
			userId: 1,
			selectedKindergarden: 1,
			variableValues: {
				options: {
					name: faker.name.firstName(),
					surname: faker.name.lastName(),
					email: faker.internet.email(),
					phone: 12321313
				} as ParentsInput
			}
		});

		expect(response.data?.addFather).toHaveProperty("Id");
	});
});

describe("Update Father test", () => {
	const updateFatherMutation = `
    mutation UpdateFather($id: Int!, $options: ParentsInput!) {
        updateFather(fatherId:$id, options:$options) {
          Id
          Name
          Surname
          Email
          Phone
        }
      }
    `;
	test("[gCall] -> Should fail data is not correct", async () => {
		const response = await gCall({
			source: updateFatherMutation,
			userId: 1,
			variableValues: {
				id: 1,
				options: {
					name: faker.name.firstName(),
					surname: faker.name.lastName(),
					email: faker.internet.email(),
					phone: 12321313
				} as ParentsInput
			}
		});

		expect(response.data).toBeNull();
		expect(response.errors?.[0].message).toContain(
			"Kindergraden not selected"
		);
	});

	test("[gCall] -> Should fail data is not correct", async () => {
		const response = await gCall({
			source: updateFatherMutation,
			userId: 1,
			selectedKindergarden: 2,
			variableValues: {
				id: 1,
				options: {
					name: faker.name.firstName(),
					surname: faker.name.lastName(),
					email: "asdasda",
					phone: 12321313
				} as ParentsInput
			}
		});

		expect(response.data).toBeNull();
		expect(response.errors?.[0].message).toContain(
			"Cannot return null for non-nullable field"
		);
	});

	test("[gCall] -> Should pass", async () => {
		const options: ParentsInput = {
			name: faker.name.firstName(),
			surname: faker.name.lastName(),
			email: faker.internet.email(),
			phone: 12321313
		};
		const response = await gCall({
			source: updateFatherMutation,
			userId: 1,
			selectedKindergarden: 1,
			variableValues: {
				id: 2,
				options
			}
		});

		expect(response.data?.updateFather).toHaveProperty("Id");
		expect(response.data?.updateFather).toMatchObject({
			Id: 2,
			Name: options.name,
			Surname: options.surname,
			Email: options.email,
			Phone: 12321313
		});
	});
});

describe("Show Father query", () => {
	const showFatherQuery = `
    query ShowFather($limit: Int!, $cursor:String) {
        showFather(limit: $limit, cursor: $cursor) {
          data{
            Id
            Name
            Surname
            Email
            Phone
          }
          errors {
            field
            message
          }
          hasMore
        }
      }
    `;

	test("[gCall] -> Should fail limit is not sent", async () => {
		const response = await gCall({
			source: showFatherQuery,
			userId: 1,
			selectedKindergarden: 1,
			variableValues: {
				limit: undefined
			}
		});

		expect(response.errors?.[0].message).toContain(
			"got invalid value undefined"
		);
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: showFatherQuery,
			userId: 1,
			selectedKindergarden: 1,
			variableValues: {
				limit: 10
			}
		});

		expect(response.data?.showFather.data[0]).toHaveProperty("Id");
		expect(response.data?.showFather.errors).toBeNull();
		expect(typeof response.data?.showFather.hasMore).toBe("boolean");
	});
});

describe("Delete Father test", () => {
	const deleteFatherMutation = `
    mutation DeleteFather($id: Int!) {
        deleteFather(Id: $id)
      }
    `;
	test("[gCall] -> Should fail id doesn't exist", async () => {
		const response = await gCall({
			source: deleteFatherMutation,
			userId: 1,
			selectedKindergarden: 1,
			variableValues: {
				id: 1231
			}
		});

		expect(response.data?.deleteFather).toBeFalsy();
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: deleteFatherMutation,
			userId: 1,
			selectedKindergarden: 1,
			variableValues: {
				id: 2
			}
		});

		expect(response.data?.deleteFather).toBeTruthy();
	});
});
