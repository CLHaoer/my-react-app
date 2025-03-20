import http from '../utils/http';
import aiConfig from '../config/aiConfig';

// 设置API密钥
let apiKey = localStorage.getItem('ai_api_key') || aiConfig.defaultApiKey;

/**
 * 硅基流动API接口
 */
const aiApi = {
  /**
   * 设置API密钥
   * @param {string} key - API密钥
   */
  setApiKey(key) {
    apiKey = key;
    localStorage.setItem('ai_api_key', key);
  },

  /**
   * 获取API密钥
   * @returns {string} 当前API密钥
   */
  getApiKey() {
    return apiKey;
  },

  /**
   * 向DeepSeek-R1模型发送聊天请求
   * @param {Array} messages - 消息数组
   * @param {Object} options - 请求选项
   * @param {Function} onStream - 流式响应回调函数
   * @returns {Promise} 响应结果
   */
  async chatCompletion(messages, options = {}, onStream = null) {
    if (!apiKey) {
      throw new Error('未设置API密钥，请先配置API密钥');
    }

    const defaultOptions = aiConfig.defaultParams;
    const requestData = {
      ...defaultOptions,
      ...options,
      model: options.model || aiConfig.defaultModel,
      messages,
      stream: !!onStream // 如果有回调函数则启用流式输出
    };

    try {
      // 如果是流式请求
      if (onStream && typeof onStream === 'function') {
        const response = await fetch(`${aiConfig.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // 保留最后一个不完整的行

          for (const line of lines) {
            if (line.trim() === '' || line.trim() === 'data: [DONE]') continue;
            
            try {
              const jsonStr = line.replace(/^data: /, '').trim();
              if (jsonStr) {
                const json = JSON.parse(jsonStr);
                onStream(json);
              }
            } catch (e) {
              console.error('解析流数据失败:', e, line);
            }
          }
        }

        return { success: true };
      } else {
        // 非流式请求
        const response = await http.getInstance().post(
          `${aiConfig.baseUrl}/chat/completions`,
          requestData,
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            },
            timeout: 180000 // 设置180秒超时
          }
        );
        
        return response;
      }
    } catch (error) {
      console.error('AI请求失败:', error);
      throw error;
    }
  },

  /**
   * 获取可用模型列表
   * @returns {Promise} 模型列表
   */
  async getModels() {
    if (!apiKey) {
      // 如果未设置API密钥，返回配置中的模型列表
      return Promise.resolve({ data: aiConfig.models });
    }

    try {
      const response = await http.getInstance().get(
        `${aiConfig.baseUrl}/models`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('获取模型列表失败:', error);
      // 发生错误时返回配置中的模型列表
      return { data: aiConfig.models };
    }
  }
};

export default aiApi; 