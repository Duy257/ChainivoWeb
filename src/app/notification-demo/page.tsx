'use client';

import React from 'react';
import {Button, Space, Card, Typography, Divider} from 'antd';
import {useNotification, useQuickNotification} from '@/plugins/NotificationPlugin';

const {Title, Paragraph, Text} = Typography;

export default function NotificationDemo() {
  const notification = useNotification();
  const quickNotify = useQuickNotification();

  const showBasicNotifications = () => {
    quickNotify.success('Success!', 'This is a success message');
    setTimeout(() => {
      quickNotify.info('Info', 'This is an info message');
    }, 500);
    setTimeout(() => {
      quickNotify.warning('Warning', 'This is a warning message');
    }, 1000);
    setTimeout(() => {
      quickNotify.error('Error', 'This is an error message');
    }, 1500);
  };

  const showAdvancedNotifications = () => {
    notification.success({
      message: 'Advanced Success',
      description: 'This notification has custom duration and placement',
      duration: 10,
      placement: 'bottomRight',
      onClick: () => {
        console.log('Notification clicked!');
      },
      onClose: () => {
        console.log('Notification closed!');
      },
    });

    notification.info({
      message: 'Persistent Notification',
      description: 'This notification will not auto-close',
      duration: 0,
      key: 'persistent',
      placement: 'topLeft',
    });
  };

  const showCustomNotification = () => {
    notification.open({
      message: 'Custom Notification',
      description: 'This is a custom notification with custom styling',
      duration: 6,
      style: {
        backgroundColor: '#f6ffed',
        border: '1px solid #b7eb8f',
      },
      className: 'custom-notification',
    });
  };

  const destroyNotifications = () => {
    notification.destroy();
  };

  const destroySpecificNotification = () => {
    notification.destroy('persistent');
  };

  return (
    <div style={{padding: '24px', maxWidth: '800px', margin: '0 auto'}}>
      <Title level={2}>Notification Plugin Demo</Title>
      <Paragraph>
        This page demonstrates how to use the Notification plugin throughout your application.
        The plugin provides both simple and advanced notification methods.
      </Paragraph>

      <Card title="Basic Usage" style={{marginBottom: '24px'}}>
        <Paragraph>
          Use <Text code>useQuickNotification</Text> for simple notifications:
        </Paragraph>
        <Space wrap>
          <Button type="primary" onClick={() => quickNotify.success('Success!')}>
            Success
          </Button>
          <Button onClick={() => quickNotify.info('Information')}>
            Info
          </Button>
          <Button onClick={() => quickNotify.warning('Warning!')}>
            Warning
          </Button>
          <Button danger onClick={() => quickNotify.error('Error!')}>
            Error
          </Button>
        </Space>
        <Divider />
        <Button type="dashed" onClick={showBasicNotifications}>
          Show All Basic Types (Sequential)
        </Button>
      </Card>

      <Card title="Advanced Usage" style={{marginBottom: '24px'}}>
        <Paragraph>
          Use <Text code>useNotification</Text> for advanced configurations:
        </Paragraph>
        <Space wrap>
          <Button type="primary" onClick={showAdvancedNotifications}>
            Advanced Notifications
          </Button>
          <Button onClick={showCustomNotification}>
            Custom Styled
          </Button>
        </Space>
      </Card>

      <Card title="Control Notifications">
        <Paragraph>
          You can also control and destroy notifications:
        </Paragraph>
        <Space wrap>
          <Button danger onClick={destroyNotifications}>
            Destroy All
          </Button>
          <Button onClick={destroySpecificNotification}>
            Destroy Persistent
          </Button>
        </Space>
      </Card>

      <Divider />
      
      <Card title="Usage Examples" type="inner">
        <Title level={4}>1. Quick Notifications</Title>
        <pre style={{backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '4px'}}>
{`import { useQuickNotification } from '@/plugins/NotificationPlugin';

const quickNotify = useQuickNotification();

// Simple usage
quickNotify.success('Operation completed!');
quickNotify.error('Something went wrong!');`}
        </pre>

        <Title level={4}>2. Advanced Notifications</Title>
        <pre style={{backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '4px'}}>
{`import { useNotification } from '@/plugins/NotificationPlugin';

const notification = useNotification();

notification.success({
  message: 'Success',
  description: 'Detailed description here',
  duration: 10,
  placement: 'topRight',
  onClick: () => console.log('Clicked!'),
  onClose: () => console.log('Closed!'),
});`}
        </pre>
      </Card>
    </div>
  );
}
