import { useMeQuery } from "../generated/graphql";
import { isServer } from "./isServer";

export const getUserRole = () => {
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });

  return data?.me?.Role;
};
