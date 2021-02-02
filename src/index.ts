import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import { createConnection } from "typeorm";
import Redis from "ioredis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, __prod__ } from "./Constants";
import { HelloResolver } from "./resolvers/Hello";
import "reflect-metadata";
import { User } from "./entities/User";
import { KinderGarden } from "./entities/Kindergarden";
import { Groups } from "./entities/Groups";
import { Children } from "./entities/Children";
import { Mother } from "./entities/Mother";
import { Father } from "./entities/Father";
import { UserResolver } from "./resolvers/User";
import { KindergardenResolver } from "./resolvers/Kindergarden";
import { GroupsResolver } from "./resolvers/Groups";
import { ChildrenResolver } from "./resolvers/Children";

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    database: "dv_organizator",
    username: "postgres",
    password: "00259641",
    logging: true,
    synchronize: true,
    entities: [User, KinderGarden, Groups, Children, Mother, Father],
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        host: "localhost",
        port: 6379,
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: !__prod__,
      },
      saveUninitialized: false,
      secret: "uasdkadnkad",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        UserResolver,
        KindergardenResolver,
        GroupsResolver,
        ChildrenResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
