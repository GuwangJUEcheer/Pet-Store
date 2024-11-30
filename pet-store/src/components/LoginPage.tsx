import React from 'react';
import { Form, Input, Button, Card, Typography, Space, message } from 'antd';
import '../css/LoginPage.css';
import axios from '../Request/request';
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      const response = await axios.post<{ loginResult: string; token: string; userId: number; userName: string }>("/login", {
        userName: values.username,
        passWord: values.password,
      });

      const { loginResult, userName, userId, token } = response.data;

      if (loginResult === "OK") {
        login({
          username: userName,
          role: "admin", // 示例角色设置为管理员
          userId: userId,
        });

        if (token) {
          localStorage.setItem("token", token);
        }

        message.success("登录成功！");
        navigate("/");
      } else {
        message.error("登录失败，请检查用户名或密码！");
      }
    } catch (error) {
      console.error(error);
      message.error("登录出错，请稍后再试！");
    }
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
          onFinish={handleLogin}
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
      </Card>
    </div>
  );
};

export default LoginPage;
