import { testConn } from "../helpers/testConn";
import { Connection } from "typeorm";
import { faker } from "@faker-js/faker";
import { UsernamePasswordInput } from "../graphql/inputs/UserInput";
import { User } from "../orm/entities/User";
import { gCall } from "../helpers/gCall";
import Redis from "ioredis";

let conn: Connection;
let redis: Redis.Redis;

beforeAll(async () => {
	conn = await testConn();
	redis = new Redis("127.0.0.1");
});

afterAll(async () => {
	await conn.close();
	redis.quit();
});

const password = faker.internet.password();

const user = {
	name: faker.name.firstName(),
	surname: faker.name.lastName(),
	email: faker.internet.email(),
	password: password,
	repeatPassword: password
};

const gErrorObject = (field: string, message: string) => [
	{
		field,
		message
	}
];

describe("User registration tests", () => {
	test("[gCall] -> Should fail email is not correct", async () => {
		const data = {
			name: faker.name.firstName(),
			surname: faker.name.lastName(),
			email: "iauysgduyajsd",
			password: password,
			repeatPassword: password
		} as UsernamePasswordInput;
		const response = await gCall({
			source: `
			mutation Register ($data: UsernamePasswordInput!) {
				register(options: $data) {
					user {
					  Id
					  Name
					  Surname
					  Email
					  createdAt
					  updatedAt
					}
					errors {
					  field
					  message
					}
				  }
			  }
			`,
			variableValues: {
				data
			}
		});

		expect(typeof response.data?.register.errors).toBe("object");
		expect(response.data?.register.user).toBeNull();
	});

	test("[gCall] -> Should fail passwords don't match", async () => {
		const data = {
			name: faker.name.firstName(),
			surname: faker.name.lastName(),
			email: faker.internet.email(),
			password: password,
			repeatPassword: "test"
		} as UsernamePasswordInput;
		const response = await gCall({
			source: `
			mutation Register ($data: UsernamePasswordInput!) {
				register(options: $data) {
					user {
					  Id
					  Name
					  Surname
					  Email
					  createdAt
					  updatedAt
					}
					errors {
					  field
					  message
					}
				  }
			  }
			`,
			variableValues: {
				data
			}
		});

		expect(typeof response.data?.register.errors).toBe("object");
		expect(response.data?.register.user).toBeNull();
		expect(response.data?.register.errors).toMatchObject(
			gErrorObject("repeatPassword", "Passwords don't match")
		);
	});

	test("[gCall] -> Should fail passwords are to short", async () => {
		const data = {
			name: faker.name.firstName(),
			surname: faker.name.lastName(),
			email: faker.internet.email(),
			password: "test",
			repeatPassword: "test"
		} as UsernamePasswordInput;
		const response = await gCall({
			source: `
			mutation Register ($data: UsernamePasswordInput!) {
				register(options: $data) {
					user {
					  Id
					  Name
					  Surname
					  Email
					  createdAt
					  updatedAt
					}
					errors {
					  field
					  message
					}
				  }
			  }
			`,
			variableValues: {
				data
			}
		});

		expect(typeof response.data?.register.errors).toBe("object");
		expect(response.data?.register.user).toBeNull();
		expect(response.data?.register.errors).toMatchObject(
			gErrorObject("password", "Length must be greater than 8")
		);
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: `
			mutation Register ($data: UsernamePasswordInput!) {
				register(options: $data) {
					user {
					  Id
					  Name
					  Surname
					  Email
					  createdAt
					  updatedAt
					}
					errors {
					  field
					  message
					}
				  }
			  }
			`,
			variableValues: {
				data: user
			}
		});

		expect(typeof response.data?.register.user).toBe("object");
		expect(response.data?.register.errors).toBeNull();
		expect(response.data?.register.user).toHaveProperty("Id");
	});
});

