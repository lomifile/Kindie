import { withUrqlClient } from "next-urql";
import { Login } from "../modules/Login";
import { urqlClient } from "../utils/urql";

export default withUrqlClient(urqlClient, { ssr: false })(Login);
