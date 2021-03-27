import { useMeQuery } from "../generated/graphql";
import { isServer } from "./isServer";

export const fetchPartOf = () => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  return data?.me?.partof ? data?.me?.partof : [];
};
