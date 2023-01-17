import app from "@root/server";
import cors from "cors";
import { apolloServer } from "@libs/apollo";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "express";
import { redis } from "@root/libs/redis";

export const createSchema = async () => {
	await apolloServer.start();
	app.use(
		"/graphql",
		cors<cors.CorsRequest>({
			origin: process.env.CORS_ORIGIN
		}),
		json(),
		expressMiddleware(apolloServer as any, {
			context: async ({ req, res }) => ({ req, res, redis })
		})
	);
};
