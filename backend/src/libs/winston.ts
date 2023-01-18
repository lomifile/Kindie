import winston from "winston";

export const logger = winston.createLogger({
	transports: [
		new winston.transports.File({
			format: winston.format.json(),
			filename: __dirname + "/../log/sql.log"
		}),
		new winston.transports.Console({
			format: winston.format.cli()
		})
	]
});
