import { AppLayout } from "../../components/Layouts";
import React from "react";
import { useIsAuth } from "../../hooks/useIsAuth";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
  useIsAuth();
  return <AppLayout></AppLayout>;
};
