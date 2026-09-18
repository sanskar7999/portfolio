const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  menuButton.querySelector('.menu-symbol').textContent = '＋';
};
menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  navigation.classList.toggle('is-open', opening);
  menuButton.querySelector('.menu-symbol').textContent = opening ? '−' : '＋';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 681px)').addEventListener('change', closeMenu);
document.querySelector('.copy-email').addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('sanskarsahu747@gmail.com');
    status.textContent = 'Email address copied.';
  } catch {
    status.textContent = 'Email: sanskarsahu747@gmail.com — select the address to copy it.';
  }
});

const testimonials = document.querySelector('.testimonials');
const scrollTestimonials = direction => {
  const card = testimonials.querySelector('.testimonial');
  if (!card) return;
  const gap = Number.parseFloat(getComputedStyle(testimonials).gap) || 0;
  testimonials.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth' });
};
document.querySelector('.testimonial-prev').addEventListener('click', () => scrollTestimonials(-1));
document.querySelector('.testimonial-next').addEventListener('click', () => scrollTestimonials(1));

if ('IntersectionObserver' in window) {
  const navLinks = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const current = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', current);
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
