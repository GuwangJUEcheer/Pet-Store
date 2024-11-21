import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';
import '../css/LoginPage.css'; // 自定义样式
import request from '../Request/request';
import { useUser } from "../context/UserContext";

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  
  const { login } = useUser(); // 获取 login 方法
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () =>{
     try{
       request.post("/login",{
          userName:username,passWord:password
       }).then((response)=>{
         if(response.data.loginResult == "OK"){
             login({
              username: response.data.username,
              role: "", // 从响应中获取用户角色
              userId:response.data.userId,
            });
         }
       });
     }catch{

     }
  }

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
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
           <Input placeholder="Enter your username"  value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
          <Input.Password placeholder="Enter your password"  value={password}
                      onChange={(e) => setUsername(e.target.value)}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block  onClick={handleLogin}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
        {/* <div className="login-footer">
          <Text type="secondary">Don't have an account?</Text>
          <Button type="link" href="/register">
            Sign Up
          </Button>
        </div> */}
      </Card>
    </div>
  );
};

export default LoginPage;
