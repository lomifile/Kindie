import { testConn } from "../helpers/testConn";
import { Connection } from "typeorm";
import { gCall } from "../helpers/gCall";
import { faker } from "@faker-js/faker";
import { Groups } from "../orm/entities";

let conn: Connection;
let group: Groups;

// const gErrorObject = (field: string, message: string) => [
// 	{
// 		field,
// 		message
// 	}
// ];

beforeAll(async () => {
	conn = await testConn();
	group = await Groups.create({
		Name: "Test2",
		inKindergardenId: 3
	}).save();
});

afterAll(async () => {
	await conn.close();
});

describe("Create child resolver", () => {
	const createChildMutation = `
    mutation CreateChild($options: ChildrenInput!) {
        createChild(options: $options) {
          data {
            Id
            Name
            Surname
            Gender
            BirthDate
            OIB
            Remarks
          }
          errors {
            field
            message
          }
        }
      }
    `;

	test("[gCall] -> Should fail options are not provided", async () => {
		const response = await gCall({
			source: createChildMutation,
			userId: 1,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				options: {}
			}
		});

		expect(response.errors).not.toBeNull();
		expect(response.errors?.[0].message).toContain("$options");
	});

	test("[gCall] -> Should fail BirthDate is not correct", async () => {
		const response = await gCall({
			source: createChildMutation,
			userId: 1,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				options: {
					Name: faker.name.firstName(),
					Surname: faker.name.lastName(),
					BirthDate: "13-14-2022",
					OIB: 12314124,
					Gender: "male",
					Remarks: "shjdhask",
					mother: null,
					father: null
				}
			}
		});

		expect(response.data?.createChild.data).toBeNull();
		expect(response.data?.createChild.errors).not.toBeNull();
		expect(response.data?.createChild.errors[0].field).toContain(
			"QueryFailedError"
		);
	});

	test("[gCall] -> Should fail OIB is string", async () => {
		const response = await gCall({
			source: createChildMutation,
			userId: 1,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				options: {
					Name: faker.name.firstName(),
					Surname: faker.name.lastName(),
					BirthDate: faker.date.birthdate().toISOString(),
					OIB: "12314124",
					Gender: "male",
					Remarks: "shjdhask",
					mother: null,
					father: null
				}
			}
		});

		expect(response.errors).not.toBeNull();
		expect(response.errors?.[0].message).toContain("$options");
	});

	test("[gCall] -> Should fail parents id doesn't exist", async () => {
		const response = await gCall({
			source: createChildMutation,
			userId: 1,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				options: {
					Name: faker.name.firstName(),
					Surname: faker.name.lastName(),
					BirthDate: faker.date.birthdate().toISOString(),
					OIB: 12314124,
					Gender: "male",
					Remarks: "shjdhask",
					mother: 1112,
					father: 1122
				}
			}
		});

		expect(response.data?.createChild.data).toBeNull();
		expect(response.data?.createChild.errors).not.toBeNull();
		expect(response.data?.createChild.errors[0].field).toContain(
			"QueryFailedError"
		);
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: createChildMutation,
			userId: 1,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				options: {
					Name: faker.name.firstName(),
					Surname: faker.name.lastName(),
					BirthDate: faker.date.birthdate().toISOString(),
					OIB: 12314124,
					Gender: "male",
					Remarks: "shjdhask",
					mother: null,
					father: null
				}
			}
		});

		expect(response.data?.createChild.errors).toBeNull();
		expect(response.data?.createChild.data).not.toBeNull();
		expect(response.data?.createChild.data).toHaveProperty("Id");
	});
});

describe("Update child mutation", () => {
	const updateChildMutation = `
    mutation UpdateChild($id: Int!, $options:ChildrenInput!) {
        updateChild(kidId:$id, options: $options) {
          data {
            Id
            Name
            Surname
            Gender
            BirthDate
            OIB
            Remarks
          }
          errors {
            field
            message
          }
        }
      }
    `;

	test("[gCall] -> Should fail options are not provided", async () => {
		const response = await gCall({
			source: updateChildMutation,
			userId: 1,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				id: 2,
				options: {}
			}
		});

		expect(response.errors).not.toBeNull();
		expect(response.errors?.[0].message).toContain("$options");
	});

	test("[gCall] -> Should fail BirthDate is not correct", async () => {
		const response = await gCall({
			source: updateChildMutation,
			userId: 1,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				id: 2,
				options: {
					Name: faker.name.firstName(),
					Surname: faker.name.lastName(),
					BirthDate: "13-14-2022",
					OIB: 12314124,
					Gender: "male",
					Remarks: "shjdhask",
					mother: null,
					father: null
				}
			}
		});

		expect(response.data?.updateChild.data).toBeNull();
		expect(response.data?.updateChild.errors).toBeNull();
		expect(response.errors?.[0].message).toContain(
			"Cannot return null for non-nullable field FieldError.field"
		);
	});

	test("[gCall] -> Should fail OIB is string", async () => {
		const response = await gCall({
			source: updateChildMutation,
			userId: 1,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				id: 2,
				options: {
					Name: faker.name.firstName(),
					Surname: faker.name.lastName(),
					BirthDate: faker.date.birthdate().toISOString(),
					OIB: "12314124",
					Gender: "male",
					Remarks: "shjdhask",
					mother: null,
					father: null
				}
			}
		});

		expect(response.errors).not.toBeNull();
		expect(response.errors?.[0].message).toContain("$options");
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: updateChildMutation,
			userId: 1,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				id: 2,
				options: {
					Name: faker.name.firstName(),
					Surname: faker.name.lastName(),
					BirthDate: faker.date.birthdate().toISOString(),
					OIB: 12314124,
					Gender: "male",
					Remarks: "shjdhask",
					mother: null,
					father: null
				}
			}
		});

		expect(response.data?.updateChild.errors).toBeNull();
		expect(response.data?.updateChild.data).toHaveProperty("Id");
	});
});

