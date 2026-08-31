# Claude Code

## 安装

```sh
# 如果网络环境不太好可以先执行这条命令
npm config set registry https://registry.npmmirror.com

# 执行如下命令，开始安装claude code
npm install -g @anthropic-ai/claude-code

# 验证
claude --version
```



## 配置

打开如下文件（如果文件或文件夹没有请直接新建即可）：

- Windows 系统：`C:\Users\你的用户名\.claude\settings.json`
- Mac 系统：`~/.claude/settings.json`

将以下内容复制到文件中，并保存即可；

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "你的 DeepSeek API Key",
    "ANTHROPIC_MODEL": "deepseek-v4-pro[1m]",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro[1m]",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-pro[1m]",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash[1m]",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_EFFORT_LEVEL": "max"
  }
}
```



## 决策方案

- `Ask before edits`Claude **每一次文件修改操作都会弹窗请求你的手动审批**，不会自动改动任何代码

- `Edit automatically`选中文字 / 整个文件的代码修改**自动执行，无需确认**；但终端 Shell 命令（npm、bash、pip 等）依旧需要手动审批

- `Plan mode`Claude 先完整扫描工程代码、梳理修改方案，**仅输出完整改造计划，不直接改动文件**，等你确认方案后再执行编辑

- `Effort（max）`控制 Claude 处理任务时的思考深度、上下文分析力度

  - 拉高了效率低，但结果稳。拉低反之

  - ```
    ● low：快速回答，较少工具调用，适合简单问题
    ● medium：标准分析深度，适合日常开发
    ● high：深度分析，更多验证步骤，适合复杂重构
    ● xhigh/max：最大深度，多次交叉验证，适合安全审计等关键任务
    
    # 命令行参数
    claude --effort low     # 快速、省 token
    claude --effort medium  # 默认
    claude --effort high    # 深度分析
    
    # 或在 settings.json 中
    {
      "effortLevel": "high"
    }
    ```

  



## Memory 记忆管理

Claude Code 的记忆系统分为三个层次：

| 层次                 | 位置                          | 作用域   | 加载时机         |
| -------------------- | ----------------------------- | -------- | ---------------- |
| **项目级 CLAUDE.md** | `<project>/CLAUDE.md`         | 当前项目 | 每次会话启动     |
| **项目级 MEMORY.md** | `<project>/.claude/MEMORY.md` | 当前项目 | 会话中可按需检索 |
| **用户级 MEMORY.md** | `~/.claude/MEMORY.md`         | 所有项目 | 会话中可按需检索 |



**记忆管理原则：**

1. **不存代码能推导的信息**：项目结构、git 历史、代码内容不应放入记忆
2. **不存仅限本次对话的信息**：只在本次对话相关的临时事实不需要持久化
3. **及时更新**：偏好改变时告知 Claude 更新记忆
4. **定期审查**：`~/.claude/MEMORY.md` 中的内容可能会过时



### CLAUDE.md

`CLAUDE.md` 文档是项目级文档，用于描述整个项目中关于 claude code 应当注意的相关事项，是对整个 claude code 工作流程的项目级控制。

`CLAUDE.md` 是最重要的记忆载体，它在**每次会话初始化时完整加载**到上下文中。

可以让 claude code 自己生成 `CLAUDE.md` 。

```
# 项目名称

## 概述
这是一个 xxx 项目，用于 xxx。技术栈：React + TypeScript + Node.js。

## 构建与运行
​```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器（端口 3000）
npm test             # 运行单元测试
npm run test:e2e     # 运行端到端测试
npm run build        # 生产构建
```



## 终端命令

* `/statusline` ：在终端底部显示持久状态栏：当前任务、token 用量、活跃模型。

* `/loop` ：定时循环。

  ```
  /loop 5m /code-review
  /loop 10m "检查 CI 状态"
  ```

* 会话管理

  ```
  # 恢复上一次会话
  claude --resume
  
  # 列出最近的会话
  claude --list-sessions
  
  # 指定会话名称
  claude --session "debug-auth-issue"
  ```