describe("Login function tests", () => {
	test("[gCall] -> Should fail email is not correct", async () => {
		const response = await gCall({
			source: `
			mutation Login($email: String!, $password: String!) {
				login(email: $email, password: $password) {
					user {
						Id
						Name
						Surname
						Email
						createdAt
						updatedAt
					}
					errors {
						field
						message
					}
				}
			}
			`,
			variableValues: {
				email: "678687asdasd",
				password: user.password
			}
		});

		expect(response.data?.login.user).toBeNull();
		expect(typeof response.data?.login.errors).toBe("object");
	});

	test("[gCall] -> Should fail user is not confirmed", async () => {
		const response = await gCall({
			source: `
			mutation Login($email: String!, $password: String!) {
				login(email: $email, password: $password) {
					user {
						Id
						Name
						Surname
						Email
						createdAt
						updatedAt
					}
					errors {
						field
						message
					}
				}
			}
			`,
			variableValues: {
				email: user.email,
				password: user.password
			}
		});
		expect(response.data?.login.user).toBeNull();
		expect(typeof response.data?.login.errors).toBe("object");
		expect(response.data?.login.errors).toMatchObject(
			gErrorObject(
				"confirmation",
				"Your account need verification! Please check your email for verification!"
			)
		);
		await User.update({ Email: user.email }, { confirmed: true });
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: `
			mutation Login($email: String!, $password: String!) {
				login(email: $email, password: $password) {
					user {
						Id
						Name
						Surname
						Email
						createdAt
						updatedAt
					}
					errors {
						field
						message
					}
				}
			}
			`,
			variableValues: {
				email: user.email,
				password: user.password
			}
		});

		expect(response.data?.login.errors).toBeNull();
		expect(typeof response.data?.login.user).toBe("object");
		expect(response.data?.login.user).toHaveProperty("Id");
	});
});

describe("Me query", () => {
	test("[gCall] -> Should fail user is not in session", async () => {
		const response = await gCall({
			source: `
			query Me {
				me {
					Id
					Name
					Surname
					Email
					createdAt
					updatedAt 
				}
			  }
			`
		});

		expect(response.data?.me).toBeNull();
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: `
			query Me {
				me {
					Id
					Name
					Surname
					Email
					createdAt
					updatedAt 
				}
			  }
			`,
			userId: 1
		});

		expect(response.data?.me).toHaveProperty("Id");
	});
});

describe("Logout query test", () => {
	test("[gCall] -> Logout scheme test", async () => {
		const response = await gCall({
			source: `
			mutation Logout {
				logout
			  }
			`,
			userId: 1
		});

		expect(response.data?.logout).toBeTruthy();
	});
});

describe("Verify account mutation", () => {
	test("[gCall] -> Should fail no token", async () => {
		const response = await gCall({
			source: `
			mutation VerifyAccount($token: String!) {
				verifyAccount(token: $token) {
				  user {
					Id
					Name
					Surname
				  }
				  errors {
					field
					message
				  }
				}
			  }
			`,
			variableValues: {
				token: ""
			}
		});
		expect(typeof response.data?.verifyAccount.errors).toBe("object");
		expect(response.data?.verifyAccount.errors).toMatchObject(
			gErrorObject("token", "Token expired")
		);
	});

	test("[gCall] -> Should fail wrong token", async () => {
		const response = await gCall({
			source: `
			mutation VerifyAccount($token: String!) {
				verifyAccount(token: $token) {
				  user {
					Id
					Name
					Surname
				  }
				  errors {
					field
					message
				  }
				}
			  }
			`,
			variableValues: {
				token: "bnasyhdkua"
			}
		});
		expect(typeof response.data?.verifyAccount.errors).toBe("object");
		expect(response.data?.verifyAccount.errors).toMatchObject(
			gErrorObject("token", "Token expired")
		);
	});
});

describe("Forgot password mutation", () => {
	test("[gCall] -> Should fail wrong email", async () => {
		const response = await gCall({
			source: `
			mutation ForgotPassword($email: String!){
				forgetPassword(email: $email) 
			  }
			`,
			variableValues: {
				email: "ahusdkusa"
			}
		});

		expect(typeof response.data?.forgetPassword).toBe("boolean");
		expect(response.data?.forgetPassword).toBeFalsy();
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: `
			mutation ForgotPassword($email: String!){
				forgetPassword(email: $email) 
			  }
			`,
			variableValues: {
				email: user.email
			}
		});

		expect(typeof response.data?.forgetPassword).toBe("boolean");
		expect(response.data?.forgetPassword).toBeTruthy();
	});
});

describe("Staff of Query", () => {
	const staffOfQuery = `
	query StaffOf {
		staffOf {
		  Id
		  Name
		  Surname
		  Email
		}
	  }
	`;

	test("[gCall] -> Should fail user is not authenticated", async () => {
		const response = await gCall({
			source: staffOfQuery,
			userId: undefined
		});

		expect(typeof response.errors).toBe("object");
		expect(response.errors?.[0]).toHaveProperty("message");
		expect(response.errors?.[0].message).toBe("Not authenticated");
	});

	test("[gCall] -> Should fail user in session does not exist in database", async () => {
		const response = await gCall({
			source: staffOfQuery,
			userId: 123
		});

		expect(typeof response.data).toBe("object");
		expect(response.data?.staffOf).toMatchObject([]);
		expect(response.data?.staffOf).toHaveLength(0);
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: staffOfQuery,
			userId: 1
		});

		expect(typeof response.data).toBe("object");
		expect(response.data?.staffOf[0]).toHaveProperty("Id");
	});
});

