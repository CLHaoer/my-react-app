import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.scss';

const DefaultLayout = () => {
  const [activeNav, setActiveNav] = useState('/');

  // 导航菜单
  const navItems = [
    { path: '/', label: '首页' },
    { path: '/articles', label: '文章' },
    { path: '/about', label: '关于' },
  ];

  return (
    <div className="layout-default">
      {/* 顶部导航 */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <Link to="/">我的React应用</Link>
          </div>
          <nav className="nav">
            <ul>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={activeNav === item.path ? 'active' : ''}
                    onClick={() => setActiveNav(item.path)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* 内容区域 */}
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} 我的React应用. 保留所有权利.</p>
        </div>
      </footer>
    </div>
  );
};

export default DefaultLayout;
