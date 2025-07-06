"use client";

import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import AuthLayout from "@/components/layouts/AuthLayout";

const { Title } = Typography;

interface RegisterValues {
  email: string;
  password?: string;
  confirm?: string;
}

const RegisterPage = () => {
  const onFinish = (values: RegisterValues) => {
    console.log("Received values of form: ", values);
  };

  return (
    <AuthLayout>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Title level={2}>Register</Title>
      </div>
      <Form name="normal_register" onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Register
          </Button>
        </Form.Item>
        Already have an account? <Link href="/login">Log in</Link>
      </Form>
    </AuthLayout>
  );
};

export default RegisterPage;
