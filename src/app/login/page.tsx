'use client';

import React, {useState} from 'react';
import {Button, Form, Input, Typography, Alert} from 'antd';
import {PhoneOutlined, LockOutlined} from '@ant-design/icons';
import Link from 'next/link';
import AuthLayout from '@/components/layouts/AuthLayout';
import {ColorThemes} from '@/config/Color';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useNavigation} from '@/hooks/Navigate';

const {Title} = Typography;
const colors = ColorThemes.light;

interface LoginValues {
  phone: string;
  password?: string;
}

const LoginPage = () => {
  const router = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: LoginValues) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        phone: values.phone,
        password: values.password,
      });

      if (result?.error) {
        setError('Số điện thoại hoặc mật khẩu không đúng.');
        setLoading(false);
      } else {
        // Đăng nhập thành công, chuyển hướng đến trang chủ
        router.navigateTo('/', true);
      }
    } catch (e) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div style={{textAlign: 'center', marginBottom: '40px'}}>
        <Title level={2} style={{color: colors.neutral_text_title_color}}>
          Đăng nhập
        </Title>
      </div>
      <Form
        name="normal_login"
        initialValues={{remember: true}}
        onFinish={handleLogin}>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{marginBottom: '20px'}}
          />
        )}
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
            style={{width: '100%', backgroundColor: colors.primary_main_color}}
            loading={loading}
            size="large">
            Đăng nhập
          </Button>
        </Form.Item>
        <span style={{color: colors.neutral_text_body_color}}>Hoặc </span>
        <Link href="/register" style={{color: colors.primary_main_color}}>
          đăng ký ngay!
        </Link>
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;
