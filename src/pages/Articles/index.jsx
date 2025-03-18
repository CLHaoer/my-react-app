import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleApi } from '../../api';
import './index.scss';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    // 获取文章列表
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await articleApi.getArticleList({
          page: currentPage,
          size: pageSize
        });
        
        setArticles(response.data || []);
        // 假设API返回总页数或总条数
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error('获取文章列表失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  // 切换页码
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // 回到顶部
    window.scrollTo(0, 0);
  };

  // 生成分页组件
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    // 最多显示5个页码
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 添加第一页
    if (startPage > 1) {
      pages.push(
        <button 
          key={1} 
          className="page-item" 
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="ellipsis">...</span>);
      }
    }

    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`page-item ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // 添加最后一页
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          className="page-item"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="page-prev"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          上一页
        </button>
        <div className="page-numbers">{pages}</div>
        <button
          className="page-next"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          下一页
        </button>
      </div>
    );
  };

  return (
    <div className="articles-page">
      <h1>文章列表</h1>
      
      {loading ? (
        <div className="loading">加载中...</div>
      ) : (
        <>
          {articles.length > 0 ? (
            <div className="article-list">
              {articles.map((article) => (
                <div className="article-item" key={article.id}>
                  <h2 className="article-title">
                    <Link to={`/articles/${article.id}`}>{article.title}</Link>
                  </h2>
                  <div className="article-meta">
                    <span className="article-date">
                      {new Date(article.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                    {article.author && (
                      <span className="article-author">作者: {article.author}</span>
                    )}
                    {article.category && (
                      <span className="article-category">分类: {article.category}</span>
                    )}
                  </div>
                  <p className="article-summary">
                    {article.summary || article.content?.substring(0, 200) + '...'}
                  </p>
                  <Link to={`/articles/${article.id}`} className="read-more">
                    阅读全文
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">暂无文章</div>
          )}
          
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default Articles; 