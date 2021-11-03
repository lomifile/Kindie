import { useMeQuery } from "../generated/graphql";

export const fetchPartOf = () => {
  const [{ data }] = useMeQuery();
  return data?.me?.staffOf ? data?.me?.staffOf : [];
};
