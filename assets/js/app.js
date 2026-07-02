/**
 * app.js - 应用入口（单页滚动版）
 * 负责初始化所有组件和交互
 * 第四轮重构：品牌化升级，新增模块初始化
 */
const App = {
  /**
   * 初始化应用
   */
  init() {
    // 等待 DOM 加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onReady());
    } else {
      this.onReady();
    }
  },

  /**
   * DOM 准备就绪后的初始化
   */
  onReady() {
    // 检查数据是否加载
    if (!window.ProfileData) {
      console.error('ProfileData 未加载');
      return;
    }

    // 先应用主题（避免闪烁）- 默认深色主题
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 'dark'; // 默认深色主题
    document.documentElement.setAttribute('data-theme', initialTheme);

    // 渲染全局组件
    Components.renderNavbar();
    Components.renderFooter();
    Components.renderBackToTop();
    Components.renderCommandPalette();

    // 初始化主题切换（按钮渲染后再绑定事件）
    Components.initThemeToggle();

    // 初始化滚动进度条
    Components.initScrollProgress();

    // 初始化页面内容
    this.initPageContent();

    // 初始化交互
    Interactions.initAll();

    // 初始化联系方式卡片
    Components.initContactCards();
    Components.initSocialCards();

    // 初始化项目分类筛选
    Components.initProjectFilter();

    // 初始化粒子背景
    this.initParticles();

    // 初始化数字计数动画
    this.initStatsCounter();

    // 初始化鼠标跟随光效
    this.initMouseGlow();

    console.log('✨ 个人数字名片已加载完成');
  },

  /**
   * 初始化页面内容（单页）
   */
  initPageContent() {
    const data = window.ProfileData;

    // 填充 Hero 区域
    this.initHeroSection(data);

    // 填充数字成果展示
    this.initStatsSection(data);

    // 填充精选项目模块
    this.initProjectsSection(data);

    // 填充关于我模块
    this.initAboutSection(data);

    // 填充成长经历模块
    this.initTimelineSection(data);

    // 填充技能展示模块
    this.initSkillsSection(data);

    // 填充联系方式模块
    this.initContactSection(data);

    // 重新初始化滚动动画（因为动态添加了元素）
    setTimeout(() => {
      Interactions.initScrollReveal();
    }, 50);
  },

  /**
   * 初始化 Hero 区域
   */
  initHeroSection(data) {
    const heroName = document.getElementById('heroName');
    const heroTitle = document.getElementById('heroTitle');
    const heroTagline = document.getElementById('heroTagline');
    const heroSlogan = document.getElementById('heroSlogan');
    const heroAvatar = document.getElementById('heroAvatar');

    if (heroName) heroName.textContent = data.basic.name;
    if (heroTitle) heroTitle.textContent = data.basic.title;
    if (heroTagline) heroTagline.textContent = data.basic.tagline;
    if (heroSlogan && data.basic.slogan) heroSlogan.textContent = `「 ${data.basic.slogan} 」`;
    if (heroAvatar) heroAvatar.src = data.basic.avatar;
  },

  /**
   * 初始化数字成果展示
   */
  initStatsSection(data) {
    const statsContainer = document.getElementById('statsContainer');
    if (statsContainer && data.stats) {
      statsContainer.innerHTML = Components.renderStats(data.stats);
    }
  },

  /**
   * 初始化关于我模块
   */
  initAboutSection(data) {
    // 我的足迹
    const footprintsContainer = document.getElementById('footprintsContainer');
    if (footprintsContainer && data.footprints) {
      footprintsContainer.innerHTML = Components.renderFootprints(data.footprints);
    }

    // 最近在做什么
    const currentStatusContainer = document.getElementById('currentStatusContainer');
    if (currentStatusContainer && data.currentStatus) {
      currentStatusContainer.innerHTML = Components.renderCurrentStatus(data.currentStatus);
    }

    // 生活兴趣
    const hobbiesContainer = document.getElementById('hobbiesContainer');
    if (hobbiesContainer && data.hobbies) {
      hobbiesContainer.innerHTML = data.hobbies.map(hobby =>
        Components.renderHobbyCard(hobby)
      ).join('');
    }
  },

  /**
   * 初始化项目作品模块（首页精选区）
   * V7：只展示精选仓库卡片 + 游戏入口 + 查看更多按钮
   */
  initProjectsSection(data) {
    // 精选区不需要分类筛选，隐藏容器
    const categoriesContainer = document.getElementById('projectCategoriesContainer');
    if (categoriesContainer) {
      categoriesContainer.style.display = 'none';
    }

    // 项目卡片：仅渲染精选仓库 + 游戏入口
    const projectsContainer = document.getElementById('projectsContainer');
    if (projectsContainer && data.projects) {
      const featuredTitles = data.featuredProjectTitles || [];
      const featuredProjects = data.projects.filter(p => featuredTitles.includes(p.title));

      // 精选仓库卡片 + 游戏入口卡片
      let html = featuredProjects.map(project =>
        Components.renderProjectCard(project)
      ).join('');

      // 游戏入口卡片
      if (data.gamesHub) {
        html += Components.renderGamesHubCard(data.gamesHub);
      }

      // 查看更多按钮
      html += `
        <div class="view-more-wrapper reveal delay-300">
          <a href="projects.html" class="btn-view-more">
            <span class="view-more-text">查看全部作品</span>
            <span class="view-more-arrow">→</span>
          </a>
        </div>
      `;

      projectsContainer.innerHTML = html;
    }

    // 精选区不需要筛选交互，跳过 initProjectFilter
  },

  /**
   * 初始化成长经历模块
   */
  initTimelineSection(data) {
    const timelineContainer = document.getElementById('timelineContainer');
    if (timelineContainer && data.timeline) {
      timelineContainer.innerHTML = Components.renderTimeline(data.timeline);
    }
  },

  /**
   * 初始化技能展示模块
   */
  initSkillsSection(data) {
    const skillsContainer = document.getElementById('skillsContainer');
    if (skillsContainer && data.skills) {
      skillsContainer.innerHTML = Components.renderSkillsCloud(data.skills, true);
    }
  },

  /**
   * 初始化联系方式模块
   */
  initContactSection(data) {
    // 社交卡片
    const socialsContainer = document.getElementById('socialsContainer');
    if (socialsContainer && data.socials) {
      socialsContainer.innerHTML = data.socials.map(social =>
        Components.renderSocialCard(social)
      ).join('');
    }

    // 联系方式卡片
    const contactCardsContainer = document.getElementById('contactCardsContainer');
    if (contactCardsContainer) {
      contactCardsContainer.innerHTML = `
        <div class="grid-2">
          ${Components.renderContactCard('mail', '电子邮箱', data.basic.email, data.basic.email)}
          ${Components.renderContactCard('map-pin', '所在地区', data.basic.location, data.basic.location)}
        </div>
      `;
    }
  },

  /**
   * 初始化粒子背景
   */
  initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (canvas && window.Particles) {
      window.Particles.init('particlesCanvas');

      // 根据当前主题决定是否显示粒子
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        window.Particles.show();
      } else {
        window.Particles.hide();
      }
    }
  },

  /**
   * 初始化数字计数动画
   */
  initStatsCounter() {
    const statValues = document.querySelectorAll('.stat-value[data-target]');
    if (!statValues.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statValues.forEach(el => observer.observe(el));
  },

  /**
   * 数字计数动画（适配 value + suffix 格式，带轻微 Bounce 效果）
   */
  animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const suffix = element.dataset.suffix || '';

    if (isNaN(target)) {
      element.textContent = element.dataset.target + suffix;
      return;
    }

    const duration = 1800;
    const startTime = performance.now();

    // easeOutBack 缓动函数，实现轻微 Bounce 效果
    function easeOutBack(x) {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 使用 easeOutBack 实现轻微 Bounce
      const eased = easeOutBack(progress);
      const current = target * Math.min(eased, 1.08); // 限制最大过冲

      if (Number.isInteger(target)) {
        element.textContent = Math.floor(current) + suffix;
      } else {
        element.textContent = current.toFixed(1) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  },

  /**
   * 初始化鼠标跟随光效（深色模式）
   */
  initMouseGlow() {
    const glow = document.getElementById('mouseGlow');
    if (!glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      // 平滑跟随
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;

      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';

      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }
};

// 启动应用
App.init();
