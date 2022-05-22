import "reflect-metadata";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { COOKIE_NAME, __prod__ } from "./constants";
import cors from "cors";
import "dotenv-safe/config";
import { createSchema } from "./graphql";

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

createSchema(app, redis);

export default app;
