/**
 * interactions.js - 交互逻辑（滚动动画、页面效果等）
 */

const Interactions = {
  /**
   * 初始化滚动入场动画
   */
  initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (!revealElements.length) return;
    
    // 使用 Intersection Observer
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      revealElements.forEach(el => observer.observe(el));
    } else {
      // 降级方案：直接显示
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  },

  /**
   * 初始化页面加载动画
   */
  initPageLoad() {
    document.body.classList.add('page-load');
  },

  /**
   * 初始化平滑滚动
   */
  initSmoothScroll() {
    // 处理锚点链接
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          Utils.smoothScrollTo(target, 80);
        }
      });
    });
  },

  /**
   * 初始化卡片视差效果
   */
  initCardParallax() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  },

  /**
   * 初始化数字计数动画
   * @param {HTMLElement} element - 目标元素
   * @param {number} target - 目标数字
   * @param {number} duration - 动画时长
   */
  animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 缓动函数
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  },

  /**
   * 初始化打字机效果
   * @param {HTMLElement} element - 目标元素
   * @param {string} text - 文本内容
   * @param {number} speed - 打字速度
   */
  typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  },

  /**
   * 初始化 Hero 区域鼠标跟随效果
   */
  initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // 使用光晕层作为视差元素
    const glows = hero.querySelectorAll('.hero-glow');
    if (!glows.length) return;
    
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      glows.forEach((glow, index) => {
        const factor = (index + 1) * 15;
        glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
    
    hero.addEventListener('mouseleave', () => {
      glows.forEach(glow => {
        glow.style.transform = '';
      });
    });
  },

  /**
   * 初始化图片懒加载
   */
  initLazyImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });
      
      images.forEach(img => observer.observe(img));
    } else {
      // 降级方案
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    }
  },

  /**
   * 初始化导航高亮（根据滚动位置）
   */
  initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-link');
    
    if (!sections.length || !navLinks.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px'
    });
    
    sections.forEach(section => observer.observe(section));
  },

  /**
   * 初始化所有交互
   * 注意：平滑滚动由 components.js 中的导航链接和按钮处理
   */
  initAll() {
    this.initPageLoad();
    this.initScrollReveal();
    this.initHeroParallax();
    this.initLazyImages();
    
    // 延迟初始化一些效果
    setTimeout(() => {
      Utils.initRippleButtons();
    }, 100);
  }
};
