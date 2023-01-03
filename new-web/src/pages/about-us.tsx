import { withUrqlClient } from "next-urql";
import { Aboutus } from "../modules/Aboutus";
import { urqlClient } from "../utils/urql";

export default withUrqlClient(urqlClient, { ssr: false })(Aboutus);
