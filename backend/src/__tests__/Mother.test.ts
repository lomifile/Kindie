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

describe("Create Mother test", () => {
	const insertMotherMutation = `
	mutation InsertMother($options: ParentsInput!) {
		insertMother(options: $options) {
		  data {
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
		}
	  }
    `;
	test("[gCall] -> Should fail kindergarden is not selected", async () => {
		const response = await gCall({
			source: insertMotherMutation,
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

	test("[gCall] -> Should fail email is not correct", async () => {
		const response = await gCall({
			source: insertMotherMutation,
			userId: 1,
			selectedKindergarden: 1,
			variableValues: {
				options: {
					name: faker.name.firstName(),
					surname: faker.name.lastName(),
					email: "asdasda",
					phone: 12321313
				} as ParentsInput
			}
		});

		expect(response.data?.insertMother.data).toBeNull();
		expect(response.data?.insertMother.errors[0].field).toContain("email");
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: insertMotherMutation,
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

		expect(response.data?.insertMother.errors).toBeNull();
		expect(response.data?.insertMother.data).toHaveProperty("Id");
	});
});

describe("Update mother test", () => {
	const updateMotherMutation = `
    mutation UpdateMother($id: Int!, $options: ParentsInput!) {
        updateMother(id:$id, options:$options) {
			data {
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
        }
      }
    `;
	test("[gCall] -> Should fail kindergarden not selected", async () => {
		const response = await gCall({
			source: updateMotherMutation,
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

	test("[gCall] -> Should fail email is not correct", async () => {
		const response = await gCall({
			source: updateMotherMutation,
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

		expect(response.data?.updateMother.data).toBeNull();
		expect(response.data?.updateMother.errors[0].field).toContain("email");
	});

	test("[gCall] -> Should pass", async () => {
		const options: ParentsInput = {
			name: faker.name.firstName(),
			surname: faker.name.lastName(),
			email: faker.internet.email(),
			phone: 12321313
		};
		const response = await gCall({
			source: updateMotherMutation,
			userId: 1,
			selectedKindergarden: 1,
			variableValues: {
				id: 1,
				options
			}
		});

		expect(response.data?.updateMother.errors).toBeNull();
		expect(response.data?.updateMother.data).toHaveProperty("Id");
		expect(response.data?.updateMother.data).toMatchObject({
			Id: 1,
			Name: options.name,
			Surname: options.surname,
			Email: options.email,
			Phone: 12321313
		});
	});
});

describe("Show mother query", () => {
	const listMotherQuery = `
    query ListMother($limit: Int!, $cursor:String) {
        listMother(limit: $limit, cursor: $cursor) {
          data {
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
			source: listMotherQuery,
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
			source: listMotherQuery,
			userId: 1,
			selectedKindergarden: 1,
			variableValues: {
				limit: 10
			}
		});

		expect(response.data?.listMother.data[0]).toHaveProperty("Id");
		expect(typeof response.data?.listMother.hasMore).toBe("boolean");
	});
});

describe("Delete mother test", () => {
	const deleteMotherMutation = `
    mutation DeleteMother($id: Int!) {
		deleteMother(id: $id) {
			result
			errors {
				field
				message
			}
		}
      }
    `;
	test("[gCall] -> Should fail id is not correct", async () => {
		const response = await gCall({
			source: deleteMotherMutation,
			userId: 1,
			selectedKindergarden: 1,
			variableValues: {
				id: 12321
			}
		});

		expect(response.data?.deleteMother.result).toBeFalsy();
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: deleteMotherMutation,
			userId: 1,
			selectedKindergarden: 1,
			variableValues: {
				id: 1
			}
		});

		expect(response.data?.deleteMother.result).toBeTruthy();
	});
});
