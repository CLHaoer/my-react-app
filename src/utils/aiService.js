import http from './http';

/**
 * 硅基流动AI API服务
 * 使用DeepSeek-R1模型进行AI对话
 */
const aiService = {
  /**
   * 向DeepSeek-R1模型发送请求
   * @param {Array} messages - 对话历史消息数组，格式为[{role: 'user', content: '你好'}]
   * @param {Object} options - 请求配置选项
   * @returns {Promise} - 包含AI响应的Promise
   */
  async chat(messages, options = {}) {
    const defaultOptions = {
      model: "deepseek-ai/DeepSeek-R1",
      stream: false,
      max_tokens: 4096,
      temperature: 0.6,
      top_p: 0.95
    };

    const requestData = {
      ...defaultOptions,
      ...options,
      messages
    };

    try {
      // 调用硅基流动的API
      const response = await http.post('/ai/chat', requestData);
      return response.data;
    } catch (error) {
      console.error('AI请求失败:', error);
      throw error;
    }
  },

  /**
   * 获取AI模型列表
   * @returns {Promise} - 包含可用AI模型的Promise
   */
  async getModels() {
    try {
      const response = await http.get('/ai/models');
      return response.data;
    } catch (error) {
      console.error('获取AI模型列表失败:', error);
      throw error;
    }
  }
};

export default aiService; 