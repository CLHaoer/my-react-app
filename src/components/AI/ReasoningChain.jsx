import { useState } from 'react';

/**
 * 思维链组件
 * 显示DeepSeek-R1模型的思维过程
 * @param {Object} props - 组件属性
 * @param {string} props.content - 思维链内容
 */
const ReasoningChain = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!content) return null;

  return (
    <div className="reasoning-chain">
      <div 
        className="reasoning-toggle" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '隐藏思维过程' : '查看思维过程'} 
        <span className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded ? '▼' : '▶'}
        </span>
      </div>
      
      {isExpanded && (
        <div className="reasoning-content">
          <pre>{content}</pre>
        </div>
      )}
    </div>
  );
};

export default ReasoningChain; 