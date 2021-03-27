import { useShowKindergardenstaffQuery } from "../generated/graphql";
import { isServer } from "./isServer";

export const fetchStaff = () => {
  const [{ data, fetching }] = useShowKindergardenstaffQuery({
    pause: isServer(),
  });
  return data?.showKinderGardenStaff?.staff
    ? data?.showKinderGardenStaff?.staff
    : [];
};
