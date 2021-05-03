import { useMeQuery } from "../generated/graphql";

export const fetchPartOf = () => {
  const [{ data, fetching }] = useMeQuery();
  return data?.me?.partof ? data?.me?.partof : [];
};
