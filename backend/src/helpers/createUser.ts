import faker from "faker";
import { User } from "../orm/entities/User";
import { gCall } from "./gCall";

let password = faker.internet.password();
const user = {
	name: faker.name.firstName(),
	surname: faker.name.lastName(),
	email: faker.internet.email(),
	password: password,
	repeatPassword: password
};

const registerMutation = `
mutation Register($data:UsernamePasswordInput!){
  register(options: $data){
    user{
      Id
      Name
      Surname
      Email
      createdAt
      updatedAt
    }
    errors{
      field
      message
    }
  }
}
`;

const LoginMutation = `
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
`;

export const createUser = async (): Promise<User | undefined> => {
	// @ts-expect-error
	const response = await gCall({
		source: registerMutation,
		variableValues: {
			data: user
		}
	});

	await User.update({ Email: user.email }, { confirmed: true });

	// @ts-expect-error
	const loginUser = await gCall({
		source: LoginMutation,
		variableValues: {
			email: user.email,
			password: password
		}
	});

	return await User.findOne({ where: { Email: user.email } });
};
