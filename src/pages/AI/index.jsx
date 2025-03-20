import { AIChat } from '../../components/AI';
import './index.scss';

const AI = () => {
  return (
    <div className="ai-page">
      <h1 className="page-title">AI智能助手</h1>
      <p className="page-description">
        使用硅基流动API，调用DeepSeek-R1模型，体验AI强大的推理能力。
      </p>
      <div className="ai-chat-wrapper">
        <AIChat />
      </div>
    </div>
  );
};

export default AI; 