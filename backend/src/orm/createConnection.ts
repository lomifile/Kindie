import { Connection, createConnection, getConnectionManager } from "typeorm";
import config from "./config/ormconfig";

export const createDbConnection = async (): Promise<Connection | null> => {
	try {
		await createConnection(config);
	} catch (err) {
		if (err.name === "AlreadyHasActiveConnectionError") {
			const activeConnection = getConnectionManager().get(config.name);
			return activeConnection;
		}
		console.log(err);
	}
	return null;
};
