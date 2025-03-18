import Mock from 'mockjs';

// 设置延迟时间
Mock.setup({
  timeout: '300-600'
});

// 文章数据模板
const articleTemplate = {
  'id|+1': 1,
  title: '@ctitle(5, 20)',
  summary: '@cparagraph(1, 2)',
  content: '@cparagraph(5, 10)',
  author: '@cname',
  createdAt: '@datetime',
  updatedAt: '@datetime',
  category: '@pick(["前端开发", "后端开发", "全栈开发", "开发工具", "CSS", "JavaScript", "React", "Vue", "Node.js"])',
  'tags|1-3': ['@ctitle(2, 4)'],
  cover: '@image("800x400")',
  'likes|0-1000': 0,
  'views|0-5000': 0,
  'comments|0-5': [{
    'id|+1': 1,
    author: '@cname',
    content: '@cparagraph(1)',
    createdAt: '@datetime'
  }]
};

// 用户数据模板
const userTemplate = {
  'id|+1': 1,
  username: '@name',
  name: '@cname',
  avatar: '@image("100x100")',
  email: '@email',
  'role|1': ['admin', 'editor', 'user'],
  bio: '@cparagraph(1)',
  createdAt: '@datetime'
};

export {
  Mock,
  articleTemplate,
  userTemplate
}; 