/**
 * 版权所有 © 2026 周世杰 (ZHOU SHIJIE)
 * 代码遵循 MIT 许可证，创意内容遵循 CC-BY-NC 4.0
 * 未经授权商用必究
 */

/**
 * game-utils.js - 游戏小屋共享工具模块
 * 提供：截图分享 / 成就系统 / 存档管理 / 新手引导 / 提示系统
 * 各游戏通过 <script src="../assets/js/game-utils.js"></script> 引入
 * 挂载在 window.GameUtils 上
 */
(function (global) {
  'use strict';

  const GU = {
    /* ============================================================
     *  通用常量
     * ============================================================ */
    KEY_ACH: 'global_achievements_v1',       // 全局成就解锁记录
    KEY_STATS: 'global_stats_v1',            // 全局统计（累计游玩次数/时长等）
    KEY_HINT_DATE: 'global_hint_date_v1',    // 上次重置提示次数的日期
    KEY_HINT_USED: 'global_hint_used_v1',    // 今日已用提示次数
    KEY_TUT_SEEN: 'global_tutorial_v1',      // 各游戏教学已观看记录
    HINT_DAILY_LIMIT: 3,                     // 每日提示上限
    STORAGE_PREFIXES: ['snake_', 'mine_', 'puzzle_', 'memory_', 'prism_',
                       'sonic_', 'gravity_', 'eco_', 'cube2048_', 'rhythm_',
                       'global_', 'daily_'],

    /* ============================================================
     *  1. 截图分享
     * ============================================================ */
    /**
     * 截取游戏画面并加水印，弹出预览窗
     * @param {Object} opts
     *   - source: HTMLCanvasElement | HTMLVideoFrame | 渲染函数返回 dataURL
     *   - gameName: 游戏名（水印用）
     *   - score: 当前分数/成绩字符串（水印用）
     *   - extra: 额外水印行
     */
    screenshot(opts) {
      const { source, gameName = '游戏小屋', score = '', extra = '' } = opts || {};
      try {
        let dataURL = '';
        if (typeof source === 'string') {
          dataURL = source; // 已经是 dataURL
        } else if (source && source.toDataURL) {
          dataURL = source.toDataURL('image/png');
        } else {
          this._toast('截图失败：未找到画布');
          return;
        }
        this._showShotPreview(dataURL, gameName, score, extra);
      } catch (e) {
        console.error('截图失败', e);
        this._toast('截图失败：' + (e.message || '未知错误'));
      }
    },

    /**
     * 截取整个游戏区域的 DOM 截图（用 html2canvas 太重，这里用 canvas 直接抓）
     * 兼容 Three.js renderer.domElement
     */
    screenshotCanvas(canvasEl, gameName, score, extra) {
      this.screenshot({ source: canvasEl, gameName, score, extra });
    },

    _showShotPreview(dataURL, gameName, score, extra) {
      // 移除已有预览
      const old = document.getElementById('__gu_shot_modal');
      if (old) old.remove();

      const modal = document.createElement('div');
      modal.id = '__gu_shot_modal';
      modal.style.cssText = [
        'position:fixed', 'inset:0', 'z-index:9999',
        'background:rgba(8,10,20,0.85)', 'backdrop-filter:blur(10px)',
        'display:flex', 'align-items:center', 'justify-content:center',
        'padding:20px', 'animation:__gu_fade .2s ease'
      ].join(';');

      // 合成水印图
      const img = new Image();
      img.onload = () => {
        const W = img.width, H = img.height;
        const pad = 24, footerH = 72;
        const cw = W + pad * 2, ch = H + pad * 2 + footerH;
        const c = document.createElement('canvas');
        c.width = cw; c.height = ch;
        const ctx = c.getContext('2d');
        // 背景渐变
        const g = ctx.createLinearGradient(0, 0, cw, ch);
        g.addColorStop(0, '#1a1f2e'); g.addColorStop(1, '#0d1117');
        ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch);
        // 图片
        ctx.drawImage(img, pad, pad, W, H);
        // 分隔线
        ctx.strokeStyle = 'rgba(212,171,106,0.4)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(pad, pad + H + 12); ctx.lineTo(cw - pad, pad + H + 12); ctx.stroke();
        // 文字
        ctx.fillStyle = '#f5e6c8';
        ctx.font = '600 18px Manrope, sans-serif';
        ctx.textBaseline = 'middle';
        ctx.fillText(gameName, pad, pad + H + 36);
        if (score) {
          ctx.fillStyle = '#d4ab6a';
          ctx.font = '700 16px Manrope, sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText(score, cw - pad, pad + H + 36);
        }
        ctx.textAlign = 'left';
        ctx.fillStyle = '#8a96b8';
        ctx.font = '11px Manrope, sans-serif';
        const dt = new Date();
        const dateStr = `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
        ctx.fillText(`游戏小屋 · 周世杰 · ${dateStr}${extra ? ' · ' + extra : ''}`, pad, pad + H + 58);

        const finalURL = c.toDataURL('image/png');
        const previewImg = modal.querySelector('img.__gu_preview');
        if (previewImg) previewImg.src = finalURL;
        modal.querySelector('.__gu_btn-dl').onclick = () => {
          const a = document.createElement('a');
          a.href = finalURL;
          a.download = `${gameName}_${dateStr}.png`;
          a.click();
        };
        if (navigator.clipboard && navigator.clipboard.write) {
          modal.querySelector('.__gu_btn-cp').style.display = '';
        }
      };
      img.src = dataURL;

      modal.innerHTML = `
        <div style="background:#1a1f2e;border:1px solid rgba(212,171,106,0.3);border-radius:14px;
                    max-width:92vw;max-height:92vh;padding:20px;box-shadow:0 30px 80px rgba(0,0,0,.6);
                    display:flex;flex-direction:column;gap:14px;overflow:hidden">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <h3 style="margin:0;font:600 16px Manrope,sans-serif;color:#f5e6c8">截图预览</h3>
            <button class="__gu_btn-x" style="background:none;border:none;color:#8a96b8;font-size:22px;cursor:pointer;padding:4px 8px;line-height:1">×</button>
          </div>
          <div style="overflow:auto;max-height:70vh">
            <img class="__gu_preview" style="max-width:100%;border-radius:8px;display:block" alt="截图预览">
          </div>
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button class="__gu_btn-cp" style="display:none;background:transparent;border:1px solid rgba(212,171,106,0.4);color:#d4ab6a;padding:8px 16px;border-radius:8px;cursor:pointer;font:600 13px Manrope,sans-serif">复制到剪贴板</button>
            <button class="__gu_btn-dl" style="background:#d4ab6a;border:none;color:#1a1f2e;padding:8px 18px;border-radius:8px;cursor:pointer;font:700 13px Manrope,sans-serif">下载 PNG</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      // 统一关闭函数：移除 modal + 移除 esc 监听器，避免内存泄漏
      let closed = false;
      const closeModal = () => {
        if (closed) return;
        closed = true;
        modal.remove();
        document.removeEventListener('keydown', escHandler);
      };
      const escHandler = (e) => { if (e.key === 'Escape') closeModal(); };

      modal.querySelector('.__gu_btn-x').onclick = closeModal;
      modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
      document.addEventListener('keydown', escHandler);

      // 复制按钮
      const cpBtn = modal.querySelector('.__gu_btn-cp');
      if (cpBtn) {
        cpBtn.onclick = async () => {
          try {
            const blob = await (await fetch(modal.querySelector('img.__gu_preview').src)).blob();
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            this._toast('已复制到剪贴板');
          } catch (err) {
            this._toast('复制失败，请改用下载');
          }
        };
      }
    },

    /* ============================================================
     *  2. 成就系统
     * ============================================================ */
    /**
     * 解锁成就
     * @param {string} id - 成就唯一ID
     * @param {string} name - 成就名
     * @param {string} desc - 描述
     */
    unlock(id, name, desc) {
      const ach = this._readJSON(this.KEY_ACH, {});
      if (ach[id]) return false; // 已解锁
      ach[id] = { name, desc, time: Date.now() };
      this._writeJSON(this.KEY_ACH, ach);
      this._showAchievementToast(name, desc);
      return true;
    },

    isUnlocked(id) {
      const ach = this._readJSON(this.KEY_ACH, {});
      return !!ach[id];
    },

    getAllAchievements() {
      return this._readJSON(this.KEY_ACH, {});
    },

    _showAchievementToast(name, desc) {
      const old = document.querySelector('.__gu_ach_toast');
      if (old) old.remove();
      const t = document.createElement('div');
      t.className = '__gu_ach_toast';
      t.style.cssText = [
        'position:fixed', 'top:20px', 'right:20px', 'z-index:9999',
        'background:linear-gradient(135deg,#1a1f2e,#2a1f1a)',
        'border:1px solid #d4ab6a', 'border-radius:12px',
        'padding:14px 18px', 'max-width:300px',
        'box-shadow:0 10px 40px rgba(212,171,106,0.3)',
        'display:flex', 'gap:12px', 'align-items:center',
        'animation:__gu_slidein .4s cubic-bezier(.4,0,.2,1)'
      ].join(';');
      t.innerHTML = `
        <div style="font-size:28px">🏆</div>
        <div>
          <div style="color:#d4ab6a;font:700 11px Manrope,sans-serif;letter-spacing:.1em;text-transform:uppercase;margin-bottom:2px">成就解锁</div>
          <div style="color:#f5e6c8;font:600 14px Manrope,sans-serif">${this._esc(name)}</div>
          <div style="color:#8a96b8;font:12px Manrope,sans-serif;margin-top:2px">${this._esc(desc)}</div>
        </div>
      `;
      document.body.appendChild(t);
      setTimeout(() => {
        t.style.transition = 'all .3s';
        t.style.opacity = '0';
        t.style.transform = 'translateX(20px)';
        setTimeout(() => t.remove(), 300);
      }, 3500);
    },

    /* ============================================================
     *  3. 全局统计
     * ============================================================ */
    recordPlay(gameSlug, durationSec) {
      const stats = this._readJSON(this.KEY_STATS, { plays: {}, totalTime: 0, lastPlay: {} });
      stats.plays[gameSlug] = (stats.plays[gameSlug] || 0) + 1;
      stats.totalTime = (stats.totalTime || 0) + (durationSec || 0);
      stats.lastPlay[gameSlug] = Date.now();
      this._writeJSON(this.KEY_STATS, stats);
    },

    getStats() {
      return this._readJSON(this.KEY_STATS, { plays: {}, totalTime: 0, lastPlay: {} });
    },

    /* ============================================================
     *  4. 新手引导（教学）记录
     * ============================================================ */
    markTutorialSeen(slug) {
      const seen = this._readJSON(this.KEY_TUT_SEEN, {});
      seen[slug] = true;
      this._writeJSON(this.KEY_TUT_SEEN, seen);
    },

    hasSeenTutorial(slug) {
      const seen = this._readJSON(this.KEY_TUT_SEEN, {});
      return !!seen[slug];
    },

    /**
     * 显示教学弹层（一次性，可勾选不再提示）
     * @param {string} slug - 游戏标识
     * @param {string} title - 标题
     * @param {Array<{step:string,desc:string}>} steps - 步骤
     * @param {Function} onClose - 关闭回调
     */
    showTutorial(slug, title, steps, onClose) {
      if (this.hasSeenTutorial(slug)) { if (onClose) onClose(); return; }
      if (!Array.isArray(steps) || steps.length === 0) { if (onClose) onClose(); return; }
      const modal = document.createElement('div');
      modal.className = '__gu_tut_modal';
      modal.style.cssText = [
        'position:fixed', 'inset:0', 'z-index:9999',
        'background:rgba(8,10,20,0.75)', 'backdrop-filter:blur(8px)',
        'display:flex', 'align-items:center', 'justify-content:center', 'padding:20px'
      ].join(';');
      const stepsHtml = steps.map((s, i) => `
        <div style="display:flex;gap:12px;margin-bottom:14px;align-items:flex-start">
          <div style="flex-shrink:0;width:26px;height:26px;border-radius:50%;background:#d4ab6a;color:#1a1f2e;font:700 13px Manrope,sans-serif;display:flex;align-items:center;justify-content:center">${i+1}</div>
          <div>
            <div style="color:#f5e6c8;font:600 14px Manrope,sans-serif;margin-bottom:2px">${this._esc(s.step)}</div>
            <div style="color:#8a96b8;font:13px Manrope,sans-serif;line-height:1.5">${this._esc(s.desc)}</div>
          </div>
        </div>
      `).join('');
      modal.innerHTML = `
        <div style="background:#1a1f2e;border:1px solid rgba(212,171,106,0.3);border-radius:14px;max-width:480px;width:100%;padding:28px;box-shadow:0 30px 80px rgba(0,0,0,.6)">
          <div style="text-align:center;margin-bottom:20px">
            <div style="color:#d4ab6a;font:700 10px Manrope,sans-serif;letter-spacing:.3em;text-transform:uppercase;margin-bottom:6px">— 新手指南 —</div>
            <h3 style="margin:0;font:600 22px 'Fraunces',serif;color:#f5e6c8">${this._esc(title)}</h3>
          </div>
          <div>${stepsHtml}</div>
          <label style="display:flex;align-items:center;gap:8px;margin:16px 0;color:#8a96b8;font:12px Manrope,sans-serif;cursor:pointer">
            <input type="checkbox" id="__gu_tut_noagain" style="cursor:pointer">
            <span>不再显示此教程</span>
          </label>
          <button id="__gu_tut_ok" style="width:100%;background:#d4ab6a;border:none;color:#1a1f2e;padding:12px;border-radius:10px;cursor:pointer;font:700 14px Manrope,sans-serif">开始游戏</button>
        </div>
      `;
      document.body.appendChild(modal);
      // 防重入 + Esc 支持
      let closed = false;
      const escHandler = (e) => { if (e.key === 'Escape') close(); };
      const close = () => {
        if (closed) return;
        closed = true;
        const noAgain = modal.querySelector('#__gu_tut_noagain').checked;
        if (noAgain) this.markTutorialSeen(slug);
        document.removeEventListener('keydown', escHandler);
        modal.style.transition = 'opacity .2s';
        modal.style.opacity = '0';
        setTimeout(() => { modal.remove(); if (onClose) onClose(); }, 200);
      };
      modal.querySelector('#__gu_tut_ok').onclick = close;
      modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
      document.addEventListener('keydown', escHandler);
    },

    /* ============================================================
     *  5. 提示系统（每日有限）
     * ============================================================ */
    getHintCount() {
      try {
        const today = new Date().toDateString();
        const lastDate = localStorage.getItem(this.KEY_HINT_DATE);
        if (lastDate !== today) {
          // 跨日重置
          localStorage.setItem(this.KEY_HINT_DATE, today);
          localStorage.setItem(this.KEY_HINT_USED, '0');
          return this.HINT_DAILY_LIMIT;
        }
        const used = parseInt(localStorage.getItem(this.KEY_HINT_USED) || '0', 10);
        return Math.max(0, this.HINT_DAILY_LIMIT - used);
      } catch (e) {
        return this.HINT_DAILY_LIMIT; // localStorage 不可用时返回满额
      }
    },

    useHint() {
      try {
        const remain = this.getHintCount();
        if (remain <= 0) return false;
        const today = new Date().toDateString();
        localStorage.setItem(this.KEY_HINT_DATE, today);
        localStorage.setItem(this.KEY_HINT_USED, String(this.HINT_DAILY_LIMIT - remain + 1));
        return true;
      } catch (e) {
        return false;
      }
    },

    /* ============================================================
     *  6. 存档管理
     * ============================================================ */
    listAllSaves() {
      const result = [];
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (!key) continue;
          const isGame = this.STORAGE_PREFIXES.some(p => key.startsWith(p));
          if (!isGame) continue;
          let val = localStorage.getItem(key) || '';
          result.push({
            key,
            size: val.length,
            modified: this._getKeyMtime(key),
            preview: val.slice(0, 80)
          });
        }
      } catch (e) {}
      return result.sort((a, b) => b.modified - a.modified);
    },

    exportAllSaves() {
      try {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (!key) continue;
          const isGame = this.STORAGE_PREFIXES.some(p => key.startsWith(p));
          if (isGame) data[key] = localStorage.getItem(key);
        }
        const blob = new Blob([JSON.stringify({
          version: 1,
          exportDate: Date.now(),
          data
        }, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        const d = new Date();
        a.download = `game_saves_${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}.json`;
        a.click();
        URL.revokeObjectURL(a.href);
      } catch (e) {
        this._toast('导出失败：' + (e.message || '未知错误'));
      }
    },

    importSaves(file, onDone) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const obj = JSON.parse(e.target.result);
          if (!obj.data) throw new Error('存档格式错误');
          let count = 0;
          for (const k in obj.data) {
            if (this.STORAGE_PREFIXES.some(p => k.startsWith(p))) {
              localStorage.setItem(k, obj.data[k]);
              count++;
            }
          }
          this._toast(`已导入 ${count} 项存档`);
          if (onDone) onDone(count);
        } catch (err) {
          this._toast('导入失败：' + err.message);
        }
      };
      reader.readAsText(file);
    },

    clearAllSaves() {
      const keys = [];
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (!key) continue;
          if (this.STORAGE_PREFIXES.some(p => key.startsWith(p))) keys.push(key);
        }
        keys.forEach(k => localStorage.removeItem(k));
      } catch (e) {}
      return keys.length;
    },

    /* ============================================================
     *  7. 胜利粒子庆祝
     * ============================================================ */
    /**
     * 在屏幕中央触发一次粒子庆祝效果（约 2.5s 后自动移除）
     * 用于各游戏通关 / 胜利弹窗显示时调用
     */
    celebrate() {
      try {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998';
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        const particles = [];
        const colors = ['#d4ab6a', '#f5e6c8', '#ffd700', '#ff6b6b', '#4ecdc4'];
        for (let i = 0; i < 80; i++) {
          particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12 - 4,
            g: 0.2,
            life: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 4 + 2
          });
        }
        const start = performance.now();
        const tick = (now) => {
          const t = (now - start) / 1000;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach((p) => {
            p.x += p.vx; p.y += p.vy; p.vy += p.g;
            p.life = Math.max(0, 1 - t / 2);
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          });
          if (t < 2.5) requestAnimationFrame(tick);
          else canvas.remove();
        };
        requestAnimationFrame(tick);
      } catch (e) { /* 庆祝效果失败不影响游戏 */ }
    },

    /* ============================================================
     *  8. 每日挑战 & 成绩历史曲线
     * ============================================================ */
    /**
     * 今日种子：基于日期的固定种子，保证同一天所有玩家生成相同关卡
     * 格式 YYYYMMDD → 数值
     */
    getDailySeed() {
      const d = new Date();
      return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    },

    /** 今日日期字符串（YYYY-MM-DD），用于 localStorage key */
    _dailyKeyDate() {
      const d = new Date();
      return d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
    },

    /**
     * 查询某游戏今日挑战状态
     * @param {string} slug - 游戏标识（snake/mine/cube2048）
     * @returns {{played:boolean, score:number|null}}
     */
    getDailyStatus(slug) {
      try {
        const ds = this._dailyKeyDate();
        const playedKey = `daily_${slug}_${ds}_played`;
        const scoreKey = `daily_${slug}_${ds}_score`;
        const played = localStorage.getItem(playedKey) === '1';
        const scoreRaw = localStorage.getItem(scoreKey);
        const score = scoreRaw == null ? null : Number(scoreRaw);
        return { played, score: played ? score : null };
      } catch (e) {
        return { played: false, score: null };
      }
    },

    /**
     * 记录今日挑战成绩（同一天只记录首次）
     * @param {string} slug
     * @param {number} score
     * @returns {boolean} 是否成功记录（已玩过则返回 false）
     */
    recordDaily(slug, score) {
      try {
        const ds = this._dailyKeyDate();
        const playedKey = `daily_${slug}_${ds}_played`;
        if (localStorage.getItem(playedKey) === '1') return false;
        localStorage.setItem(playedKey, '1');
        localStorage.setItem(`daily_${slug}_${ds}_score`, String(score));
      } catch (e) { return false; }
      return true;
    },

    /* ---- 成绩历史曲线 ---- */
    KEY_HISTORY: 'global_history_v1',

    /**
     * 记录一次成绩到历史
     * @param {string} slug - 游戏标识
     * @param {number} score - 本局成绩（扫雷用时取 elapsed 即可，渲染时设 lowerBetter）
     */
    recordScore(slug, score) {
      const all = this._readJSON(this.KEY_HISTORY, {});
      if (!Array.isArray(all[slug])) all[slug] = [];
      all[slug].push({ score: Number(score) || 0, time: Date.now() });
      // 最多保留 100 条
      if (all[slug].length > 100) all[slug] = all[slug].slice(-100);
      this._writeJSON(this.KEY_HISTORY, all);
    },

    /**
     * 获取某游戏的成绩历史
     * @param {string} slug
     * @param {number} [limit] - 返回最近多少条，缺省全部
     * @returns {Array<{score:number,time:number}>}
     */
    getHistory(slug, limit) {
      const all = this._readJSON(this.KEY_HISTORY, {});
      const arr = Array.isArray(all[slug]) ? all[slug] : [];
      return limit ? arr.slice(-limit) : arr.slice();
    },

    /**
     * 渲染成绩历史趋势 SVG 曲线（返回 HTML 字符串）
     * @param {string} slug
     * @param {Object} [opts] - { width, height, lowerBetter }
     * @returns {string} HTML
     */
    renderTrendChart(slug, opts) {
      const o = Object.assign({ width: 260, height: 70, lowerBetter: false }, opts || {});
      const data = this.getHistory(slug);
      if (!data.length) {
        return '<div style="color:var(--color-text-tertiary);font-size:11px;text-align:center;padding:8px 0">暂无成绩记录，玩一局后这里会显示趋势</div>';
      }
      const W = o.width, H = o.height, pad = 6;
      const vals = data.map(d => d.score);
      let min = Math.min.apply(null, vals);
      let max = Math.max.apply(null, vals);
      if (min === max) { min -= 1; max += 1; }
      const n = vals.length;
      const xStep = (W - pad * 2) / Math.max(1, n - 1);
      const yRange = H - pad * 2;
      const pts = vals.map((v, i) => {
        let ratio = (v - min) / (max - min);
        if (o.lowerBetter) ratio = 1 - ratio; // 用时类：向上=变快
        const x = pad + i * xStep;
        const y = pad + (1 - ratio) * yRange;
        return [x, y];
      });
      const polyPts = pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
      const areaPath = 'M ' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ') +
        ` L ${(pad + (n - 1) * xStep).toFixed(1)} ${H - pad} L ${pad} ${H - pad} Z`;
      const last = pts[pts.length - 1];
      // SVG presentation attribute 不支持 var()，必须用具体颜色值
      const stroke = '#d4ab6a';
      // id 加随机后缀避免同页面多次调用重复
      const gid = 'tg_' + slug + '_' + Math.random().toString(36).slice(2, 8);
      const minLabel = o.lowerBetter ? ('最快 ' + min) : ('最低 ' + min);
      const maxLabel = o.lowerBetter ? ('最慢 ' + max) : ('最高 ' + max);
      return `
        <div class="trend-chart" style="margin-top:6px">
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:10px;color:var(--color-text-tertiary);letter-spacing:.08em;text-transform:uppercase;margin-bottom:2px">
            <span>趋势</span><span>共 ${n} 局</span>
          </div>
          <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:${H}px;display:block" preserveAspectRatio="none">
            <defs>
              <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${stroke}" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="${stroke}" stop-opacity="0.02"/>
              </linearGradient>
            </defs>
            <path d="${areaPath}" fill="url(#${gid})" stroke="none"/>
            <polyline points="${polyPts}" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
            <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="2.5" fill="${stroke}"/>
          </svg>
          <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--color-text-tertiary);font-family:var(--font-family-base)">
            <span>${this._esc(minLabel)}</span><span>${this._esc(maxLabel)}</span>
          </div>
        </div>`;
    },

    /* ============================================================
     *  9. 本地排行榜（Top-N，区别于 recordScore 的历史曲线）
     * ============================================================ */
    LEADERBOARD_LIMIT: 20, // 存储上限；UI 展示前 10

    /**
     * 取某游戏排行榜存储键
     */
    _lbKey(slug) { return slug + '_leaderboard_v1'; },

    /**
     * 读取排行榜
     * @param {string} slug
     * @returns {Array<{score:number, date:number, extra?:*}>}
     */
    loadLeaderboard(slug) {
      return this._readJSON(this._lbKey(slug), []);
    },

    /**
     * 写入一条成绩到排行榜
     * @param {string} slug
     * @param {number} score - 分数（用时类游戏传 elapsed 秒数）
     * @param {Object} [extra] - 附加字段（如 grid/difficulty/level）
     * @param {Object} [opts] - { lowerBetter:false }
     */
    saveLeaderboard(slug, score, extra, opts) {
      try {
        score = Number(score) || 0;
        const o = Object.assign({ lowerBetter: false }, opts || {});
        const lb = this.loadLeaderboard(slug);
        lb.push({ score, date: Date.now(), extra: extra || {} });
        // 排序：lowerBetter 升序（用时越短越好），否则降序
        lb.sort((a, b) => o.lowerBetter ? a.score - b.score : b.score - a.score);
        this._writeJSON(this._lbKey(slug), lb.slice(0, this.LEADERBOARD_LIMIT));
      } catch (e) {}
    },

    /**
     * 渲染排行榜 HTML（含趋势图）
     * @param {string} slug
     * @param {Object} [opts] - { lowerBetter:false, meta:fn(record)->string, title:'排行榜' }
     * @returns {string} HTML
     */
    renderLeaderboard(slug, opts) {
      const o = Object.assign({ lowerBetter: false, title: '排行榜', shareButton: true, gameName: slug }, opts || {});
      const lb = this.loadLeaderboard(slug).slice(0, 10);
      const trend = this.renderTrendChart(slug, { lowerBetter: o.lowerBetter });
      // 分享按钮（内联 onclick，依赖全局 GameUtils 可用）
      const shareBtn = o.shareButton && lb.length
        ? `<div class="lb-share-wrap" style="text-align:center;margin-top:8px"><button class="lb-share-btn" onclick="GameUtils.shareLeaderboardCard('${this._esc(slug)}',{gameName:'${this._esc(o.gameName)}',lowerBetter:${o.lowerBetter}})" style="background:transparent;border:1px solid var(--color-border-medium);color:var(--color-text-secondary);padding:5px 14px;border-radius:var(--radius-sm);cursor:pointer;font:600 11px var(--font-family-base);transition:all .15s" onmouseover="this.style.borderColor='var(--color-accent)';this.style.color='var(--color-accent)'" onmouseout="this.style.borderColor='var(--color-border-medium)';this.style.color='var(--color-text-secondary)'">📤 分享战绩卡</button></div>`
        : '';
      if (!lb.length) {
        return '<div class="lb-empty">暂无记录</div>' + trend;
      }
      const items = lb.map((r, i) => {
        const d = new Date(r.date);
        const ds = (d.getMonth() + 1) + '/' + d.getDate();
        const meta = typeof o.meta === 'function' ? o.meta(r) : ds;
        return `<div class="lb-item"><span class="rank">${i + 1}</span><span class="score">${this._esc(String(r.score))}</span><span class="meta">${this._esc(meta)}</span></div>`;
      }).join('');
      return items + trend + shareBtn;
    },

    /* ============================================================
     *  10. 全屏模式
     * ============================================================ */
    /**
     * 切换全屏（针对指定元素，缺省 document.documentElement）
     * @param {HTMLElement} [el]
     */
    toggleFullscreen(el) {
      try {
        el = el || document.documentElement;
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
          (el.requestFullscreen || el.webkitRequestFullscreen || function(){}).call(el);
        } else {
          (document.exitFullscreen || document.webkitExitFullscreen || function(){}).call(document);
        }
      } catch (e) {}
    },

    isFullscreen() {
      return !!(document.fullscreenElement || document.webkitFullscreenElement);
    },

    /* ============================================================
     *  11. PWA Service Worker 注册（在根目录页面调用一次即可）
     * ============================================================ */
    registerSW() {
      if (!('serviceWorker' in navigator)) return;
      // 仅在 https 或 localhost 下生效；相对路径以适应当前目录深度
      const swUrl = (document.documentElement.getAttribute('data-sw-root') || '') + 'sw.js';
      window.addEventListener('load', function () {
        navigator.serviceWorker.register(swUrl, { scope: './' }).catch(function () {});
      });
    },

    /* ============================================================
     *  12. 用户反馈入口（注入到页面底部）
     * ============================================================ */
    FEEDBACK_EMAIL: 'a15759219744@163.com',
    FEEDBACK_GITHUB: 'https://github.com/Zhoushijiehqu',

    /**
     * 在指定容器注入反馈按钮组
     * @param {HTMLElement|string} container - 容器或选择器
     */
    injectFeedback(container) {
      try {
        const el = typeof container === 'string' ? document.querySelector(container) : container;
        if (!el || el.dataset.fbInjected) return;
        el.dataset.fbInjected = '1';
        const wrap = document.createElement('div');
        wrap.style.cssText = 'display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;margin-top:8px;font-size:12px;color:var(--color-text-tertiary)';
        wrap.innerHTML =
          '<span>反馈 · 建议 · Bug：</span>' +
          '<a href="mailto:' + this.FEEDBACK_EMAIL + '?subject=' + encodeURIComponent('游戏小屋反馈') + '" style="color:var(--color-accent);text-decoration:none">✉ 邮箱</a>' +
          '<span>·</span>' +
          '<a href="' + this.FEEDBACK_GITHUB + '" target="_blank" rel="noopener" style="color:var(--color-accent);text-decoration:none">GitHub</a>';
        el.appendChild(wrap);
      } catch (e) {}
    },

    /* ============================================================
     *  13. 关卡进度 & 星级评价（D）
     * ============================================================ */
    KEY_LEVEL_PROGRESS: 'global_level_progress_v1',

    /**
     * 读取某游戏关卡进度
     * @param {string} slug
     * @returns {{ unlocked:number, stars:Object<number,number> }}
     *   unlocked = 已解锁到第几关（1-based）；stars = { 关号: 1|2|3 }
     */
    getLevelProgress(slug) {
      const all = this._readJSON(this.KEY_LEVEL_PROGRESS, {});
      const d = all[slug] || { unlocked: 1, stars: {} };
      // 兼容旧数据
      if (typeof d.unlocked !== 'number' || d.unlocked < 1) d.unlocked = 1;
      if (!d.stars || typeof d.stars !== 'object') d.stars = {};
      return d;
    },

    /**
     * 保存某关通关星级（取最高）
     * @param {string} slug
     * @param {number} level - 关号（1-based）
     * @param {number} stars - 1~3
     * @param {number} [unlockNext=1] - 通关后顺带解锁下一关的关号（若已解锁更高则不覆盖）
     * @returns {boolean} 是否刷新了星级（用于判断是否弹"新纪录"）
     */
    saveLevelStars(slug, level, stars, unlockNext) {
      try {
        stars = Math.max(1, Math.min(3, Math.floor(stars)));
        const all = this._readJSON(this.KEY_LEVEL_PROGRESS, {});
        if (!all[slug]) all[slug] = { unlocked: 1, stars: {} };
        const d = all[slug];
        if (!d.stars) d.stars = {};
        const prev = d.stars[level] || 0;
        const improved = stars > prev;
        if (improved) d.stars[level] = stars;
        // 解锁下一关
        const next = unlockNext != null ? unlockNext : level + 1;
        if (next > d.unlocked) d.unlocked = next;
        this._writeJSON(this.KEY_LEVEL_PROGRESS, all);
        return improved;
      } catch (e) { return false; }
    },

    /**
     * 判断某关是否已解锁
     */
    isLevelUnlocked(slug, level) {
      return level <= this.getLevelProgress(slug).unlocked;
    },

    /**
     * 获取某游戏总星数
     */
    getTotalStars(slug) {
      const d = this.getLevelProgress(slug);
      let sum = 0;
      for (const k in d.stars) sum += d.stars[k] || 0;
      return sum;
    },

    /**
     * 重置某游戏关卡进度（谨慎调用）
     */
    resetLevelProgress(slug) {
      const all = this._readJSON(this.KEY_LEVEL_PROGRESS, {});
      delete all[slug];
      this._writeJSON(this.KEY_LEVEL_PROGRESS, all);
    },

    /* ============================================================
     *  14. 排行榜分享卡片（F）
     * ============================================================ */
    /**
     * 生成排行榜成绩分享卡片并下载
     * @param {string} slug
     * @param {Object} [opts] - { rank, gameName, lowerBetter }
     *   rank = 指定排名（如 1 = 冠军），不传则取最高分
     */
    shareLeaderboardCard(slug, opts) {
      const o = Object.assign({ rank: null, gameName: slug, lowerBetter: false }, opts || {});
      try {
        const lb = this.loadLeaderboard(slug);
        if (!lb.length) { this._toast('暂无成绩可分享'); return; }
        const sorted = lb.slice().sort((a, b) => o.lowerBetter ? a.score - b.score : b.score - a.score);
        const rec = o.rank ? sorted[o.rank - 1] || sorted[0] : sorted[0];
        const rankIdx = sorted.indexOf(rec) + 1;
        this._renderShareCard({
          gameName: o.gameName,
          rank: rankIdx,
          score: rec.score,
          date: rec.date,
          extra: rec.extra || {}
        });
      } catch (e) { this._toast('分享卡生成失败'); }
    },

    /**
     * 分享当前一局成绩（不依赖排行榜）
     * @param {Object} p - { gameName, score, extra }
     */
    shareScoreCard(p) {
      try {
        this._renderShareCard({
          gameName: p.gameName || '游戏小屋',
          rank: 0,
          score: p.score,
          date: Date.now(),
          extra: p.extra || {}
        });
      } catch (e) { this._toast('分享卡生成失败'); }
    },

    _renderShareCard(data) {
      const W = 600, H = 360;
      const c = document.createElement('canvas');
      c.width = W; c.height = H;
      const ctx = c.getContext('2d');
      // 背景
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, '#1a1f2e'); g.addColorStop(0.5, '#2a1f1a'); g.addColorStop(1, '#0d1117');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      // 金色边框
      ctx.strokeStyle = '#d4ab6a'; ctx.lineWidth = 2;
      ctx.strokeRect(16, 16, W - 32, H - 32);
      // 顶部小帽
      ctx.fillStyle = '#d4ab6a';
      ctx.font = '600 11px Manrope, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('— 游戏小屋 · 战绩卡 —', W / 2, 52);
      // 游戏名
      ctx.fillStyle = '#f5e6c8';
      ctx.font = '600 26px "Fraunces", serif';
      ctx.fillText(data.gameName, W / 2, 92);
      // 分隔线
      ctx.strokeStyle = 'rgba(212,171,106,0.3)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(80, 115); ctx.lineTo(W - 80, 115); ctx.stroke();
      // 排名（若有）
      if (data.rank > 0) {
        ctx.fillStyle = '#d4ab6a';
        ctx.font = '700 14px Manrope, sans-serif';
        ctx.fillText('排行榜第 ' + data.rank + ' 名', W / 2, 150);
      }
      // 大分数
      ctx.fillStyle = '#ffd700';
      ctx.font = '700 64px "Fraunces", serif';
      ctx.fillText(String(data.score), W / 2, 220);
      // 分数标签
      ctx.fillStyle = '#8a96b8';
      ctx.font = '600 12px Manrope, sans-serif';
      ctx.fillText('本局得分', W / 2, 245);
      // 日期 + 额外信息
      const d = new Date(data.date);
      const ds = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      let extraStr = '';
      if (data.extra) {
        const parts = [];
        for (const k in data.extra) parts.push(data.extra[k]);
        extraStr = parts.length ? ' · ' + parts.join(' · ') : '';
      }
      ctx.fillStyle = '#8a96b8';
      ctx.font = '12px Manrope, sans-serif';
      ctx.fillText(ds + extraStr, W / 2, 290);
      // 底部署名
      ctx.fillStyle = 'rgba(245,230,200,0.5)';
      ctx.font = '11px Manrope, sans-serif';
      ctx.fillText('周世杰 · 游戏小屋 · 即开即玩', W / 2, H - 40);
      // 二维码（简化版：用方块矩阵表示 slug+score，非标准二维码但具识别度）
      this._drawDecorQR(ctx, W - 70, H - 70, 50, data.gameName + data.score);

      // 下载
      const url = c.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = data.gameName + '_' + ds + '.png';
      a.click();
      this._toast('已下载分享卡');
    },

    // 装饰性"二维码"：基于字符串 hash 生成确定性方块矩阵
    _drawDecorQR(ctx, x, y, size, seedStr) {
      const cells = 8;
      const cs = size / cells;
      let h = 0;
      for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) | 0;
      ctx.fillStyle = '#d4ab6a';
      for (let r = 0; r < cells; r++) {
        for (let c = 0; c < cells; c++) {
          h = (h * 1103515245 + 12345) & 0x7fffffff;
          if ((h & 1) || (r < 2 && c < 2) || (r < 2 && c >= cells - 2) || (r >= cells - 2 && c < 2)) {
            ctx.fillRect(x + c * cs, y + r * cs, cs - 0.5, cs - 0.5);
          }
        }
      }
      // 三个定位角
      ctx.strokeStyle = '#d4ab6a'; ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, 2 * cs, 2 * cs);
      ctx.strokeRect(x + (cells - 2) * cs, y, 2 * cs, 2 * cs);
      ctx.strokeRect(x, y + (cells - 2) * cs, 2 * cs, 2 * cs);
    },

    /* ============================================================
     *  15. 全局快捷键（G）
     * ============================================================ */
    /**
     * 注册全局快捷键
     * @param {Object} handlers - {
     *   onEsc:Function,        // Esc：退出全屏/关闭浮层
     *   onHelp:Function,       // ?：唤起玩法提示
     *   onLeaderboard:Function // L：切换排行榜
     * }
     * @returns {Function} unregister 函数
     */
    registerGlobalShortcuts(handlers) {
      const h = Object.assign({ onEsc: null, onHelp: null, onLeaderboard: null }, handlers || {});
      const handler = (e) => {
        // 忽略输入框内的按键
        const tag = (e.target.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
        if (e.ctrlKey || e.metaKey || e.altKey) return; // 不拦截组合键
        if (e.key === 'Escape') {
          if (this.isFullscreen()) { this.toggleFullscreen(); e.preventDefault(); return; }
          if (h.onEsc) { h.onEsc(); e.preventDefault(); }
        } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
          if (h.onHelp) { h.onHelp(); e.preventDefault(); }
        } else if (e.key === 'l' || e.key === 'L') {
          if (h.onLeaderboard) { h.onLeaderboard(); e.preventDefault(); }
        }
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    },

    /**
     * 唤起玩法提示浮层（用 howto 数据，由页面传入或从 profile 读）
     * @param {string} text
     */
    showHowtoPopup(text) {
      if (!text) return;
      const old = document.getElementById('__gu_howto');
      if (old) old.remove();
      const m = document.createElement('div');
      m.id = '__gu_howto';
      m.style.cssText = [
        'position:fixed', 'inset:0', 'z-index:9999',
        'background:rgba(8,10,20,0.7)', 'backdrop-filter:blur(8px)',
        'display:flex', 'align-items:center', 'justify-content:center', 'padding:20px'
      ].join(';');
      m.innerHTML = `
        <div style="background:#1a1f2e;border:1px solid rgba(212,171,106,0.4);border-radius:14px;max-width:440px;width:100%;padding:24px;box-shadow:0 30px 80px rgba(0,0,0,.6)">
          <div style="text-align:center;margin-bottom:14px">
            <div style="color:#d4ab6a;font:700 10px Manrope,sans-serif;letter-spacing:.3em;text-transform:uppercase">— 玩法提示 —</div>
          </div>
          <div style="color:#f5e6c8;font:14px/1.7 Manrope,sans-serif;text-align:center">${this._esc(text)}</div>
          <button id="__gu_howto_ok" style="width:100%;margin-top:18px;background:#d4ab6a;border:none;color:#1a1f2e;padding:10px;border-radius:8px;cursor:pointer;font:700 13px Manrope,sans-serif">知道了</button>
        </div>`;
      document.body.appendChild(m);
      const close = () => m.remove();
      m.querySelector('#__gu_howto_ok').onclick = close;
      m.addEventListener('click', (e) => { if (e.target === m) close(); });
      const esc = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } };
      document.addEventListener('keydown', esc);
    },

    /* ============================================================
     *  16. PWA 更新提示（H）
     * ============================================================ */
    /**
     * 注册 Service Worker 并监听更新，弹出"新版本可用"toast
     * 替代原 registerSW（保留原方法名，增强行为）
     */
    registerSW() {
      if (!('serviceWorker' in navigator)) return;
      const swUrl = (document.documentElement.getAttribute('data-sw-root') || '') + 'sw.js';
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(swUrl, { scope: './' })
          .then((reg) => {
            // 监听更新
            reg.addEventListener('updatefound', () => {
              const nw = reg.installing;
              if (!nw) return;
              nw.addEventListener('statechange', () => {
                if (nw.state === 'installed' && navigator.serviceWorker.controller) {
                  // 新版本已下载，提示用户刷新
                  this._showUpdateToast(reg);
                }
              });
            });
            // 6.0+ 每隔一段时间检查更新
            setInterval(() => { try { reg.update(); } catch (e) {} }, 60 * 60 * 1000);
          })
          .catch(() => {});
      });
      // 监听 controller 变更（skipWaiting 后）
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // controller 已切换，若用户已确认则页面会自动刷新
      });
    },

    _showUpdateToast(reg) {
      const old = document.getElementById('__gu_update_toast');
      if (old) old.remove();
      const t = document.createElement('div');
      t.id = '__gu_update_toast';
      t.style.cssText = [
        'position:fixed', 'bottom:24px', 'left:50%', 'transform:translateX(-50%)',
        'z-index:9999', 'background:linear-gradient(135deg,#1a1f2e,#2a1f1a)',
        'border:1px solid #d4ab6a', 'border-radius:12px', 'padding:14px 20px',
        'display:flex', 'gap:14px', 'align-items:center',
        'box-shadow:0 10px 40px rgba(212,171,106,0.3)',
        'animation:__gu_slidein .4s cubic-bezier(.4,0,.2,1)'
      ].join(';');
      t.innerHTML = `
        <div style="font-size:24px">✨</div>
        <div style="color:#f5e6c8;font:600 13px Manrope,sans-serif">发现新版本，立即刷新生效？</div>
        <button id="__gu_update_yes" style="background:#d4ab6a;border:none;color:#1a1f2e;padding:7px 16px;border-radius:8px;cursor:pointer;font:700 12px Manrope,sans-serif">刷新</button>
        <button id="__gu_update_no" style="background:transparent;border:1px solid rgba(212,171,106,0.4);color:#8a96b8;padding:7px 14px;border-radius:8px;cursor:pointer;font:600 12px Manrope,sans-serif">稍后</button>
      `;
      document.body.appendChild(t);
      t.querySelector('#__gu_update_yes').onclick = () => {
        if (reg.waiting) reg.waiting.postMessage('SKIP_WAITING');
        setTimeout(() => location.reload(), 300);
      };
      t.querySelector('#__gu_update_no').onclick = () => t.remove();
    },

    /* ============================================================
     *  17. 内部工具
     * ============================================================ */
    _readJSON(key, def) {

      try {
        const v = localStorage.getItem(key);
        const parsed = v ? JSON.parse(v) : def;
        return parsed == null ? def : parsed;
      } catch (e) { return def; }
    },

    _writeJSON(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
    },

    _getKeyMtime(key) {
      // localStorage 无原生 mtime，用 stats.lastPlay 近似；找不到返回 0
      try {
        const stats = this._readJSON(this.KEY_STATS, { lastPlay: {} });
        for (const slug in stats.lastPlay) {
          if (key.startsWith(slug + '_')) return stats.lastPlay[slug];
        }
      } catch (e) {}
      return 0;
    },

    _esc(s) {
      if (s == null) return '';
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    _toast(msg, dur = 2000) {
      let t = document.querySelector('.__gu_toast');
      if (!t) {
        t = document.createElement('div');
        t.className = '__gu_toast';
        t.style.cssText = [
          'position:fixed', 'bottom:30px', 'left:50%', 'transform:translateX(-50%)',
          'background:rgba(26,31,46,0.95)', 'color:#f5e6c8',
          'padding:10px 20px', 'border-radius:8px', 'z-index:9999',
          'font:600 13px Manrope,sans-serif', 'box-shadow:0 8px 24px rgba(0,0,0,.3)',
          'border:1px solid rgba(212,171,106,0.3)'
        ].join(';');
        document.body.appendChild(t);
      }
      t.textContent = msg;
      t.style.opacity = '1';
      t.style.transition = 'opacity .2s';
      clearTimeout(t.__timer);
      t.__timer = setTimeout(() => { t.style.opacity = '0'; }, dur);
    }
  };

  /**
   * 成就定义清单（id → 名称/描述/图标）
   * 各游戏通过 GameUtils.unlock(id) 解锁，入口页档案卡遍历此清单展示
   */
  GU.ACHIEVEMENTS = {
    // —— 探索类 ——
    'first_play':      { name: '初次到访', desc: '第一次游玩任意游戏', icon: '🎮' },
    'play_3_games':    { name: '浅尝辄止', desc: '体验 3 款不同游戏', icon: '🎯' },
    'play_all_games':  { name: '全园通玩', desc: '体验全部 10 款游戏', icon: '🗺️' },
    'play_10_rounds':  { name: '常客', desc: '累计游玩 10 局', icon: '⏰' },
    'play_50_rounds':  { name: '游戏达人', desc: '累计游玩 50 局', icon: '🏆' },
    'total_1h':        { name: '一小时漫游', desc: '累计游玩满 60 分钟', icon: '⌛' },
    'enable_bgm':      { name: '奏响旋律', desc: '开启任意游戏的 BGM', icon: '🎵' },
    'try_skin':        { name: '换个皮肤', desc: '切换过一次游戏皮肤', icon: '🎨' },
    'use_screenshot':  { name: '定格瞬间', desc: '使用截图功能分享一次', icon: '📸' },
    'use_hint':        { name: '不耻下问', desc: '使用一次提示功能', icon: '💡' },

    // —— 贪吃蛇 ——
    'snake_score_50':  { name: '小蛇出山', desc: '贪吃蛇单局达 50 分', icon: '🐍' },
    'snake_score_100': { name: '蛇王', desc: '贪吃蛇单局达 100 分', icon: '👑' },
    'snake_dual_win':  { name: '双雄对决', desc: '完成一局双人模式', icon: '⚔️' },

    // —— 扫雷 ——
    'mine_first_clear':{ name: '初探雷区', desc: '完成首局扫雷', icon: '💣' },
    'mine_hard_clear': { name: '扫雷专家', desc: '通关高级难度', icon: '🥇' },
    'mine_no_flag':    { name: '记忆大师', desc: '禁标记模式通关', icon: '🧠' },

    // —— 解谜剧场 ——
    'puzzle_lv5':      { name: '汉字学徒', desc: '解谜剧场通关 5 关', icon: '字' },
    'puzzle_all':      { name: '字字珠玑', desc: '解谜剧场全关卡通关', icon: '📜' },

    // —— 瞬逝记忆拼图 ——
    'memory_lv5':      { name: '过目不忘', desc: '记忆拼图通关 5 关', icon: '🧩' },
    'memory_all':      { name: '记忆大师', desc: '记忆拼图全关卡通关', icon: '🔮' },

    // —— 光影棱镜 ——
    'prism_lv10':      { name: '光学初阶', desc: '光影棱镜通关 10 关', icon: '🌈' },
    'prism_all':       { name: '光之使者', desc: '光影棱镜全 30 关通关', icon: '✨' },

    // —— 声波盲境 ——
    'sonic_lv5':       { name: '回声定位', desc: '声波探路通关 5 关', icon: '📡' },
    'sonic_all':       { name: '暗夜行者', desc: '声波探路全 10 关通关', icon: '🌙' },

    // —— 引力弹弓 ——
    'gravity_lv10':    { name: '星际旅行者', desc: '引力弹弓通关 10 关', icon: '🚀' },
    'gravity_all':     { name: '宇宙导航员', desc: '引力弹弓全 20 关通关', icon: '🌌' },

    // —— 微型生态瓶 ——
    'eco_balance_1m':  { name: '生态守衡', desc: '生态瓶维持平衡 1 分钟', icon: '🌱' },
    'eco_3_species':   { name: '物种丰饶', desc: '生态瓶同时存在 3 种生物', icon: '🐠' },

    // —— 3D折叠数字魔方 ——
    'cube_512':        { name: '立体合成', desc: '魔方合成 512', icon: '🧊' },
    'cube_2048':       { name: '三千世界', desc: '魔方合成 2048', icon: '🏆' },

    // —— 节奏线条 ——
    'rhythm_500':      { name: '节奏初成', desc: '节奏线条单局 500 分', icon: '🎼' },
    'rhythm_2000':     { name: '律动大师', desc: '节奏线条单局 2000 分', icon: '🎵' }
  };

  /**
   * 获取已解锁+未解锁的完整成就列表（用于档案卡展示）
   * @returns {Array<{id,name,desc,icon,unlocked,time}>}
   */
  GU.getAchievementList = function () {
    const unlocked = GU.getAllAchievements();
    return Object.keys(GU.ACHIEVEMENTS).map(id => {
      const def = GU.ACHIEVEMENTS[id];
      return {
        id,
        name: def.name,
        desc: def.desc,
        icon: def.icon,
        unlocked: !!unlocked[id],
        time: unlocked[id] ? unlocked[id].time : null
      };
    });
  };

  // 注入全局动画 keyframes（仅一次）
  if (!document.getElementById('__gu_anim')) {
    const style = document.createElement('style');
    style.id = '__gu_anim';
    style.textContent = `
      @keyframes __gu_fade { from { opacity: 0 } to { opacity: 1 } }
      @keyframes __gu_slidein { from { opacity: 0; transform: translateX(20px) } to { opacity: 1; transform: translateX(0) } }
    `;
    document.head.appendChild(style);
  }

  global.GameUtils = GU;
})(window);
