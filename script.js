/*** Obsidian & Parchment Portfolio - Script Interaktif (Bahasa Indonesia)
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initScrollSpy();
  initStatsCounter();
  initConsultationForm();
  initViewToggle();
});

/**
 * 1. Smooth Scrolling untuk Navigasi Internal
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Perbarui tab aktif di navigasi bawah
        updateActiveTabByHref(targetId);
      }
    });
  });
}

/**
 * 2. ScrollSpy untuk Tab Navigasi Bawah
 */
function initScrollSpy() {
  const sections = [
    { id: 'overview', tab: document.querySelector('nav a[data-path="overview"]') },
    { id: 'solutions', tab: document.querySelector('nav a[data-path="solutions"]') },
    { id: 'case-studies', tab: document.querySelector('nav a[data-path="case-studies"]') },
    { id: 'book-consult', tab: document.querySelector('nav a[data-path="contact"]') }
  ];

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeSection = sections.find(s => s.id === entry.target.id);
        if (activeSection && activeSection.tab) {
          clearActiveTabs();
          activeSection.tab.classList.add('text-[#e9c349]', 'bg-[#353437]/40', 'nav-tab-active');
          activeSection.tab.classList.remove('text-[#cbc6bc]');
          activeSection.tab.setAttribute('aria-current', 'page');
        }
      }
    });
  }, observerOptions);

  sections.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) observer.observe(el);
  });
}

function clearActiveTabs() {
  const tabs = document.querySelectorAll('nav a');
  tabs.forEach(tab => {
    tab.classList.remove('text-[#e9c349]', 'bg-[#353437]/40', 'nav-tab-active');
    tab.classList.add('text-[#cbc6bc]');
    tab.removeAttribute('aria-current');
  });
}



\
function updateActiveTabByHref(href) {
  const tab = document.querySelector(`nav a[href="${href}"]`);
  if (tab) {
    clearActiveTabs();
    tab.classList.add('text-[#e9c349]', 'bg-[#353437]/40', 'nav-tab-active');
    tab.classList.remove('text-[#cbc6bc]');
    tab.setAttribute('aria-current', 'page');
  }
}

/**
 * 3. Animasi Angka Statistik (Counter)
 */
function initStatsCounter() {
  const statsSection = document.getElementById('stats-strip');
  if (!statsSection || !('IntersectionObserver' in window)) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
   w  ww
  });
