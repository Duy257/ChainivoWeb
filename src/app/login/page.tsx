"use client";

import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import AuthLayout from "@/components/layouts/AuthLayout";

const { Title } = Typography;

const LoginPage = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <AuthLayout>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Title level={2}>Login</Title>
      </div>
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
        </Form.Item>
        Or <Link href="/register">register now!</Link>
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;
