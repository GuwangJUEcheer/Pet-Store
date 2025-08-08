import axios, {type AxiosInstance, type InternalAxiosRequestConfig} from "axios";

// 创建 Axios 实例
const request: AxiosInstance = axios.create({
    baseURL: '/api/',
    timeout: 60000,
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

export default request;