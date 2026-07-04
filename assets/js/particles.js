/**
 * 版权所有 © 2026 周世杰 (ZHOU SHIJIE)
 * 代码遵循 MIT 许可证，创意内容遵循 CC-BY-NC 4.0
 * 作者邮箱：a15759219744@163.com
 * GitHub：https://github.com/Zhoushijiehqu
 * 未经授权商用必究
 */

/**
 * particles.js - 粒子背景动画
 * 支持深色模式引力旋涡效果，浅色模式隐藏
 * 第三轮重构：增强炫酷度、添加显示/隐藏控制
 */

const Particles = (function() {
  let canvas, ctx;
  let particles = [];
  let animationId = null;
  let mouse = { x: null, y: null, radius: 150 };
  let isVisible = true;
  let isDarkMode = false;
  let breathTime = 0; // 呼吸动画时间

  // 配置（V6 增强：亮度+15%、发光增强、呼吸变化、缓动优化）
  const config = {
    baseSpeed: 0.45,
    mouseRadius: 200,
    mouseStrength: 1.2,
    particleSize: { min: 2.2, max: 5 },
    particleOpacity: { min: 0.5, max: 0.95 },
    color: '168, 155, 217',
    particleCount: 120,
    lineDistance: 150,
    lineOpacity: 0.4,
    glowBlur: 18, // 发光模糊半径增强
    breathSpeed: 0.0008, // 呼吸速度（较慢，周期约13秒）
    breathMin: 0.85, // 呼吸最小亮度比例
    breathMax: 1.0 // 呼吸最大亮度比例
  };

  /**
   * 粒子类
   */
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min;
      this.baseSpeedX = config.baseSpeed + Math.random() * 0.3;
      this.baseSpeedY = (Math.random() - 0.5) * 0.2;
      this.speedX = this.baseSpeedX;
      this.speedY = this.baseSpeedY;
      this.opacity = Math.random() * (config.particleOpacity.max - config.particleOpacity.min) + config.particleOpacity.min;
      this.density = Math.random() * 30 + 1;
    }

    update() {
      // 鼠标引力和旋涡效果
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseRadius) {
          // 引力效果
          const force = (config.mouseRadius - distance) / config.mouseRadius;
          const angle = Math.atan2(dy, dx);
          
          // 旋涡效果（垂直方向的力）
          const vortexAngle = angle + Math.PI / 2;
          const vortexStrength = force * config.mouseStrength * 0.8;
          
          // 引力 + 旋涡混合
          this.speedX += Math.cos(angle) * force * config.mouseStrength * 0.3;
          this.speedY += Math.sin(angle) * force * config.mouseStrength * 0.3;
          this.speedX += Math.cos(vortexAngle) * vortexStrength;
          this.speedY += Math.sin(vortexAngle) * vortexStrength;
        }
      }

      // V6: 优化缓动效果 - 更平滑的速度回归（ease-out 效果）
      const easeFactor = 0.015;
      this.speedX += (this.baseSpeedX - this.speedX) * easeFactor;
      this.speedY += (this.baseSpeedY - this.speedY) * easeFactor;

      // 更新位置
      this.x += this.speedX;
      this.y += this.speedY;

      // 边界循环：从右边出去从左边回来
      if (this.x > canvas.width + 10) {
        this.x = -10;
        this.y = Math.random() * canvas.height;
      }
      if (this.x < -10) {
        this.x = canvas.width + 10;
      }
      if (this.y > canvas.height + 10) {
        this.y = -10;
      }
      if (this.y < -10) {
        this.y = canvas.height + 10;
      }
    }

    draw() {
      // V6: 呼吸效果 - 基于全局呼吸时间调整亮度
      const breathFactor = config.breathMin + (config.breathMax - config.breathMin) * (0.5 + 0.5 * Math.sin(breathTime));
      const currentOpacity = this.opacity * breathFactor;
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${config.color}, ${currentOpacity})`;
      ctx.shadowBlur = config.glowBlur * breathFactor;
      ctx.shadowColor = `rgba(${config.color}, ${currentOpacity})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  /**
   * 绘制粒子连线
   */
  function drawLines() {
    // V6: 呼吸效果应用到连线
    const breathFactor = config.breathMin + (config.breathMax - config.breathMin) * (0.5 + 0.5 * Math.sin(breathTime));
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.lineDistance) {
          const opacity = (1 - distance / config.lineDistance) * config.lineOpacity * breathFactor;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${config.color}, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  /**
   * 动画循环
   */
  function animate() {
    if (!isVisible) {
      animationId = null;
      return;
    }

    // V6: 更新呼吸时间
    breathTime += config.breathSpeed;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 更新和绘制粒子
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // 绘制连线
    drawLines();

    animationId = requestAnimationFrame(animate);
  }

  /**
   * 初始化
   */
  function init(canvasId = 'particlesCanvas') {
    canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.warn('Particles canvas not found');
      return;
    }

    ctx = canvas.getContext('2d');
    
    // 设置画布大小
    resizeCanvas();

    // 检测设备类型，移动端减少粒子数量
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      config.particleCount = 40;
      config.lineDistance = 80;
    }

    // 创建粒子
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }

    // 鼠标事件
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // 触摸事件
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleMouseLeave);

    // 窗口大小变化
    window.addEventListener('resize', Utils.debounce(resizeCanvas, 250));

    // 开始动画
    animate();

    console.log('Particles initialized with', config.particleCount, 'particles');
  }

  /**
   * 处理鼠标移动
   */
  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  /**
   * 处理鼠标离开
   */
  function handleMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  /**
   * 处理触摸移动
   */
  function handleTouchMove(e) {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }
  }

  /**
   * 调整画布大小
   */
  function resizeCanvas() {
    if (!canvas) return;
    
    const parent = canvas.parentElement;
    canvas.width = parent ? parent.offsetWidth : window.innerWidth;
    canvas.height = parent ? parent.offsetHeight : window.innerHeight;

    // 重新创建粒子（保持数量不变）
    const count = particles.length;
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  /**
   * 更新粒子颜色
   */
  function updateColor(rgbString) {
    config.color = rgbString;
  }

  /**
   * 显示粒子（开始动画）
   */
  function show() {
    if (isVisible) return;
    
    isVisible = true;
    if (canvas) {
      canvas.style.opacity = '1';
      canvas.style.pointerEvents = 'auto';
    }
    
    if (!animationId) {
      animate();
    }
    
    console.log('Particles shown');
  }

  /**
   * 隐藏粒子（停止动画）
   */
  function hide() {
    if (!isVisible) return;
    
    isVisible = false;
    if (canvas) {
      canvas.style.opacity = '0';
      canvas.style.pointerEvents = 'none';
    }
    
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    // 清空画布
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    console.log('Particles hidden');
  }

  /**
   * 销毁粒子系统
   */
  function destroy() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseleave', handleMouseLeave);
    
    particles = [];
    isVisible = false;
    
    console.log('Particles destroyed');
  }

  // 公开 API
  const Particles = {
    init,
    destroy,
    updateColor,
    show,
    hide
  };
  
  // 挂载到全局
  window.Particles = Particles;
  
  return Particles;
})();
