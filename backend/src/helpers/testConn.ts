import { Children } from "../entities/Children";
import { Contact } from "../entities/Contact";
import { Groups } from "../entities/Groups";
import { KinderGarden } from "../entities/Kindergarden";
import { StaffMembers } from "../entities/SatffMembers";
import { User } from "../entities/User";
import { createConnection } from "typeorm";
import { Father } from "../entities/Father";
import { Mother } from "../entities/Mother";

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
