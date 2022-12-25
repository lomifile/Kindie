import { testConn } from "../../src/helpers/testConn";
import { Connection } from "typeorm";
import { faker } from "@faker-js/faker";
import { UserResolver } from "../graphql/resolvers/User";
import {
	UpdatePassword,
	UsernamePasswordInput
} from "../graphql/inputs/UserInput";
import { User } from "../orm/entities/User";
import { v4 } from "uuid";
import { ACCOUNT_VERIFICATION_PREFIX } from "../constants";
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

const errorObject = (field: string, message: string) => ({
	errors: [
		{
			field,
			message
		}
	]
});

const gErrorObject = (field: string, message: string) => [
	{
		field,
		message
	}
];

const resolver = new UserResolver();

describe("User registration tests", () => {
	test("Should fail registration because email is not correct", async () => {
		const options = {
			name: faker.name.firstName(),
			surname: faker.name.lastName(),
			email: "iauysgduyajsd",
			password: password,
			repeatPassword: password
		} as UsernamePasswordInput;

		const ctx = {} as AppContext;

		const response = await resolver.register(options, ctx);

		expect(response).toHaveProperty("errors");
		expect(response).toMatchObject(errorObject("email", "Invalid email"));
	});

	test("Should fail registration because passwords do not match", async () => {
		const options = {
			name: faker.name.firstName(),
			surname: faker.name.lastName(),
			email: faker.internet.email(),
			password: password,
			repeatPassword: "17263871"
		} as UsernamePasswordInput;

		const ctx = {} as AppContext;

		const response = await resolver.register(options, ctx);

		expect(response).toHaveProperty("errors");
		expect(response).toMatchObject(
			errorObject("repeatPassword", "Passwords don't match")
		);
	});

	test("Should fail registration because password is short", async () => {
		const options = {
			name: faker.name.firstName(),
			surname: faker.name.lastName(),
			email: faker.internet.email(),
			password: "12345",
			repeatPassword: "12345"
		} as UsernamePasswordInput;

		const ctx = {} as AppContext;

		const response = await resolver.register(options, ctx);

		expect(response).toHaveProperty("errors");
		expect(response).toMatchObject(
			errorObject("password", "Length must be greater than 8")
		);
	});

	test("Should fail registration beacuse name is empty", async () => {
		const options = {
			name: "",
			surname: "",
			email: faker.internet.email(),
			password: "12345",
			repeatPassword: "12345"
		} as UsernamePasswordInput;

		const ctx = {} as AppContext;

		const response = await resolver.register(options, ctx);

		expect(response).toHaveProperty("errors");
		expect(response).toMatchObject(errorObject("name", "Name is empty"));
	});

	test("Should fail registration beacuse last name is empty", async () => {
		const options = {
			name: faker.name.firstName(),
			surname: "",
			email: faker.internet.email(),
			password: "12345",
			repeatPassword: "12345"
		} as UsernamePasswordInput;

		const ctx = {} as AppContext;

		const response = await resolver.register(options, ctx);

		expect(response).toHaveProperty("errors");
		expect(response).toMatchObject(
			errorObject("surname", "Last name is empty")
		);
	});

	test("Should pass registration", async () => {
		const ctx = {} as AppContext;

		const response = await resolver.register(user, ctx);

		expect(response).toHaveProperty("user");
	});

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
		const data = {
			name: faker.name.firstName(),
			surname: faker.name.lastName(),
			email: faker.internet.email(),
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

		expect(typeof response.data?.register.user).toBe("object");
		expect(response.data?.register.errors).toBeNull();
		expect(response.data?.register.user).toHaveProperty("Id");
	});
});

