import React from 'react';
import {Form, Input, Button, Card, Typography, Space, message} from 'antd';
import {useNavigate} from "react-router-dom";
import {loginUsingPost} from "../api/loginController";
import {setUser, User} from "../other/userStore";

const {Title, Text} = Typography;

const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleLogin = async (values: { username: string; password: string }) => {
        try {
            const response = await loginUsingPost(values);
            const {loginResult, username, userId, token, role = 2} = response.data;

            if (loginResult == "OK") {

                if (token) {
                    localStorage.setItem("token", token);
                }

                const user: User = {
                    id: userId,
                    name: username,
                    role: role
                };

                setUser(user);
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card
                className="w-full max-w-sm rounded-2xl shadow-lg"
                style={{padding: '2rem', marginLeft: '2rem'}}
            >
                <Space direction="vertical" size="large" align="center" style={{width: '100%'}}>
                    <Title level={3} style={{marginBottom: '0'}}>Welcome Back</Title>
                    <Text type="secondary">Sign in to your account</Text>
                </Space>

                <Form
                    form={form}
                    name="login"
                    layout="vertical"
                    onFinish={handleLogin}
                    style={{marginTop: '2rem'}}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input placeholder="请输入用户名"/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password placeholder="请输入密码"/>
                    </Form.Item>

                    <Form.Item style={{marginTop: '1.5rem'}}>
                        <Button type="primary" htmlType="submit" block size="large">
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginPage;
