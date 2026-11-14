# 发布文案（3D 演示版）

## 标题

一个对话，长出一支队伍｜DeepSeek Harness 多 Agent 喊话

备选：

我给 DeepSeek Harness 做了个 3D 工作台：说一句话，Agent 自己找经理和 worker

## 正文

没有旁白。看画面就够了。

在 DeepSeek Harness 里新建一个对话，对一个 Agent 说：
「做一个品牌官网：首页、产品、定价、博客，深色模式，移动端适配。」

它自己拆成 4 条线，建了 2 个经理、6 个 worker。
旁边的对话一张一张滑出来，全部从主对话发出；任务跑完，结果回到队长，最后长成一个项目。

这是开源插件 **dsh-cross-session（多 Agent 喊话）**：

- 每个 Agent 都是侧边栏里真实存在的独立对话，能点开、插话、改名、归档
- 队长 / 总监 / 经理 / worker 有角色图标；支持 2 / 3 / 4 层
- 运行中可以在 step 边界插话；worker 用 `ask_master` 直接回问队长
- `get_chat_info` 只读查看任意对话的进度，不打扰对方
- 自带 AI skill 和任务书：AI 自己决定怎么分队，也可以不按任务书来

**和官方 Super Agent 的差距：**

**(a) 我们超过它的地方**
| 维度 | 多 Agent 喊话 | 官方 Super Agent |
| --- | --- | --- |
| 对话可见 | 每个 Agent 都是侧边栏里的独立对话 | 工单/会话在它自己的体系里 |
| 实时协作 | 运行中插话、空闲唤醒 | 通常等任务结束或审批 |
| 队员回问 | worker 用 `ask_master` 直接回问队长 | 没有桌面会话通道 |
| 只读看进度 | 看 turn / step / 最近工具调用 | 只能看工单状态 / PR |
| 层级可视化 | 队长 / 总监 / 经理 / worker 图标 | 单层自主工人 |

**(b) 它比我们强的地方**
| 维度 | 官方 Super Agent | 我们 |
| --- | --- | --- |
| 仓库自主 | 监听 GitHub issue / 评论 / 飞书，接单、开 worktree、开 PR | 不做仓库接单 |
| 云端常驻 | 不依赖你的电脑开着 | 依赖本地 DSH 进程 |
| 离线与重启 | 工单服务端持久 | 重启后 pending 不自动唤醒 |
| 组织与审计 | 平台级权限、审计、多人协作 | 沿用 DSH 权限预设 |
| 长任务托管 | 可连续数天无人值守 | 更适合桌面即时协作 |

**(c) 支持情况**
| 能力 | 多 Agent 喊话 | 官方 Super Agent |
| --- | --- | --- |
| 独立对话创建 / 命名 | ✓ | △ 工单 |
| 跨对话喊话 / 运行中插话 | ✓ | ✗ |
| worker 回问队长 | ✓ | ✗ |
| 只读查看对话上下文 | ✓ | △ 日志 |
| 2 / 3 / 4 层团队 | ✓ | ✗ |
| GitHub issue → PR | ✗ | ✓ |
| 云端 / 离线运行 | ✗ | ✓ |
| 组织权限 / 审计 | ✗ | ✓ |
| 权限 / 模型 / 思考强度 | ✓ | △ |
| 自带 AI skill / 任务书 | ✓ | ✗ |

一句话：**它管仓库，我们管桌面。不是替代，是叠加。**

GitHub（MIT，欢迎 star / issue）：
https://github.com/cao123-2024/dsh-cross-session

安装（DSH 界面里最省事）：
1. 设置 → 插件
2. 添加插件
3. 包名或地址填：https://github.com/cao123-2024/dsh-cross-session
4. 安装 → 启用

也支持 `plugin_manager install_bundle` 或 `dsh plugin --profile desktop add "<仓库路径>"`。要求 DSH 0.2.1-rc.x 或 0.3.x。

#DeepSeek #DeepSeekHarness #AI #多Agent #开源 #3D #效率工具


