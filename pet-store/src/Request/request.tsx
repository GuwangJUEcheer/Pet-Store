import axios, {type AxiosInstance, type InternalAxiosRequestConfig} from "axios";
import {clearUser} from "../other/userStore";

// 创建 Axios 实例
const request: AxiosInstance = axios.create({
    baseURL: '/api/',
    // baseURL: 'http://localhost:8080/api/',
    timeout: 1000000,
});

// 请求拦截器
request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 获取token并添加到请求头
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 处理401未授权错误
        if (error.response && error.response.status === 401) {
            // 清除用户信息和token
            clearUser();

            // 触发用户登出事件
            window.dispatchEvent(new CustomEvent('tokenExpired'));

            // 重定向到登录页面
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default request;