import {
    Attendance,
    Children,
    Contact,
    Father,
    Groups,
    KinderGarden,
    Mother,
    StaffMembers,
    User
} from "../orm/entities";
import { createConnection } from "typeorm";

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
            Attendance
        ]
    });
};
