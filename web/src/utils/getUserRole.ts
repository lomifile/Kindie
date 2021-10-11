import { useFilterStaffQuery } from "../generated/graphql";

export const getUserRole = () => {
  const [{ data }] = useFilterStaffQuery();

  return data?.filterStaff?.role === undefined || null
    ? "Headmaster"
    : data?.filterStaff?.role;
};
