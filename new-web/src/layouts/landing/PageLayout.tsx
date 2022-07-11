import React from "react";
import { Layout } from "antd";
import { Navbar } from "../../components/Navbar/Navbar";

type PageLayoutProps = {
  navbar?: boolean;
  children?: JSX.Element | JSX.Element[];
};

export const PageLayout: React.FC<PageLayoutProps> = ({ navbar, children }) => {
  const { Content, Footer } = Layout;
  return (
    <Layout>
      <Navbar />
      <Content
        style={{
          padding: "7rem 2rem",
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};
