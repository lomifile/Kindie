import path from "path";
import { MiddlewareInterface, ResolverData, NextFn } from "type-graphql";
import winston, { Logger } from "winston";

export class LogAccess implements MiddlewareInterface<AppContext> {
	private logger: Logger | undefined = undefined;
	constructor() {
		this.logger = winston.createLogger({
			transports: [
				new winston.transports.File({
					filename: path.join(__dirname, "/../log/gql.log")
				})
			]
		});
		if (process.env.NODE_ENV !== "production") {
			this.logger.add(
				new winston.transports.Console({
					format: winston.format.cli()
				})
			);
		}
	}

	async use({ context, info }: ResolverData<AppContext>, next: NextFn) {
		const userId = context.req.session.userId;
		this.logger!.info(
			`${new Date().toISOString()} -- Logging access: User id:${userId} -> ${
				info.parentType.name
			}`
		);
		return next();
	}
}
