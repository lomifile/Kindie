import { useFilterStaffQuery } from "../generated/graphql";
import { isServer } from "./isServer";

export const getUserRole = () => {
  const [{ data }] = useFilterStaffQuery();
  return data?.filterStaff?.role === undefined || null
    ? "Headmaster"
    : data?.filterStaff?.role;
};
