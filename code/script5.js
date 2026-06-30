
    const GH_USER       = 'mhhridoy7907';
    const SCRIPT_URL    = '*************************';//=======api key========//

    const PROJECTS = [
      {
        title: 'Real-Time Chat App',
        desc: 'Full-featured messaging app with Node.js, Socket.io, and Firebase. Group chats, file sharing, and read receipts.',
        tags: ['Node.js','Socket.io','Firebase','Express'],
        tagClasses: ['tag-violet','tag-cyan','tag-amber','tag-green'],
        img: 'https://i.pinimg.com/736x/ee/0d/ba/ee0dbad652456ee2c93db01aefc2f799.jpg?w=600&q=80',
        github: 'https://github.com/mhhridoy7907/MH2-Chat', live: '',
      },
      {
  title: 'Chess Game',
  desc: 'A responsive web-based chess game featuring standard chess rules, interactive gameplay, move validation, and a clean, modern user interface.',
  tags: ['HTML', 'CSS', 'JavaScript', 'Chess'],
  tagClasses: ['tag-cyan', 'tag-violet', 'tag-rose', 'tag-green'],
  img: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=600&q=80',
  github: 'https://github.com/mhhridoy7907/Chess-Game',
  live: '',
},
      {
        title: 'Firebase E-Commerce',
        desc: 'Scalable e-commerce platform with Firebase Auth, Firestore, real-time inventory, and admin dashboard.',
        tags: ['Firebase','JavaScript','Firestore','CSS3'],
        tagClasses: ['tag-amber','tag-violet','tag-cyan','tag-green'],
        img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
        github: 'https://github.com/mhhridoy7907/Prime-Gadget-Zone', live: '',
      },
      {
  title: 'WhatsApp Inbox Viewer',
  desc: 'A modern WhatsApp inbox viewer with a clean interface for browsing conversations, viewing messages, and managing chat history efficiently.',
  tags: ['HTML', 'CSS', 'JavaScript', 'WhatsApp'],
  tagClasses: ['tag-violet', 'tag-green', 'tag-cyan', 'tag-rose'],
  img: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&q=80',
  github: 'https://github.com/mhhridoy7907/WhatsApp-inbox-viewer',
  live: '',
},
{
  title: 'Galaxy Engine',
  desc: 'A modern space-themed web application featuring an interactive galaxy interface, smooth animations, responsive design, and an immersive user experience.',
  tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
  tagClasses: ['tag-cyan', 'tag-violet', 'tag-rose', 'tag-green'],
  img: 'https://i.pinimg.com/736x/09/c8/52/09c852a8e15012d364e5ca45dddf1719.jpg?w=600&q=80',
  github: 'https://github.com/mhhridoy7907/Galaxy-Engine',
  live: '',
},

{
  title: 'ESP32 Car Control',
  desc: 'A Wi-Fi controlled ESP32 smart car project with real-time movement controls, responsive web interface, and wireless communication for remote operation.',
  tags: ['ESP32', 'Arduino', 'Wi-Fi', 'IoT'],
  tagClasses: ['tag-cyan', 'tag-violet', 'tag-rose', 'tag-green'],
  img: 'https://i.pinimg.com/736x/ea/e5/02/eae5026ece5dc51325064e9de0249a75.jpg?w=600&q=80',
  github: 'https://github.com/mhhridoy7907/ESP32-Car-Control',
  live: '',
},

    ];

    const TECH_STACK = [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'HTML5',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
      { name: 'Firebase',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
      { name: 'MongoDB',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'Linux',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
      { name: 'GitHub',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    ];


    window.addEventListener('load', () => {
      setTimeout(() => document.getElementById('loading-screen').classList.add('hidden'), 2000);
    });


    function initCanvas() {
      const canvas = document.getElementById('bg-canvas');
      const ctx = canvas.getContext('2d');
      let W, H, pts = [];

      function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }

      class Dot {
        constructor() { this.reset(); }
        reset() {
          this.x = Math.random() * W; this.y = Math.random() * H;
          this.r = Math.random() * 1.2 + 0.3;
          this.vx = (Math.random() - 0.5) * 0.25; this.vy = (Math.random() - 0.5) * 0.25;
          this.a = Math.random() * 0.4 + 0.05;
        }
        tick() {
          this.x += this.vx; this.y += this.vy;
          if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
      }

      function init() {
        pts = [];
        const n = Math.min(100, Math.floor((W * H) / 14000));
        for (let i = 0; i < n; i++) pts.push(new Dot());
      }

      function draw() {
        ctx.clearRect(0, 0, W, H);
        pts.forEach(p => {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(124,58,237,${p.a})`; ctx.fill(); p.tick();
        });
        requestAnimationFrame(draw);
      }

      resize(); init(); draw();
      window.addEventListener('resize', () => { resize(); init(); });
    }

    function initCursor() {
      const c = document.getElementById('cursor');
      const d = document.getElementById('cursor-dot');
      window.addEventListener('mousemove', e => {
        c.style.left = (e.clientX - 18) + 'px'; c.style.top = (e.clientY - 18) + 'px';
        d.style.left = (e.clientX - 2.5) + 'px'; d.style.top = (e.clientY - 2.5) + 'px';
      });
    }

    function initNavbar() {
      const nav = document.getElementById('navbar');
      const tog = document.getElementById('navToggle');
      const lnk = document.getElementById('navLinks');

      window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20));

      tog.addEventListener('click', () => {
        const open = lnk.classList.toggle('open');
        tog.classList.toggle('open', open);
        tog.setAttribute('aria-expanded', String(open));
      });
      lnk.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        lnk.classList.remove('open'); tog.classList.remove('open'); tog.setAttribute('aria-expanded','false');
      }));

      const secs = document.querySelectorAll('section[id]');
      const aLinks = document.querySelectorAll('.nav-links a');
      new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting)
            aLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
        });
      }, { threshold: 0.35 }).observe !== undefined &&
      secs.forEach(s => new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting)
            aLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
        });
      }, { threshold: 0.35 }).observe(s));
    }


    function initTheme() {
      const btn = document.getElementById('theme-toggle');
      const ico = document.getElementById('theme-icon');
      const html = document.documentElement;
      let dark = (localStorage.getItem('theme') || 'dark') === 'dark';

      function apply() {
        html.setAttribute('data-theme', dark ? 'dark' : 'light');
        ico.className = dark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
      }
      apply();
      btn.addEventListener('click', () => { dark = !dark; apply(); localStorage.setItem('theme', dark ? 'dark' : 'light'); });
    }


    function initTyping() {
      const el = document.getElementById('typed-text');
      const words = ['Full-Stack Developer', 'Firebase Specialist', 'Node.js Engineer', 'AI Developer', 'Problem Solver'];
      let wi = 0, ci = 0, del = false;

      function tick() {
        const w = words[wi];
        if (!del) {
          el.textContent = w.slice(0, ++ci);
          if (ci === w.length) { del = true; setTimeout(tick, 2000); return; }
          setTimeout(tick, 75);
        } else {
          el.textContent = w.slice(0, --ci);
          if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
          setTimeout(tick, 38);
        }
      }
      setTimeout(tick, 700);
    }

    
    function initTicker() {
      const track = document.getElementById('tickerTrack');
      const doubled = [...TECH_STACK, ...TECH_STACK];
      track.innerHTML = doubled.map(t => `
        <div class="ticker-item">
          <img src="${t.icon}" alt="${t.name}" loading="lazy" />
          ${t.name}
        </div>
      `).join('');
    }


    function initProjects() {
      document.getElementById('projectsGrid').innerHTML = PROJECTS.map((p, i) => `
        <div class="project-card reveal reveal-delay-${(i % 3) + 1}">
          <div class="project-thumb">
            <img src="${p.img}" alt="${p.title}" loading="lazy" />
            <div class="project-thumb-overlay" aria-hidden="true"></div>
            <span class="project-num mono">0${i + 1}</span>
          </div>
          <div class="project-body">
            <div class="project-tags">
              ${p.tags.map((tag, j) => `<span class="tag ${p.tagClasses[j] || 'tag-violet'}">${tag}</span>`).join('')}
            </div>
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.desc}</p>
            <div class="project-footer">
              ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fa-brands fa-github"></i> Code</a>` : ''}
              ${p.live   ? `<a href="${p.live}"   target="_blank" rel="noopener noreferrer" class="project-link live"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a>` : ''}
            </div>
          </div>
        </div>
      `).join('');
      initReveal();
    }


    function initReveal() {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
      }, { threshold: 0.08 });
      document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    }


    function initSkillBars() {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.skill-fill').forEach(b => b.style.width = b.dataset.width + '%');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.25 });
      document.querySelectorAll('.skill-card').forEach(c => io.observe(c));
    }


    function initScroll() {
      const prog = document.getElementById('scroll-progress');
      const btt  = document.getElementById('back-to-top');
      window.addEventListener('scroll', () => {
        prog.style.width = (scrollY / (document.body.scrollHeight - innerHeight) * 100) + '%';
        btt.classList.toggle('visible', scrollY > 400);
      });
      btt.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
    }

    async function fetchGitHub() {
      try {
        const res  = await fetch(`https://api.github.com/users/${GH_USER}`);
        const user = await res.json();
        if (!res.ok) throw new Error();

        [document.getElementById('stat-repos'), document.getElementById('about-repos')]
          .forEach(el => el && (el.textContent = user.public_repos || 0));
        document.getElementById('stat-followers') && (document.getElementById('stat-followers').textContent = user.followers || 0);

        renderGitHubCard(user);
      } catch {
        renderGitHubFallback();
      }
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
            <div class="gh-stat">
              <div class="gh-stat-num">${u.public_repos||0}</div>
              <div class="gh-stat-label">Repos</div>
            </div>
            <div class="gh-stat">
              <div class="gh-stat-num">${u.followers||0}</div>
              <div class="gh-stat-label">Followers</div>
            </div>
            <div class="gh-stat">
              <div class="gh-stat-num">${u.following||0}</div>
              <div class="gh-stat-label">Following</div>
            </div>
            <div class="gh-stat">
              <div class="gh-stat-num">${u.public_gists||0}</div>
              <div class="gh-stat-label">Gists</div>
            </div>
          </div>
          <div class="gh-meta">
            ${u.location ? `<span class="gh-meta-item"><i class="fa-solid fa-location-dot"></i> ${u.location}</span>` : ''}
            <span class="gh-meta-item"><i class="fa-solid fa-calendar-days"></i> ${joined}</span>
          </div>
          <a href="https://github.com/${u.login}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width:100%;">
            <i class="fa-brands fa-github"></i> Full Profile
          </a>
        </div>
      `;
    }

    function renderGitHubFallback() {
      document.getElementById('github-profile-section').innerHTML = `
        <div class="github-profile">
          <div style="font-size:2.5rem; margin-bottom:1rem; opacity:0.4">⚙</div>
          <div class="gh-name">GitHub Profile</div>
          <p style="color:var(--txt-3);font-size:0.8rem;margin:1rem 0">Loading live data…</p>
          <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width:100%;">
            <i class="fa-brands fa-github"></i> View Profile
          </a>
        </div>
      `;
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
        form.querySelectorAll('[required]').forEach(f => {
          const ok = f.value.trim();
          f.style.borderColor = ok ? '' : 'var(--rose)';
          if (!ok) valid = false;
        });
        if (!valid) {
          status.textContent = '⚠️ Please fill in all required fields.';
          status.className = 'form-status error';
          return;
        }

        const data = Object.fromEntries(new FormData(form));
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending…';
        status.className = 'form-status';
        status.style.display = 'none';

        if (!SCRIPT_URL) {
          await new Promise(r => setTimeout(r, 1000));
          status.innerHTML = '✅ Message received!';
          status.className = 'form-status success';
          form.reset();
          btn.disabled = false; btn.innerHTML = origHTML;
          return;
        }

        try {
          await fetch(SCRIPT_URL, {
            method: 'POST', mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({ action: 'contact', data, timestamp: new Date().toISOString() }),
          });
          status.innerHTML = "✅ Sent! I'll respond within 24 hours.";
          status.className = 'form-status success';
          form.reset();
        } catch {
          status.textContent = '⚠️ Error sending. Please email me directly.';
          status.className = 'form-status error';
        } finally {
          btn.disabled = false; btn.innerHTML = origHTML;
          setTimeout(() => { status.className = 'form-status'; status.style.display = 'none'; }, 6000);
        }
      });
    }


    document.addEventListener('DOMContentLoaded', () => {
      initCanvas();
      initCursor();
      initNavbar();
      initTheme();
      initTyping();
      initTicker();
      initProjects();
      initReveal();
      initSkillBars();
      initScroll();
      initForm();
      fetchGitHub();
    });
