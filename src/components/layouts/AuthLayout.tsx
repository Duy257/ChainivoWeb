"use client";

import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const layoutStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#f0f2f5",
};

const contentStyle: React.CSSProperties = {
  padding: "50px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  maxWidth: "400px",
  width: "100%",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout style={layoutStyle}>
      <Content style={contentStyle}>{children}</Content>
    </Layout>
  );
};

export default AuthLayout;
