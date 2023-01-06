import "reflect-metadata";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";

import { COOKIE_NAME, __prod__ } from "@root/constants";
import cors from "cors";
import dotenv from "dotenv";
import { createSchema } from "@graphql/scehma";
import { redis } from "@libs/redis";

dotenv.config({ path: ".env" });

const app = express();
const RedisStore = connectRedis(session);

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true
	})
);

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

createSchema();

export default app;
