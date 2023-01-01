import { withUrqlClient } from "next-urql";
import { Register } from "../modules/Register";
import { urqlClient } from "../utils/urql";

export default withUrqlClient(urqlClient, { ssr: false })(Register);
