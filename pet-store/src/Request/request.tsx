import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse<T> {
  code: number; // 响应状态码
  message: string; // 响应信息
  data: T; // 响应数据
}

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'http://localhost:8080', // API 基础路径
  timeout: 10000, // 超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前可以添加 Token 或其他操作
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 统一处理响应数据
    return response;
  },
  (error) => {
    // 统一处理错误
    console.error('HTTP Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// 封装通用请求方法
const request = async <T = any>(config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const response = await instance.request<ApiResponse<T>>(config);
  return response.data;
};

// 封装 GET 方法
const get = async <T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const response = await instance.get<ApiResponse<T>>(url, { ...config, params });
  return response.data;
};

// 封装 POST 方法
const post = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const response = await instance.post<ApiResponse<T>>(url, data, config);
  return response.data;
};

// 封装 PUT 方法
const put = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const response = await instance.put<ApiResponse<T>>(url, data, config);
  return response.data;
};

// 封装 DELETE 方法
const del = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const response = await instance.delete<ApiResponse<T>>(url, config);
  return response.data;
};

// 导出封装方法
export default {
  request, // 通用请求方法
  get, // GET 请求
  post, // POST 请求
  put, // PUT 请求
  delete: del, // DELETE 请求
};
