# Atelier · 模块复盘集

一套「工作室制图板」风格的 Anthropic-style HTML 复盘页——把 **Atelier**（一支住在 Temporal 工作流里的 AI 编程虚拟团队：PM → Architect → Coder → Reviewer）拆成 **15 个模块 + 1 张总览 hub** 逐一讲透。

**🏛️ 在线阅读（从这里进）→ https://geoxxll.github.io/atelier-module-review/**

每张子页结构一致：

> 先建直觉 → 图版 I 静态架构 → 图版 II 动态流程 → 端到端例子 → 核心机制深挖（代码级）→ 面试要点 → 限制与未来

统一视觉：claude-style 暖色 token + 明暗双主题 + 左侧可收缩目录 + 滚动高亮。全部自包含（内联 CSS/JS，零外链），可直接用浏览器打开。

## 模块

| # | 页面 | 模块 |
|---|---|---|
| — | [overview.html](overview.html) | **系统总览 hub** |
| 01 | [web.html](web.html) | 前端工作台（Next.js） |
| 02 | [api.html](api.html) | HTTP API（FastAPI） |
| 03 | [workflow-engine.html](workflow-engine.html) | 工作流编排（Temporal） |
| 04 | [llm-gateway.html](llm-gateway.html) | LLM Gateway |
| 05 | [coder.html](coder.html) | 闭环 Coder |
| 06 | [reviewer.html](reviewer.html) | 对抗式 Reviewer |
| 07 | [planner.html](planner.html) | Planner 切片规划 |
| 08 | [merge.html](merge.html) | Merge Agent 归并 |
| 09 | [orchestrator.html](orchestrator.html) | 并行编排 Orchestrator |
| 10 | [shared-primitives.html](shared-primitives.html) | 共享基座 |
| 11 | [memory-system.html](memory-system.html) | 记忆系统（三类记忆） |
| 12 | [skills.html](skills.html) | Agent Skills 系统 |
| 13 | [transport.html](transport.html) | 传输层（NATS/JetStream/Blackboard） |
| 14 | [evals.html](evals.html) | 评测子系统 |
| 15 | [infra.html](infra.html) | 基础设施（migrations + compose） |

> 内容以代码为准：各深挖段落取自真实源码（函数名、SQL、算法、数据结构）。