describe("Add child to group", () => {
	const addChildToGroupMutation = `
    mutation AddChildToGroup($id: Int!) {
        addChildToGroup(id:$id) {
          data {
            Id
            Name
            Surname
            Gender
            BirthDate
            OIB
            Remarks
          }
          errors {
            field
            message
          }
        }
      }
    `;

	test("[gCall] -> Group doesn't exist", async () => {
		const response = await gCall({
			source: addChildToGroupMutation,
			userId: 1,
			selectedGroup: 1123,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				id: 2
			}
		});

		expect(response.data?.addChildToGroup.data).toBeNull();
		expect(response.data?.addChildToGroup.errors).toBeNull();
	});

	test("[gCall] -> Child doesn't exist", async () => {
		const response = await gCall({
			source: addChildToGroupMutation,
			userId: 1,
			selectedGroup: group.Id,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				id: 1231
			}
		});

		expect(response.data?.addChildToGroup.data).toBeNull();
		expect(response.data?.addChildToGroup.errors).toBeNull();
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: addChildToGroupMutation,
			userId: 1,
			selectedGroup: group.Id,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				id: 2
			}
		});

		expect(response.data?.addChildToGroup.data).not.toBeNull();
		expect(response.data?.addChildToGroup.data).toHaveProperty("Id");
		expect(response.data?.addChildToGroup.errors).toBeNull();
	});
});

describe("Delete child", () => {
	const deleteChildrenMutation = `
    mutation DeleteChild($id: Int!) {
        deleteChildren(id: $id)
      }
    `;

	test("[gCall] -> Should fail childId doesn't exist", async () => {
		const response = await gCall({
			source: deleteChildrenMutation,
			userId: 1,
			selectedKindergarden: 3,
			variableValues: {
				id: 1234
			}
		});

		expect(response.data?.deleteChildren).toBeFalsy();
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: deleteChildrenMutation,
			userId: 1,
			selectedKindergarden: 3,
			variableValues: {
				id: 2
			}
		});

		expect(response.data?.deleteChildren).toBeTruthy();
	});
});

//TODO: Implement tests for updateChildren parents

describe("Remove child from group", () => {
	const removeChildFromGroupMutation = `
    mutation RemoveChildFromGroup($id: Int!) {
        removeChildFromGroup(Id:$id) {
            data {
                Id
                Name
                Surname
                Gender
                BirthDate
                OIB
                Remarks   
            }
            errors {
              field
              message
            }
        }
      }
    `;

	test("[gCall] -> Child doesn't exist", async () => {
		const response = await gCall({
			source: removeChildFromGroupMutation,
			userId: 1,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				id: 1231
			}
		});

		expect(response.data?.removeChildFromGroup.data).toBeNull();
		expect(response.data?.removeChildFromGroup.errors).toBeNull();
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: removeChildFromGroupMutation,
			userId: 1,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				id: 2
			}
		});

		expect(response.data?.removeChildFromGroup.data).not.toBeNull();
		expect(response.data?.removeChildFromGroup.data).toHaveProperty("Id");
		expect(response.data?.removeChildFromGroup.errors).toBeNull();
	});
});

describe("Find child by Id", () => {
	const findChildQuery = `
    query FindChild($id: Int!) {
        findChild(id: $id) {
          Id
          Name
          Surname
          Gender
          BirthDate
          OIB
          Remarks
        }
      }
    `;

	test("[gCall] -> Should fail child id doesn't exist", async () => {
		const response = await gCall({
			source: findChildQuery,
			userId: 1,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				id: 456
			}
		});

		expect(response.data?.findChild).toBeNull();
	});

	// TODO: Fix this test/or resolver
	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: findChildQuery,
			userId: 1,
			selectedKindergarden: group.inKindergardenId,
			variableValues: {
				id: 2
			}
		});

		expect(response.data?.findChild).toBeNull();
	});
});
