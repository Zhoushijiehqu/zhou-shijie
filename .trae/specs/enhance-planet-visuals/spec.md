# 星球小屋画面精化 Spec

## Why
planet.html 当前视觉实现偏"工程原型"质感：256px 低分辨率程序化纹理、纯 BoxGeometry 拼装的小屋、无面部无动画的方块角色、单一渐变天空、无氛围粒子。用户希望画面更精美。本 spec 在保持单文件 + CDN 依赖 + 移动端可用的约束下，分模块提升画面精致度。

## What Changes

### V1 材质与纹理升级（视觉基础）
- 将程序化纹理分辨率从 256px 提升到 512px，提升近距离清晰度
- 为墙面/屋顶/沥青纹理增加粗糙度变化（RoughnessMap 概念，用同一灰度图的通道区分），消除"塑料感"
- 小屋材质 roughness 从固定 0.82 改为按部位区分（墙身 0.85 / 玻璃 0.2 / 金顶 0.3 / 木门 0.6）
- 玻璃窗改为半透明 + 高 emissive，模拟"屋内亮灯"的暖光感
- 金顶/门把手 metalness 从 0 提到 0.6，增强金属质感

### V2 小屋造型差异化（打破"10 屋一面"）
- 为 10 个小屋增加 3 种屋顶变体（尖塔/圆顶/平顶露台），按 index 轮换
- 增加装饰构件：门廊雨檐、烟囱、窗台花箱、招牌旗，每个小屋随机 2-3 种
- 窗户增加十字窗棂分割线
- 门增加门牌号贴花（Canvas 纹理生成 1-10 数字）

### V3 角色精化与行走动画
- 角色增加面部特征：眼睛（2 个小黑球）、刘海（半球）
- 衣服增加细节：衣领、纽扣、腰带、鞋（深色方块替代裸脚）
- 行走动画：四肢摆动（基于移动速度的 sin 摆动，静止时归位）
- 奔跑时身体前倾约 15° + 摆动幅度加倍

### V4 天空与氛围升级
- 天空 Shader 增加星点层（天顶区域随机白点，黄昏过渡时淡入）
- 增加月亮球体（贴在天空穹顶内侧，柔和 emissive + Bloom 光晕）
- 增加萤火虫粒子系统（30-50 个发光点，围绕街道低空缓慢飘动，Bloom 增亮）
- 增加落叶粒子（10-15 片，从树附近飘落，旋转下落）

### V5 后处理与色调升级
- Bloom 阈值从 0.82 调到 0.75（更多元素参与泛光），强度 0.55→0.7
- 增加 SMAA 抗锯齿 Pass（移动端保持关闭）
- 启用 renderer.toneMapping = ACESFilmic（电影感色调），曝光 1.0
- 雾色从暖褐 0x7c564c 微调为偏紫 0x6b4a5c，与天空更协调

### V6 植被与地面细节
- 树冠从单层锥改为 3 层错落锥（已有 2 层，加第 3 层小顶冠）
- 草丛从单锥改为 3-5 簇小锥聚团
- 星球表面增加随机散布的小花点（InstancedMesh，彩色小四边形）
- 树/草增加风摆动（vertex shader 或每帧微旋转，移动端关闭）

## Impact
- Affected code: `planet.html`（单文件，所有改动在此）
- 性能影响：纹理分辨率翻倍 + 粒子 + SMAA 会增加 GPU 开销，需通过 CONFIG.render 档位控制（移动端保持现状或仅开 V1）
- 不影响：游戏逻辑、物理、进入/返回机制、移动端操控

## ADDED Requirements

### Requirement: 高分辨率程序化纹理
The system SHALL generate textures at 512px resolution with per-material roughness/metalness variation.
- **WHEN** 场景加载
- **THEN** 墙面/屋顶/沥青/草地/木纹/皮革纹理均为 512px，材质 PBR 参数按部位区分

### Requirement: 小屋造型差异化
The system SHALL render 10 huts with 3 roof variants and randomized decorations.
- **WHEN** 小屋工厂构建小屋
- **THEN** 每个小屋按 index % 3 选择屋顶变体，并随机装配 2-3 种装饰构件

### Requirement: 角色面部与行走动画
The system SHALL render the character with facial features and animate limbs during movement.
- **WHEN** 角色移动
- **THEN** 四肢按速度 sin 摆动；奔跑时身体前倾；静止时归位

### Requirement: 天空星点与月亮
The system SHALL render stars near zenith and a moon sphere on the sky dome.
- **WHEN** 天空 Shader 渲染
- **THEN** 天顶区域出现星点，月亮球体贴在穹顶内侧并参与 Bloom

### Requirement: 氛围粒子系统
The system SHALL render fireflies and falling leaves particles around the street.
- **WHEN** 主循环更新
- **THEN** 萤火虫围绕街道低空飘动并发光，落叶从树附近旋转下落

### Requirement: 后处理升级
The system SHALL apply ACESFilmic tone mapping, enhanced Bloom, and SMAA on desktop.
- **WHEN** 桌面端渲染
- **THEN** 启用 ACES 色调 + SMAA + 增强 Bloom；移动端保持现状

## MODIFIED Requirements

### Requirement: 植被渲染
树冠改为 3 层错落锥，草丛改为簇团，增加小花散布与风摆动（移动端关闭摆动）。
