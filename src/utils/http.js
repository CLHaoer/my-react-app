import axios from 'axios';

// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 从环境变量获取基础URL，默认为/api
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送前做一些处理
    // 例如添加token、显示加载动画等
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error('请求错误：', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做处理
    const res = response.data;
    
    // 这里可以根据实际业务情况进行调整
    // 例如，如果API返回格式为 { code: 200, data: {...}, message: 'success' }
    if (res.code && res.code !== 200) {
      // 处理业务错误
      console.error(`业务错误: ${res.message || '未知错误'}`);
      // 可以在这里处理特定的错误码，例如token失效等
      if (res.code === 401) {
        // token过期或未登录
        localStorage.removeItem('token');
        // 可以跳转到登录页面
        window.location.href = '/login';
      }
      return Promise.reject(new Error(res.message || '未知错误'));
    }
    
    // 如果直接返回数据部分，可以用下面这行
    // return res.data;
    
    // 或者返回完整响应
    return res;
  },
  (error) => {
    // 处理响应错误
    let message = '网络错误';
    
    if (error.response) {
      // 服务器返回了错误状态码
      const status = error.response.status;
      switch (status) {
        case 400:
          message = '请求错误';
          break;
        case 401:
          message = '未授权，请登录';
          localStorage.removeItem('token');
          // 可以跳转到登录页面
          window.location.href = '/login';
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求地址不存在';
          break;
        case 500:
          message = '服务器内部错误';
          break;
        default:
          message = `未知错误(${status})`;
      }
    } else if (error.request) {
      // 请求发送成功，但没有收到响应
      message = '服务器无响应';
    } else {
      // 请求配置有误
      message = '请求配置错误';
    }
    
    console.error('请求失败：', message, error);
    
    // 可以在这里添加全局错误提示，例如使用Toast或Message组件
    // toast.error(message);
    
    return Promise.reject(error);
  }
);

// 封装常用请求方法
const http = {
  // GET请求
  get(url, params, config = {}) {
    return instance.get(url, { params, ...config });
  },
  
  // POST请求
  post(url, data, config = {}) {
    return instance.post(url, data, config);
  },
  
  // PUT请求
  put(url, data, config = {}) {
    return instance.put(url, data, config);
  },
  
  // DELETE请求
  delete(url, params, config = {}) {
    return instance.delete(url, { params, ...config });
  },
  
  // 上传文件
  upload(url, formData, config = {}) {
    return instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });
  },
  
  // 下载文件
  download(url, params, config = {}) {
    return instance.get(url, {
      params,
      responseType: 'blob',
      ...config,
    });
  },
  
  // 获取原始axios实例，用于特殊请求
  getInstance() {
    return instance;
  },
};

export default http;
