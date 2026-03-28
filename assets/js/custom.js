
/* ── THEME TOGGLE ─────────────────────────────── */
const html = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const knob = document.getElementById('themeKnob');
const label = document.getElementById('toggleLabel');

function applyTheme(t) {
    html.setAttribute('data-theme', t);
    localStorage.setItem('sk-theme', t);
    knob.textContent = t === 'light' ? '☀️' : '🌙';
    label.textContent = t === 'light' ? 'Dark Mode' : 'Light Mode';
}
applyTheme(localStorage.getItem('sk-theme') || 'dark');
toggleBtn.addEventListener('click', () =>
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')
);

/* ── CURSOR ───────────────────────────────────── */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = (mx - 6) + 'px'; cur.style.top = (my - 6) + 'px';
});
(function anim() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(anim);
})();
document.querySelectorAll('a,button,.skill-card,.project-row,.erp-card').forEach(el => {
    el.addEventListener('mouseenter', () => cur.style.transform = 'scale(3)');
    el.addEventListener('mouseleave', () => cur.style.transform = 'scale(1)');
});

/* ── NAV SCROLL ───────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

/* ── FADE-UP OBSERVER ─────────────────────────── */
new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 })
    .observe.bind(null); // shorthand won't work — use full version:
const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

/* ── HERO ENTRANCE ────────────────────────────── */
document.querySelectorAll('.hero-profile-float,.hero-badge,.line1,.line2,.line3,.hero-desc,.hero-stats').forEach((el, i) => {
    Object.assign(el.style, { opacity: '0', transform: 'translateY(28px)', transition: `opacity .8s ease ${i * .1}s, transform .8s ease ${i * .1}s` });
    setTimeout(() => Object.assign(el.style, { opacity: '1', transform: 'translateY(0)' }), 80 + i * 100);
});

/* ── STAT COUNTERS ────────────────────────────── */
function countUp(el, end) {
    let t = null;
    (function s(ts) { if (!t) t = ts; const p = Math.min((ts - t) / 1400, 1); el.querySelector('.stat-accent').textContent = Math.floor(p * end); if (p < 1) requestAnimationFrame(s); })(performance.now());
}
const cObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { [10, 80, 40].forEach((v, i) => { const el = document.querySelectorAll('.stat-item')[i]; if (el) countUp(el, v); }); cObs.disconnect(); }
}));
const stats = document.querySelector('.hero-stats'); if (stats) cObs.observe(stats);
