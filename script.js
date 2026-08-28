(function () {
  const langToggle = document.getElementById('langToggle');
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.getElementById('navbar');
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  // ---- 语言切换 ----
  const STORAGE_KEY = 'ocean-lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'zh';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-en]').forEach((el) => {
      const value = lang === 'zh' ? el.getAttribute('data-zh') : el.getAttribute('data-en');
      if (value !== null && value !== '') el.textContent = value;
    });

    document.querySelectorAll('[data-en-ph]').forEach((el) => {
      el.placeholder = lang === 'zh' ? el.getAttribute('data-zh-ph') : el.getAttribute('data-en-ph');
    });

    langToggle.textContent = lang === 'zh' ? 'EN' : '中文';
  }

  langToggle.addEventListener('click', () => {
    applyLang(currentLang === 'zh' ? 'en' : 'zh');
  });

  // ---- 移动端菜单 ----
  function closeMenu() {
    navLinks.classList.remove('open');
    menuBtn.classList.remove('active');
  }
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  // ---- 导航栏滚动效果 ----
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // ---- 滚动淡入 ----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // ---- 联系表单 ----
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.style.display = 'block';
    form.reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  });

  // ---- 年份 ----
  document.getElementById('year').textContent = new Date().getFullYear();

  // 初始化语言
  applyLang(currentLang);
})();
