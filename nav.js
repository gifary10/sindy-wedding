// nav.js - Navigation & Footer - FULLY RESPONSIVE & OPTIMIZED
document.addEventListener('DOMContentLoaded', () => {
  // === NAVIGATION ===
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.innerHTML = `
    <div class="nav-container">
      <div class="nav-scroll-wrapper">
        <a href="#countdown" class="nav-item" data-section="countdown">
          <i class="fas fa-clock"></i><span>Countdown</span>
        </a>
        <a href="#couple" class="nav-item" data-section="couple">
          <i class="fas fa-heart"></i><span>Mempelai</span>
        </a>
        <a href="#details" class="nav-item" data-section="details">
          <i class="fas fa-calendar-alt"></i><span>Detail</span>
        </a>
        <a href="#story" class="nav-item" data-section="story">
          <i class="fas fa-history"></i><span>Cerita</span>
        </a>
        <a href="#gallery" class="nav-item" data-section="gallery">
          <i class="fas fa-images"></i><span>Galeri</span>
        </a>
        <a href="#wishes" class="nav-item" data-section="wishes">
          <i class="fas fa-comments"></i><span>Ucapan</span>
        </a>
      </div>
    </div>
  `;

  // === FOOTER ===
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="container">
      <p class="footer-quote">
        "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, 
        supaya kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
      </p>
      <p class="footer-ayat">— QS. Ar-Rum: 21</p>
      <div class="footer-line"></div>
      <div class="footer-flex">
        <div class="footer-left">
          <p>© 2026 Gifary & Sindy — Wedding Invitation<br>
            <small>Made with <i class="fas fa-heart"></i> for our special day</small>
          </p>
        </div>
        <div class="footer-right">
          <div class="footer-social">
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
            <a href="#"><i class="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(nav);
  document.body.appendChild(footer);

  // === STYLES ===
  const style = document.createElement('style');
  style.textContent = `
    /* --- NAVIGATION --- */
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(15px);
      border-top: 1px solid rgba(110,130,110,0.1);
      box-shadow: 0 -4px 15px rgba(0,0,0,0.08);
      z-index: 999;
      padding: 10px 0;
    }

    .nav-container {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .nav-container::-webkit-scrollbar { display: none; }

    .nav-scroll-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      min-width: max-content;
      padding: 0 16px;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #6b7a6f;
      text-decoration: none;
      font-family: 'Quicksand', sans-serif;
      font-size: 0.8rem;
      border-radius: 12px;
      padding: 6px 12px;
      transition: all 0.3s ease;
      flex-shrink: 0;
      min-width: 65px;
    }
    .nav-item:hover {
      color: #8aa88f;
      background: rgba(138,168,143,0.12);
      transform: translateY(-2px);
    }
    .nav-item.active {
      color: #8aa88f;
      background: rgba(138,168,143,0.18);
      box-shadow: 0 3px 10px rgba(138,168,143,0.25);
    }

    .nav-item i {
      font-size: 1.2rem;
      margin-bottom: 3px;
    }

    /* --- FOOTER --- */
    footer {
      background: linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(233,241,234,0.85) 100%);
      padding: 50px 25px 80px;
      border-top: 1px solid rgba(110,130,110,0.1);
      text-align: center;
      font-family: 'Quicksand', sans-serif;
    }

    .footer-quote {
      color: #6b7a6f;
      margin-bottom: 10px;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .footer-ayat {
      color: #8aa88f;
      font-weight: 600;
      margin-bottom: 25px;
    }

    .footer-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(138,168,143,0.3), transparent);
      margin-bottom: 25px;
    }

    .footer-flex {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      gap: 15px;
    }

    .footer-left p {
      margin: 0;
      color: #6b7a6f;
      font-size: 0.9rem;
    }

    .footer-left i {
      color: #e74c3c;
      font-size: 0.9rem;
    }

    .footer-social {
      display: flex;
      justify-content: center;
      gap: 12px;
    }

    .footer-social a {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(138,168,143,0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #8aa88f;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    .footer-social a:hover {
      background: #8aa88f;
      color: white;
      transform: translateY(-3px);
    }

    /* --- RESPONSIVE --- */
    @media (max-width: 768px) {
      .nav-scroll-wrapper { gap: 6px; padding: 0 10px; }
      .nav-item i { font-size: 1rem; }
      .nav-item span { font-size: 0.7rem; }
      footer { padding: 40px 20px 90px; }
      .footer-social a { width: 34px; height: 34px; font-size: 0.9rem; }
    }

    @media (max-width: 480px) {
      .nav-item { padding: 5px 8px; min-width: 55px; }
      .nav-item i { font-size: 0.95rem; }
      .nav-item span { font-size: 0.65rem; }
      footer { padding: 35px 15px 100px; }
    }

    @media (min-width: 1024px) {
      .nav-scroll-wrapper { justify-content: center; gap: 15px; }
      .nav-item { font-size: 0.9rem; padding: 8px 14px; }
      .nav-item i { font-size: 1.3rem; }
      footer { padding: 60px 80px 100px; text-align: left; }
      .footer-flex { text-align: left; }
    }

    @media print {
      .bottom-nav { display: none !important; }
    }
  `;
  document.head.appendChild(style);

  // === LOGIC ===
  class WeddingNavigation {
    constructor() {
      this.navItems = document.querySelectorAll('.nav-item');
      this.navContainer = document.querySelector('.nav-container');
      this.currentSection = '';
      this.init();
    }
    init() {
      this.navItems.forEach(item => {
        item.addEventListener('click', e => {
          e.preventDefault();
          const id = item.getAttribute('href').substring(1);
          this.scrollToSection(id);
        });
      });
      this.observeSections();
    }
    scrollToSection(id) {
      const section = document.getElementById(id);
      if (section) {
        const offset = document.querySelector('.bottom-nav').offsetHeight + 10;
        const top = section.offsetTop - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
    observeSections() {
      const sections = document.querySelectorAll('section[id]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) this.setActive(entry.target.id);
        });
      }, { threshold: 0.4 });
      sections.forEach(sec => observer.observe(sec));
    }
    setActive(id) {
      this.navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
      });
    }
  }

  new WeddingNavigation();
});
