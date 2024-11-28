import React from 'react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';
import '../css/LoginPage.css'; // 自定义样式
import axios from '../Request/request';
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
 const  handleLogin = async (values: { username: string; password: string }) => {
  
    try {
      axios.post<{ loginResult: string; token: string; userId: number; userName: string }>("/login", {
        userName: values.username,
        passWord: values.password,
      }).then((response) =>{
        console.log(response);
        console.log(response.data);
        const { loginResult, userName, userId,token} = response.data;
        if(loginResult == "OK"){
          login({
           username: userName,
           role: "", // 从响应中获取用户角色
           userId:userId,
         });
         if (token) {
          localStorage.setItem('token', token);
        }
        navigate("/success");
      }
    });
    } catch (error) {
      console.error(error);
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
          onFinish={handleLogin} // 提交时触发
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
