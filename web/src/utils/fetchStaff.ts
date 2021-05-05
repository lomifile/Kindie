import { useShowKindergardenstaffQuery } from "../generated/graphql";
export const fetchStaff = () => {
  const [{ data, fetching }] = useShowKindergardenstaffQuery();
  return data?.showKinderGardenStaff?.staff
    ? data?.showKinderGardenStaff?.staff
    : [];
};
