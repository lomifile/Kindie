import { useShowSelectedGroupQuery } from "../generated/graphql";
import { isServer } from "./isServer";

export const fetchGroup = () => {
  const [{ data, fetching }] = useShowSelectedGroupQuery({
    pause: isServer(),
  });
  return data?.showSelectedGroup?.Name ? data?.showSelectedGroup.Name : "";
};
