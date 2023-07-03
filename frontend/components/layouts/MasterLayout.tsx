import React, { ReactNode } from "react";
import { Layout } from "antd";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};
function MasterLayout({ children }: Props) {
  return (
    <Layout>
      <Layout.Header className="w-full bg-gray-800">
        <Navbar />
      </Layout.Header>
      <Layout.Content className="h-screen">{children}</Layout.Content>
    </Layout>
  );
}

export default MasterLayout;
