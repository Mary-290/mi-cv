// Menú móvil
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  })
);

// Si no existe foto.jpg, se muestran las iniciales
const foto = document.getElementById('foto');
const initials = document.getElementById('initials');
foto.addEventListener('error', () => {
  foto.style.display = 'none';
  initials.hidden = false;
});

// Año del pie de página
document.getElementById('year').textContent = new Date().getFullYear();
