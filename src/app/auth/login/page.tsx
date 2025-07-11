'use client';

import React, {useState} from 'react';
import {Button, Form, Input, Typography, Alert} from 'antd';
import {PhoneOutlined, LockOutlined} from '@ant-design/icons';
import Link from 'next/link';
import AuthLayout from '@/components/layouts/AuthLayout';
import {ColorThemes} from '@/config/Color';
import {useNavigation} from '@/hooks/Navigate';
import {saveDataToLocalStorage} from '@/utils/LocalStorage';
import {useQuickNotification} from '@/plugins/NotificationPlugin/NotificationPlugin';
import AuthAction from '@/api/actions/AuthActions';
import {CustomerAction} from '@/api/actions/CustomerAction';

const {Title} = Typography;
const colors = ColorThemes.light;

interface LoginValues {
  phone: string;
  password?: string;
}

const LoginPage = () => {
  const quickNotificationHook = useQuickNotification();
  const navigateHook = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: LoginValues) => {
    setLoading(true);
    setError(null);

    try {
      const res = await AuthAction.login({
        type: 'account',
        phone: values.phone,
        password: values.password,
      });

      switch (res.code) {
        case 200:
          saveDataToLocalStorage('accessToken', `${res.data.accessToken}`);
          saveDataToLocalStorage('refreshToken', `${res.data.refreshToken}`);
          saveDataToLocalStorage(
            'timeRefresh',
            `${(Date.now() / 1000 + 9 * 60).toString()}`,
          );
          await CustomerAction.getInfor();
          quickNotificationHook.success('Đăng nhập thành công!');
          navigateHook.navigateTo('/', true);
          return res;
        case 401:
          return setError('Số điện thoại chưa được đăng ký.');

        case 403:
          return setError(
            'Tài khoản hoặc mật khẩu không đúng, vui lòng kiểm tra lại.',
          );
        default:
          return setError('Đã có lỗi xảy ra. Vui lòng thử lại');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Đã có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng và thử lại.');
    } finally {
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
          rules={[
            {required: true, message: 'Vui lòng nhập số điện thoại!'},
            {
              pattern: /^[0-9]{10,11}$/,
              message: 'Số điện thoại phải có 10-11 chữ số!',
            },
          ]}>
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Số điện thoại"
            size="large"
            maxLength={11}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {required: true, message: 'Vui lòng nhập mật khẩu!'},
            {min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!'},
          ]}>
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
        <Link href="/auth/register" style={{color: colors.primary_main_color}}>
          đăng ký ngay!
        </Link>
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;
