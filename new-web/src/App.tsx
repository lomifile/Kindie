import React from "react";
import { DataTable } from "./components/DataTable/DataTable";
import { PageLayout } from "./layouts/landing/PageLayout";

const App: React.FC = () => {
  return (
    <PageLayout>
      <DataTable />
    </PageLayout>
  );
};

export default App;
