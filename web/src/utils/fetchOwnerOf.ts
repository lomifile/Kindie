import {
  useMeQuery,
  useShowKindergardenQuery,
  useShowKindergardenstaffQuery,
} from "../generated/graphql";
import { isServer } from "./isServer";

export const fetchOwnerOf = () => {
  const [{ data, fetching }] = useShowKindergardenstaffQuery({
    pause: isServer(),
  });
  return data?.showKinderGardenStaff?.owning
    ? data?.showKinderGardenStaff?.owning
    : {};
};
