# 团队层级与任务书

这份文档是给 AI 和安装者看的**建议**，不是运行时硬限制。插件只强制角色标题、消息投递和调用者权限；层级怎么搭由 AI 根据任务决定。

## 角色

| 角色 | 标题前缀 | 侧边栏图标 | 职责 |
| --- | --- | --- | --- |
| leader | `队长｜` | 金色皇冠 | 接用户需求、拆分、派活、汇总 |
| director | `总监｜` | 紫色三层 | 仅在四层模式；管多个经理 |
| manager | `经理｜` | 青色菱形 | 管 3+ worker，向 leader/director 汇报 |
| worker | `worker｜` | 绿色齿轮 | 执行具体任务，问题回问上级 |

`new_conversation` 创建时带 `role` 与可选 `reports_to`；已有对话用 `assign_agent_role` 改角色。`rename_conversation` 会保留角色前缀。

## 模式

### 2 层：队长 + worker

适合 1–4 个并行 worker，或任务边界清楚、不需要中间协调。

```
队长
├─ worker A
├─ worker B
├─ worker C
└─ worker D
```

### 3 层：队长 + 经理 + worker

适合 5 个以上 worker、跨 2–4 个域（前端、后端、测试、部署），需要经理收口。

```
队长
├─ 经理 A ── worker A1 / A2 / A3
└─ 经理 B ── worker B1 / B2 / B3
```

**约束建议**：每个经理至少带 3 个 worker。如果只能开 2 个经理、worker 又不够分，就不要开 3 层，回到 2 层。

### 4 层：队长 + 总监 + 经理 + worker

只在 `allowFourTier: true` 且任务足够大（多项目、多经理、跨天）时使用。

```
队长
└─ 总监
   ├─ 经理 A ── worker A1 / A2 / A3
   └─ 经理 B ── worker B1 / B2 / B3
```

开关位置：`cordis.patch.yml` 的 `config.allowFourTier: true`（或在 Plugins 里改同名配置）后重载插件。

## 任务书（建议）

AI 可以按下面的默认值起步：

1. 先判断工作流数量。**1–4 条**：2 层，队长直管 worker。
2. **5–9 条**且能自然分成 2–3 组：3 层，1–2 个经理，每组 ≥3 worker。
3. **10 条以上**或跨多个子项目：3 层，3–4 个经理；只有 `allowFourTier` 打开时才考虑加总监。
4. 经理数不足 3 个、或每组 worker 不足 3 个：不要为了“看起来像大团队”硬加层级，回到更扁的模式。
5. 每个 worker 的任务必须写完整：背景、目标、范围、验收标准、汇报对象。
6. leader 用 `get_chat_info` 只读查看进度；用 `shout` 插话；用 `ask_master` 收 worker 的问题。

**任务书只是建议**：你也可以自行决定，不按这个任务书来进行。难度、经理数量、层级深度由 AI 结合上下文判断；用户明确要求优先。

## 为什么限制“2 个经理不能开 3 层”

3 层的价值是“经理替队长收口”。如果只有 2 个经理、每个经理又带不满 3 个 worker，中间层只会增加消息跳数和等待，不如队长直管。插件不阻止你这么做，但任务书建议不要。

## 团队生命周期

- 新建：`new_conversation(role, reports_to, title, task)`。
- 改角色：`assign_agent_role(target, role, title?)`。
- 看层级：`get_agent_team()` 返回 `flat | three-tier | four-tier`、`allow_four_tier`、每个 agent 的角色。
- 收尾：worker 用 `ask_master` 汇报；leader 汇总后 `archive_conversation` 归档已完成 worker。
- 中断：`interrupt_conversation` 只停当前 turn，保留队列。
