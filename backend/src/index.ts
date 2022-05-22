import { createConnection } from "typeorm";
import app from "./server";

(async () => {
  try {
    createConnection(require("../ormconfig.json"));
    app.listen(parseInt(process.env.PORT as string), () => {
      console.log(
        `Server started on localhost:${parseInt(process.env.PORT as string)}`
      );
    });
  } catch (err) {
    console.error(err);
  }
})();
