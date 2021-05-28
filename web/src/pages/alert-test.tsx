import React from "react";
import { CustomAlert } from "../components/Alerts";
import { CustomSpinner } from "../components/Spinner";

const AlertTest = () => {
  return (
    <>
      {/*<CustomAlert name={"Proba"} data={"Proba"} status={"info"} />*/}
      {/*<CustomAlert name={"Proba"} data={"Proba"} status={"error"} />*/}
      {/*<CustomAlert name={"Proba"} data={"Proba"} status={"success"} />*/}
      {/*<CustomAlert name={"Proba"} data={"Proba"} status={"warning"} />*/}
      <CustomSpinner />
    </>
  );
};

export default AlertTest;
