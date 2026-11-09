# 发布文案（3D 版）

## 标题

DeepSeek Harness 多 Agent 喊话 3D 演示：主 Agent 一句话，4 个 Agent 开工｜对比官方 Super-agent

备选：

我把多个 AI 对话做成了一张 3D 工作台：鼠标一动，窗口跟着转｜dsh-cross-session

## 正文

这次不是念 PPT，是真演示：

一张 3D 的 Harness 工作台，鼠标左右移动时窗口跟着倾斜，镜头跟着鼠标走。
主 Agent 收到一句「把这个项目做完：登录 + 支付 + 测试 + 部署」，
旁边的 4 个 worker 依次亮起、跑进度、回传结果，最后汇总回主 Agent。

这就是我给 DeepSeek Harness 写的开源插件 **dsh-cross-session（多 Agent 喊话）**：

- 每个 Agent 是一个独立对话，侧边栏就是组织架构；**队长 / 经理 / worker 名字前有角色图标**。
- 队长开新对话，派完整任务；运行中在 step 边界插话，空闲时唤醒。
- worker 遇到问题用 `ask_master` 回问队长；队长用 `get_chat_info` 只读看进度。
- 支持 2 层（队长 + 3–4 worker）、3 层（队长 → 经理 → worker，每个经理 ≥3 worker）、4 层（再加总监，设置里打开才启用）。
- 插件带 `SKILL.md` 和任务书：AI 可以自己决定经理数量、难度和层级，也可以不按任务书来。

和官方 **dsh-superagent** 的差距，一张表说清：

| | 官方 Super-agent | 多 Agent 喊话 |
| --- | --- | --- |
| 工作层级 | GitHub 仓库 / 工单 / PR | 桌面上的多个对话 |
| 入口 | Issue / 评论 / 飞书 | 侧边栏对话 + shout |
| 交付 | Pull Request / 审批 | 实时协作 + 只读上下文 |
| 关系 | 仓库层自主工人 | 对话层协作；可叠加 |

**不是替代，是补上它没覆盖的那一层。**

GitHub（MIT，欢迎 star / issue）：
https://github.com/cao123-2024/dsh-cross-session

安装：把仓库作为本地 bundle 安装（`plugin_manager install_bundle`，target 选仓库目录）；或在 CLI 里 `dsh plugin --profile desktop add "<本仓库路径>"`。要求 DSH `0.2.1-rc.x`。

时间轴
00:00 一个对话的瓶颈
00:04 官方 Super-agent：仓库层
00:11 桌面上的多个对话，谁来协调？
00:18 多 Agent 喊话：补上对话层
00:21 真实演示：一句话，4 个 worker 开工
00:37 2 层 / 3 层 / 4 层组织架构
00:47 对比官方 Super-agent
00:53 任务书与 AI skill
00:58 GitHub 与安装

说明：3D 工作台是风格化演示，真实功能以 GitHub 仓库中的插件代码为准。插件 MIT 开源。

#DeepSeek #DeepSeekHarness #AI #多Agent #开源 #3D #程序员 #效率工具
