import { withUrqlClient } from "next-urql";
import { AppLayout } from "../components/Layouts";
import { urqlClient } from "../utils/urql";

const Inbox = () => <AppLayout></AppLayout>;

export default withUrqlClient(urqlClient, { ssr: false })(Inbox);
