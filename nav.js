// nav.js - Navigation & Footer - OPTIMIZED & FIXED
class WeddingNavigation {
  constructor() {
    this.navItems = [];
    this.currentSection = '';
    this.isScrolling = false;
    this.scrollTimeout = null;
    this.observer = null;
    this.init();
  }

  init() {
    try {
      this.createNavigation();
      this.createFooter();
      this.setupEventListeners();
      this.setupIntersectionObserver();
      this.handleResize();
    } catch (error) {
      console.error('Error initializing navigation:', error);
    }
  }

  createNavigation() {
    if (document.querySelector('.bottom-nav')) return;

    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Navigasi utama');

    nav.innerHTML = `
      <div class="nav-container">
        <div class="nav-scroll-wrapper">
          <a href="#countdown" class="nav-item" data-section="countdown" role="tab">
            <i class="fas fa-clock" aria-hidden="true"></i>
            <span>Countdown</span>
          </a>
          <a href="#couple" class="nav-item" data-section="couple" role="tab">
            <i class="fas fa-heart" aria-hidden="true"></i>
            <span>Mempelai</span>
          </a>
          <a href="#details" class="nav-item" data-section="details" role="tab">
            <i class="fas fa-calendar-alt" aria-hidden="true"></i>
            <span>Acara</span>
          </a>
          <a href="#story" class="nav-item" data-section="story" role="tab">
            <i class="fas fa-history" aria-hidden="true"></i>
            <span>Cerita</span>
          </a>
          <a href="#gallery" class="nav-item" data-section="gallery" role="tab">
            <i class="fas fa-images" aria-hidden="true"></i>
            <span>Galeri</span>
          </a>
          <a href="#wishes" class="nav-item" data-section="wishes" role="tab">
            <i class="fas fa-comments" aria-hidden="true"></i>
            <span>Ucapan</span>
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(nav);
    this.navItems = document.querySelectorAll('.nav-item');
  }

  createFooter() {
    if (document.querySelector('.main-footer')) return;

    const footer = document.createElement('footer');
    footer.className = 'main-footer';
    footer.setAttribute('role', 'contentinfo');

    footer.innerHTML = `
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-quote">
            <p class="quote-text">
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, 
              supaya kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
            </p>
            <p class="quote-source">— QS. Ar-Rum: 21</p>
          </div>
          
          <div class="footer-divider" aria-hidden="true"></div>
          
          <div class="footer-main">
            <div class="footer-info">
              <h3 class="footer-title">Gifary & Sindy</h3>
              <p class="footer-subtitle">The Beginning of Forever</p>
              <p class="footer-date">
                <i class="fas fa-calendar-alt" aria-hidden="true"></i>
                Sabtu, 27 Juni 2026
              </p>
              <p class="footer-location">
                <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                Jakarta, Indonesia
              </p>
            </div>
            
            <div class="footer-actions">
              <div class="footer-social" role="list" aria-label="Media sosial">
                <a href="#" class="social-link" aria-label="Instagram" role="listitem">
                  <i class="fab fa-instagram" aria-hidden="true"></i>
                </a>
                <a href="#" class="social-link" aria-label="Facebook" role="listitem">
                  <i class="fab fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="#" class="social-link" aria-label="YouTube" role="listitem">
                  <i class="fab fa-youtube" aria-hidden="true"></i>
                </a>
                <a href="#" class="social-link" aria-label="WhatsApp" role="listitem">
                  <i class="fab fa-whatsapp" aria-hidden="true"></i>
                </a>
              </div>
              
              <button class="footer-btn share-btn" aria-label="Bagikan undangan">
                <i class="fas fa-share-alt" aria-hidden="true"></i>
                Bagikan
              </button>
            </div>
          </div>
          
          <div class="footer-bottom">
            <div class="footer-copyright">
              <p>&copy; 2026 Gifary & Sindy — Wedding Invitation</p>
              <p class="footer-made-with">
                Made with <i class="fas fa-heart" aria-hidden="true"></i> for our special day
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(footer);
    this.addStyles();
  }

