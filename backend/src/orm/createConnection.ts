import { Connection, createConnection, getConnectionManager } from "typeorm";
import config from "./config/ormconfig";

export const createDbConnection = async (): Promise<Connection | null> => {
	try {
		const conn = await createConnection(config);
		if (process.env.NODE_ENV === "production") await conn.runMigrations();
	} catch (err) {
		if (err.name === "AlreadyHasActiveConnectionError") {
			const activeConnection = getConnectionManager().get(config.name);
			return activeConnection;
		}
		console.log(err);
	}
	return null;
};
