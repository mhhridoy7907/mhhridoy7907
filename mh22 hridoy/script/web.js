    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
    import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
    import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIz*****************////vo",
      authDomain: "mh///////////////p.com",
      databaseURL: "https://m*******************atabase.app",
      projectId: "mh2-hridoy",
      storageBucket: "mh2-h****************app",
      messagingSenderId: "10*******506",
      appId: "1:10******06:web:689********384b",
      measurementId: "G-R*****6EVE"
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const projectsRef = ref(db, "portfolio/projects");

    const GH_USER = 'mhhridoy7907';
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwrvorOSev0VE3DVFrW9sGpym9reD4c1CDHIr5osLDN8f0c1PJMZU87U4hlI5CIDLiYHA/exec';

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
      setTimeout(() => document.getElementById('loading-screen').classList.add('hidden'), 1400);
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
      const c = document.getElementById('cursor'); const d = document.getElementById('cursor-dot');
      window.addEventListener('mousemove', e => {
        c.style.left=(e.clientX-18)+'px'; c.style.top=(e.clientY-18)+'px';
        d.style.left=(e.clientX-2.5)+'px'; d.style.top=(e.clientY-2.5)+'px';
      });
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
          <img src="${u.avatar_url}" alt="${u.name||u.login}" class="gh-avatar" loading="lazy" />
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
          <div style="font-size:2.5rem;margin-bottom:1rem;opacity:.4">⚙</div>
          <div class="gh-name">GitHub Profile</div>
          <p style="color:var(--txt-3);font-size:.8rem;margin:1rem 0">Loading live data…</p>
          <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width:100%;"><i class="fa-brands fa-github"></i> View Profile</a>
        </div>`;
    }

    /* ===== escape helpers ===== */
    function esc(str) { return String(str ?? '').replace(/[&<>"']/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[m])); }

    /* ===== Skeleton loading ===== */
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
          if (fa !== fb) return fb - fa;                          // featured first
          return (b[1].createdAt || 0) - (a[1].createdAt || 0);   // newest first
        });

      document.getElementById('stat-projects').textContent = entries.length;

      if (!entries.length) {
        grid.innerHTML = `<div class="projects-empty"><i class="fa-solid fa-folder-open"></i><div>No projects published yet. Check back soon.</div></div>`;
        return;
      }

      grid.innerHTML = entries.map(([id, p], i) => projectCardHtml(id, p, i)).join('');
      initReveal();

      grid.querySelectorAll('[data-open-project]').forEach(el => {
        el.addEventListener('click', () => openProjectModal(el.getAttribute('data-open-project')));
      });

      // if URL hash points to a project, try to open it
      maybeOpenFromHash();
    }

    onValue(projectsRef, (snap) => {
      liveProjects = snap.val() || {};
      renderProjects();
    }, (err) => {
      document.getElementById('projectsGrid').innerHTML = `<div class="projects-empty"><i class="fa-solid fa-triangle-exclamation"></i><div>Unable to load projects right now.</div></div>`;
    });

    /* ===== Project modal ===== */
    const modalOverlay = document.getElementById('project-modal-overlay');
    const modalContent = document.getElementById('pmodal-content');

    function openProjectModal(id) {
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
      initReveal(); initSkillBars(); initScroll(); initForm(); fetchGitHub();
    });
