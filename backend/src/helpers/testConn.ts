import { Children } from "../graphql/entities/Children";
import { Contact } from "../graphql/entities/Contact";
import { Groups } from "../graphql/entities/Groups";
import { KinderGarden } from "../graphql/entities/Kindergarden";
import { StaffMembers } from "../graphql/entities/SatffMembers";
import { User } from "../graphql/entities/User";
import { createConnection } from "typeorm";
import { Father } from "../graphql/entities/Father";
import { Mother } from "../graphql/entities/Mother";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "kindietestdb",
    synchronize: drop,
    dropSchema: drop,
    entities: [
      Children,
      Contact,
      Father,
      Groups,
      KinderGarden,
      Mother,
      StaffMembers,
      User,
    ],
  });
};
