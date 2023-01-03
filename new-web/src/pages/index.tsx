import { withUrqlClient } from "next-urql";
import Landing from "../modules/Landing";
import { urqlClient } from "../utils/urql";

export default withUrqlClient(urqlClient, { ssr: false })(Landing);
