import { testConn } from "../helpers/testConn";
import { Connection } from "typeorm";
import { GroupsResolver } from "../graphql/resolvers";
import { KinderGarden } from "../orm/entities";
import faker from "faker";

let conn: Connection;
let resolver = new GroupsResolver();
let kindergarden: KinderGarden;

beforeAll(async () => {
  conn = await testConn();
  kindergarden = await KinderGarden.create({
    Name: faker.company.companyName(),
    Address: faker.address.streetAddress(),
    owningId: 1,
    City: faker.address.cityName(),
    Zipcode: parseInt(faker.address.zipCode()),
  }).save();
});

afterAll(async () => {
  await conn.close();
});

describe("Create group test", () => {
  test("Should fail user is not in session", async () => {
    const response = await resolver.createGroup("Name", {
      req: { session: { userId: undefined, selectedKindergarden: 3 } },
    } as AppContext);

    expect(response).toHaveProperty("errors");
    expect(response.errors![0].field).toBe("Groups");
  });

  test("Should fail selected kindergarden is undefined", async () => {
    const response = await resolver.createGroup("Name", {
      req: { session: { userId: 1, selectedKindergarden: undefined } },
    } as AppContext);

    expect(response).toHaveProperty("errors");
    expect(response.errors![0].field).toBe("Groups");
  });

  test("Should fail name is empty", async () => {
    const response = await resolver.createGroup("", {
      req: { session: { userId: 1, selectedKindergarden: 3 } },
    } as AppContext);

    expect(response).toHaveProperty("errors");
    expect(response.errors![0].field).toBe("Groups");
  });

  test("Should pass", async () => {
    const response = await resolver.createGroup("Name", {
      req: { session: { userId: 1, selectedKindergarden: kindergarden.Id } },
    } as AppContext);
    expect(response).toHaveProperty("groups");
    expect(response.groups).toHaveProperty("Id");
  });
});

describe("Show groups test", () => {
  test("Should fail no kindergarden", async () => {
    const response = await resolver.showGroups({
      req: { session: { userId: undefined, selectedKindergarden: undefined } },
    } as AppContext);

    expect(response).toStrictEqual([]);
  });

  test("Should pass", async () => {
    const response = await resolver.showGroups({
      req: {
        session: { userId: 1, selectedKindergarden: kindergarden.Id },
      },
    } as AppContext);

    expect(response).toHaveLength(1);
  });
});

describe("Show selected group", () => {
  test("Should fail because group is not set in session", async () => {
    const response = await resolver.showSelectedGroup({
      req: { session: { selectedGroup: undefined } },
    } as AppContext);

    expect(response).toBeNull();
  });

  test("Should pass", async () => {
    const response = await resolver.showSelectedGroup({
      req: { session: { selectedGroup: 4 } },
    } as AppContext);
    expect(response).toHaveProperty("Id");
  });
});

describe("Use group tests", () => {
  test("Should fail group doesn't exist", async () => {
    const response = await resolver.useGroup(2, {
      req: { session: { userId: 1, selectedKindergarden: 4 } },
    } as AppContext);

    expect(response).toHaveProperty("errors");
    expect(response.errors![0].field).toBe("Id");
  });

  test("Should fail kindergaredn doesn't match", async () => {
    const response = await resolver.useGroup(3, {
      req: { session: { userId: 1, selectedKindergarden: 2 } },
    } as AppContext);

    expect(response).toHaveProperty("errors");
    expect(response.errors![0].field).toBe("Id");
  });

  test("Should pass", async () => {
    const response = await resolver.useGroup(4, {
      req: { session: { userId: 1, selectedKindergarden: kindergarden.Id } },
    } as AppContext);

    expect(response).toHaveProperty("groups");
    expect(response.groups).toHaveProperty("Id");
  });
});

describe("Clear group", () => {
  test("Should pass", () => {
    const response = resolver.clearGroup({
      req: { session: { selectedGroup: 123 } },
    } as AppContext);

    expect(response).toBeTruthy();
  });
});

describe("Delete group", () => {
  test("Should pass", async () => {
    const response = await resolver.deleteGroup(2);

    expect(response).toBeTruthy();
  });
});
