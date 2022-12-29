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
	const addMotherMutation = `
	mutation CreateMother($options: ParentsInput!) {
		addMother(options: $options) {
		  mother {
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
			source: addMotherMutation,
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
			source: addMotherMutation,
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

		expect(response.data?.addMother.mother).toBeNull();
		expect(response.data?.addMother.errors[0].field).toContain("email");
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: addMotherMutation,
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

		expect(response.data?.addMother.errors).toBeNull();
		expect(response.data?.addMother.mother).toHaveProperty("Id");
	});
});

describe("Update mother test", () => {
	const updateMotherMutation = `
    mutation UpdateMother($id: Int!, $options: ParentsInput!) {
        updateMother(motherId:$id, options:$options) {
			mother {
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

		expect(response.data?.updateMother.mother).toBeNull();
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
		expect(response.data?.updateMother.mother).toHaveProperty("Id");
		expect(response.data?.updateMother.mother).toMatchObject({
			Id: 1,
			Name: options.name,
			Surname: options.surname,
			Email: options.email,
			Phone: 12321313
		});
	});
});

describe("Show mother query", () => {
	const showMotherQuery = `
    query ShowMother($limit: Int!, $cursor:String) {
        showMother(limit: $limit, cursor: $cursor) {
          mother {
            Id
            Name
            Surname
            Email
            Phone
          }
          hasMore
        }
      }
    `;

	test("[gCall] -> Should fail limit is not sent", async () => {
		const response = await gCall({
			source: showMotherQuery,
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
			source: showMotherQuery,
			userId: 1,
			selectedKindergarden: 1,
			variableValues: {
				limit: 10
			}
		});

		expect(response.data?.showMother.mother[0]).toHaveProperty("Id");
		expect(typeof response.data?.showMother.hasMore).toBe("boolean");
	});
});

describe("Delete mother test", () => {
	const deleteMotherMutation = `
    mutation DeleteMother($id: Int!) {
        deleteMother(motherId: $id)
      }
    `;
	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: deleteMotherMutation,
			userId: 1,
			selectedKindergarden: 1,
			variableValues: {
				id: 2
			}
		});

		expect(response.data?.deleteMother).toBeTruthy();
	});
});
