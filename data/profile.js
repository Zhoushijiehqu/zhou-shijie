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
  projectCategories: ['全部', '网站开发', '数据分析', 'AI工具'],

  // 项目作品（精选展示）
  projects: [
    {
      title: 'GitHub 开源作品集',
      category: '网站开发',
      role: '独立开发者',
      period: '持续更新中',
      cover: 'assets/images/project-github.svg',
      description: '在 GitHub 上维护多个开源项目，涵盖数据分析脚本、效率工具、前端练习与学术笔记。记录学习过程，沉淀最佳实践。',
      tags: ['开源', '前端', 'Python', '数据分析'],
      techStack: ['HTML', 'CSS', 'JavaScript', 'Python', 'Git'],
      github: 'https://github.com',
      demo: '#',
      featured: true
    },
    {
      title: '个人数字名片',
      category: '网站开发',
      role: '设计与开发',
      period: '2026',
      cover: 'assets/images/project-portfolio.svg',
      description: '从零设计并开发的个人作品集网站，采用原生 HTML/CSS/JS 实现，支持深色模式、粒子动画、单页滚动等特性。',
      tags: ['前端', '设计', '作品集'],
      techStack: ['HTML', 'CSS', 'JavaScript', 'Canvas'],
      github: '#',
      demo: '#',
      featured: true
    }
  ],

  // 社交账号
  socials: [
    { name: 'GitHub', icon: 'github', desc: '开源项目与代码', link: 'https://github.com', copyText: null },
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
