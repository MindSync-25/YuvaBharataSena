// ===========================
// Yuva Bharata Sena — Main JS
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile nav toggle ──
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      nav.classList.toggle('nav-open');
    });
  }

  // Close mobile nav when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav')?.classList.remove('nav-open');
    });
  });

  // ── Scroll: add shadow to nav ──
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.style.boxShadow = '0 4px 24px rgba(0,0,0,.35)';
      } else {
        nav.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  // ── Active nav link ──
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Intersection Observer: fade in cards ──
  const animEls = document.querySelectorAll(
    '.issue-card, .leader-card, .event-card, .value-card, .role-card, ' +
    '.promise-card, .manifesto-pillar, .leader-full-card, .event-full-card, ' +
    '.feat-card, .team-card, .benefit-item, .emblem-pillar'
  );
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });

    animEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = `opacity .55s ${i * 0.06}s ease, transform .55s ${i * 0.06}s ease`;
      observer.observe(el);
    });
  }

  // ── Events page: tab toggle ──
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        const upcoming = document.getElementById('upcomingEvents');
        const past     = document.getElementById('pastEvents');
        if (target === 'upcoming' && upcoming) {
          upcoming.style.display = 'block';
          if (past) past.style.display = 'none';
        } else if (target === 'past' && past) {
          past.style.display = 'block';
          if (upcoming) upcoming.style.display = 'none';
        }
      });
    });
  }

  // ── Leaders page: filter bar ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.leader-full-card[data-district]').forEach(card => {
          if (filter === 'all' || card.dataset.district === filter || card.dataset.district === 'all') {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ── Animated counter for stat numbers ──
  function animateCounter(el, target, suffix) {
    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!animateCounter.startTime) animateCounter.startTime = timestamp;
      const progress = Math.min((timestamp - animateCounter.startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else { animateCounter.startTime = null; el.textContent = target.toLocaleString('en-IN') + suffix; }
    };
    requestAnimationFrame(step);
  }

  const statsSection = document.querySelector('.stats-bar');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsItems = statsSection.querySelectorAll('.stat-number');
    const targets = [2024, 30, 50000, 1200, 7];
    const suffixes = ['', '', '+', '+', ''];

    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        statsItems.forEach((el, i) => {
          const t = targets[i] || 0;
          const s = suffixes[i] || '';
          animateCounter(el, t, s);
        });
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

});

// ── Join Form handler ──
const JOIN_FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxpkAexj8K6t3vrwt-zXgKKf28DUZVeRHd39hxGy0tFZkeCApwkFLWIgx_BOPGvSRU8/exec';

async function handleJoinSubmit(e) {
  e.preventDefault();

  const form = document.getElementById('joinForm');
  const success = document.getElementById('joinSuccess');
  const submitButton = form?.querySelector('button[type=submit]');
  const phone = document.getElementById('phone')?.value || '';

  if (!/^[6-9][0-9]{9}$/.test(phone)) {
    alert('ದಯವಿಟ್ಟು ಸರಿಯಾದ 10 ಅಂಕೆಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.');
    return;
  }

  if (!JOIN_FORM_ENDPOINT) {
    alert('Google Sheet endpoint is not connected yet.');
    return;
  }

  const formData = new URLSearchParams();
  formData.append('fullName', document.getElementById('fullName')?.value.trim() || '');
  formData.append('phone', phone.trim());
  formData.append('district', document.getElementById('district')?.value || '');
  formData.append('taluk', document.getElementById('taluk')?.value.trim() || '');
  formData.append('source', window.location.href);

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.dataset.originalText = submitButton.textContent;
    submitButton.textContent = 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...';
  }

  try {
    await fetch(JOIN_FORM_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });

    if (form && success) {
      form.querySelectorAll('input, select, textarea, button[type=submit]').forEach(el => {
        el.disabled = true;
      });
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } catch (error) {
    console.error('Join form submission failed:', error);
    alert('ಸಲ್ಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = submitButton.dataset.originalText || 'ಸೇರ್ಪಡೆಗೊಳ್ಳಿ';
    }
  }
}
