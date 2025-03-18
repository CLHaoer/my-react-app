import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleApi } from '../../api';
import './index.scss';

const Home = () => {
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取最新文章
    const fetchLatestArticles = async () => {
      try {
        setLoading(true);
        const response = await articleApi.getArticleList({ page: 1, size: 5 });
        setLatestArticles(response.data || []);
      } catch (error) {
        console.error('获取最新文章失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticles();
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <h1>欢迎来到我的React应用</h1>
        <p>这是一个使用React和Vite构建的现代化网站</p>
        <div className="actions">
          <Link to="/articles" className="btn-primary">浏览文章</Link>
          <Link to="/about" className="btn-secondary">了解更多</Link>
        </div>
      </section>

      <section className="features">
        <h2>主要特点</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>响应式设计</h3>
            <p>适配各种设备屏幕尺寸</p>
          </div>
          <div className="feature-item">
            <h3>现代化架构</h3>
            <p>基于React和Vite构建</p>
          </div>
          <div className="feature-item">
            <h3>高性能</h3>
            <p>优化的代码和资源加载</p>
          </div>
        </div>
      </section>

      <section className="latest-articles">
        <h2>最新文章</h2>
        {loading ? (
          <div className="loading">加载中...</div>
        ) : (
          <div className="article-list">
            {latestArticles.length > 0 ? (
              latestArticles.map((article) => (
                <div className="article-card" key={article.id}>
                  <h3>{article.title}</h3>
                  <p>{article.summary || article.content?.substring(0, 100) + '...'}</p>
                  <Link to={`/articles/${article.id}`} className="read-more">
                    阅读更多
                  </Link>
                </div>
              ))
            ) : (
              <div className="no-data">暂无文章</div>
            )}
          </div>
        )}
        <div className="view-all">
          <Link to="/articles" className="btn-link">查看所有文章</Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 