import "reflect-metadata";
import connectRedis from "connect-redis";
import express, { RequestHandler } from "express";
import session from "express-session";
import Redis from "ioredis";
import { COOKIE_NAME, __prod__ } from "./constants";
import cors from "cors";
import path from "path";
import fs from "fs";
import morgan from "morgan";
import dotenv from "dotenv";
import { createSchema } from "./graphql";

dotenv.config({ path: ".env" });

const app = express();
const RedisStore = connectRedis(session);
const redis = new Redis(process.env.REDIS_URL as string);

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);

try {
    const accessLogStream = fs.createWriteStream(
        path.join(__dirname + "/../log/logger.log"),
        {
            flags: "a+"
        }
    );
    app.use(
        morgan("combined", {
            stream: accessLogStream
        }) as unknown as RequestHandler
    );
} catch (err) {
    console.error(err);
}

app.set("trust proxy", 1);
app.use(
    session({
        name: COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: __prod__,
            domain: __prod__ ? ".kindieapi.xyz" : undefined
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET as string,
        resave: false
    })
);

createSchema(app, redis);

export default app;