describe("Login function tests", () => {
	test("Should fail beacuse user is not confirmed", async () => {
		const ctx = {} as AppContext;

		const response = await resolver.login(user.email, user.password, ctx);

		expect(response).toHaveProperty("errors");
		expect(response).toMatchObject(
			errorObject(
				"confirmation",
				"Your account need verification! Please check your email for verification!"
			)
		);
	});

	test("Should fail because email does not exist", async () => {
		const ctx = {} as AppContext;

		const response = await resolver.login(
			"email@email.com",
			user.password,
			ctx
		);

		expect(response).toHaveProperty("errors");
		expect(response).toMatchObject(
			errorObject("email", "Email doesn't exist")
		);
	});

	test("Should fail because passwords don't match", async () => {
		const ctx = {} as AppContext;

		await User.update({ Email: user.email }, { confirmed: true });
		const response = await resolver.login(user.email, "123456", ctx);

		expect(response).toHaveProperty("errors");
		expect(response).toMatchObject(
			errorObject(
				"password",
				"Password you entered is not matching one in database"
			)
		);
	});

	test("Should pass", async () => {
		const ctx = { req: { session: { userId: undefined } } } as AppContext;

		const response = await resolver.login(user.email, user.password, ctx);

		expect(response).toHaveProperty("user");
		expect(ctx.req).toHaveProperty("session");
		expect(typeof ctx.req.session.userId === "number").toBeTruthy();
		await User.update({ Email: user.email }, { confirmed: false });
	});

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
	test("Should fail because user is not logged in", async () => {
		const response = await resolver.me({
			req: { session: {} }
		} as AppContext);
		expect(response).toBeNull();
	});

	test("Should fail because user doesn't exist in database", async () => {
		const response = await resolver.me({
			req: { session: { userId: 7 } }
		} as AppContext);

		expect(response).toBeUndefined();
	});

	test("Should pass", async () => {
		const response = await resolver.me({
			req: { session: { userId: 1 } }
		} as AppContext);

		expect(response).toHaveProperty("Name");
		expect(response).toHaveProperty("Surname");
	});

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
	test("Should pass because it should destroy whole session", async () => {
		const ctx = {
			req: {
				session: {
					userId: undefined,
					destroy: jest.fn().mockImplementation((fn) => fn(false))
				}
			},
			res: { clearCookie: jest.fn() }
		} as unknown as AppContext;
		const response = await resolver.logout(ctx);
		expect(response).toBeTruthy();
	});

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
	let ctx: AppContext;

	beforeAll(async () => {
		ctx = {
			req: { session: { userId: undefined } },
			redis: { get: jest.fn() as unknown }
		} as AppContext;
	});

	test("Should fail no token", async () => {
		const response = await resolver.verifyAccount("", ctx);
		expect(response).toHaveProperty("errors");
	});

	test("Should fail wrong token", async () => {
		const response = await resolver.verifyAccount("74783g1be", ctx);
		expect(response).toHaveProperty("errors");
	});

	test("Should pass", async () => {
		const token = v4();
		const userObj = await User.findOne({ Email: user.email });
		ctx.redis = redis;
		redis.set(
			ACCOUNT_VERIFICATION_PREFIX + token,
			userObj?.Id as number,
			"EX",
			1000 * 60 * 60 * 24 * 3
		);
		const response = await resolver.verifyAccount(token, ctx);
		expect(response).toHaveProperty("user");
	});

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
	let ctx: AppContext;

	beforeAll(async () => {
		ctx = { redis: { get: jest.fn() as unknown } } as AppContext;
	});

	test("Should fail wrong email", async () => {
		const response = await resolver.forgetPassword("email@email.com", ctx);
		expect(response).toBeFalsy();
	});

	test("Should pass", async () => {
		ctx.redis = redis;
		const response = await resolver.forgetPassword(user.email, ctx);
		expect(response).toBeTruthy();
	});
});

describe("Staff of Query", () => {
	let ctx: AppContext;

	beforeAll(() => {
		ctx = { req: { session: { userId: undefined } } } as AppContext;
	});

	test("Should fail user is not authenticated", async () => {
		const response = await resolver.staffOf(ctx);
		expect(response).toMatchObject([]);
	});

	test("Should fail user in session does not exist in database", async () => {
		ctx.req.session.userId = 5;
		const response = await resolver.staffOf(ctx);
		expect(response).toMatchObject([]);
	});

	test("Should pass", async () => {
		ctx.req.session.userId = 1;
		const response = await resolver.staffOf(ctx);
		expect(response.at(0)).toHaveProperty("Id");
	});
});

describe("Update user mutation", () => {
	let ctx: AppContext;

	beforeAll(() => {
		ctx = { req: { session: { userId: undefined } } } as AppContext;
	});

	test("Should fail because password is not provided", async () => {
		const response = await resolver.updateUser(
			{
				name: user.name,
				surname: user.surname,
				email: user.email,
				password: ""
			},
			ctx
		);
		expect(response).toHaveProperty("errors");
	});

	test("Should fail because user is not authenticated", async () => {
		const response = await resolver.updateUser(
			{
				name: user.name,
				surname: user.surname,
				email: user.email,
				password: user.password
			},
			ctx
		);
		expect(response).toMatchObject({ user: undefined });
	});

	test("Should Pass", async () => {
		ctx.req.session.userId = 1;
		user.email = "email@email.com";
		const response = await resolver.updateUser(
			{
				name: user.name,
				surname: user.surname,
				email: user.email,
				password: user.password
			},
			ctx
		);
		expect(response).toHaveProperty("user");
	});
});

describe("Resend email", () => {
	let ctx: AppContext;

	beforeAll(() => {
		ctx = { redis: redis } as AppContext;
	});

	test("Should fail email doesn't exist in database", async () => {
		const response = await resolver.resendEmail("email1@email.com", ctx);
		expect(response).toHaveProperty("errors");
	});

	test("Should pass", async () => {
		const response = await resolver.resendEmail(user.email, ctx);
		expect(response).toHaveProperty("user");
	});
});

describe("Update password", () => {
	let ctx: AppContext;

	beforeAll(() => {
		ctx = { req: { session: { userId: undefined } } } as AppContext;
	});

	test("Should fail passwords are not matcing", async () => {
		const response = await resolver.updatePassword(
			{
				password: "1231",
				repeatPassword: "12"
			} as UpdatePassword,
			ctx
		);
		expect(response).toHaveProperty("errors");
	});

	test("Should fail user is not in session", async () => {
		const response = await resolver.updatePassword(
			{
				password: "1231",
				repeatPassword: "1231"
			},
			ctx
		);
		expect(response).toHaveProperty("errors");
		expect(response.user).toBe(undefined);
	});

	test("Should pass", async () => {
		ctx.req.session.userId = 1;
		const response = await resolver.updatePassword(
			{
				password: "1231",
				repeatPassword: "1231"
			},
			ctx
		);
		expect(response.user).toHaveProperty("Id");
	});
});
