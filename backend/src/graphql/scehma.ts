import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { Redis } from "ioredis";
import { buildSchema } from "type-graphql";
import { Express } from "express";

import { UserResolver } from "./resolvers/User";
import { StaffMembersResolver } from "./resolvers/StaffMembers";
import { MotherResolver } from "./resolvers/Mother";
import { KindergardenResolver } from "./resolvers/Kindergarden";
import { GroupsResolver } from "./resolvers/Groups";
import { FatherResolver } from "./resolvers/Father";
import { ContactResolver } from "./resolvers/Contact";
import { ChildrenResolver } from "./resolvers/Children";

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
