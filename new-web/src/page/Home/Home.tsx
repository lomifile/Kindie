import React from "react";
import { PageLayout } from "../../layouts/landing/PageLayout";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <PageLayout>
      {[...new Array(50)].map((e) => (
        <p>Hello</p>
      ))}
    </PageLayout>
  );
};
