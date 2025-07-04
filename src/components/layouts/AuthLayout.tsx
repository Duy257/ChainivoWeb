"use client";

import React from "react";
import { Layout, Row, Col } from "antd";

const layoutStyle: React.CSSProperties = {
  minHeight: "100vh",
};

const leftColStyle: React.CSSProperties = {
  background: `url('https://images.unsplash.com/photo-1562911791-c9a1727b3939?q=80&w=2940&auto=format&fit=crop')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const rightColStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",
  background: "#ffffff",
};

const formContainerStyle: React.CSSProperties = {
  maxWidth: "400px",
  width: "100%",
  padding: "40px",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout style={layoutStyle}>
      <Row style={{ minHeight: "100vh" }}>
        <Col xs={0} sm={0} md={12} lg={14} style={leftColStyle}>
          {/* You can add content here, like a logo or brand message */}
        </Col>
        <Col xs={24} sm={24} md={12} lg={10} style={rightColStyle}>
          <div style={formContainerStyle}>{children}</div>
        </Col>
      </Row>
    </Layout>
  );
};

export default AuthLayout;
