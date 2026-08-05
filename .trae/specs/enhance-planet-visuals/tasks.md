# Tasks

- [x] Task 1: V1 材质与纹理升级 — 纹理 256→512px + PBR 参数按部位区分
- [x] Task 2: V2 小屋造型差异化 — 3 种屋顶变体 + 随机装饰
- [x] Task 3: V3 角色精化与行走动画
- [x] Task 4: V4 天空与氛围升级
- [x] Task 5: V5 后处理与色调升级
- [x] Task 6: V6 植被与地面细节
- [x] Task 7: 语法验证 + 移动端档位确认

# 第二优先级（全部完成）
- [x] B2: 路灯灯罩自发光 emissive
- [x] B3: 窗户灯光呼吸动画
- [x] C2: 小屋地基碎石围边
- [x] D3: Vignette 暗角

# 第三优先级（全部完成）
- [x] B1: SSAO 环境光遮蔽（桌面端）— SSAOPass，kernelRadius=8，try/catch 兜底
- [x] C1: 星球水面/池塘 — 2 个 CircleGeometry 池塘，metalness=0.9 roughness=0.08 + 边缘石 RingGeometry
- [x] D1: 景深 DoF（桌面端）— BokehPass，focus 每帧跟随相机-角色距离，aperture=0.0025

# Bug 修复（审阅发现）
- [x] BUG-A: 落叶下落方向 — 原世界-y速度在球面下方会远离球心，改为径向（指向球心）
- [x] BUG-B: 小花 instanceColor 不生效 — material 缺 vertexColors:true
- [x] BUG-C: 植被风摆动 rotation — 会让球面实例绕世界原点摆动偏离地面，改为 scale 起伏

# Task Dependencies
- Task 2 依赖 Task 1
- Task 5 依赖 Task 4
- Task 6 无依赖
- Task 7 依赖所有前置 Task
- 第三优先级 B1/D1 依赖 Task 5（buildComposer 已建立）
