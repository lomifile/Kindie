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
	const registerMutation = `
			mutation Register ($data: UsernamePasswordInput!) {
				register(options: $data) {
					data {
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
			`;
	test("[gCall] -> Should fail email is not correct", async () => {
		const data = {
			name: faker.name.firstName(),
			surname: faker.name.lastName(),
			email: "iauysgduyajsd",
			password: password,
			repeatPassword: password
		} as UsernamePasswordInput;
		const response = await gCall({
			source: registerMutation,
			variableValues: {
				data
			}
		});

		expect(typeof response.data?.register.errors).toBe("object");
		expect(response.data?.register.data).toBeNull();
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
			source: registerMutation,
			variableValues: {
				data
			}
		});

		expect(typeof response.data?.register.errors).toBe("object");
		expect(response.data?.register.data).toBeNull();
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
			source: registerMutation,
			variableValues: {
				data
			}
		});

		expect(typeof response.data?.register.errors).toBe("object");
		expect(response.data?.register.data).toBeNull();
		expect(response.data?.register.errors).toMatchObject(
			gErrorObject("password", "Length must be greater than 8")
		);
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: registerMutation,
			variableValues: {
				data: user
			}
		});

		expect(typeof response.data?.register.data).toBe("object");
		expect(response.data?.register.errors).toBeNull();
		expect(response.data?.register.data).toHaveProperty("Id");
	});
});

describe("Login function tests", () => {
	const loginMutation = `
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			data {
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
	`;
	test("[gCall] -> Should fail email is not correct", async () => {
		const response = await gCall({
			source: loginMutation,
			variableValues: {
				email: "678687asdasd",
				password: user.password
			}
		});

		expect(response.data?.login.data).toBeNull();
		expect(typeof response.data?.login.errors).toBe("object");
	});

	test("[gCall] -> Should fail user is not confirmed", async () => {
		const response = await gCall({
			source: loginMutation,
			variableValues: {
				email: user.email,
				password: user.password
			}
		});
		expect(response.data?.login.data).toBeNull();
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
			source: loginMutation,
			variableValues: {
				email: user.email,
				password: user.password
			}
		});

		expect(response.data?.login.errors).toBeNull();
		expect(typeof response.data?.login.data).toBe("object");
		expect(response.data?.login.data).toHaveProperty("Id");
	});
});

