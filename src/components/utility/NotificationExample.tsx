'use client';

import React, {useState} from 'react';
import {Button, Form, Input, Card, Space} from 'antd';
import {useQuickNotification, useNotification} from '@/plugins/NotificationPlugin';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function NotificationExample() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const quickNotify = useQuickNotification();
  const notification = useNotification();

  // Simulate API call
  const simulateApiCall = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 70% success rate for demo
        resolve(Math.random() > 0.3);
      }, 2000);
    });
  };

  const handleSubmit = async (values: FormData) => {
    setLoading(true);
    
    // Show loading notification
    notification.info({
      message: 'Processing...',
      description: 'Please wait while we process your request.',
      key: 'processing',
      duration: 0, // Don't auto-close
    });

    try {
      const success = await simulateApiCall();
      
      // Remove loading notification
      notification.destroy('processing');

      if (success) {
        // Success notification with custom placement
        notification.success({
          message: 'Form Submitted Successfully!',
          description: `Thank you ${values.name}, we have received your message and will get back to you soon.`,
          duration: 8,
          placement: 'bottomRight',
          onClick: () => {
            console.log('Success notification clicked');
          },
        });
        
        // Reset form
        form.resetFields();
      } else {
        // Error notification
        quickNotify.error(
          'Submission Failed',
          'There was an error processing your request. Please try again.'
        );
      }
    } catch (error) {
      // Remove loading notification
      notification.destroy('processing');
      
      // Critical error notification
      notification.error({
        message: 'Critical Error',
        description: 'An unexpected error occurred. Please contact support if this persists.',
        duration: 0, // Persistent error
        key: 'critical-error',
        placement: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  const showQuickExamples = () => {
    quickNotify.info('Quick info message');
    setTimeout(() => quickNotify.warning('Quick warning message'), 500);
    setTimeout(() => quickNotify.success('Quick success message'), 1000);
  };

  const showAdvancedExample = () => {
    notification.open({
      message: 'Custom Notification',
      description: 'This notification has custom styling and behavior.',
      duration: 6,
      style: {
        backgroundColor: '#e6f7ff',
        border: '1px solid #91d5ff',
      },
      onClick: () => {
        quickNotify.info('You clicked the custom notification!');
      },
    });
  };

  return (
    <div style={{maxWidth: '600px', margin: '0 auto', padding: '24px'}}>
      <Card title="Notification Plugin Example" style={{marginBottom: '24px'}}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={loading}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{required: true, message: 'Please enter your name'}]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {required: true, message: 'Please enter your email'},
              {type: 'email', message: 'Please enter a valid email'},
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{required: true, message: 'Please enter a message'}]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Enter your message" 
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
            >
              {loading ? 'Processing...' : 'Submit Form'}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Other Examples">
        <Space wrap>
          <Button onClick={showQuickExamples}>
            Quick Notifications
          </Button>
          <Button onClick={showAdvancedExample}>
            Custom Styled
          </Button>
          <Button 
            danger 
            onClick={() => notification.destroy()}
          >
            Clear All
          </Button>
        </Space>
      </Card>
    </div>
  );
}