describe("Update user mutation", () => {
	const updateUserMutation = `
	mutation UpdateUser($options: UpdateUserInput!) {
		updateUser(options: $options) {
		  user {
			Id
			Name
			Surname
			Email
		  }
		  errors {
			field
			message
		  }
		}
	  }
	`;

	test("[gCall] -> Should fail because password is not provided", async () => {
		const response = await gCall({
			source: updateUserMutation,
			userId: 1,
			variableValues: {
				options: {
					name: user.name,
					surname: user.surname,
					email: user.email,
					password: ""
				}
			}
		});

		expect(response.data?.updateUser).toHaveProperty("errors");
		expect(typeof response.data?.updateUser.errors[0]).toBe("object");
		expect(response.data?.updateUser.errors[0].field).toBe("password");
	});

	test("[gCall] -> Should fail user is not auithenticated", async () => {
		const response = await gCall({
			source: updateUserMutation,
			variableValues: {
				options: {
					name: user.name,
					surname: user.surname,
					email: user.email,
					password: ""
				}
			}
		});

		expect(response).toHaveProperty("errors");
		expect(typeof response.errors?.[0]).toBe("object");
		expect(response.errors?.[0].message).toBe("Not authenticated");
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: updateUserMutation,
			variableValues: {
				options: {
					name: user.name,
					surname: user.surname,
					email: user.email,
					password: user.password
				}
			},
			userId: 1
		});
		expect(typeof response.data?.updateUser.user).toBe("object");
		expect(response.data?.updateUser).toHaveProperty("user");
	});
});

describe("Resend email", () => {
	const resendEmailMutation = `
	mutation ResendEmail($email: String!) {
		resendEmail(email:$email) {
		  user {
			Id
			Name
			Surname
			Email
		  }
		  errors {
			field
			message
		  }
		}
	  }
	`;

	test("[gCall] -> Should fail email doesn't exist in database", async () => {
		const response = await gCall({
			source: resendEmailMutation,
			variableValues: {
				email: "jsdladj@ksjdalk.cs"
			}
		});

		expect(response.data?.resendEmail).toHaveProperty("errors");
		expect(typeof response.data?.resendEmail.errors).toBe("object");
		expect(response.data?.resendEmail.errors[0]).toHaveProperty("field");
		expect(response.data?.resendEmail.errors[0].field).toBe("email");
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: resendEmailMutation,
			variableValues: {
				email: user.email
			}
		});

		expect(response.data?.resendEmail.errors).toBeNull;
		expect(response.data?.resendEmail.user).toHaveProperty("Id");
	});
});

describe("Update password", () => {
	const updatePasswordMutation = `
	mutation UpdatePassword($options: UpdatePassword!) {
		updatePassword(options: $options) {
		  user {
			Id
			Name
			Surname
			Email
		  }
		  errors {
			field
			message
		  }
		}
	  }
	`;

	test("[gCall] -> Should fail passwords are not matching", async () => {
		const response = await gCall({
			source: updatePasswordMutation,
			userId: 1,
			variableValues: {
				options: {
					password: "1234",
					repeatPassword: "12"
				}
			}
		});

		expect(response.data?.updatePassword).toHaveProperty("errors");
		expect(response.data?.updatePassword.user).toBeNull();
		expect(typeof response.data?.updatePassword.errors).toBe("object");
	});

	test("[gCall] -> Should fail user is not in session", async () => {
		const response = await gCall({
			source: updatePasswordMutation,
			variableValues: {
				options: {
					password: "123456767123123",
					repeatPassword: "16237813"
				}
			}
		});

		expect(response).toHaveProperty("errors");
		expect(response.errors?.[0].message).toContain("Not authenticated");
		expect(response.data).toBeNull();
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: updatePasswordMutation,
			userId: 1,
			variableValues: {
				options: {
					password: "1234567890",
					repeatPassword: "1234567890"
				}
			}
		});

		expect(response.data?.updatePassword.user).toHaveProperty("Id");
		expect(response.data?.updatePassword.errors).toBeNull();
	});
});
