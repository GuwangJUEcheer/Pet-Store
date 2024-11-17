import React from 'react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';
import '../css/LoginPage.css'; // 自定义样式

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Space direction="vertical" size="large" align="center" style={{ width: '100%' }}>
          <Title level={3} style={{ marginBottom: '0' }}>Welcome Back</Title>
          <Text type="secondary">Sign in to your account</Text>
        </Space>
        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <div className="login-footer">
          <Text type="secondary">Don't have an account?</Text>
          <Button type="link" href="/register">
            Sign Up
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
