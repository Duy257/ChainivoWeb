"use client";

import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { PhoneOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useDispatch } from "react-redux";
import AuthLayout from "@/components/layouts/AuthLayout";
import { AppDispatch } from "@/store/store";
import { CustomerActions } from "@/api/actions/CustomerAction";
import { useNavigation } from "@/hooks/Navigate";

const { Title } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const loginPayload = {
        type: "account" as const,
        phone: values.phone,
        password: values.password,
      };
      console.log("🚀 ~ onFinish ~ loginPayload:", loginPayload);

      const res = await CustomerActions.login(loginPayload);

      if (res && res.code === 200) {
        message.success("Đăng nhập thành công!");
        await dispatch(CustomerActions.getInfor(true) as any);
        navigation.navigateTo("/", true);
      } else {
        message.error(res?.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Title level={2}>Đăng nhập</Title>
      </div>
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Số điện thoại"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Mật khẩu"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={loading}
            size="large"
          >
            Đăng nhập
          </Button>
        </Form.Item>
        Hoặc <Link href="/register">đăng ký ngay!</Link>
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;
