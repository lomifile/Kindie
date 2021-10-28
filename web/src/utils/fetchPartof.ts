import { useMeQuery } from "../generated/graphql";

export const fetchPartOf = () => {
  const [{ data }] = useMeQuery();
  console.log(data);
  return data?.me?.staffOf ? data?.me?.staffOf : [];
};
