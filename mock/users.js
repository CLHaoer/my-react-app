import { Mock, userTemplate } from './config';

// 生成用户列表
const generateUsers = (count = 10) => {
  return Mock.mock({
    [`data|${count}`]: [userTemplate]
  }).data;
};

// 获取用户列表
export const getUserList = ({ page = 1, size = 10 }) => {
  const total = 50; // 模拟总数据量
  const start = (page - 1) * size;
  const end = start + size;
  
  // 生成当前页的数据
  const data = generateUsers(size);
  
  return {
    data,
    total,
    totalPages: Math.ceil(total / size),
    currentPage: page,
    pageSize: size
  };
};

// 获取用户详情
export const getUserDetail = (id) => {
  // 生成单个用户数据
  const user = Mock.mock({
    data: userTemplate
  }).data;
  
  // 设置指定的ID
  user.id = parseInt(id);
  
  return {
    data: user
  };
};

// 用户登录
export const login = (username, password) => {
  // 生成用户数据
  const user = Mock.mock({
    data: userTemplate
  }).data;
  
  // 模拟登录验证
  if (username === 'admin' && password === 'admin') {
    return {
      data: {
        token: Mock.mock('@guid'),
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          avatar: user.avatar,
          role: user.role
        }
      }
    };
  }
  
  throw new Error('用户名或密码错误');
}; 