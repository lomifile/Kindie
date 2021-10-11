import { useShowSelectedKindergardenQuery } from "../generated/graphql";
import { OwnerType } from "./types";

export const fetchOwnerOf = (): OwnerType => {
  const [{ data }] = useShowSelectedKindergardenQuery();
  return data?.selectedKindergarden?.owning;
};
