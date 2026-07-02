/**
 * components.js - 组件渲染（导航栏、页脚等复用组件）
 * 支持深色/浅色双主题，单页滚动导航
 * 第四轮重构：品牌化升级，图标系统统一，新增组件
 */
const Components = {
  // Lucide 风格 SVG 图标库
  icons: {
    code: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    trophy: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>',
    lightbulb: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>',
    'trending-up': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>',
    'map-pin': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    'graduation-cap': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>',
    'bar-chart': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"></line><line x1="18" x2="18" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="16"></line></svg>',
    bot: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>',
    dumbbell: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"></path><path d="m21 21-1-1"></path><path d="m3 3 1 1"></path><path d="m18 22 4-4"></path><path d="m2 6 4-4"></path><path d="m3 10 7-7"></path><path d="m14 21 7-7"></path></svg>',
    'book-open': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
    'file-text': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>',
    sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>',
    github: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>',
    mail: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    bookmark: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>',
    'message-circle': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>',
    music: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>',
    'gamepad-2': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="11" y2="11"></line><line x1="8" x2="8" y1="9" y2="13"></line><line x1="15" x2="15.01" y1="12" y2="12"></line><line x1="18" x2="18.01" y1="10" y2="10"></line><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"></path></svg>',
    sun: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>',
    moon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>',
    'arrow-up': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg>',
    'external-link': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>',
    user: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    target: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
    search: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>',
    home: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
    folder: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>',
    'user-circle': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    'zap': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',
    'copy': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>',
    'arrow-right': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>'
  },

  /**
   * 获取图标 SVG
   */
  getIcon(name, className = '') {
    const icon = this.icons[name] || this.icons['code'];
    return `<span class="icon ${className}">${icon}</span>`;
  },

  /**
   * 渲染导航栏（单页锚点导航）
   * V6 优化：品牌标识改为 ZSJ. → ZHOU SHIJIE 展开效果
   */
  renderNavbar() {
    const data = window.ProfileData;
    
    const navHtml = `
      <nav class="navbar nav-shrink" id="navbar">
        <div class="container">
          <a href="#home" class="navbar-brand" data-nav="home">
            <span class="logo-dot breathing-dot"></span>
            <span class="brand-text">
              <span class="brand-short">ZSJ.</span>
              <span class="brand-full">ZHOU SHIJIE</span>
            </span>
          </a>
          
          <div class="navbar-right">
            <div class="navbar-menu" id="navbarMenu">
              ${data.nav.map(item => `
                <a href="#${item.href}" class="navbar-link" data-nav="${item.href}">
                  ${item.label}
                </a>
              `).join('')}
            </div>
            
            <button class="theme-toggle" id="themeToggle" aria-label="切换主题" title="切换深色/浅色模式">
              <span id="themeIcon">${this.getIcon('moon')}</span>
            </button>
            
            <button class="navbar-toggle" id="navbarToggle" aria-label="菜单">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
      
      <!-- 滚动进度条 -->
      <div class="scroll-progress" id="scrollProgress">
        <div class="scroll-progress-bar" id="scrollProgressBar"></div>
      </div>
    `;
    
    // 插入到 body 开头
    document.body.insertAdjacentHTML('afterbegin', navHtml);
    
    // 初始化导航交互
    this.initNavbarInteractions();
    this.initScrollProgress();
  },

  /**
   * 初始化滚动进度条
   */
  initScrollProgress() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    const updateProgress = Utils.throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, 16);

    window.addEventListener('scroll', updateProgress);
    updateProgress();
  },

  /**
   * 初始化导航栏交互
   */
  initNavbarInteractions() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navbarToggle');
    const menu = document.getElementById('navbarMenu');
    
    // 滚动效果
    const handleScroll = Utils.throttle(() => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // 更新导航高亮
      this.updateNavHighlight();
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查
    
    // 桌面端导航链接点击事件（修复：之前只绑定了移动端菜单内的链接）
    const allNavLinks = document.querySelectorAll('.navbar-link');
    allNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
        
        // 如果是移动端，关闭菜单
        if (toggle && menu) {
          toggle.classList.remove('open');
          menu.classList.remove('open');
        }
      });
    });
    
    // 移动端菜单切换
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        menu.classList.toggle('open');
      });
    }
    
    // 品牌 logo 点击回到顶部
    const brand = document.querySelector('.navbar-brand');
    if (brand) {
      brand.addEventListener('click', (e) => {
        e.preventDefault();
        this.scrollToSection('home');
      });
    }
  },

  /**
   * 平滑滚动到指定区域
   */
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) {
      console.warn('Section not found:', sectionId);
      return;
    }
    
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
    const targetTop = section.offsetTop - navHeight + 1;
    
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  },

  /**
   * 更新导航高亮状态
   */
  updateNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-link');
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // 处理顶部特殊情况
    if (window.scrollY < 100) {
      currentSection = 'home';
    }
    
    navLinks.forEach(link => {
      const navSection = link.getAttribute('data-nav');
      if (navSection === currentSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  /**
   * 渲染页脚
   */
  renderFooter() {
    const data = window.ProfileData;
    const year = new Date().getFullYear();
    
    const footerHtml = `
      <footer class="footer">
        <div class="container">
          <div class="footer-info">
            © ${year} ${data.basic.name}. 用心制作，持续成长。
          </div>
          <div class="footer-socials">
            ${data.socials.slice(0, 3).map(social => `
              <a href="${social.link}" class="footer-social-link" title="${social.name}" target="_blank" rel="noopener noreferrer">
                ${this.getIcon(social.icon)}
              </a>
            `).join('')}
          </div>
        </div>
      </footer>
    `;
    
    // 插入到 main 结束后
    const main = document.querySelector('.main');
    if (main) {
      main.insertAdjacentHTML('afterend', footerHtml);
    } else {
      document.body.insertAdjacentHTML('beforeend', footerHtml);
    }
  },

  /**
   * 渲染回到顶部按钮
   */
  renderBackToTop() {
    const btnHtml = `
      <button class="back-to-top" id="backToTop" aria-label="回到顶部">
        ${this.getIcon('arrow-up')}
      </button>
    `;
    
    document.body.insertAdjacentHTML('beforeend', btnHtml);
    
    // 初始化交互
    const btn = document.getElementById('backToTop');
    
    const handleScroll = Utils.throttle(() => {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  },

  /**
   * 渲染数字成果展示
   */
  renderStats(stats) {
    return `
      <div class="stats-grid">
        ${stats.map((stat, index) => `
          <div class="stat-card card reveal delay-${(index % 4) + 1}00">
            <div class="stat-icon">${this.getIcon(stat.icon)}</div>
            <div class="stat-value" data-target="${stat.value}" data-suffix="${stat.suffix || ''}">0${stat.suffix || ''}</div>
            <div class="stat-label">${stat.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  /**
   * V6: 渲染我的足迹 - 主信息卡 + 两张辅助卡布局
   */
  renderFootprints(footprints) {
    // 提取核心信息
    const location = footprints.find(f => f.icon === 'map-pin') || { label: '福建厦门', desc: '当前所在地' };
    const education = footprints.find(f => f.icon === 'graduation-cap') || { label: '华侨大学', desc: '电子商务本科' };
    
    // 兴趣方向（排除位置和教育）
    const interests = footprints.filter(f => f.icon !== 'map-pin' && f.icon !== 'graduation-cap');
    
    return `
      <div class="footprints-layout">
        <!-- 主信息卡 -->
        <div class="footprint-main-card card reveal">
          <div class="footprint-main-header">
            <div class="footprint-main-icon">
              ${this.getIcon('user')}
            </div>
            <div class="footprint-main-title">关于我</div>
          </div>
          <div class="footprint-main-content">
            <div class="footprint-main-item">
              <div class="footprint-main-item-icon">${this.getIcon('map-pin')}</div>
              <div class="footprint-main-item-text">
                <div class="footprint-main-item-label">${location.label}</div>
                <div class="footprint-main-item-desc">${location.desc}</div>
              </div>
            </div>
            <div class="footprint-main-item">
              <div class="footprint-main-item-icon">${this.getIcon('graduation-cap')}</div>
              <div class="footprint-main-item-text">
                <div class="footprint-main-item-label">${education.label}</div>
                <div class="footprint-main-item-desc">${education.desc}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 辅助卡：兴趣方向 -->
        <div class="footprint-side-cards">
          <div class="footprint-side-card card reveal delay-100">
            <div class="footprint-side-header">
              ${this.getIcon('sparkles')}
              <span>兴趣方向</span>
            </div>
            <div class="footprint-side-tags">
              ${interests.map(item => `
                <span class="footprint-tag">
                  ${this.getIcon(item.icon, 'icon-sm')}
                  ${item.label}
                </span>
              `).join('')}
            </div>
          </div>
          
          <div class="footprint-side-card card reveal delay-200">
            <div class="footprint-side-header">
              ${this.getIcon('target')}
              <span>个人信条</span>
            </div>
            <div class="footprint-quote">
              用数据理解世界，<br>用技术解决问题。
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * V6: 渲染最近在做什么 - 状态流时间线样式
   */
  renderCurrentStatus(statuses) {
    return `
      <div class="status-timeline card reveal">
        <div class="status-timeline-header">
          ${this.getIcon('sparkles')}
          <span>最近在做什么</span>
        </div>
        <div class="status-timeline-content">
          ${statuses.map((item, index) => `
            <div class="status-timeline-item ${index === statuses.length - 1 ? 'last' : ''}">
              <div class="status-timeline-dot">
                <span class="status-dot-inner ${item.status === '进行中' ? 'active' : ''}"></span>
              </div>
              <div class="status-timeline-info">
                <div class="status-timeline-top">
                  <h4 class="status-timeline-title">${item.title}</h4>
                  <span class="status-timeline-badge ${item.status === '进行中' ? 'badge-active' : ''}">${item.status}</span>
                </div>
                <p class="status-timeline-desc">${item.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  /**
   * 渲染技能标签云（按类别分组）
   */
  renderSkillsCloud(skills, stagger = true) {
    return `
      <div class="skills-section">
        ${Object.entries(skills).map(([category, tags]) => `
          <div class="skills-category card reveal">
            <h4 class="skills-category-title">${category}</h4>
            <div class="tags-cloud ${stagger ? 'skills-tag-stagger' : ''}">
              ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  /**
   * 渲染成长时间轴
   */
  renderTimeline(items) {
    return `
      <div class="timeline">
        ${items.map((item, index) => `
          <div class="timeline-item reveal delay-${(index % 4) + 1}00">
            ${item.type ? `<span class="timeline-type ${item.type}">${this.getTypeLabel(item.type)}</span>` : ''}
            <div class="timeline-header">
              <div>
                <div class="timeline-year">${item.year || ''}</div>
                <h3 class="timeline-title">${item.title}</h3>
                ${item.subtitle ? `<p class="timeline-subtitle">${item.subtitle}</p>` : ''}
              </div>
            </div>
            ${item.description ? `<p class="timeline-description">${item.description}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  },

  /**
   * 获取时间线类型标签
   */
  getTypeLabel(type) {
    const labels = {
      education: '教育',
      award: '获奖',
      internship: '实习',
      project: '项目',
      growth: '成长'
    };
    return labels[type] || type;
  },

  /**
   * 渲染项目分类筛选
   */
  renderProjectCategories(categories) {
    return `
      <div class="project-categories">
        ${categories.map((cat, index) => `
          <button class="project-cat-btn ${index === 0 ? 'active' : ''}" data-category="${cat}">
            ${cat}
          </button>
        `).join('')}
      </div>
    `;
  },

  /**
   * 渲染项目卡片（重构版 - GitHub + Demo 入口）
   * V7 编辑体：占位封面改用首字母字标 + Plum 渐变，新增仓库元数据
   */
  renderProjectCard(project) {
    // 取标题首字符（中英文兼容）作为占位封面字标
    const initial = (project.title || '').trim().charAt(0) || '·';

    return `
      <div class="card project-card ${project.featured ? 'card-featured' : ''} reveal" data-category="${project.category || '全部'}">
        <div class="project-card-cover">
          ${project.cover ? `
            <img src="${project.cover}" alt="${project.title}" loading="lazy">
          ` : `
            <div class="project-cover-mark" aria-hidden="true">
              <span class="project-cover-initial">${initial}</span>
              <span class="project-cover-label">${project.category || 'WORK'}</span>
            </div>
          `}
        </div>

        <div class="project-card-body">
          <div class="project-card-header">
            <h3 class="project-card-title">${project.title}</h3>
            <div class="project-card-meta">
              <span>${project.role}</span>
              <span class="meta-divider">·</span>
              <span>${project.period}</span>
            </div>
          </div>

          <p class="project-card-desc">${project.description}</p>

          ${project.techStack && project.techStack.length > 0 ? `
            <div class="project-tech-stack">
              ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
          ` : ''}

          <div class="project-card-footer">
            <div class="project-tags">
              ${project.tags.slice(0, 3).map(tag => `<span class="tag tag-primary">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
              ${project.github && project.github !== '#' ? `
                <a href="${project.github}" class="project-link-btn" target="_blank" rel="noopener noreferrer" title="GitHub">
                  ${this.getIcon('github', 'icon-sm')}
                </a>
              ` : ''}
              ${project.demo && project.demo !== '#' ? `
                <a href="${project.demo}" class="project-link-btn" target="_blank" rel="noopener noreferrer" title="Demo">
                  ${this.getIcon('external-link', 'icon-sm')}
                </a>
              ` : ''}
            </div>
          </div>

          ${project.repo ? `
            <div class="project-repo-meta">
              <span class="repo-meta-item">
                ${this.getIcon('zap', 'icon-xs')}
                <span class="repo-meta-value">${project.repo.stars}</span>
                <span class="repo-meta-label">stars</span>
              </span>
              <span class="repo-meta-divider"></span>
              <span class="repo-meta-item">
                <span class="repo-lang-dot"></span>
                <span class="repo-meta-value">${project.repo.language}</span>
              </span>
              <span class="repo-meta-divider"></span>
              <span class="repo-meta-item repo-meta-updated">
                <span class="repo-meta-label">updated</span>
                <span class="repo-meta-value">${project.repo.updated}</span>
              </span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  /**
   * 渲染游戏入口卡片（首页精选区第 3 张）
   * 整张卡可点击跳转 games.html
   */
  renderGamesHubCard(hub) {
    const initial = (hub.title || '').trim().charAt(0) || '◈';

    return `
      <a href="${hub.link || 'games.html'}" class="card project-card card-featured game-hub-card reveal" data-category="游戏">
        <div class="project-card-cover">
          <div class="project-cover-mark game-cover-mark" aria-hidden="true">
            <span class="game-cover-icon">${this.getIcon('gamepad-2', 'icon-lg')}</span>
            <span class="project-cover-initial">${initial}</span>
            <span class="project-cover-label">${hub.category || 'GAME'}</span>
          </div>
        </div>

        <div class="project-card-body">
          <div class="project-card-header">
            <h3 class="project-card-title">${hub.title}</h3>
            <div class="project-card-meta">
              <span>${hub.role}</span>
              <span class="meta-divider">·</span>
              <span>${hub.period}</span>
            </div>
          </div>

          <p class="project-card-desc">${hub.description}</p>

          ${hub.techStack && hub.techStack.length > 0 ? `
            <div class="project-tech-stack">
              ${hub.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
          ` : ''}

          <div class="project-card-footer">
            <div class="project-tags">
              ${hub.tags.slice(0, 3).map(tag => `<span class="tag tag-primary">${tag}</span>`).join('')}
            </div>
            <div class="game-hub-enter">
              <span>进入小屋</span>
              <span class="enter-arrow">→</span>
            </div>
          </div>
        </div>
      </a>
    `;
  },

  /**
   * 初始化项目分类筛选
   */
  initProjectFilter() {
    const buttons = document.querySelectorAll('.project-cat-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // 更新按钮状态
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;

        // 筛选卡片
        cards.forEach(card => {
          if (category === '全部' || card.dataset.category === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  },

  /**
   * 渲染联系方式卡片
   */
  renderContactCard(icon, label, value, copyText) {
    return `
      <div class="contact-card" data-copy="${copyText}">
        <div class="contact-card-icon">${this.getIcon(icon)}</div>
        <div class="contact-card-info">
          <div class="contact-card-label">${label}</div>
          <div class="contact-card-value">${value}</div>
        </div>
        <div class="contact-card-action">点击复制</div>
      </div>
    `;
  },

  /**
   * 初始化联系方式卡片的复制功能
   */
  initContactCards() {
    const cards = document.querySelectorAll('.contact-card[data-copy]');
    
    cards.forEach(card => {
      card.addEventListener('click', async () => {
        const text = card.dataset.copy;
        const success = await Utils.copyToClipboard(text);
        
        if (success) {
          Utils.showToast('已复制到剪贴板 ✓');
        } else {
          Utils.showToast('复制失败，请手动复制');
        }
      });
    });
  },

  /**
   * 渲染社交卡片
   */
  renderSocialCard(social) {
    const isCopyable = social.copyText !== undefined && social.copyText !== null;
    const showStatus = social.showStatus !== undefined ? social.showStatus : false;
    
    const statusDot = showStatus ? `<span class="social-status-dot breathing-dot" title="在线"></span>` : '';
    
    if (isCopyable) {
      return `
        <div class="social-card" data-copy="${social.copyText}" data-action="copy">
          <div class="social-card-icon">${this.getIcon(social.icon)}</div>
          <div class="social-card-info">
            <div class="social-card-name">${social.name} ${statusDot}</div>
            <div class="social-card-desc">${social.desc}</div>
          </div>
          <div class="social-card-action">点击复制</div>
        </div>
      `;
    } else {
      return `
        <a href="${social.link}" class="social-card" target="_blank" rel="noopener noreferrer">
          <div class="social-card-icon">${this.getIcon(social.icon)}</div>
          <div class="social-card-info">
            <div class="social-card-name">${social.name} ${statusDot}</div>
            <div class="social-card-desc">${social.desc}</div>
          </div>
          <div class="social-card-action">前往查看 →</div>
        </a>
      `;
    }
  },

  /**
   * 初始化社交卡片（复制功能）
   */
  initSocialCards() {
    const cards = document.querySelectorAll('.social-card[data-action="copy"]');
    
    cards.forEach(card => {
      card.addEventListener('click', async () => {
        const text = card.dataset.copy;
        const success = await Utils.copyToClipboard(text);
        
        if (success) {
          Utils.showToast('已复制到剪贴板 ✓');
        } else {
          Utils.showToast('复制失败，请手动复制');
        }
      });
    });
  },

  /**
   * 渲染兴趣爱好卡片
   */
  renderHobbyCard(hobby) {
    return `
      <div class="card hobby-card reveal">
        ${this.getIcon(hobby.icon, 'icon-lg')}
        <h4>${hobby.name}</h4>
        <p>${hobby.desc}</p>
      </div>
    `;
  },

  /**
   * 初始化主题切换
   */
  initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    if (!toggleBtn || !themeIcon) {
      console.warn('Theme toggle button not found');
      return;
    }
    
    // 读取保存的主题，默认深色主题
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 'dark'; // 默认深色主题
    
    this.applyTheme(initialTheme, themeIcon);
    
    // 切换主题
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      this.applyTheme(newTheme, themeIcon);
      localStorage.setItem('theme', newTheme);
    });
  },

  /**
   * 应用主题
   */
  applyTheme(theme, iconElement) {
    document.documentElement.setAttribute('data-theme', theme);
    
    if (iconElement) {
      iconElement.innerHTML = theme === 'dark' ? this.getIcon('sun') : this.getIcon('moon');
    }
    
    // 更新粒子颜色或显示状态
    if (window.Particles) {
      if (theme === 'dark') {
        const color = '168, 155, 217';
        if (typeof window.Particles.updateColor === 'function') {
          window.Particles.updateColor(color);
        }
        if (typeof window.Particles.show === 'function') {
          window.Particles.show();
        }
      } else {
        if (typeof window.Particles.hide === 'function') {
          window.Particles.hide();
        }
      }
    }
  },

  /**
   * 渲染 Command Palette
   */
  renderCommandPalette() {
    const data = window.ProfileData;
    
    const paletteHtml = `
      <div class="command-palette-overlay" id="commandPaletteOverlay"></div>
      <div class="command-palette" id="commandPalette" role="dialog" aria-label="命令面板">
        <div class="command-palette-header">
          <div class="command-palette-icon">${this.getIcon('search', 'icon-sm')}</div>
          <input type="text" class="command-palette-input" id="commandPaletteInput" placeholder="搜索命令、页面、项目..." autocomplete="off">
          <span class="command-palette-shortcut">ESC</span>
        </div>
        <div class="command-palette-results" id="commandPaletteResults">
          <div class="command-palette-group">
            <div class="command-palette-group-label">快速导航</div>
            ${data.nav.map(item => `
              <div class="command-palette-item" data-action="navigate" data-target="${item.href}">
                <div class="command-palette-item-icon">${this.getIcon(item.href === 'home' ? 'home' : item.href === 'projects' ? 'folder' : item.href === 'about' ? 'user-circle' : item.href === 'timeline' ? 'clock' : 'message-circle', 'icon-sm')}</div>
                <div class="command-palette-item-text">
                  <div class="command-palette-item-title">${item.label}</div>
                  <div class="command-palette-item-desc">跳转到${item.label}页面</div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="command-palette-group">
            <div class="command-palette-group-label">快速操作</div>
            <div class="command-palette-item" data-action="theme">
              <div class="command-palette-item-icon">${this.getIcon('zap', 'icon-sm')}</div>
              <div class="command-palette-item-text">
                <div class="command-palette-item-title">切换主题</div>
                <div class="command-palette-item-desc">在深色/浅色模式之间切换</div>
              </div>
              <span class="command-palette-item-shortcut">T</span>
            </div>
            <div class="command-palette-item" data-action="copy-email">
              <div class="command-palette-item-icon">${this.getIcon('copy', 'icon-sm')}</div>
              <div class="command-palette-item-text">
                <div class="command-palette-item-title">复制邮箱</div>
                <div class="command-palette-item-desc">${data.basic.email}</div>
              </div>
            </div>
            <div class="command-palette-item" data-action="copy-wechat">
              <div class="command-palette-item-icon">${this.getIcon('copy', 'icon-sm')}</div>
              <div class="command-palette-item-text">
                <div class="command-palette-item-title">复制微信号</div>
                <div class="command-palette-item-desc">${data.basic.wechat}</div>
              </div>
            </div>
          </div>
          <div class="command-palette-group">
            <div class="command-palette-group-label">精选项目</div>
            ${data.projects.filter(p => p.featured).slice(0, 3).map((project, index) => `
              <div class="command-palette-item" data-action="project" data-target="${project.github || '#'}">
                <div class="command-palette-item-icon">${this.getIcon('folder', 'icon-sm')}</div>
                <div class="command-palette-item-text">
                  <div class="command-palette-item-title">${project.name}</div>
                  <div class="command-palette-item-desc">${project.category}</div>
                </div>
                <span class="command-palette-item-shortcut">${index + 1}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="command-palette-footer">
          <div class="command-palette-footer-hint">
            <span class="command-palette-footer-key">↑↓</span>
            <span>导航</span>
          </div>
          <div class="command-palette-footer-hint">
            <span class="command-palette-footer-key">↵</span>
            <span>选择</span>
          </div>
          <div class="command-palette-footer-hint">
            <span class="command-palette-footer-key">ESC</span>
            <span>关闭</span>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', paletteHtml);
    this.initCommandPalette();
  },

  /**
   * 初始化 Command Palette
   */
  initCommandPalette() {
    const overlay = document.getElementById('commandPaletteOverlay');
    const palette = document.getElementById('commandPalette');
    const input = document.getElementById('commandPaletteInput');
    const results = document.getElementById('commandPaletteResults');
    
    if (!overlay || !palette || !input) return;

    let activeIndex = 0;
    let items = [];

    // 打开 Command Palette
    function openPalette() {
      overlay.classList.add('open');
      palette.classList.add('open');
      input.value = '';
      input.focus();
      activeIndex = 0;
      updateActiveItem();
      filterItems('');
    }

    // 关闭 Command Palette
    function closePalette() {
      overlay.classList.remove('open');
      palette.classList.remove('open');
      input.blur();
    }

    // 过滤项目
    function filterItems(query) {
      const allItems = palette.querySelectorAll('.command-palette-item');
      const lowerQuery = query.toLowerCase();
      
      allItems.forEach(item => {
        const title = item.querySelector('.command-palette-item-title')?.textContent?.toLowerCase() || '';
        const desc = item.querySelector('.command-palette-item-desc')?.textContent?.toLowerCase() || '';
        
        if (title.includes(lowerQuery) || desc.includes(lowerQuery)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });

      // 更新可见项目列表
      items = Array.from(allItems).filter(item => item.style.display !== 'none');
      activeIndex = 0;
      updateActiveItem();

      // 显示/隐藏空状态
      const emptyState = palette.querySelector('.command-palette-empty');
      if (items.length === 0 && !emptyState) {
        results.insertAdjacentHTML('beforeend', '<div class="command-palette-empty">没有找到匹配的结果</div>');
      } else if (items.length > 0 && emptyState) {
        emptyState.remove();
      }
    }

    // 更新激活项目
    function updateActiveItem() {
      items.forEach((item, index) => {
        if (index === activeIndex) {
          item.classList.add('active');
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('active');
        }
      });
    }

    // 执行动作
    function executeAction(item) {
      const action = item.dataset.action;
      const target = item.dataset.target;
      const data = window.ProfileData;

      switch (action) {
        case 'navigate':
          Components.scrollToSection(target);
          closePalette();
          break;
        case 'theme':
          const themeToggle = document.getElementById('themeToggle');
          if (themeToggle) themeToggle.click();
          closePalette();
          break;
        case 'copy-email':
          Utils.copyToClipboard(data.basic.email);
          Utils.showToast('邮箱已复制');
          closePalette();
          break;
        case 'copy-wechat':
          Utils.copyToClipboard(data.basic.wechat);
          Utils.showToast('微信号已复制');
          closePalette();
          break;
        case 'project':
          if (target && target !== '#') {
            window.open(target, '_blank');
          }
          closePalette();
          break;
      }
    }

    // 键盘事件
    input.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (items.length > 0) {
            activeIndex = (activeIndex + 1) % items.length;
            updateActiveItem();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (items.length > 0) {
            activeIndex = (activeIndex - 1 + items.length) % items.length;
            updateActiveItem();
          }
          break;
        case 'Enter':
          e.preventDefault();
          if (items[activeIndex]) {
            executeAction(items[activeIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          closePalette();
          break;
      }
    });

    // 输入事件
    input.addEventListener('input', (e) => {
      filterItems(e.target.value);
    });

    // 点击项目
    results.addEventListener('click', (e) => {
      const item = e.target.closest('.command-palette-item');
      if (item) {
        executeAction(item);
      }
    });

    // 点击遮罩关闭
    overlay.addEventListener('click', closePalette);

    // 全局快捷键
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K 打开 Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (palette.classList.contains('open')) {
          closePalette();
        } else {
          openPalette();
        }
      }
    });

    // 初始化项目列表
    items = Array.from(palette.querySelectorAll('.command-palette-item'));
  }
};

// 字符串哈希方法（用于生成唯一 ID）
String.prototype.hashCode = function() {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};
