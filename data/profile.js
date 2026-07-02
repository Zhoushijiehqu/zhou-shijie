/**
 * 个人信息数据 - 集中管理
 * 修改此文件即可更新全站个人信息
 * 第四轮重构：品牌化升级，去模板化
 */
window.ProfileData = {
  // 基本信息
  basic: {
    name: '周世杰',
    nameEn: 'ZHOU SHIJIE',
    title: '数据分析 · AI应用 · 电商运营',
    tagline: '用数据理解世界，用技术解决问题',
    slogan: '喜欢把想法变成项目',
    email: 'a15759219744@163.com',
    phone: '15759219744',
    location: '福建 · 厦门',
    wechat: 'zsj15759219744',
    avatar: 'assets/images/avatar.svg'
  },

  // 数字成果展示
  stats: [
    { value: 3, suffix: '+', label: '开源项目', icon: 'code' },
    { value: 3, suffix: '', label: '竞赛获奖', icon: 'trophy' },
    { value: 15, suffix: '+', label: '技能标签', icon: 'lightbulb' },
    { value: 4, suffix: '年', label: '成长轨迹', icon: 'trending-up' }
  ],

  // 我的足迹（个人标签）
  footprints: [
    { icon: 'map-pin', label: '福建厦门', desc: '当前所在地' },
    { icon: 'graduation-cap', label: '华侨大学', desc: '电子商务本科' },
    { icon: 'bar-chart', label: '数据分析', desc: '数据驱动决策' },
    { icon: 'bot', label: 'AI应用', desc: '效率工具探索' },
    { icon: 'dumbbell', label: '羽毛球', desc: '运动爱好者' },
    { icon: 'book-open', label: '阅读', desc: '终身学习者' }
  ],

  // 最近在做什么
  currentStatus: [
    { icon: 'book-open', title: '产业经济学学习', desc: '为研究生阶段打基础', status: '进行中' },
    { icon: 'file-text', title: '文献综述写作', desc: '县域经济与产业链韧性', status: '进行中' },
    { icon: 'sparkles', title: 'AI工作流探索', desc: '提升学习与创作效率', status: '持续更新' },
    { icon: 'code', title: '前端项目实践', desc: '个人数字名片迭代', status: '进行中' }
  ],

  // 成长时间轴（精简版，只保留关键节点）
  timeline: [
    {
      year: '2026',
      title: '新的起点',
      subtitle: '本科毕业 · 即将读研',
      type: 'growth',
      description: '完成电子商务本科学业，即将进入武汉理工大学攻读应用经济学硕士。'
    },
    {
      year: '2025',
      title: '数学竞赛一等奖',
      subtitle: '第十七届全国大学生数学竞赛',
      type: 'award',
      description: '从二等奖到一等奖，见证持续学习的力量。'
    },
    {
      year: '2025',
      title: '电商运营实战',
      subtitle: '抖音商城多店铺项目',
      type: 'project',
      description: '参与电商公司实习，负责抖音商城多店铺从0到1搭建。'
    },
    {
      year: '2022',
      title: '进入华侨大学',
      subtitle: '电子商务专业',
      type: 'education',
      description: '开始系统学习电商运营、数据分析，探索兴趣方向。'
    }
  ],

  // 教育背景
  education: {
    school: '华侨大学',
    major: '电子商务',
    period: '2022.09 - 2026.07',
    gpa: '3.7 / 5.0',
    rank: '班级 5/37',
    courses: [
      '供应链与物流管理', '大数据分析', '跨境电子商务',
      '网络营销', '商务谈判', '电商运营管理',
      '统计学', '数据库原理'
    ]
  },

  // 技能专长（按类别分组）
  skills: {
    '数据能力': ['Excel高级应用', '数据透视表', '数据可视化', 'Python', 'Stata', 'R语言', '数据清洗', '计量建模'],
    '运营能力': ['店铺搭建', '商品上架', '品类规划', '供应链协同', '库存优化', 'GMV分析', '转化率优化'],
    '工具与其他': ['Office办公套件', 'AI效率工具', '英语六级', '计算机二级', '前端开发', 'Git']
  },

  // 项目分类
  projectCategories: ['全部', '网站开发', '数据分析', '学术资料'],

  // 项目作品全集 - 同步自 GitHub 真实仓库（用于 projects.html 全展示页）
  projects: [
    {
      title: '个人数字名片',
      category: '网站开发',
      role: '设计与开发',
      period: '2026.07',
      description: '从零设计并开发的个人作品集网站，采用原生 HTML/CSS/JS 实现，支持深色模式、粒子动画、单页滚动等编辑体美学特性。',
      tags: ['前端', '设计', '作品集'],
      techStack: ['HTML', 'CSS', 'JavaScript', 'Canvas'],
      github: 'https://github.com/Zhoushijiehqu/zhou-shijie',
      demo: 'https://zhoushijiehqu.github.io/zhou-shijie/',
      repo: { stars: 0, language: 'CSS', updated: '2026-07' },
      featured: true
    },
    {
      title: '平狄克《微观经济学》习题详解（第9版）',
      category: '学术资料',
      role: '学术写作',
      period: '2026.06',
      description: '平狄克《微观经济学》第9版课后习题完整详解，包含全部章节的数理推导、图表说明与案例分析。',
      tags: ['经济学', '习题', 'LaTeX'],
      techStack: ['LaTeX', 'TeX'],
      github: 'https://github.com/Zhoushijiehqu/Pindyck-Microeconomics-Solutions-9th',
      demo: '',
      repo: { stars: 2, language: 'TeX', updated: '2026-06' },
      featured: true
    },
    {
      title: '学术论文字体合并 · Times + 宋体',
      category: '学术资料',
      role: '字体工程',
      period: '2026.06',
      description: '将 Times New Roman 与 SimSun 合并为单一字体文件，用于学术论文排版时统一中英文字符的视觉风格与字距。',
      tags: ['字体', '学术', '工具'],
      techStack: ['FontForge', 'TTF'],
      github: 'https://github.com/Zhoushijiehqu/Academic-Font-TimesSimSun',
      demo: '',
      repo: { stars: 4, language: '—', updated: '2026-06' },
      featured: false
    },
    {
      title: '微观经济指标集成学习预测',
      category: '数据分析',
      role: '机器学习',
      period: '2026.02',
      description: '基于 Stacking 集成（XGBoost + LightGBM + 随机森林）的 publication-ready 机器学习管线，对微观经济连续指标进行预测建模与统计诊断。',
      tags: ['机器学习', 'Stacking', '预测建模'],
      techStack: ['Python', 'XGBoost', 'Optuna'],
      github: 'https://github.com/Zhoushijiehqu/Predictive-Modeling-of-Microeconomic-Indicators-via-Ensemble-Learning',
      demo: '',
      repo: { stars: 0, language: 'Python', updated: '2026-02' },
      featured: false
    },
    {
      title: '高管团队质量指数构建（PCA）',
      category: '数据分析',
      role: '统计建模',
      period: '2026.02',
      description: '严谨的 PCA 管线，从多维标准化人口与背景变量中提取不可观测的潜在构念（如高管团队质量 Qual），输出含 85% 累计方差阈值的 Scree 图与向量载荷图。',
      tags: ['PCA', '降维', '潜变量'],
      techStack: ['Python', 'scikit-learn', 'Matplotlib'],
      github: 'https://github.com/Zhoushijiehqu/Executive-Team-Quality-Qual-Index-Construction-via-PCA',
      demo: '',
      repo: { stars: 0, language: 'Python', updated: '2026-02' },
      featured: false
    },
    {
      title: '实体属性分布可视化（非线性缩放）',
      category: '数据分析',
      role: '学术可视化',
      period: '2026.02',
      description: '面向高度偏态横截面数据的学术可视化脚本，采用分段非线性缩放优雅压缩极端值，同时保留多数分布的线性可读性，输出论文级 SVG/PNG 图表。',
      tags: ['可视化', '非线性', '学术'],
      techStack: ['Python', 'Matplotlib', 'Pandas'],
      github: 'https://github.com/Zhoushijiehqu/Entity-Attribute-Distribution-Visualization-with-Non-linear-Scaling',
      demo: '',
      repo: { stars: 0, language: 'Python', updated: '2026-02' },
      featured: false
    },
    {
      title: '模拟成绩可视化查询',
      category: '网站开发',
      role: '前端开发',
      period: '2026.02',
      description: '轻量级前端项目，用于模拟高考成绩查询的可视化界面，包含数据图表与查询交互。',
      tags: ['前端', '可视化', '轻量'],
      techStack: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Zhoushijiehqu/Mock-Score-Visualization',
      demo: '',
      repo: { stars: 1, language: 'HTML', updated: '2026-02' },
      featured: false
    },
    {
      title: '应用经济学学习资料库',
      category: '学术资料',
      role: '资料归档',
      period: '2026.02',
      description: '个人应用经济学学习资料归档，包含课程笔记、文献整理与相关资源索引。',
      tags: ['经济学', '笔记', '归档'],
      techStack: ['Markdown'],
      github: 'https://github.com/Zhoushijiehqu/Applied-Economics-Study-Hub',
      demo: '',
      repo: { stars: 1, language: '—', updated: '2026-02' },
      featured: false
    }
  ],

  // 精选作品 - 首页只展示这两张仓库卡片 + 游戏入口
  featuredProjectTitles: ['个人数字名片', '平狄克《微观经济学》习题详解（第9版）'],

  // 游戏小屋入口（首页精选区第 3 张卡片）
  gamesHub: {
    title: '游戏小屋',
    category: '游戏',
    role: 'HTML 原生小游戏',
    period: '持续更新',
    description: '用原生 HTML/CSS/JS 编写的小游戏集合，轻量、即开即玩。在这里放松一下，也给自己的代码留一块游乐场。',
    tags: ['游戏', '原生', '即开即玩'],
    techStack: ['HTML', 'CSS', 'JavaScript'],
    link: 'games.html',
    featured: true
  },

  // 游戏列表（games.html 用）
  games: [
    {
      name: '贪吃蛇',
      slug: 'snake',
      desc: '经典贪吃蛇，方向键操控。每 10 秒出现金色奖励球，5 秒内吃到可加 5 分。',
      tags: ['经典', '键盘', 'Canvas'],
      techStack: ['HTML', 'Canvas', 'JS'],
      file: 'games/snake.html',
      accent: 'primary',
      available: true
    },
    {
      name: '扫雷',
      slug: 'mine',
      desc: '经典扫雷，含初级、中级、高级与自定义难度，首点安全保证可展开。',
      tags: ['经典', '策略', '鼠标'],
      techStack: ['HTML', 'CSS Grid', 'JS'],
      file: 'games/mine.html',
      accent: 'accent',
      available: true
    },
    {
      name: '解谜剧场',
      slug: 'puzzle',
      desc: '21 道汉字交互谜题，拖拽组合文字破解关卡，含看答案功能。',
      tags: ['解谜', '汉字', '拖拽'],
      techStack: ['HTML', 'Canvas', 'JS'],
      file: 'games/puzzle.html',
      accent: 'primary',
      available: true
    }
  ],

  // 社交账号
  socials: [
    { name: 'GitHub', icon: 'github', desc: '开源项目与代码', link: 'https://github.com/Zhoushijiehqu', copyText: null },
    { name: '邮箱', icon: 'mail', desc: 'a15759219744@163.com', link: 'mailto:a15759219744@163.com', copyText: 'a15759219744@163.com' },
    { name: '小红书', icon: 'bookmark', desc: '学习笔记与生活', link: '#', copyText: null },
    { name: '微信', icon: 'message-circle', desc: 'zsj15759219744', link: '#', copyText: 'zsj15759219744' }
  ],

  // 生活兴趣
  hobbies: [
    { icon: 'dumbbell', name: '羽毛球', desc: '热爱运动，享受竞技与协作的乐趣' },
    { icon: 'book-open', name: '阅读', desc: '经济学、心理学与商业类书籍' },
    { icon: 'music', name: '音乐', desc: '流行音乐爱好者，偶尔创作' },
    { icon: 'gamepad-2', name: '游戏', desc: 'Switch 策略游戏玩家' }
  ],

  // 导航菜单（单页锚点，按页面顺序）
  nav: [
    { label: '首页', href: 'home' },
    { label: '作品', href: 'projects' },
    { label: '关于', href: 'about' },
    { label: '成长', href: 'timeline' },
    { label: '联系', href: 'contact' }
  ]
};
