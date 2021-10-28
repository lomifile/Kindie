import { useShowSelectedGroupQuery } from "../generated/graphql";
import { isServer } from "./isServer";

export const fetchGroup = () => {
  const [{ data }] = useShowSelectedGroupQuery();
  return data?.showSelectedGroup?.Name ? data?.showSelectedGroup.Name : "";
};
