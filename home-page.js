// Mobile navigation toggle + subtle header shadow on scroll
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const header = document.querySelector('.site-header');

if (toggle) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  if (y > 6 && y > lastY) {
    header.style.boxShadow = '0 6px 20px rgba(0,0,0,.28)';
  } else if (y < 6) {
    header.style.boxShadow = 'none';
  }
  lastY = y;
});
