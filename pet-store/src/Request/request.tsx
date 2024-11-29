import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse<T = any> {
  code: number; // 状态码
  message: string; // 响应信息
  data: T; // 业务数据
  success?: boolean; // 可选的业务成功标志
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 跨域时携带认证信息
});

const axiosInstance2 : AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/file',
  timeout: 10000,
  headers: {
    'Content-Type': 'form-data/multipart',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // 设置 Authorization
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // const code = response.data.code;
    // if (code !== 200) {
    //   console.error(`API Error`);
    //   return Promise.reject(new Error(`API Error`));
    // }
    return response;
  },
  (error) => {
    console.error('HTTP Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
export default axiosInstance;
// export default {
//   ,
//   axiosInstance2
// }