* 利用 `!` 前缀在对话中运行命令：在对话中输入 `!<command>` 会直接在当前会话执行：

  ````
  !git status
  !npm test
  ```

* `/debug` ：debug 模式



## 指令

* `/context` ：查看上下文用量

* `/compact` ：上下文压缩

* `/diff` ：查看本次对话的修改内容

* `/code-review` ：代码质量审查

  ```
  /code-review            # 默认审查（中等深度）
  /code-review --fix      # 审查并自动修复发现的问题
  /code-review --comment  # 审查并将发现发布为 PR 内联评论
  ```

  **审查维度**：

  - 🐛 正确性 Bug：逻辑错误、边界情况遗漏、空值处理
  - 🔒 安全性：注入漏洞、敏感信息泄露、权限问题
  - ♻️ 代码复用：重复代码、可以简化的逻辑
  - 📐 代码风格：命名规范、代码结构、可读性
  - ⚡ 性能：不必要的计算、内存泄漏、异步处理

  **Effort 级别**：

  | 级别          | 深度     | 耗时 | 适用场景               |
  | ------------- | -------- | ---- | ---------------------- |
  | `low`         | 快速扫描 | 少   | 小改动、格式修复       |
  | `medium`      | 标准审查 | 中   | 常规 PR                |
  | `high`        | 深度分析 | 多   | 核心逻辑、安全敏感代码 |
  | `xhigh`/`max` | 全面审查 | 最多 | 关键基础设施、安全审计 |



* `/review` ：PR 审查
* `/verify` ：手动验证改动
* `/security-review` ：安全审查
* `/reload-skills` ：重新加载 skill



## skill

技能（Skills）是 Claude Code 的扩展机制，分为内置技能和自定义技能。每个技能是一个可以被 `/skill-name` 调用的功能单元。

创建 skill：在 `~/.claude/plugins/` 下创建技能文件。

```
~/.claude/plugins/
└── my-skill/
    └── skill.md          # 技能定义
```



`skill.md` 的结构：

```
---
name: my-skill
description: 运行自定义的 lint 检查并自动修复
---

# my-skill

## 触发条件
当用户输入 `/my-skill` 或提到 "运行 lint 检查" 时触发。

## 执行步骤
1. 运行 `npm run lint` 获取所有 lint 错误
2. 按错误类型分组
3. 对于可自动修复的错误（如 prettier 格式），自动应用修复
4. 对于需要手动判断的错误，逐一向用户确认
5. 修复后再次运行 lint 确认无错误
```



## subagent

Claude Code 可以派生子代理并行处理独立任务。

主 Claude 是全栈工程师，Subagent 是专家小组。比如可以创建一个代码审查专家的 subagent，专门负责 review 代码。主 Claude 遇到代码审查任务时，就派他去干。

subagent 中可以配置多个 skill。

|          | Skill (/命令)                   | Subagent                 |
| -------- | ------------------------------- | ------------------------ |
| 触发方式 | 手动输入 `/技能名`              | Claude 自动判断并调用    |
| 运行方式 | 在当前对话中执行                | 独立运行，有自己的上下文 |
| 用途     | 快捷指令模板                    | 专家角色，可并行工作     |
| 存放位置 | `.claude/skill/技能名/SKILL.md` | `.claude/agents/名称.md` |



## Hooks 钩子系统

Hooks 允许在特定事件前后自动执行脚本。

支持的 Hook 类型：

| Hook           | 触发时机               |
| -------------- | ---------------------- |
| `pre-command`  | 执行任意命令之前       |
| `post-command` | 执行任意命令之后       |
| `on-start`     | Claude Code 会话启动时 |
| `on-complete`  | Claude Code 工作完成时 |
| `pre-edit`     | 编辑文件之前           |
| `post-edit`    | 编辑文件之后           |



配置示例：

```
{
  "hooks": {
    "pre-command": {
      "command": "echo 'Claude 即将执行命令'",
      "description": "记录所有即将执行的命令"
    },
    "post-command": {
      "command": "./scripts/check-breaking-changes.sh",
      "description": "检查是否引入了破坏性变更"
    },
    "on-start": {
      "command": "git fetch --all",
      "description": "启动时拉取最新远程分支"
    }
  }
}
```



Hook 脚本可以访问的环境变量：

| 变量                 | 说明                                      |
| -------------------- | ----------------------------------------- |
| `CLAUDE_EVENT_TYPE`  | 事件类型（pre-command / post-command 等） |
| `CLAUDE_COMMAND`     | 将要执行或已执行的命令                    |
| `CLAUDE_FILE_PATH`   | 正在编辑的文件路径                        |
| `CLAUDE_WORKING_DIR` | 当前工作目录                              |



## 目录结构

```
~/.claude/
├── settings.json          # 用户全局配置
├── MEMORY.md              # 用户级记忆
├── memory/                # 分文件的记忆存储
├── history.jsonl          # 命令历史
├── keybindings.json       # 自定义快捷键
├── plugins/               # 自定义技能插件
├── backups/               # 文件备份
├── file-history/          # 文件修改历史
├── sessions/              # 会话存档
├── projects/              # 项目级记忆（按项目存储）
└── plans/                 # Plan Mode 保存的计划

