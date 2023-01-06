import { logger } from "@root/libs/winston";
import { Logger } from "typeorm";

export class KindieLogger implements Logger {
	async log(level: "info" | "log" | "warn", message: string) {
		const messageObj = {
			time: new Date().toISOString(),
			message
		};
		logger.log({
			level,
			message: JSON.stringify(messageObj)
		});
	}

	async logQuery(query: string, parameters?: unknown[] | undefined) {
		const messageObj = {
			time: new Date().toISOString(),
			query: query,
			parameters: parameters
		};
		logger.info(JSON.stringify(messageObj));
	}

	async logQueryError(
		error: string | Error,
		query: string,
		parameters?: unknown[] | undefined
	) {
		const messageObj = {
			time: new Date().toISOString(),
			error: error,
			query: query,
			parameters: parameters
		};
		logger.error(JSON.stringify(messageObj));
	}

	async logQuerySlow(
		time: number,
		query: string,
		parameters?: unknown[] | undefined
	) {
		const messageObj = {
			time: time,
			query: query,
			parameters: parameters
		};
		logger.log({
			level: "info",
			message: JSON.stringify(messageObj)
		});
	}

	async logSchemaBuild(message: string) {
		logger.log({
			level: "info",
			message: message
		});
	}

	async logMigration(message: string) {
		logger.log({
			level: "info",
			message: message
		});
	}
}
