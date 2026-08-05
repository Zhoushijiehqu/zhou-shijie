# 移植星球小屋（planet.html）到当前项目

## 摘要

将备份目录 `/Users/zhoushijie/Desktop/html游戏草稿/personal-cd-v7.0-final_副本` 中的「球形星球·游戏小屋街道」场景（planet.html）及其唯一的外部连接点（games.html 导航入口按钮）完整移植到当前工作目录 `/Users/zhoushijie/Downloads/personal-cd/personal-cd-v7.0-final`。

## 当前状态分析（Phase 1 探索结论）

对比两个目录后确认，备份目录相比原项目**仅有两处实质性改动**，其余所有文件（含 sw.js / manifest / data/profile.js / 全部 JS / 全部 CSS / 10 个小游戏 HTML / cottage.html / index.html / projects.html）**完全一致**：

| 改动类型 | 文件 | 说明 |
|---------|------|------|
| 新增 | `planet.html` | 星球小屋主体，单文件 Three.js r160 + Cannon.js 应用，约 1558 行，通过 iframe 嵌入 `games/` 下 10 个小游戏 |
| 修改 | `games.html` | 导航栏按钮组在 cottage.html 按钮前新增 1 个指向 planet.html 的入口按钮（`id="planetToggle"`，星球地球图标） |

备份目录另有 4 个新增文件（`start.command` / `CHANGELOG.md` / `.workbuddy/memory/*.md`），均为辅助文档/启动脚本/开发记录，**不属于网页项目功能代码**，默认不移植（见下方决策）。

## 移植方案

### 改动 1：复制 planet.html 到项目根目录（新增文件）

**源**：`/Users/zhoushijie/Desktop/html游戏草稿/personal-cd-v7.0-final_副本/planet.html`
**目标**：`/Users/zhoushijie/Downloads/personal-cd/personal-cd-v7.0-final/planet.html`

- 完整复制，不做任何内容修改。
- planet.html 是自包含单文件：Three.js / Cannon.js / 所有逻辑/样式均内嵌或走 CDN。
- 内部 `CONFIG.huts` 的游戏 url 用相对路径 `games/snake.html` 等，与原项目根目录下的 `games/` 目录结构完全匹配，无需调整路径。
- planet.html 通过父窗口注入"返回星球"按钮 + postMessage 实现进入/返回，**不需要**任何小游戏页面配合改动。

### 改动 2：games.html 导航栏新增入口按钮（修改文件）

**文件**：`/Users/zhoushijie/Downloads/personal-cd/personal-cd-v7.0-final/games.html`

**操作**：在第 705 行 `<div style="display:flex;gap:8px;align-items:center">` 之后、第 706 行 `<a href="cottage.html" ...>` 之前，插入以下 3 行：

```html
        <a href="planet.html" class="theme-toggle" id="planetToggle" aria-label="星球街道视图" title="进入球形星球街道">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18"></path><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"></path></svg>
        </a>
```

- 按钮复用现有 `theme-toggle` CSS 类，无需新增任何样式。
- 纯 `<a href>` 链接跳转，无 JS 处理，不依赖任何 JS 文件。
- 原 cottage.html 按钮和 themeToggle 按钮原样保留，仅位置下移 3 行。

### 不做的事项（决策记录）

| 项 | 决策 | 理由 |
|----|------|------|
| `start.command` | 不移植 | 是开发辅助脚本（启动 python http 服务器），非网页项目功能代码。如用户需要可在完成后单独说明。 |
| `CHANGELOG.md` | 不移植 | planet.html 的开发变更日志，非项目运行所需。 |
| `.workbuddy/memory/*.md` | 不移植 | IDE 工作记录，不属于项目代码。 |
| `sw.js` 加入 planet.html 缓存 | 不做 | planet.html 依赖 CDN 的 three.js/cannon.js（ES Module + importmap），即使缓存 planet.html 本身也无法离线运行，加入预缓存反而可能造成版本不一致。保持与备份目录一致（未加入）。 |
| `data/profile.js` 同步 CONFIG.huts | 不做 | 备份目录自身也未实现此同步（CHANGELOG 标注为延迟项 A-2）。planet.html 的 huts 配置内嵌自身，不依赖 profile.js。保持现状。 |
| 小游戏页面新增 postMessage 处理 | 不做 | planet.html 通过父窗口注入返回按钮实现返回，不需要小游戏配合。与备份目录实现一致。 |

## 假设与前提

1. planet.html 引用的 10 个小游戏（games/snake.html 等）在原项目中已存在且路径一致 —— **已验证**：原项目 `games/` 目录下 10 个 HTML 文件齐全。
2. planet.html 的 CDN 依赖（unpkg three@0.160.0、cdnjs cannon.js 0.6.2）可访问 —— 与备份目录运行条件相同。
3. planet.html 必须通过 `http://` 协议访问（不能用 `file://` 双击打开），因其使用 ES Module + importmap —— 移植后需提示用户用本地服务器打开。

## 验证步骤

1. **文件存在性**：确认 `planet.html` 已出现在项目根目录；确认 `games.html` 第 706-708 行为新增的 planetToggle 按钮。
2. **语法完整性**：用括号配平脚本检查 planet.html 的 `<script>` 块（与之前 sonic.html 验证相同方法）。
3. **入口连通性**：Grep 确认 `games.html` 中存在 `href="planet.html"`；Grep 确认 planet.html 中 `CONFIG.huts` 的 10 个 url 指向的 games 文件均存在于项目 `games/` 目录。
4. **运行验证（需用户手动）**：在项目根目录运行 `python3 -m http.server 8000`，浏览器访问 `http://localhost:8000/games.html`，点击导航栏星球图标 → 应进入星球街道场景；靠近小屋按 Enter → 应能进入对应小游戏；点"返回星球"应能返回。