<project>/
├── CLAUDE.md              # 项目级记忆（会话启动时加载）
└── .claude/
    ├── settings.local.json # 项目级配置
    └── MEMORY.md           # 项目级记忆
```



## 权限管理

通过 `settings.json` 精细化控制 Claude 的操作权限：

```json
{
  "permissions": {
    "allow": [
      "npm test",
      "npm run lint",
      "git status",
      "git diff"
    ],
    "allow-dry-run": [
      "rm -rf",
      "git push"
    ],
    "deny": [
      "rm -rf /",
      "git push --force origin main"
    ]
  }
}
```

权限级别：

- `allow`：无需确认直接执行
- `allow-dry-run`：先展示计划，需要确认才执行
- `ask`：每次询问（默认）
- `deny`：完全禁止

使用 `/fewer-permission-prompts` 技能可以自动分析你的使用记录并生成合理的权限配置。



## 实用技巧

### 任务分解

长任务拆分为多个短对话，每个对话聚焦一个子任务：

```
❌ "重构整个认证模块、数据层、UI 层"
✅ 对话1："重构认证模块的 token 管理"
   对话2："重构认证的数据层查询"
   对话3："重构登录和注册页面 UI"
```

每次对话结束后，在下一个对话开始时提供上下文摘要。



### 精确引用

引用文件时使用 `file.ts:42` 格式，Claude 会直接定位到具体行：

```
请查看 src/api/auth.ts:120-150 的 token 刷新逻辑
```



### 利用 Plan Mode

在复杂任务开始前进入 Plan Mode 确认方案：

```
这个任务比较复杂，请先进入 Plan Mode 设计方案。
```

Plan Mode 中 Claude 会探索代码库、设计实施路径，在得到你的确认后再动手写代码。这避免了返工。



## LangChain RAG项目实战

项目 init 提示词：

```
我的毕设是，通过langchain框架，开发RAG企业级知识库问答系统，用户可以通过浏览器进行知识库问答操作；
问答系统主要是针对电商平台售卖商品进行回答，提供的知识库多数是商品相关信息，帮助更好的回答用户关于商品的问题；
技术选型上，我听说AI领域langchain是非常知名的开发框架，所以必须选择langchain，其余技术栈你来决定；

我需要有如下功能：
1. 能够支持用户在浏览器中进行知识库管理
2. 能够支持用户在浏览器中和模型进行知识库问答，问答的时候要尽量引用知识库内容作为参考，在回答中能够显示引用的知识库片段是哪些
3. 能够支持多用户多会话管理，每个用户有每个用户的独立会话
4. 能够保持用户的会话记录，用户不同时间段登录都能找回历史对话
5. 支持基础的用户注册登录功能，支持用户修改密码
6. 管理员用户名admin，密码123456，只有管理员能够打开知识库管理页面，进行知识库管理，其他用户只能进行知识库问答
7. 不仅仅实现基础功能，也要应用各类技术做性能优化，达到企业级使用的效果
8. 其余你觉得有必要可以添加的功能点

你帮我列出来方案计划，我们先讨论；
```

