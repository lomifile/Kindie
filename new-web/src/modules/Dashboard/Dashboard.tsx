import { AppLayout } from "../../components/Layouts";
import React from "react";
import { useIsAuth } from "../../hooks/useIsAuth";
import { useMeQuery } from "../../generated/graphql";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
  useIsAuth();
  const [{ data, fetching }] = useMeQuery();
  return (
    <AppLayout>
      <div className="w-full p-7">
        <h1 className="text-4xl font-bold text-accent">Dashboard</h1>
        <span className="text-md py-4 text-gray-400">
          Hello, {!fetching && data ? data.me?.Name : ""}
        </span>
      </div>
    </AppLayout>
  );
};
