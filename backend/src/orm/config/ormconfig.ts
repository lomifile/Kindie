import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "postgres",
  name: "default",
  url: "postgresql://postgres:postgres@localhost:5432/kindie",
  logging: true,
  entities: ["dist/orm/entities/*.js"],
  migrations: ["dist/orm/migrations/*.js"],
  cli: {
    migrationsDir: "src/orm/migrations",
    entitiesDir: "src/orm/entities",
  },
};

export = config;
