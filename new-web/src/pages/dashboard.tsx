import { withUrqlClient } from "next-urql";
import { Dashboard } from "../modules/Dashboard";
import { urqlClient } from "../utils/urql";

export default withUrqlClient(urqlClient, { ssr: false })(Dashboard);
