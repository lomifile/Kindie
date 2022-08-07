import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { Redis } from "ioredis";
import { buildSchema } from "type-graphql";
import { Express } from "express";

import {
  AttendanceResolver,
  ChildrenResolver,
  ContactResolver,
  FatherResolver,
  GroupsResolver,
  KindergardenResolver,
  MotherResolver,
  StaffMembersResolver,
  UserResolver,
} from "./resolvers";

export const createSchema = async (app: Express, redis: Redis) => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        StaffMembersResolver,
        MotherResolver,
        KindergardenResolver,
        GroupsResolver,
        FatherResolver,
        ContactResolver,
        ChildrenResolver,
        AttendanceResolver,
      ],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }) => ({ req, res, redis }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
};
