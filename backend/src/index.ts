import { createDbConnection } from "./orm/createConnection";
import app from "./server";

(async () => {
  try {
    await createDbConnection();
    app.listen(parseInt(process.env.PORT as string), () => {
      console.log(
        `Server started on localhost:${parseInt(process.env.PORT as string)}`
      );
    });
  } catch (err) {
    console.error(err);
  }
})();
