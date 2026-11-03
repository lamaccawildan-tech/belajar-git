/**
 * Obsidian & Parchment Portfolio - Script Interaktif (Bahasa Indonesia)
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
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateValue('stat-rev', 0, 4.2, 1200, '$', 'Jt+');
        animateValue('stat-sla', 85.0, 99.8, 1200, '', '%');
        animateValue('stat-snapshots', 0, 120, 1200, '', '+');
      }
    });
  }, { threshold: 0.4 });

  observer.observe(statsSection);
}

function animateValue(id, start, end, duration, prefix = '', suffix = '') {
  const obj = document.getElementById(id);
  if (!obj) return;

  const isDecimal = end % 1 !== 0;
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * easeProgress;

    obj.textContent = `${prefix}${isDecimal ? current.toFixed(1) : Math.floor(current)}${suffix}`;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.textContent = `${prefix}${end}${suffix}`;
    }
  };

  window.requestAnimationFrame(step);
}

/**
 * 4. Pengiriman Formulir Konsultasi
 */
function initConsultationForm() {
  const form = document.getElementById('consultForm');
  const successBox = document.getElementById('consultSuccess');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !successBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Status loading pada tombol
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-block animate-spin mr-2">⚙️</span>
        <span>Mengamankan Slot Prioritas...</span>
      `;
    }

    setTimeout(() => {
      form.classList.add('hidden');
      successBox.classList.remove('hidden');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Reset tombol
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span class="material-symbols-outlined text-[18px]">calendar_today</span>
          <span>Konfirmasi &amp; Pilih Jadwal</span>
        `;
      }
    }, 600);
  });
}

/**
 * 5. Pengalih Tampilan (Frame Mobile vs Desktop Responsif)
 */
function initViewToggle() {
  const toggleBtn = document.getElementById('viewModeToggle');
  const appContainer = document.getElementById('appContainer');

  if (!toggleBtn || !appContainer) return;

  let isMobileFrame = false;

  toggleBtn.addEventListener('click', () => {
    isMobileFrame = !isMobileFrame;
    if (isMobileFrame) {
      appContainer.classList.remove('max-w-2xl', 'lg:max-w-3xl');
      appContainer.classList.add('max-w-[420px]', 'border-x', 'border-[#49473f]/30', 'shadow-[0_0_50px_rgba(0,0,0,0.8)]');
      toggleBtn.innerHTML = `
        <span class="material-symbols-outlined text-[16px]">desktop_windows</span>
        <span>Tampilan Desktop</span>
      `;
    } else {
      appContainer.classList.add('max-w-2xl', 'lg:max-w-3xl');
      appContainer.classList.remove('max-w-[420px]', 'border-x', 'border-[#49473f]/30', 'shadow-[0_0_50px_rgba(0,0,0,0.8)]');
      toggleBtn.innerHTML = `
        <span class="material-symbols-outlined text-[16px]">smartphone</span>
        <span>Tampilan HP</span>
      `;
    }
  });
}