describe("Me query", () => {
	const meQuery = `
		query Me {
			me {
				data {
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
	test("[gCall] -> Should fail user is not in session", async () => {
		const response = await gCall({
			source: meQuery
		});

		expect(response.data?.me).toBeNull();
		expect(response.errors?.[0].message).toContain("Not authenticated");
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: meQuery,
			userId: 1
		});

		expect(response.data?.me.errors).toBeNull();
		expect(response.data?.me.data).toHaveProperty("Id");
		expect(response.data?.me.data).toMatchObject({
			Id: 1,
			Name: user.name,
			Surname: user.surname,
			Email: user.email
		});
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
	const verifyAccountMutation = `
		mutation VerifyAccount($token: String!) {
			verifyAccount(token: $token) {
				data {
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
	`;
	test("[gCall] -> Should fail no token", async () => {
		const response = await gCall({
			source: verifyAccountMutation,
			variableValues: {
				token: ""
			}
		});
		expect(response.data?.verifyAccount.data).toBeNull();
		expect(typeof response.data?.verifyAccount.errors).toBe("object");
		expect(response.data?.verifyAccount.errors).toMatchObject(
			gErrorObject("token", "Token expired")
		);
	});

	test("[gCall] -> Should fail wrong token", async () => {
		const response = await gCall({
			source: verifyAccountMutation,
			variableValues: {
				token: "bnasyhdkua"
			}
		});
		expect(response.data?.verifyAccount.data).toBeNull();
		expect(typeof response.data?.verifyAccount.errors).toBe("object");
		expect(response.data?.verifyAccount.errors).toMatchObject(
			gErrorObject("token", "Token expired")
		);
	});
});

describe("Forgot password mutation", () => {
	const forgetPasswordMutation = `
		mutation ForgotPassword($email: String!){
			forgetPassword(email: $email) {
				result
				errors {
					field
					message
				}
			}
		}
	`;
	test("[gCall] -> Should fail wrong email", async () => {
		const response = await gCall({
			source: forgetPasswordMutation,
			variableValues: {
				email: "ahusdkusa"
			}
		});

		expect(typeof response.data?.forgetPassword.result).toBe("boolean");
		expect(response.data?.forgetPassword.result).toBeFalsy();
		expect(response.data?.forgetPassword.errors[0]).toMatchObject({
			field: "email",
			message: "Email is not valid"
		});
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: forgetPasswordMutation,
			variableValues: {
				email: user.email
			}
		});

		expect(response.data?.forgetPassword.errors).toBeNull();
		expect(typeof response.data?.forgetPassword.result).toBe("boolean");
		expect(response.data?.forgetPassword.result).toBeTruthy();
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
		  data {
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

	test("[gCall] -> Should fail user is not auithenticated", async () => {
		const response = await gCall({
			source: updateUserMutation,
			variableValues: {
				options: {
					name: user.name,
					surname: user.surname,
					email: user.email
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
					email: user.email
				}
			},
			userId: 1
		});
		expect(typeof response.data?.updateUser.data).toBe("object");
		expect(response.data?.updateUser.data).toHaveProperty("Id");
		expect(response.data?.updateUser.data).toMatchObject({
			Id: 1,
			Name: user.name,
			Surname: user.surname,
			Email: user.email
		});
	});
});

describe("Resend email", () => {
	const resendEmailMutation = `
		mutation ResendEmail($email: String!) {
			resendEmail(email: $email) {
				result
				errors {
				  field
				  message
				}
			  }
		}
	`;

	test("[gCall] -> Should fail email is not valid", async () => {
		const response = await gCall({
			source: resendEmailMutation,
			variableValues: {
				email: "jsdladj"
			}
		});

		expect(response.data?.resendEmail.result).toBeFalsy();
		expect(response.data?.resendEmail.errors[0]).toMatchObject({
			field: "email",
			message: "Email is not valid"
		});
	});

	test("[gCall] -> Should fail email doesn't exist in database", async () => {
		const response = await gCall({
			source: resendEmailMutation,
			variableValues: {
				email: "jsdladj@ksjdalk.cs"
			}
		});

		expect(response.data?.resendEmail.result).toBeFalsy();
		expect(response.data?.resendEmail.errors[0]).toMatchObject({
			field: "email",
			message: "Email does not exist in database"
		});
	});

	test("[gCall] -> Should pass", async () => {
		const response = await gCall({
			source: resendEmailMutation,
			variableValues: {
				email: user.email
			}
		});

		expect(response.data?.resendEmail.errors).toBeNull();
		expect(response.data?.resendEmail.result).toBeTruthy();
	});
});

describe("Update password", () => {
	const updatePasswordMutation = `
	mutation UpdatePassword($options: UpdatePassword!) {
		updatePassword(options: $options) {
		  data {
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
		expect(response.data?.updatePassword.data).toBeNull();
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

		expect(response.data?.updatePassword.data).toHaveProperty("Id");
		expect(response.data?.updatePassword.errors).toBeNull();
	});
});

describe("Should update profile picture", () => {
	const addProfilePictureMutation = `
	mutation AddProfilePicture($picture: String!) {
		addProfilePicture(picture: $picture) {
		  data {
			Id
			Name
			Surname
			picture
		  }
		  errors {
			field
			message
		  }
		}
	  }
	`;
	test("Should fail picture arg is empty", async () => {
		const response = await gCall({
			source: addProfilePictureMutation,
			variableValues: {
				picture: ""
			},
			userId: 1
		});

		expect(response.data?.addProfilePicture.data).toBeNull();
		expect(response.data?.addProfilePicture.errors[0].field).toContain(
			"picture"
		);
	});

	test("Should pass", async () => {
		const response = await gCall({
			source: addProfilePictureMutation,
			variableValues: {
				picture:
					"data:image/png;base64,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"
			},
			userId: 1
		});
		expect(response.data?.addProfilePicture.data).toHaveProperty("Id");
		expect(response.data?.addProfilePicture.errors).toBeNull();
	});
});
