// Tema claro / oscuro (recuerda la elección)
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
let saved = null;
try { saved = localStorage.getItem('tema'); } catch (e) {}
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
root.dataset.theme = saved || (prefersDark ? 'dark' : 'light');
themeBtn.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('tema', next); } catch (e) {}
});

// Menú móvil
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// Barra de progreso y sombra de la barra superior
const progress = document.getElementById('progress');
const topbar = document.getElementById('topbar');
function onScroll() {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  topbar.classList.toggle('scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Aparición suave de secciones y enlace activo del menú
const links = [...nav.querySelectorAll('a')];
if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); reveal.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

// Si no existe foto.jpg, se muestran las iniciales
const foto = document.getElementById('foto');
const initials = document.getElementById('initials');
foto.addEventListener('error', () => { foto.style.display = 'none'; initials.hidden = false; });

// Año del pie de página
document.getElementById('year').textContent = new Date().getFullYear();
