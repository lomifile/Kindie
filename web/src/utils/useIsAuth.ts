import { useMeQuery } from "../generated/graphql";
import Router from "next/router";
import { useEffect } from "react";
import { isServer } from "./isServer";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    if (!fetching && !data?.me) {
      Router.replace("/login?next=/dashboard");
    }
  }, [fetching, data, Router]);
};
