import { testConn } from "../helpers/testConn";
import { Connection } from "typeorm";
import faker from "faker";
import { gCall } from "../helpers/gCall";
import { createUser } from "../helpers/createUser";
import { KinderGarden } from "../entities/Kindergarden";

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
