import { testConn } from "../src/helpers/testConn";
import { Connection } from "typeorm";
import { gCall } from "../src/helpers/gCall";
import { User } from "../src/entities/User";
import faker from "faker";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

let password = faker.internet.password();
const user = {
  name: faker.name.firstName(),
  surname: faker.name.lastName(),
  email: faker.internet.email(),
  password: password,
  repeatPassword: password,
  role: faker.company.companyName(),
};

const MeQuery = `
query Me {
  me {
    Id
    Name
    Surname
    Email
    Role
    ownerOf {
        Id
        Name
        City
        Address
        Zipcode
    }
    partof {
        Id
        Name
        City
        Address
        Zipcode
    }
  }
}
`;

const registerMutation = `
mutation Register($data:UsernamePasswordInput!){
  register(options: $data){
    user{
      Id
      Name
      Surname
      Email
      Role
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
      Role
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

describe("Register mutation", () => {
  it("create user", async () => {
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });

    expect(response).toMatchObject({
      data: {
        register: {
          user: {
            Name: user.name,
            Surname: user.surname,
            Email: user.email,
            Role: user.role,
          },
          errors: null,
        },
      },
    });

    const dbUser = await User.findOne({ where: { Email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.Name).toBe(user.name);
  });
});

describe("Me query", () => {
  it("Me query failed", async () => {
    const response = await gCall({
      source: MeQuery,
    });

    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});

describe("Login mutation", () => {
  it("Login confirmation failed", async () => {
    const response = await gCall({
      source: LoginMutation,
      variableValues: {
        email: user.email,
        password: user.password,
      },
    });

    expect(response).toMatchObject({
      data: {
        login: {
          user: null,
          errors: [
            {
              field: "confirmation",
              message:
                "Your account need verification! Please check your email for verification!",
            },
          ],
        },
      },
    });
  });
});

describe("Login passed", () => {
  it("Login user passing", async () => {
    await User.update(
      {
        Email: user.email,
      },
      { confirmed: true }
    );

    const fetchUser = await User.findOne({ where: { Email: user.email } });

    const response = await gCall({
      source: LoginMutation,
      variableValues: {
        email: user.email,
        password: user.password,
      },
      userId: fetchUser?.Id,
    });

    expect(response).toMatchObject({
      data: {
        login: {
          user: {
            Name: user.name,
            Surname: user.surname,
            Email: user.email,
            Role: user.role,
          },
          errors: null,
        },
      },
    });
  });
});

describe("Me query passed", () => {
  it("Me query has user", async () => {
    const fetchUser = await User.findOne({ where: { Email: user.email } });
    const response = await gCall({
      source: MeQuery,
      userId: fetchUser?.Id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          Name: user.name,
          Surname: user.surname,
          Email: user.email,
          Role: user.role,
        },
      },
    });
  });
});
