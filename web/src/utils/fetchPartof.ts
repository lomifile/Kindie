import { useMeQuery } from "../generated/graphql";
import { isServer } from "./isServer";

export const fetchPartOf = () => {
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });
  return data?.me?.staffOf ? data?.me?.staffOf : [];
};
