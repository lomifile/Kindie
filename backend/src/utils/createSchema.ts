import { buildSchema } from "type-graphql";

import { ChildrenResolver } from "../resolvers/Children";
import { ContactResolver } from "../resolvers/Contact";
import { FatherResolver } from "../resolvers/Father";
import { GroupsResolver } from "../resolvers/Groups";
import { HelloResolver } from "../resolvers/Hello";
import { KindergardenResolver } from "../resolvers/Kindergarden";
import { MotherResolver } from "../resolvers/Mother";
import { StaffMembersResolver } from "../resolvers/StaffMembers";
import { UserResolver } from "../resolvers/User";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      HelloResolver,
      UserResolver,
      KindergardenResolver,
      GroupsResolver,
      ChildrenResolver,
      StaffMembersResolver,
      FatherResolver,
      MotherResolver,
      ContactResolver,
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
