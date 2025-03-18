import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articleApi } from '../../api';
import './index.scss';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 获取文章详情
    const fetchArticleDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleApi.getArticleDetail(id);
        setArticle(response.data);
      } catch (error) {
        console.error('获取文章详情失败:', error);
        setError('获取文章失败，请稍后再试');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticleDetail();
    }
  }, [id]);

  // 格式化日期
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="article-detail-loading">加载中...</div>;
  }

  if (error) {
    return <div className="article-detail-error">{error}</div>;
  }

  if (!article) {
    return <div className="article-detail-error">文章不存在</div>;
  }

  return (
    <div className="article-detail">
      <div className="article-header">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">
          {article.author && <span className="article-author">作者: {article.author}</span>}
          {article.createdAt && (
            <span className="article-date">
              发布日期: {formatDate(article.createdAt)}
            </span>
          )}
          {article.category && (
            <span className="article-category">分类: {article.category}</span>
          )}
          {article.tags && article.tags.length > 0 && (
            <div className="article-tags">
              标签:
              {article.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {article.cover && (
        <div className="article-cover">
          <img src={article.cover} alt={article.title} />
        </div>
      )}

      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <div className="article-footer">
        <div className="article-actions">
          <button className="btn-like">
            <span className="icon">👍</span>
            <span>{article.likes || 0}</span>
          </button>
          <button className="btn-share">
            <span className="icon">🔗</span>
            <span>分享</span>
          </button>
        </div>

        <div className="article-navigation">
          <Link to="/articles" className="btn-back">
            返回文章列表
          </Link>
        </div>
      </div>

      {article.comments && article.comments.length > 0 && (
        <div className="article-comments">
          <h3>评论 ({article.comments.length})</h3>
          <div className="comments-list">
            {article.comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <div className="comment-author">{comment.author}</div>
                <div className="comment-date">{formatDate(comment.createdAt)}</div>
                <div className="comment-content">{comment.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail; 