  setupEventListeners() {
    // Navigation clicks
    this.navItems.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        const targetId = item.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
      });
    });

    // Touch improvements
    this.navItems.forEach(item => {
      item.addEventListener('touchstart', () => {
        item.style.transform = 'scale(0.95)';
      });
      
      item.addEventListener('touchend', () => {
        item.style.transform = '';
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        this.handleKeyboardNav(e.key);
      }
    });

    // Footer interactions
    this.setupFooterInteractions();

    // Window resize
    window.addEventListener('resize', () => this.handleResize());
  }

  setupFooterInteractions() {
    // Share button
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => this.shareInvitation());
    }

    // Social links
    const socialLinks = document.querySelectorAll('.footer-social .social-link');
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleSocialClick(link);
      });
    });
  }

  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      if (this.isScrolling) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setActiveNav(entry.target.id);
          this.currentSection = entry.target.id;
        }
      });
    }, observerOptions);

    sections.forEach(section => this.observer.observe(section));
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    this.isScrolling = true;
    
    const navHeight = document.querySelector('.bottom-nav')?.offsetHeight || 0;
    const offsetTop = section.offsetTop - navHeight - 20;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });

    // Update active nav immediately for better UX
    this.setActiveNav(sectionId);

    // Reset scrolling flag
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 1000);
  }

  setActiveNav(sectionId) {
    this.navItems.forEach(item => {
      const href = item.getAttribute('href').substring(1);
      const isActive = href === sectionId;
      
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', isActive);
    });
  }

  handleKeyboardNav(key) {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const currentIndex = sections.findIndex(section => section.id === this.currentSection);
    
    if (currentIndex === -1) return;

    let targetIndex;
    if (key === 'ArrowRight') {
      targetIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
      targetIndex = Math.max(currentIndex - 1, 0);
    }

    this.scrollToSection(sections[targetIndex].id);
  }

  async shareInvitation() {
    const shareData = {
      title: 'Undangan Pernikahan Gifary & Sindy',
      text: 'Mari hadiri pernikahan kami pada 27 Juni 2026',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        this.showNotification('Berhasil berbagi undangan!', 'success');
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        this.showNotification('Link undangan berhasil disalin!', 'success');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        this.showNotification('Gagal berbagi undangan', 'error');
      }
    }
  }

  handleSocialClick(link) {
    const platform = link.getAttribute('aria-label').toLowerCase();
    this.showNotification(`Mengunjungi ${platform} mempelai`, 'info');
  }

  handleResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      const nav = document.querySelector('.bottom-nav');
      if (nav && window.innerWidth <= 768) {
        nav.style.paddingBottom = 'env(safe-area-inset-bottom)';
      }
    }, 250);
  }

  showNotification(message, type = 'info') {
    if (window.showNotification) {
      window.showNotification(message, type);
      return;
    }

    console.log(`${type}: ${message}`);
  }

  addStyles() {
    if (document.querySelector('style[data-navigation]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-navigation', 'true');
    style.textContent = `
      .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        border-top: 1px solid rgba(110, 130, 110, 0.15);
        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
        z-index: 999;
        padding: 12px 0 8px;
        transition: all 0.3s ease;
      }

      .nav-container {
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      .nav-container::-webkit-scrollbar {
        display: none;
      }

      .nav-scroll-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        min-width: max-content;
        padding: 0 16px;
      }

      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--muted);
        text-decoration: none;
        font-family: 'Quicksand', sans-serif;
        font-size: 0.75rem;
        border-radius: 16px;
        padding: 8px 12px;
        transition: all 0.3s ease;
        flex-shrink: 0;
        min-width: 60px;
        position: relative;
        outline: none;
      }
      
      .nav-item:hover,
      .nav-item:focus {
        color: var(--sage);
        background: rgba(138, 168, 143, 0.08);
        transform: translateY(-2px);
      }
      
      .nav-item.active {
        color: var(--sage-dark);
        background: rgba(138, 168, 143, 0.12);
        box-shadow: 0 4px 12px rgba(138, 168, 143, 0.15);
      }
      
      .nav-item.active::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 4px;
        background: var(--sage);
        border-radius: 50%;
      }

      .nav-item i {
        font-size: 1.1rem;
        margin-bottom: 4px;
        transition: transform 0.3s ease;
      }
      
      .nav-item.active i {
        transform: scale(1.1);
      }

      .nav-item span {
        font-weight: 600;
        letter-spacing: 0.3px;
      }

      .main-footer {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(233, 241, 234, 0.8) 100%);
        border-top: 1px solid rgba(110, 130, 110, 0.1);
        margin-top: 60px;
        padding: 50px 20px 30px;
        font-family: 'Quicksand', sans-serif;
      }

      .footer-container {
        max-width: 800px;
        margin: 0 auto;
      }

      .footer-content {
        space-y: 30px;
      }

      .footer-quote {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      }

      .quote-text {
        color: var(--muted);
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 8px;
        font-style: italic;
      }

      .quote-source {
        color: var(--sage-dark);
        font-weight: 600;
        font-size: 0.9rem;
        margin: 0;
      }

      .footer-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(138, 168, 143, 0.3), transparent);
        margin: 25px auto;
        max-width: 200px;
      }

      .footer-main {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 40px;
        align-items: start;
      }

      .footer-info {
        space-y: 12px;
      }

      .footer-title {
        font-family: 'Playfair Display', serif;
        color: var(--sage-dark);
        font-size: 1.4rem;
        margin: 0 0 4px 0;
        font-weight: 600;
      }

      .footer-subtitle {
        color: var(--muted);
        font-size: 0.95rem;
        margin: 0 0 15px 0;
        font-style: italic;
      }

      .footer-date,
      .footer-location {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--charcoal);
        font-size: 0.9rem;
        margin: 8px 0;
      }

      .footer-date i,
      .footer-location i {
        color: var(--sage);
        width: 16px;
      }

      .footer-actions {
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
      }

      .footer-social {
        display: flex;
        gap: 12px;
      }

      .footer-social .social-link {
        width: 40px;
        height: 40px;
        background: rgba(138, 168, 143, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--sage-dark);
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 1rem;
      }

      .footer-social .social-link:hover {
        background: var(--sage-dark);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(138, 168, 143, 0.3);
      }

      .footer-btn {
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85rem;
      }

      .footer-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(138, 168, 143, 0.3);
      }

      .footer-bottom {
        text-align: center;
        padding-top: 25px;
        border-top: 1px solid rgba(138, 168, 143, 0.1);
      }

      .footer-copyright {
        color: var(--muted);
        font-size: 0.85rem;
      }

      .footer-copyright p {
        margin: 4px 0;
      }

      .footer-made-with {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        margin-top: 8px;
      }

      .footer-made-with i {
        color: #e74c3c;
        font-size: 0.8rem;
      }

      @media (max-width: 768px) {
        .bottom-nav {
          padding: 10px 0 6px;
        }

        .nav-scroll-wrapper {
          gap: 6px;
          padding: 0 12px;
          justify-content: flex-start;
        }

        .nav-item {
          min-width: 55px;
          padding: 6px 10px;
          font-size: 0.7rem;
        }

        .nav-item i {
          font-size: 1rem;
          margin-bottom: 3px;
        }

        .main-footer {
          padding: 40px 15px 80px;
          margin-top: 40px;
        }

        .footer-main {
          grid-template-columns: 1fr;
          gap: 25px;
          text-align: center;
        }

        .footer-actions {
          order: -1;
        }

        .footer-social {
          justify-content: center;
        }

        .footer-social .social-link {
          width: 36px;
          height: 36px;
          font-size: 0.9rem;
        }

        .footer-info {
          space-y: 10px;
        }

        .footer-title {
          font-size: 1.3rem;
        }

        .footer-date,
        .footer-location {
          justify-content: center;
          font-size: 0.85rem;
        }

        .quote-text {
          font-size: 0.95rem;
        }
      }

      @media (max-width: 480px) {
        .nav-scroll-wrapper {
          gap: 4px;
          padding: 0 10px;
        }

        .nav-item {
          min-width: 50px;
          padding: 5px 8px;
          font-size: 0.65rem;
        }

        .nav-item i {
          font-size: 0.9rem;
        }

        .main-footer {
          padding: 30px 12px 90px;
        }

        .footer-quote {
          text-align: left;
        }

        .footer-date,
        .footer-location {
          justify-content: flex-start;
        }

        .footer-actions {
          align-items: stretch;
        }

        .footer-btn {
          justify-content: center;
        }
      }

      @media (min-width: 1024px) {
        .nav-scroll-wrapper {
          gap: 12px;
        }

        .nav-item {
          min-width: 70px;
          font-size: 0.8rem;
        }

        .nav-item i {
          font-size: 1.2rem;
        }

        .main-footer {
          padding: 60px 40px 40px;
        }
      }

      @media print {
        .bottom-nav {
          display: none !important;
        }
        
        .main-footer {
          margin-top: 20px;
          padding: 20px;
          background: white !important;
        }
      }

      @media (prefers-color-scheme: dark) {
        .bottom-nav {
          background: rgba(33, 44, 38, 0.98);
          border-top-color: rgba(255, 255, 255, 0.1);
        }
        
        .nav-item {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .nav-item:hover,
        .nav-item.active {
          color: var(--sage);
        }
        
        .main-footer {
          background: linear-gradient(180deg, rgba(33, 44, 38, 0.9) 0%, rgba(42, 58, 47, 0.8) 100%);
          color: rgba(255, 255, 255, 0.8);
        }
        
        .footer-date,
        .footer-location {
          color: rgba(255, 255, 255, 0.8);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .bottom-nav,
        .nav-item,
        .footer-btn,
        .footer-social .social-link {
          transition: none;
        }
        
        .nav-item:hover {
          transform: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    clearTimeout(this.scrollTimeout);
    clearTimeout(this.resizeTimeout);
  }
}

// Initialize navigation
let weddingNavigation;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    weddingNavigation = new WeddingNavigation();
  });
} else {
  weddingNavigation = new WeddingNavigation();
}
