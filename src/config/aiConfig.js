/**
 * AI服务配置
 * 硅基流动API相关设置
 */
const aiConfig = {
  // 基础API URL
  baseUrl: 'https://api.siliconflow.cn/v1',
  
  // 默认API密钥（此处使用示例密钥，请替换为实际可用的密钥）
  defaultApiKey: 'sk-fzwbwxkqzmsbywlhbclykhkhnmyjsdqkgsjpaqfzetztqxjs',
  
  // 默认模型
  defaultModel: 'deepseek-ai/DeepSeek-R1',
  
  // 可用模型列表
  models: [
    {
      id: 'deepseek-ai/DeepSeek-R1',
      name: 'DeepSeek-R1 (推理增强)',
      description: '拥有思维链能力的高级推理模型'
    },
    {
      id: 'Pro/deepseek-ai/DeepSeek-R1',
      name: 'DeepSeek-R1(pro)',
      description: '拥有思维链能力的高级推理模型'
    },
    {
      id: 'deepseek-ai/DeepSeek-V3',
      name: 'DeepSeek-V3 (通用)',
      description: '通用大语言模型，适合广泛需求'
    },
    {
      id: 'Pro/deepseek-ai/DeepSeek-V3',
      name: 'DeepSeek-V3(pro)',
      description: '拥有思维链能力的高级推理模型'
    },
  ],
  
  // 请求默认参数
  defaultParams: {
    max_tokens: 4096,
    temperature: 0.6,
    top_p: 0.95
  }
};

export default aiConfig; 