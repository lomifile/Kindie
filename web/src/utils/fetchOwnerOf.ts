import { useOwnerQuery } from "../generated/graphql";
import { isServer } from "./isServer";
import { OwnerType } from "./types";

export const fetchOwnerOf = (): OwnerType => {
  const [{ data }] = useOwnerQuery();
  return data?.owner?.owning;
};
