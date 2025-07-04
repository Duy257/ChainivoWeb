'use client';

import React, {useState} from 'react';
import {Button, Form, Input, Typography} from 'antd';
import {PhoneOutlined, LockOutlined} from '@ant-design/icons';
import Link from 'next/link';
import AuthLayout from '@/components/layouts/AuthLayout';

const {Title} = Typography;

interface LoginValues {
  phone: string;
  password?: string;
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: LoginValues) => {
    console.log('🚀 ~ handleLogin ~ values:', values);
  };

  return (
    <AuthLayout>
      <div style={{textAlign: 'center', marginBottom: '40px'}}>
        <Title level={2}>Đăng nhập</Title>
      </div>
      <Form
        name="normal_login"
        initialValues={{remember: true}}
        onFinish={handleLogin}>
        <Form.Item
          name="phone"
          rules={[{required: true, message: 'Vui lòng nhập số điện thoại!'}]}>
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Số điện thoại"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{required: true, message: 'Vui lòng nhập mật khẩu!'}]}>
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
            style={{width: '100%'}}
            loading={loading}
            size="large">
            Đăng nhập
          </Button>
        </Form.Item>
        Hoặc <Link href="/register">đăng ký ngay!</Link>
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;
