import "tsconfig-paths/register";
import { createDbConnection } from "@orm/createConnection";
import { httpServer } from "@root/server";
import { createSchema } from "./graphql";

(async () => {
	try {
		await createDbConnection();
		await new Promise<void>((resolve) =>
			httpServer.listen(
				{ port: parseInt(process.env.PORT as string) },
				resolve
			)
		);
		await createSchema();
	} catch (err) {
		console.error(err);
	}
})();
