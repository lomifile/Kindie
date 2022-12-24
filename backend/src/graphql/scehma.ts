import app from "../server";
import { apolloServer } from "../libs/apollo";

export const createSchema = async () => {
	await apolloServer.start();
	apolloServer.applyMiddleware({
		app,
		cors: false
	});
};
