import { useState, useEffect, useRef } from 'react';
import aiApi from '../../api/aiApi';
import aiConfig from '../../config/aiConfig';
import ReasoningChain from './ReasoningChain';
import './AIChat.scss';

/**
 * AI聊天组件
 * 提供与DeepSeek-R1模型交互的聊天界面
 */
const AIChat = () => {
  // 状态管理
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(aiApi.getApiKey() || aiConfig.defaultApiKey);
  const [selectedModel, setSelectedModel] = useState(aiConfig.defaultModel);
  const [models, setModels] = useState(aiConfig.models);
  const [reasoningContents, setReasoningContents] = useState({});
  const [showReasoningChain, setShowReasoningChain] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 加载模型列表
  useEffect(() => {
    const loadModels = async () => {
      try {
        if (apiKey) {
          const modelList = await aiApi.getModels();
          setModels(modelList||aiConfig.models);
        }
      } catch (error) {
        console.error('加载模型失败', error);
      }
    };

    loadModels();
  }, [apiKey]);

  // 消息更新后滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息到AI
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // 检查API密钥是否设置
    if (!apiKey) {
      setError('请先设置API密钥');
      return;
    }

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    // 创建一个临时的AI消息用于流式输出
    const tempAiMessage = { role: 'assistant', content: '', id: Date.now().toString() };
    setMessages(prev => [...prev, tempAiMessage]);

    try {
      let fullContent = '';
      let reasoningContent = '';

      await aiApi.chatCompletion(
        [...messages, userMessage],
        { model: selectedModel },
        (chunk) => {
          if (chunk.choices && chunk.choices[0]) {
            const delta = chunk.choices[0].delta;
            if (delta.content) {
              fullContent += delta.content;
              // 更新消息内容
              setMessages(prev => prev.map(msg =>
                msg.id === tempAiMessage.id
                  ? { ...msg, content: fullContent }
                  : msg
              ));
            }
            if (delta.reasoning_content) {
              reasoningContent += delta.reasoning_content;
              // 更新思维链内容
              setReasoningContents(prev => ({
                ...prev,
                [tempAiMessage.id]: reasoningContent
              }));
            }
          }
        }
      );

      // 请求完成后，确保最终内容被正确设置
      setMessages(prev => prev.map(msg =>
        msg.id === tempAiMessage.id
          ? { ...msg, content: fullContent }
          : msg
      ));

      if (reasoningContent) {
        setReasoningContents(prev => ({
          ...prev,
          [tempAiMessage.id]: reasoningContent
        }));
      }

    } catch (err) {
      console.error('聊天请求失败:', err);
      setError(err.message || '请求失败，请稍后再试');
      // 移除用户消息和临时AI消息，因为请求失败
      setMessages(prev => prev.slice(0, -2));
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // 保存API密钥
  const saveApiKey = () => {
    aiApi.setApiKey(apiKey);
    setError(null);
  };

  // 清空聊天记录
  const clearChat = () => {
    setMessages([]);
    setReasoningContents({});
  };

  // 切换是否显示思维链
  const toggleReasoningChain = () => {
    setShowReasoningChain(!showReasoningChain);
  };

  return (
    <div className="ai-chat-container">
      <div className="ai-chat-header">
        <h2>人工智能助手 (DeepSeek-R1)</h2>

        <div className="ai-chat-settings">
          <div className="api-key-input">
            <input
              type="text"
              placeholder="请输入硅基流动API密钥"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button onClick={saveApiKey}>保存密钥</button>
          </div>

          <div className="model-selector">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {models.map((model,index) => (
                <option key={model.id+index} value={model.id}>
                  {model.name||model.id}
                </option>
              ))}
            </select>
          </div>

          <button onClick={clearChat}>清空聊天</button>
        </div>
      </div>

      <div className="ai-chat-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>开始与AI助手对话吧！使用DeepSeek-R1模型，支持思维链能力。</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg.id || msg.content+index}
              className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}
            >
              {msg.role === 'assistant' && msg.id && reasoningContents[msg.id] && (
                <div className="reasoning-section">
                  <div className="reasoning-header">
                    <span className="reasoning-title">思维链过程</span>
                  </div>
                  <ReasoningChain content={reasoningContents[msg.id]} />
                </div>
              )}
              <div className="message-content">{msg.content}</div>
              {isLoading && msg.role !=='user' && index+1 === messages.length &&
               <div className="message-content loading">AI正在思考中...</div>
              }
            </div>
          ))
        )}

        {error && <div className="error-message">{error}</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="ai-chat-input">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="输入问题，按Enter发送..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading || !input.trim()}>
          {isLoading ? '发送中...' : '发送'}
        </button>
      </div>
    </div>
  );
};

export default AIChat; 