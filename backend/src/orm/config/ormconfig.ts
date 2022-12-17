import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
	type: "postgres",
	name: "default",
	url: "postgresql://postgres:postgres@localhost:5432/kindie",
	logging: true,
	entities: ["src/orm/entities/*.ts"],
	migrations: ["src/orm/migrations/*.ts"],
	cli: {
		migrationsDir: "src/orm/migrations",
		entitiesDir: "src/orm/entities"
	}
};

export = config;
