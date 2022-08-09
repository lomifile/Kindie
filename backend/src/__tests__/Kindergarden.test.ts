import { testConn } from "../helpers/testConn";
import { Connection } from "typeorm";
import faker from "faker";
// import { KinderGarden } from "../orm/entities/Kindergarden";
import { KindergardenResolver } from "../graphql/resolvers/Kindergarden";
import { KinderGardenInput } from "../graphql/inputs";

// TODO: Full rewrite Kindergarden tests

let conn: Connection;
const resolvers = new KindergardenResolver();
const ctx = {
  req: { session: { userId: 1, selectedKindergarden: undefined } },
  res: {},
} as AppContext;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const kindergarden = {
  name: faker.company.companyName(),
  city: faker.address.city(),
  address: faker.address.streetAddress(),
  Zipcode: parseInt(faker.address.zipCode()),
};

describe("Create kindergarden test", () => {
  test("Should fail user Id is null", async () => {
    ctx.req.session.userId = undefined;
    const response = await resolvers.createKindergarden(kindergarden, ctx);
    expect(response).toHaveProperty("errors");
    expect(response.errors![0].field).toBe("QueryFailedError");
  });

  test("Should fail options is null", async () => {
    const response = await resolvers.createKindergarden(
      {} as KinderGardenInput,
      ctx
    );
    expect(response).toHaveProperty("errors");
    expect(response.errors![0].field).toBe("QueryFailedError");
  });

  test("Should pass", async () => {
    const response = await resolvers.createKindergarden(kindergarden, {
      req: { session: { userId: 1 } },
    } as AppContext);
    expect(response).toHaveProperty("kindergarden");
    expect(response.kindergarden).toHaveProperty("Id");
  });
});

describe("Use kindergarden tests", () => {
  test("Should fail kindergarden doesn't exist", async () => {
    const response = await resolvers.useKindergarden(14, ctx);
    expect(response).toHaveProperty("errors");
    expect(response.errors![0].field).toBe("kindergardenID");
  });

  test("Should fail user is not in session", async () => {
    const response = await resolvers.useKindergarden(1, {
      req: { session: { userId: undefined } },
    } as AppContext);
    expect(response).toHaveProperty("errors");
  });

  test("Should pass", async () => {
    const response = await resolvers.useKindergarden(3, {
      req: { session: { userId: 1 } },
    } as AppContext);
    expect(response).toHaveProperty("kindergarden");
    expect(response.kindergarden!.Id).toBe(3);
  });
});

describe("Show kindergarden", () => {
  test("Should fail user is not in session", async () => {
    const response = await resolvers.showKindergarden({
      req: { session: { userId: undefined } },
    } as AppContext);
    expect(response).toEqual([]);
  });

  test("Should pass", async () => {
    const response = await resolvers.showKindergarden({
      req: { session: { userId: 1 } },
    } as AppContext);
    expect(response).toHaveLength(1);
  });
});

describe("Delete kindergarden", () => {
  test("Should fail kindergarden doesn't exist", async () => {
    const response = await resolvers.deleteKindergarden(1);
    expect(response).toBeFalsy();
  });
  test("Should pass", async () => {
    const response = await resolvers.deleteKindergarden(3);
    expect(response).toBeTruthy();
  });
});
