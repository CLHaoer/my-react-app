import './index.scss';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-section">
        <h1>关于我们</h1>
        <p className="intro">
          我们是一个专注于前端技术的团队，致力于使用现代化的技术栈打造高质量的Web应用。
        </p>
        
        <div className="about-content">
          <h2>我们的使命</h2>
          <p>
            我们的使命是通过创新的技术和卓越的用户体验，为用户提供最佳的数字解决方案。我们相信技术的力量可以改变世界，而我们正在努力成为这一变革的一部分。
          </p>
          
          <h2>我们的技术栈</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <h3>前端</h3>
              <ul>
                <li>React</li>
                <li>Vite</li>
                <li>SCSS</li>
                <li>React Router</li>
              </ul>
            </div>
            
            <div className="tech-item">
              <h3>后端</h3>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>RESTful API</li>
              </ul>
            </div>
            
            <div className="tech-item">
              <h3>开发工具</h3>
              <ul>
                <li>Git</li>
                <li>VS Code</li>
                <li>Webpack</li>
                <li>ESLint</li>
              </ul>
            </div>
          </div>
          
          <h2>团队成员</h2>
          <div className="team-members">
            <div className="member-card">
              <div className="avatar">👨‍💻</div>
              <h3>张三</h3>
              <p>前端开发工程师</p>
            </div>
            
            <div className="member-card">
              <div className="avatar">👩‍💻</div>
              <h3>李四</h3>
              <p>UI/UX设计师</p>
            </div>
            
            <div className="member-card">
              <div className="avatar">👨‍💻</div>
              <h3>王五</h3>
              <p>后端开发工程师</p>
            </div>
          </div>
          
          <h2>联系我们</h2>
          <div className="contact-info">
            <p><strong>邮箱：</strong> clhaoer@163.com</p>
            <p><strong>地址：</strong> 中国 四川省 成都市 天府五街软件园G区</p>
            <p><strong>电话：</strong> +86 820 820 8820</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 