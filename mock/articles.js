import { Mock, articleTemplate } from './config';

// 生成文章列表
const generateArticles = (count = 10) => {
  return Mock.mock({
    [`data|${count}`]: [articleTemplate]
  }).data;
};

// 获取文章列表
export const getArticleList = ({ page = 1, size = 10 }) => {
  const total = 100; // 模拟总数据量
  const start = (page - 1) * size;
  const end = start + size;
  
  // 生成当前页的数据
  const data = generateArticles(size);
  
  return {
    data,
    total,
    totalPages: Math.ceil(total / size),
    currentPage: page,
    pageSize: size
  };
};

// 获取文章详情
export const getArticleDetail = (id) => {
  // 生成单篇文章数据
  const article = Mock.mock({
    data: articleTemplate
  }).data;
  
  // 设置指定的ID
  article.id = parseInt(id);
  
  return {
    data: article
  };
}; 