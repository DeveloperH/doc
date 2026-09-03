# 工具



## Link

* http://prompts.chat/  全球最大的开源 AI 提示词（Prompt）库与社区平台
* [VoxCPM 开源的一个高质量、高逼真度的语音生成与大语言模型（TTS / Speech LLM）开源框架](https://github.com/OpenBMB/VoxCPM) 





## 开源

### 提示词

* [system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) ：专门收集和汇总各类主流 AI 工具系统提示词（System Prompts） 与 模型配置（Model Configurations） 的开源知识库。可以用来参考学习顶级工具内部是怎么写提示词的。
* ⭐️⭐️⭐️ [Datawhale 是一个专注于AI领域的开源组织，致力于分享最前沿的AI知识](https://github.com/datawhalechina) 
  * https://github.com/datawhalechina/hello-agents 从零开始构建智能体
* [吴恩达机器学习](https://github.com/fengdu78) 
* [以 Andrej Karpathy 的 AI 思想体系为纲领的“AI 时代程序员修炼指南”](https://github.com/multica-ai/andrej-karpathy-skills) 





## ollama

在自己电脑上安装、运行和管理开源大模型的工具。

https://github.com/ollama/ollama



```sh
# 查看本地已下载的所有模型
ollama list

# 拉取并运行大模型
ollama run deepseek-r1:8b
ollama run qwen2.5:1.5b

# 查看当前正在内存/显存中运行的模型
ollama ps

# 删除本地指定的模型，释放磁盘空间
ollama rm <模型名称>
```



## RAG

RAG（Retrieval-Augmented Generation，检索增强生成） 是一种将外部知识库检索与大语言模型（LLM）生成能力相结合的技术架构。

简单来说，它的工作原理就像是给大模型配了一个可以随时查阅的“外挂资料库”。在回答问题前，它先去资料库里翻阅最新的相关文档，然后再结合这些资料来精准回答。

适合场景：企业知识库、智能客服、文档问答。



**为什么需要 RAG？（解决大模型的痛点）**

传统的单纯依赖 LLM 存在三个核心局限，而 RAG 正好能完美解决：

- **解决“幻觉”问题**：LLM 有时会一本正经地胡说八道。RAG 要求模型“基于检索到的事实回答”，大幅提高了准确性。
- **解决知识滞后**：LLM 的知识停留在模型训练完成的那一刻。而 RAG 的外部数据库可以实时更新，无需重新训练大模型。
- **保护数据隐私与企业私有知识**：企业不需要把内部敏感数据（如财报、HR 手册、客户合同）喂给大模型训练，只需放在本地向量数据库中供 RAG 检索即可。



**RAG 的核心工作流程（简单三步）**

1. **检索（Retrieval）**：用户提出问题后，系统将问题转化为向量，在外部知识库（如向量数据库 Milvus、Qdrant、Pgvector 等）中搜索最相关的文档片段。
2. **增强（Augmentation）**：将用户的问题与检索到的文档片段组合在一起，拼成一段更丰富的 Prompt（提示词）。
3. **生成（Generation）**：将拼接好的 Prompt 丢给大模型（如 GPT-4、DeepSeek 等），让模型基于提供的参考资料生成最终答案。











## 企业 AI 业务

SpringAl ：Spring 官方生态推出的一个应用框架，旨在将人工智能（AI）能力无缝继承并集成到 Java / Spring 开发生态中。

SpringAiAlibaba + AgentScope ：工程化、生产级方案。在 Java / Spring 生态中，结合 Spring AI Alibaba 的模型基础设施能力，与 AgentScope 的多智能体（Multi-Agent）协同架构设计，用于构建企业级的 Java Multi-Agent（多智能体）应用。

Langchain4J、LangGraph4J ：AI能力+生态整合+灵活组合。Langchain4J 是目前 Java 生态中最流行、功能最完善的大模型应用开发框架。LangGraph4J 是专为构建复杂的、状态化的、多智能体（Multi-Agent）工作流而生的 Java 框架。

需要 JDK17 以上。













































