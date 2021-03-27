import { useEffect } from "react";
import { useShowSelectedKindergardenQuery } from "../generated/graphql";
import { isServer } from "./isServer";

export const fetchKindergarden = () => {
  const [{ data, fetching }] = useShowSelectedKindergardenQuery({
    pause: isServer(),
  });
  return data?.selectedKindergarden ? data?.selectedKindergarden?.Name : "";
};
