import { testConn } from "../helpers/testConn";
import { Connection } from "typeorm";
import faker from "faker";
import { gCall } from "../helpers/gCall";
import { createUser } from "../helpers/createUser";
import { KinderGarden } from "../orm/entities/Kindergarden";
import { KindergardenResolver } from "../graphql/resolvers/Kindergarden";

// TODO: Full rewrite Kindergarden tests

let conn: Connection;

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

const CreateKindergarden = `
  mutation CreateKindergarden($options: KinderGardenInput!) {
    createKindergarden(options: $options) {
      kindergarden {
        Id
        Name
        City
        Address
        Zipcode
      }
      errors {
        field
        message
      }
    }
  }
`;

describe("Create Kindergarden", () => {
  it("Create kindergarden fail: Not authenicated", async () => {
    const response = await gCall({
      source: CreateKindergarden,
      variableValues: {
        options: kindergarden,
      },
    });
    expect(response).toHaveProperty("errors");
  });

  it("Logs in user and creates kindergaden successfully", async () => {
    const user = await createUser();
    const response = await gCall({
      source: CreateKindergarden,
      variableValues: {
        options: kindergarden,
      },
      userId: user?.Id,
    });
    expect(response).toMatchObject({
      data: {
        createKindergarden: {
          kindergarden: {
            Name: kindergarden.name,
            City: kindergarden.city,
            Address: kindergarden.address,
            Zipcode: kindergarden.Zipcode,
          },
          errors: null,
        },
      },
    });
  });
});

const useKindergarden = `
mutation UseKindergarden($kindergardenID: Float!) {
    useKindergarden(kindergadenID: $kindergardenID) {
      kindergarden {
        Name
        City
        Address
        Zipcode
      }
      errors {
        field
        message
      }
    }
  }
`;

describe("Use kindergarden mutation", () => {
  it("Use kindergarden mutation fails because id is not in database", async () => {
    const user = await createUser();
    const response = await gCall({
      source: useKindergarden,
      variableValues: {
        kindergardenID: 4,
      },
      userId: user?.Id,
    });
    expect(response).toMatchObject({
      data: {
        useKindergarden: {
          kindergarden: null,
          errors: [
            {
              field: "kindergardenID",
              message: "Kindergarden does not exist",
            },
          ],
        },
      },
    });
  });

  it("Use kindergarden mutation pass", async () => {
    const user = await createUser();
    const kindergardenData = await KinderGarden.findOne({
      where: { Name: kindergarden.name },
    });
    const response = await gCall({
      source: useKindergarden,
      variableValues: {
        kindergardenID: kindergardenData?.Id,
      },
      userId: user?.Id,
    });
    expect(response).toMatchObject({
      data: {
        useKindergarden: {
          kindergarden: {
            Name: kindergarden.name,
            Address: kindergarden.address,
            City: kindergarden.city,
            Zipcode: kindergarden.Zipcode,
          },
          errors: null,
        },
      },
    });
  });

  it("Uses kindergarden of his staff member fail", async () => {
    const user = await createUser();
    const KindergardenData = await KinderGarden.findOne({
      where: { Name: kindergarden.name },
    });
    await KinderGarden.update({ Name: kindergarden.name }, { owningId: 1 });
    const response = await gCall({
      source: useKindergarden,
      variableValues: {
        kindergardenID: KindergardenData?.Id,
      },
      userId: user?.Id,
    });
    expect(response).toMatchObject({
      data: {
        useKindergarden: {
          kindergarden: null,
          errors: [
            {
              field: "kindergardenID",
              message: "Kindergarden does not exist",
            },
          ],
        },
      },
    });
  });
});

const selectedKindergarden = `
query ShowSelectedKindergarden {
    selectedKindergarden {
        Name
        City
        Address
        Zipcode
    }
  }
`;

describe("Selected kindergarden query", () => {
  it("Selected kindergarden query fail", async () => {
    const user = await createUser();

    const response = await gCall({
      source: selectedKindergarden,
      userId: user?.Id,
    });
    expect(response).toMatchObject({
      data: {
        selectedKindergarden: null,
      },
    });
  });

  it("Selected kindergarden query pass", async () => {
    const user = await createUser();
    const kindergardenData = await KinderGarden.findOne({
      where: { Name: kindergarden.name },
    });
    const response = await gCall({
      source: selectedKindergarden,
      userId: user?.Id,
      selectedKindergarden: kindergardenData?.Id,
    });
    expect(response).toMatchObject({
      data: {
        selectedKindergarden: {
          Name: kindergarden.name,
          Address: kindergarden.address,
          City: kindergarden.city,
          Zipcode: kindergarden.Zipcode,
        },
      },
    });
  });
});

const showKindergarden = `
query ShowKindergarden {
    showKindergarden {
        Name
        City
        Address
        Zipcode
    }
  }
`;

describe("Show kindergarden query", () => {
  it("Show kinergarden query fail", async () => {
    const response = await gCall({
      source: showKindergarden,
    });
    expect(response).toMatchObject({
      data: null,
    });
  });

  const kindergardenResolver = new KindergardenResolver();

  test("Should show kindergarden", async () => {
    let ctx: AppContext = { req: { session: { userId: 1 } } } as AppContext;

    console.log(await kindergardenResolver.showKindergarden(ctx));
    expect(kindergardenResolver.showKindergarden(ctx));
  });

  it("Show kindergarden query pass", async () => {
    const user = await createUser();
    await KinderGarden.update({ Name: kindergarden.name }, { owningId: 2 });
    const kindergardenData = await KinderGarden.findOne({
      where: { Name: kindergarden.name },
    });
    const response = await gCall({
      source: showKindergarden,
      userId: user?.Id,
      selectedKindergarden: kindergardenData?.Id,
    });
    expect(response).toMatchObject({
      data: {
        showKindergarden: [
          {
            Name: kindergarden.name,
            Address: kindergarden.address,
            City: kindergarden.city,
            Zipcode: kindergarden.Zipcode,
          },
        ],
      },
    });
  });
});

const deleteKindergarden = `
mutation DeleteKindergarden($id: Int!) {
  deleteKindergarden(id: $id)
}
`;

describe("Delete kindergarden mutatiton", () => {
  it("Delete kindergarden mutation fail", async () => {
    const user = await createUser();
    const response = await gCall({
      source: deleteKindergarden,
      variableValues: {
        id: 7,
      },
      userId: user?.Id,
    });
    expect(response).toMatchObject({
      data: {
        deleteKindergarden: false,
      },
    });
  });

  it("Delete kindergarden mutation pass", async () => {
    const KindergardenData = await KinderGarden.findOne({
      where: { Name: kindergarden.name },
    });
    const user = await createUser();
    const response = await gCall({
      source: deleteKindergarden,
      variableValues: {
        id: KindergardenData?.Id,
      },
      userId: user?.Id,
    });
    expect(response).toMatchObject({
      data: {
        deleteKindergarden: true,
      },
    });
  });
});
