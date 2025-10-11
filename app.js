// Smooth scroll
function smoothTo(sel) {
  document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const a = q.nextElementSibling;
    const opened = a.style.display === 'block';
    document.querySelectorAll('.faq-a').forEach(el => el.style.display = 'none');
    a.style.display = opened ? 'none' : 'block';
    q.querySelector('span').textContent = opened ? '+' : '-';
  });
});

// Pills
const pills = Array.from(document.querySelectorAll('.pill'));
const anyPill = pills.find(p => p.hasAttribute('data-any'));
const field = document.getElementById('tracksField');

function updateField() {
  if (!field) return;
  const active = pills.filter(p => p.classList.contains('active') && !p.hasAttribute('data-any')).map(p => p.dataset.value);
  field.value = anyPill && anyPill.classList.contains('active') ? 'Не определился' : active.join(', ');
}

pills.forEach(p => {
  p.setAttribute('tabindex', '0');
  const toggle = () => {
    if (p.hasAttribute('data-any')) {
      pills.forEach(x => { if (x !== p) x.classList.remove('active'); });
      p.classList.toggle('active');
    } else {
      anyPill?.classList.remove('active');
      p.classList.toggle('active');
    }
    p.setAttribute('aria-pressed', p.classList.contains('active'));
    updateField();
  };
  p.addEventListener('click', toggle);
  p.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } });
});

// Thanks
function showThanks() {
  const el = document.getElementById('thanks');
  if (el) el.hidden = false;
}

// Scroll spy for nav
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navlink');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// Reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Stop animations
  document.querySelectorAll('.floating-element').forEach(el => el.style.animation = 'none');
}
