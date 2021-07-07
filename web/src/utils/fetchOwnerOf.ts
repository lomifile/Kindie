import { useShowKindergardenstaffQuery } from "../generated/graphql";

export const fetchOwnerOf = () => {
  const [{ data, fetching }] = useShowKindergardenstaffQuery();
  return data?.showKinderGardenStaff?.owning
    ? data?.showKinderGardenStaff?.owning
    : {};
};
