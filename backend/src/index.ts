import "reflect-metadata";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import { createConnection } from "typeorm";
import Redis from "ioredis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, __prod__ } from "./Constants";
import { HelloResolver } from "./resolvers/Hello";
import { UserResolver } from "./resolvers/User";
import { KindergardenResolver } from "./resolvers/Kindergarden";
import { GroupsResolver } from "./resolvers/Groups";
import { ChildrenResolver } from "./resolvers/Children";
import { StaffMembersResolver } from "./resolvers/StaffMembers";
import { FatherResolver } from "./resolvers/Father";
import { MotherResolver } from "./resolvers/Mother";
import cors from "cors";
import "dotenv-safe/config";
import { ContactResolver } from "./resolvers/Contact";
import path from "path";

// Entities
import { KinderGarden } from "./entities/Kindergarden";
import { User } from "./entities/User";
import { Children } from "./entities/Children";
import { Contact } from "./entities/Contact";
import { Groups } from "./entities/Groups";
import { Mother } from "./entities/Mother";
import { Father } from "./entities/Father";
import { StaffMembers } from "./entities/SatffMembers";

const main = async () => {
  // @ts-ignore
  const connection = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [
      User,
      KinderGarden,
      Children,
      Contact,
      Groups,
      Mother,
      Father,
      StaffMembers,
    ],
  });

  await connection.runMigrations();

  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.set("trust proxy", 1);
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
        domain: __prod__ ? ".kindieapi.xyz" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
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
        StaffMembersResolver,
        FatherResolver,
        MotherResolver,
        ContactResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false, //for now
  });

  app.listen(parseInt(process.env.PORT as string), () => {
    console.log(
      `Server started on localhost:${parseInt(process.env.PORT as string)}`
    );
  });
};

main().catch((err) => {
  console.error(err);
});
