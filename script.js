/* EchoBox script.js v2 */

// ---- LENIS ----
const lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothTouch: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);

// ---- NAV ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), { passive: true });

const burger = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');
burger?.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// ---- SMOOTH ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -80, duration: 1.3 }); }
  });
});

// ---- SCROLL PROGRESS ----
const prog = document.getElementById('scroll-progress');
lenis.on('scroll', ({ progress }) => { if (prog) prog.style.width = `${progress * 100}%`; });

// ---- PARTICLES ----
(function () {
  const c = document.getElementById('heroParticles');
  if (!c) return;
  const cols = ['#ff2947', '#ff6b7a', '#fff', '#f54848'];
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = 1.5 + Math.random() * 3;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${70+Math.random()*30}%;background:${cols[Math.floor(Math.random()*cols.length)]};animation-duration:${8+Math.random()*16}s;animation-delay:${Math.random()*12}s`;
    c.appendChild(p);
  }
})();

// ---- REVEAL ----
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, idx = [...(el.parentElement?.querySelectorAll('.reveal,.reveal-left,.reveal-right') || [])].indexOf(el);
    setTimeout(() => el.classList.add('visible'), idx * 90);
    ro.unobserve(el);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => ro.observe(el));

// ---- HERO ENTRANCE ----
gsap.timeline({ defaults: { ease: 'power3.out' } })
  .from('.hero-eyebrow',    { y: 20, opacity: 0, duration: 0.8, delay: 0.3 })
  .from('.hero-logo',       { y: -20, opacity: 0, duration: 0.9 }, '-=0.4')
  .from('.hero-tagline',    { y: 18, opacity: 0, duration: 0.7 }, '-=0.4')
  .from('.hero-ip-wrap',    { y: 18, opacity: 0, duration: 0.6 }, '-=0.3')
  .from('.hero-ctas',       { y: 18, opacity: 0, duration: 0.6 }, '-=0.3')
  .from('.hero-stats',      { y: 18, opacity: 0, duration: 0.6 }, '-=0.3')
  .from('.hero-scroll-hint',{ opacity: 0, duration: 0.5 }, '-=0.1');

gsap.to('.hero-grid', { yPercent: 25, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: 1, start: 'top top', end: 'bottom top' } });

// ---- WORLD DATA + SVG ICONS ----
const worldIcons = {
  flame: `<svg class="world-svg" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  leaf:  `<svg class="world-svg" viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  star:  `<svg class="world-svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  moon:  `<svg class="world-svg" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  sword: `<svg class="world-svg" viewBox="0 0 24 24"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/></svg>`,
  wave:  `<svg class="world-svg" viewBox="0 0 24 24"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`,
  home:  `<svg class="world-svg" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
};
const worldIconMap = {
  'Spawn': 'home', 'Nether': 'flame', 'Toxic': 'flame', 'Tech': 'flame',
  'Jungle': 'leaf', 'Farm': 'leaf', 'Cherry Forest': 'leaf', 'Beach': 'leaf', "Bee's Kingdom": 'leaf',
  'Heaven': 'star', 'Space': 'star', 'Dream': 'star', 'End': 'star',
  'Ancient City': 'moon', 'Deepslate Caverns': 'moon', 'Nightmare': 'moon', 'Deep Caves': 'moon',
  "Gladiator's Colosseum": 'sword', 'Wild West': 'sword',
  'Underwater City': 'wave', 'Arctic': 'wave'
};
const worlds = [
  { name: 'Spawn',               color: '#77DD77', tag: 'Hub' },
  { name: 'Nether',              color: '#FFB347', tag: 'Danger' },
  { name: 'Underwater City',     color: '#AEC6CF', tag: 'Exploration' },
  { name: 'End',                 color: '#CBAACB', tag: 'Endgame' },
  { name: 'Ancient City',        color: '#B39EB5', tag: 'Mystery' },
  { name: 'Deepslate Caverns',   color: '#889696', tag: 'Mining' },
  { name: 'Heaven',              color: '#FDFD96', tag: 'Peaceful' },
  { name: 'Jungle',              color: '#A8E6A3', tag: 'Wild' },
  { name: "Gladiator's Colosseum", color: '#FFDAC1', tag: 'PvP Arena' },
  { name: "Bee's Kingdom",       color: '#FFB347', tag: 'Quirky' },
  { name: 'Toxic',               color: '#B5EAD7', tag: 'Biohazard' },
  { name: 'Space',               color: '#CFCFC4', tag: 'Sci-Fi' },
  { name: 'Arctic',              color: '#B0E0E6', tag: 'Frozen' },
  { name: 'Beach',               color: '#FFF5BA', tag: 'Chill' },
  { name: 'Cherry Forest',       color: '#FFB7B2', tag: 'Serene' },
  { name: 'Farm',                color: '#FFFACD', tag: 'Crops' },
  { name: 'Wild West',           color: '#F4CCCC', tag: 'Western' },
  { name: 'Tech',                color: '#FF6961', tag: 'Industrial' },
  { name: 'Dream',               color: '#E6A8D7', tag: 'Surreal' },
  { name: 'Nightmare',           color: '#957DAD', tag: 'Horror' },
  { name: 'Deep Caves',          color: '#D1D1E0', tag: 'Underground' },
];

function buildWorlds() {
  const grid = document.getElementById('worldsGrid');
  if (!grid) return;
  worlds.forEach(w => {
    const card = document.createElement('div');
    card.className = 'world-card';
    card.style.setProperty('--wc', w.color);
    const iconKey = worldIconMap[w.name] || 'star';
    card.innerHTML = `
      <div style="color:${w.color};flex-shrink:0">${worldIcons[iconKey]}</div>
      <div class="world-name">${w.name}</div>
    `;
    grid.appendChild(card);
  });
  ScrollTrigger.create({
    trigger: '#worldsGrid', start: 'top 80%', once: true,
    onEnter() {
      gsap.from('#worldsGrid .world-card', { y: 30, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out' });
    }
  });
}
buildWorlds();

// ---- DISCORD FLOAT ----
gsap.to('.dc-widget', { y: -10, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.5 });

// ---- COPY IP ----
function setupCopy(id) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.ip || '').then(() => {
      const toast = document.getElementById('copyToast');
      if (!toast) return;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
    });
  });
}
['ipCopy', 'ipCopyBedrock', 'ipCopy2', 'ipCopy3'].forEach(setupCopy);

// ---- MINEHUT API ----
async function fetchMinehut() {
  try {
    const r = await fetch('https://api.minehut.com/server/echoboxxx?byName=true');
    if (!r.ok) throw 0;
    const d = await r.json();
    const n = d?.server?.playerCount ?? d?.server?.players ?? 0;
    ['playerCount','playerCount2','playerHeroCount'].forEach(id => {
      const el = document.getElementById(id); if (el) el.textContent = n;
    });
  } catch { /* keep dashes */ }
}
fetchMinehut();
setInterval(fetchMinehut, 60000);

// ---- DISCORD API ----
async function fetchDiscord() {
  try {
    const r = await fetch('https://discord.com/api/v9/invites/88jvF92RJ7?with_counts=true');
    if (!r.ok) throw 0;
    const d = await r.json();
    const total = d?.approximate_member_count ?? 0;
    const online = d?.approximate_presence_count ?? 0;
    const fmt = n => n > 0 ? n.toLocaleString() : '—';
    ['discordHeroCount','discordMemberCount','discordWidgetCount'].forEach(id => {
      const el = document.getElementById(id); if (el) el.textContent = fmt(total);
    });
    const onEl = document.getElementById('discordOnline'); if (onEl) onEl.textContent = fmt(online);
  } catch { /* keep dashes */ }
}
fetchDiscord();

// ---- FEATURE CARD HOVER TILT ----
document.querySelectorAll('.feat-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    gsap.to(card, { rotateX: -((e.clientY-r.top-r.height/2)/r.height)*4, rotateY: ((e.clientX-r.left-r.width/2)/r.width)*4, duration: 0.4, ease: 'power2.out', transformPerspective: 600 });
  });
  card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' }));
});
