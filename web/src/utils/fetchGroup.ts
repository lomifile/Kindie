import { useShowSelectedGroupQuery } from "../generated/graphql";

export const fetchGroup = () => {
  const [{ data, fetching }] = useShowSelectedGroupQuery();
  return data?.showSelectedGroup?.Name ? data?.showSelectedGroup.Name : "";
};
