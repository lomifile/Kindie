import { useShowChildrenNotIngroupQuery } from "../generated/graphql";
import { isServer } from "./isServer";

export const fetchChildren = () => {
  const [{ data, fetching }] = useShowChildrenNotIngroupQuery({
    pause: isServer(),
  });
  return data?.showChildrenFilterNotInGroup.children
    ? data?.showChildrenFilterNotInGroup.children
    : "";
};
