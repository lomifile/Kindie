import "reflect-metadata";
import connectRedis from "connect-redis";
import express, { Response } from "express";
import session from "express-session";

import { COOKIE_NAME, __prod__ } from "@root/constants";
import cors from "cors";
import http from "http";
import { redis } from "@libs/redis";
import * as pjs from "../package.json";

const app = express();
const RedisStore = connectRedis(session);
export const httpServer = http.createServer(app);

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
			domain: __prod__ ? ".test-kindie.store" : undefined
		},
		saveUninitialized: false,
		secret: process.env.SESSION_SECRET as string,
		resave: false
	})
);

app.get("/test", async (_, res: Response) => {
	res.json({
		APP_NAME: "Kindie",
		API_VERSION: pjs.version,
		GRAPHQL_VERSION: pjs.dependencies.graphql
	});
});

export default app;
