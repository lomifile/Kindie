import Router from "next/router";
import React from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  React.useEffect(() => {
    if (!fetching && !data?.me) {
      Router.replace("/login?next=/dashboard");
    }
  }, [fetching, data]);
};
