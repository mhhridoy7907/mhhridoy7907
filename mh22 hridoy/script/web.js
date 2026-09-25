    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
    import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
    import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

    /*======== this api for daynammicly project update and control =============*/

    const firebaseConfig = {
      apiKey: "A**************************vo",
      authDomain: "mh2***************om",
      databaseURL: "htt***************sedatabase.app",
      projectId: "mh2-hridoy",
      storageBucket: "m***************e.app",
      messagingSenderId: "10*********506",
      appId: "1:10***************2384b",
      measurementId: "G-R****E"
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const projectsRef = ref(db, "portfolio/projects");

    const GH_USER = 'mhhridoy7907';
    /*for mail send api */
    const SCRIPT_URL = 'https://script.********************IDLiYHA/exec';

    const TECH_STACK = [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    ];

    let liveProjects = {};

    window.addEventListener('load', () => {
      requestAnimationFrame(() => {
        const loader = document.getElementById('loading-screen');
        loader.classList.add('hidden');
      });
    });

    function initCanvas() {
      const canvas = document.getElementById('bg-canvas');
      const ctx = canvas.getContext('2d');
      let W, H, pts = [];
      function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
      class Dot {
        constructor() { this.reset(); }
        reset() { this.x = Math.random()*W; this.y = Math.random()*H; this.r = Math.random()*1.2+0.3; this.vx=(Math.random()-0.5)*0.25; this.vy=(Math.random()-0.5)*0.25; this.a=Math.random()*0.4+0.05; }
        tick() { this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>W||this.y<0||this.y>H) this.reset(); }
      }
      function init() { pts=[]; const n=Math.min(100,Math.floor((W*H)/14000)); for(let i=0;i<n;i++) pts.push(new Dot()); }
      function draw() { ctx.clearRect(0,0,W,H); pts.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(124,58,237,${p.a})`; ctx.fill(); p.tick(); }); requestAnimationFrame(draw); }
      resize(); init(); draw();
      window.addEventListener('resize', () => { resize(); init(); });
    }

    function initCursor() {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const touchDevice = matchMedia('(hover:none), (pointer:coarse)').matches;
      if (reduced) return;
      const c = document.getElementById('cursor');
      const d = document.getElementById('cursor-dot');
      const trail = document.getElementById('liquid-trail');
      if (!trail) return;

      const drops = [];
      const maxDrops = touchDevice ? 7 : 12;
      let mx = innerWidth / 2, my = innerHeight / 2;
      let tx = mx, ty = my, vx = 0, vy = 0;
      let last = performance.now(), raf = 0, active = false, touchActive = false;
      let lastTouchTime = 0;

      for (let i = 0; i < maxDrops; i++) {
        const el = document.createElement('span');
        el.className = 'liquid-drop';
        trail.appendChild(el);
        drops.push({ el, x:mx, y:my, size:(touchDevice ? 9 : 11) + (maxDrops-i)*.65 });
      }

      const touchOrb = document.createElement('span');
      touchOrb.className = 'touch-orb';
      trail.appendChild(touchOrb);

      function setTarget(x,y) {
        mx = x; my = y; active = true;
      }

      function makeRipple(x,y,touch=false) {
        const r = document.createElement('span');
        r.className = 'liquid-ripple';
        r.style.left = x + 'px'; r.style.top = y + 'px';
        if (touch) {
          r.style.width = '18px'; r.style.height = '18px';
          r.style.borderColor = 'rgba(34,211,238,.42)';
        }
        trail.appendChild(r);
        setTimeout(() => r.remove(), touch ? 850 : 700);
      }

      function moveMouse(e) { if (!touchDevice) setTarget(e.clientX,e.clientY); }
      function pointerMove(e) {
        if (e.pointerType === 'touch') {
          lastTouchTime = performance.now();
          setTarget(e.clientX,e.clientY);
          touchActive = true;
          touchOrb.classList.add('active');
        }
      }
      function touchStart(e) {
        if (!e.touches[0]) return;
        const t = e.touches[0];
        lastTouchTime = performance.now();
        setTarget(t.clientX,t.clientY);
        touchActive = true;
        touchOrb.classList.add('active');
        makeRipple(t.clientX,t.clientY,true);
      }
      function touchMove(e) {
        if (!e.touches[0]) return;
        const t = e.touches[0];
        lastTouchTime = performance.now();
        setTarget(t.clientX,t.clientY);
        touchActive = true;
      }
      function touchEnd(e) {
        const t = e.changedTouches && e.changedTouches[0];
        if (t) makeRipple(t.clientX,t.clientY,true);
        setTimeout(() => {
          if (performance.now() - lastTouchTime > 100) {
            touchActive = false;
            touchOrb.classList.remove('active');
          }
        },180);
      }

      window.addEventListener('mousemove', moveMouse, {passive:true});
      window.addEventListener('pointermove', pointerMove, {passive:true});
      window.addEventListener('click', e => { if (!touchDevice) makeRipple(e.clientX,e.clientY,false); }, {passive:true});
      if (touchDevice) {
        window.addEventListener('touchstart', touchStart, {passive:true});
        window.addEventListener('touchmove', touchMove, {passive:true});
        window.addEventListener('touchend', touchEnd, {passive:true});
        window.addEventListener('touchcancel', touchEnd, {passive:true});
      }

      function frame(now) {
        const dt = Math.min(32, now-last) / 16.67; last = now;
        tx += (mx-tx) * Math.min(.3, .2*dt);
        ty += (my-ty) * Math.min(.3, .2*dt);
        vx = vx*.76 + (mx-tx)*.24;
        vy = vy*.76 + (my-ty)*.24;
        const speed = Math.min(42, Math.hypot(vx,vy));
        const angle = Math.atan2(vy,vx) * 180 / Math.PI;
        const stretch = 1 + speed*.032;

        if (!touchDevice) {
          c.style.left = (tx-17) + 'px'; c.style.top = (ty-17) + 'px';
          c.style.width = (34 + Math.min(11,speed*.22)) + 'px';
          c.style.height = (34 - Math.min(5,speed*.1)) + 'px';
          c.style.borderRadius = `${50+Math.min(13,speed*.35)}% ${50-Math.min(10,speed*.25)}% ${57-Math.min(15,speed*.32)}% ${43+Math.min(12,speed*.25)}%`;
          c.style.transform = `rotate(${angle*.55}deg) scaleX(${stretch})`;
          d.style.left = (tx-3.5) + 'px'; d.style.top = (ty-3.5) + 'px';
        }

        touchOrb.style.left = tx + 'px';
        touchOrb.style.top = ty + 'px';
        touchOrb.style.transform = `translate(-50%,-50%) scale(${touchActive ? 1 + Math.min(.3,speed*.012) : .55})`;

        let px = tx, py = ty;
        drops.forEach((p,i) => {
          const follow = Math.max(.13, .29 - i*.022);
          p.x += (px-p.x)*follow; p.y += (py-p.y)*follow;
          const lagX = Math.max(-24,Math.min(24,(px-p.x)*.11));
          const lagY = Math.max(-24,Math.min(24,(py-p.y)*.11));
          const scale = Math.max(.4,1-i*.055) * (1 + speed*.007);
          p.el.style.width = (p.size + speed*.2) + 'px';
          p.el.style.height = (p.size*.84 + speed*.1) + 'px';
          p.el.style.opacity = String(Math.max(.055,.5-i*.034) * (active ? 1 : .35));
          p.el.style.transform = `translate(${p.x}px,${p.y}px) translate(${lagX}px,${lagY}px) scale(${scale}) rotate(${angle*.7}deg)`;
          px = p.x; py = p.y;
        });
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
      window.addEventListener('blur', () => { active=false; touchActive=false; touchOrb.classList.remove('active'); cancelAnimationFrame(raf); });
      window.addEventListener('focus', () => { if (!raf) raf=requestAnimationFrame(frame); });
    }

    function initNavbar() {
      const nav = document.getElementById('navbar'); const tog = document.getElementById('navToggle'); const lnk = document.getElementById('navLinks');
      window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20));
      tog.addEventListener('click', () => { const open = lnk.classList.toggle('open'); tog.classList.toggle('open', open); tog.setAttribute('aria-expanded', String(open)); });
      lnk.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { lnk.classList.remove('open'); tog.classList.remove('open'); tog.setAttribute('aria-expanded','false'); }));
      const secs = document.querySelectorAll('section[id]'); const aLinks = document.querySelectorAll('.nav-links a');
      secs.forEach(s => new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) aLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)); }); }, { threshold: 0.35 }).observe(s));
    }

    function initTheme() {
      const btn = document.getElementById('theme-toggle'); const ico = document.getElementById('theme-icon'); const html = document.documentElement;
      let dark = true;
      function apply() { html.setAttribute('data-theme', dark ? 'dark' : 'light'); ico.className = dark ? 'fa-solid fa-moon' : 'fa-solid fa-sun'; }
      apply();
      btn.addEventListener('click', () => { dark = !dark; apply(); });
    }

    function initTyping() {
      const el = document.getElementById('typed-text');
      const words = ['Full-Stack Developer', 'Firebase Specialist', 'Node.js Engineer', 'AI Developer', 'Problem Solver'];
      let wi = 0, ci = 0, del = false;
      function tick() {
        const w = words[wi];
        if (!del) { el.textContent = w.slice(0, ++ci); if (ci === w.length) { del = true; setTimeout(tick, 2000); return; } setTimeout(tick, 75); }
        else { el.textContent = w.slice(0, --ci); if (ci === 0) { del = false; wi = (wi + 1) % words.length; } setTimeout(tick, 38); }
      }
      setTimeout(tick, 700);
    }

    function initTicker() {
      const track = document.getElementById('tickerTrack');
      const doubled = [...TECH_STACK, ...TECH_STACK];
      track.innerHTML = doubled.map(t => `<div class="ticker-item"><img src="${t.icon}" alt="${t.name}" loading="lazy" />${t.name}</div>`).join('');
    }

    function initReveal() {
      const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }); }, { threshold: 0.08 });
      document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    }

    function initSkillBars() {
      const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.skill-fill').forEach(b => b.style.width = b.dataset.width + '%'); io.unobserve(e.target); } }); }, { threshold: 0.25 });
      document.querySelectorAll('.skill-card').forEach(c => io.observe(c));
    }

    function initCardSpotlights() {
      const cards = document.querySelectorAll('.skill-card,.project-card,.github-profile,.gh-embed-card,.contact-form,.contact-channel');
      cards.forEach(card => {
        card.addEventListener('pointermove', e => {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100)+'%');
          card.style.setProperty('--my', ((e.clientY-r.top)/r.height*100)+'%');
        }, { passive:true });
      });
    }


    function initScroll() {
      const prog = document.getElementById('scroll-progress'); const btt = document.getElementById('back-to-top');
      window.addEventListener('scroll', () => { prog.style.width = (scrollY / (document.body.scrollHeight - innerHeight) * 100) + '%'; btt.classList.toggle('visible', scrollY > 400); });
      btt.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
    }

    async function fetchGitHub() {
      try {
        const res = await fetch(`https://api.github.com/users/${GH_USER}`);
        const user = await res.json();
        if (!res.ok) throw new Error();
        document.getElementById('stat-repos').textContent = user.public_repos || 0;
        document.getElementById('stat-followers').textContent = user.followers || 0;
        renderGitHubCard(user);
      } catch { renderGitHubFallback(); }
    }

    function renderGitHubCard(u) {
      const joined = new Date(u.created_at).toLocaleDateString('en-US', { year:'numeric', month:'short' });
      document.getElementById('github-profile-section').innerHTML = `
        <div class="github-profile">
          <div class="gh-avatar-container">
            <div class="gh-avatar-ring"></div>
            <div class="gh-avatar-ring"></div>
            <div class="gh-avatar-glow"></div>
            <img src="${u.avatar_url}" alt="${u.name||u.login}" class="gh-avatar" loading="lazy" />
          </div>
          <div class="gh-name">${u.name || u.login}</div>
          <div class="gh-handle">@${u.login}</div>
          <div class="gh-bio">${u.bio || 'A passionate developer building amazing things.'}</div>
          <div class="gh-stats">
            <div class="gh-stat"><div class="gh-stat-num">${u.public_repos||0}</div><div class="gh-stat-label">Repos</div></div>
            <div class="gh-stat"><div class="gh-stat-num">${u.followers||0}</div><div class="gh-stat-label">Followers</div></div>
            <div class="gh-stat"><div class="gh-stat-num">${u.following||0}</div><div class="gh-stat-label">Following</div></div>
            <div class="gh-stat"><div class="gh-stat-num">${u.public_gists||0}</div><div class="gh-stat-label">Gists</div></div>
          </div>
          <div class="gh-meta">
            ${u.location ? `<span class="gh-meta-item"><i class="fa-solid fa-location-dot"></i> ${u.location}</span>` : ''}
            <span class="gh-meta-item"><i class="fa-solid fa-calendar-days"></i> ${joined}</span>
          </div>
          <a href="https://github.com/${u.login}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width:100%;"><i class="fa-brands fa-github"></i> Full Profile</a>
        </div>`;
    }

    function renderGitHubFallback() {
      document.getElementById('github-profile-section').innerHTML = `
        <div class="github-profile">
          <div style="font-size:2.5rem;margin-bottom:1rem;opacity:.4"><i class="fa-brands fa-github"></i></div>
          <div class="gh-name">GitHub data unavailable</div>
          <p style="color:var(--txt-3);font-size:.8rem;margin:1rem 0">Live statistics could not be loaded right now.</p>
          <button class="btn btn-primary" type="button" id="github-retry" style="width:100%;"><i class="fa-solid fa-rotate-right"></i> Retry</button>
          <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost" style="width:100%;margin-top:.65rem;"><i class="fa-brands fa-github"></i> View Profile</a>
        </div>`;
      document.getElementById('github-retry')?.addEventListener('click', fetchGitHub);
    }

    function esc(str) { return String(str ?? '').replace(/[&<>"']/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[m])); }

    function renderSkeletons(count = 3) {
      const grid = document.getElementById('projectsGrid');
      let html = '';
      for (let i = 0; i < count; i++) {
        html += `
          <div class="skeleton-card">
            <div class="skeleton-thumb"></div>
            <div class="skeleton-body">
              <div class="skeleton-line w40"></div>
              <div class="skeleton-line w90"></div>
              <div class="skeleton-line w60"></div>
            </div>
          </div>`;
      }
      grid.innerHTML = html;
    }
    renderSkeletons();

    const tagPalette = ['tag-violet','tag-cyan','tag-green','tag-amber','tag-rose'];

    function projectCardHtml(id, p, index) {
      const techs = p.technologies || [];
      return `
        <div class="project-card reveal reveal-delay-${(index % 3) + 1}">
          <div class="project-thumb">
            <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" onerror="this.src='https://placehold.co/600x400/0c1526/475569?text=No+Image'" />
            <div class="project-thumb-overlay" aria-hidden="true"></div>
            <span class="project-num mono">0${index + 1}</span>
            ${p.featured ? `<span class="featured-badge"><i class="fa-solid fa-star"></i> Featured</span>` : ''}
          </div>
          <div class="project-body">
            <div class="project-tags">
              ${techs.map((tag, j) => `<span class="tag ${tagPalette[j % tagPalette.length]}">${esc(tag)}</span>`).join('')}
            </div>
            <h3 class="project-title">${esc(p.title)}</h3>
            <p class="project-desc">${esc(p.shortDescription)}</p>
            <div class="project-footer">
              <span class="project-link read-more" data-open-project="${id}"><i class="fa-solid fa-book-open"></i> Read More</span>
              ${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fa-brands fa-github"></i> Code</a>` : ''}
              ${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener noreferrer" class="project-link live"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>` : ''}
            </div>
          </div>
        </div>`;
    }

    function renderProjects() {
      const grid = document.getElementById('projectsGrid');
      const entries = Object.entries(liveProjects)
        .filter(([id, p]) => (p.status || 'live') !== 'archived')
        .sort((a, b) => {
          const fa = a[1].featured ? 1 : 0, fb = b[1].featured ? 1 : 0;
          if (fa !== fb) return fb - fa;
          return (b[1].createdAt || 0) - (a[1].createdAt || 0);
        });

      document.getElementById('stat-projects').textContent = entries.length;

      if (!entries.length) {
        grid.innerHTML = `<div class="projects-empty"><i class="fa-solid fa-folder-open"></i><div>No projects published yet. Check back soon.</div></div>`;
        return;
      }

      grid.innerHTML = entries.map(([id, p], i) => projectCardHtml(id, p, i)).join('');
      initReveal();
      initCardSpotlights();

      grid.querySelectorAll('[data-open-project]').forEach(el => {
        el.addEventListener('click', () => openProjectModal(el.getAttribute('data-open-project')));
      });

      maybeOpenFromHash();
    }

    onValue(projectsRef, (snap) => {
      liveProjects = snap.val() || {};
      renderProjects();
    }, (err) => {
      document.getElementById('projectsGrid').innerHTML = `<div class="projects-empty"><i class="fa-solid fa-triangle-exclamation"></i><div>Unable to load projects right now.</div></div>`;
    });

    const modalOverlay = document.getElementById('project-modal-overlay');
    const modalContent = document.getElementById('pmodal-content');
    let modalReturnFocus = null;

    function openProjectModal(id) {
      modalReturnFocus = document.activeElement;
      const p = liveProjects[id];
      if (!p) { render404(); }
      else {
        const techs = p.technologies || [];
        modalContent.innerHTML = `
          <div class="pmodal-hero">
            <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" onerror="this.src='https://placehold.co/800x400/0c1526/475569?text=No+Image'" />  
            <div class="pmodal-hero-overlay" aria-hidden="true"></div>  
            <button class="pmodal-close" id="pmodal-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>  
          </div>  
          <div class="pmodal-body">  
            <div class="pmodal-tags">${techs.map((t, j) => `<span class="tag ${tagPalette[j % tagPalette.length]}">${esc(t)}</span>`).join('')}</div>  
            <h2 class="pmodal-title">${esc(p.title)}</h2>  
            <p class="pmodal-desc">${esc(p.fullDescription || p.shortDescription)}</p>  
            <div class="pmodal-actions">  
              ${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost"><i class="fa-brands fa-github"></i> View Code</a>` : ''}  
              ${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>` : ''}  
            </div>  
          </div>`;  
      }  
      modalOverlay.classList.add('open');  
      document.body.style.overflow = 'hidden';  
      history.replaceState(null, '', '#project-' + id);  
      document.getElementById('pmodal-close')?.addEventListener('click', closeProjectModal);  
      document.getElementById('pmodal-close')?.focus();  
    }  
  
    function render404() {  
      modalContent.innerHTML = `  
        <div class="pmodal-body p404" style="padding-top:3rem;">  
          <button class="pmodal-close" id="pmodal-close" aria-label="Close" style="position:absolute; top:1.1rem; right:1.1rem; background:rgba(255,255,255,.06);"><i class="fa-solid fa-xmark"></i></button>  
          <i class="fa-solid fa-ghost"></i>  
          <h3>404 — Project Not Found</h3>  
          <p>This project may have been removed or no longer exists.</p>  
          <a href="#projects" class="btn btn-primary" id="p404-back"><i class="fa-solid fa-arrow-left"></i> Back to Projects</a>  
        </div>`;  
      document.getElementById('p404-back').addEventListener('click', closeProjectModal);  
    }  
  
    function closeProjectModal() {  
      modalOverlay.classList.remove('open');  
      document.body.style.overflow = '';  
      history.replaceState(null, '', location.pathname + location.search);  
      modalReturnFocus?.focus?.();  
    }  
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeProjectModal(); });  
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeProjectModal(); });  
  
    function maybeOpenFromHash() {  
      const h = location.hash;  
      if (h && h.startsWith('#project-')) {  
        const id = h.replace('#project-', '');  
        openProjectModal(id);  
      }  
    }  
  
    function initForm() {  
      const form = document.getElementById('contact-form');  
      if (!form) return;  
      const status = document.getElementById('contact-status');  
      const btn = form.querySelector('button[type="submit"]');  
      const origHTML = btn.innerHTML;  
  
      form.addEventListener('submit', async e => {  
        e.preventDefault();  
        let valid = true;  
        form.querySelectorAll('[required]').forEach(f => { const ok = f.value.trim(); f.style.borderColor = ok ? '' : 'var(--rose)'; if (!ok) valid = false; });  
        if (!valid) { status.textContent = '⚠️ Please fill in all required fields.'; status.className = 'form-status error'; return; }  
  
        const data = Object.fromEntries(new FormData(form));  
        btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending…';  
        status.className = 'form-status'; status.style.display = 'none';  
  
        if (!SCRIPT_URL) {  
          await new Promise(r => setTimeout(r, 1000));  
          status.innerHTML = '✅ Message received!'; status.className = 'form-status success';  
          form.reset(); btn.disabled = false; btn.innerHTML = origHTML; return;  
        }  
        try {  
          await fetch(SCRIPT_URL, { method:'POST', mode:'no-cors', headers:{'Content-Type':'text/plain'}, body: JSON.stringify({ action:'contact', data, timestamp: new Date().toISOString() }) });  
          status.innerHTML = "✅ Sent! I'll respond within 24 hours."; status.className = 'form-status success'; form.reset();  
        } catch { status.textContent = '⚠️ Error sending. Please email me directly.'; status.className = 'form-status error'; }  
        finally { btn.disabled = false; btn.innerHTML = origHTML; setTimeout(() => { status.className = 'form-status'; status.style.display = 'none'; }, 6000); }  
      });  
    }  
  
    document.addEventListener('DOMContentLoaded', () => {  
      initCanvas(); initCursor(); initNavbar(); initTheme(); initTyping(); initTicker();  
      initReveal(); initSkillBars(); initCardSpotlights(); initScroll(); initForm(); fetchGitHub();  
    });  

