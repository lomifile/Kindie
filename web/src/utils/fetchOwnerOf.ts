import { useShowSelectedKindergardenQuery } from "../generated/graphql";
import { isServer } from "./isServer";
import { OwnerType } from "./types";

export const fetchOwnerOf = (): OwnerType => {
  const [{ data }] = useShowSelectedKindergardenQuery({
    pause: isServer(),
  });
  return data?.selectedKindergarden?.owning;
};
