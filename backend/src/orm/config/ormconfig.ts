import { KindieLogger } from "@root/utils/log";
import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
	type: "postgres",
	name: "default",
	url: process.env.DATABASE_URL as string,
	logging: true,
	entities: ["src/orm/entities/*.ts"],
	migrations: ["src/orm/migrations/*.ts"],
	logger: new KindieLogger(),
	cli: {
		migrationsDir: "src/orm/migrations",
		entitiesDir: "src/orm/entities"
	}
};

export = config;
