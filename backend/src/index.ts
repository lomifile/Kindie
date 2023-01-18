import "dotenv/config";
import "tsconfig-paths/register";
import { createDbConnection } from "@orm/createConnection";
import { httpServer } from "@root/server";
import { createSchema } from "./graphql";

(async () => {
	try {
		await createDbConnection();
		await createSchema();
		await new Promise<void>((resolve) =>
			httpServer.listen(
				{ port: parseInt(process.env.PORT as string) },
				resolve
			)
		);
	} catch (err) {
		console.error(err);
	}
})();
