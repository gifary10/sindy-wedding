// mempelai.js - Couple Information - OPTIMIZED & FIXED
class CoupleInformation {
  constructor() {
    this.coupleData = {
      groom: {
        name: 'Gifary Setia Putra',
        father: 'Bapak Husen',
        mother: 'Ibu Yuliawati',
        photo: 'images/cg.png',
        description: 'Putra kedua dari keluarga besar Gifary',
        social: {
          instagram: '#',
          facebook: '#',
          whatsapp: '#'
        }
      },
      bride: {
        name: 'Sindy Novia',
        father: 'Bapak Apet',
        mother: 'Ibu Dewi',
        photo: 'images/cs.png',
        description: 'Putri pertama dari keluarga besar Sindy',
        social: {
          instagram: '#',
          facebook: '#',
          whatsapp: '#'
        }
      }
    };
    this.init();
  }

  init() {
    try {
      this.createCoupleSection();
      this.setupEventListeners();
    } catch (error) {
      console.error('Error initializing couple section:', error);
      this.showErrorState();
    }
  }

  createCoupleSection() {
    if (document.getElementById('couple')) return;

    const section = document.createElement('section');
    section.id = 'couple';
    section.className = 'couple-section';
    section.setAttribute('data-aos', 'fade-up');

    section.innerHTML = `
      <div class="container">
        <h2 class="title">Mempelai Pengantin</h2>
        <p class="section-subtitle">Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami</p>
        
        <div class="couple-container">
          <div class="couple-card groom-card" data-aos="fade-right">
            <div class="couple-photo-frame">
              <img src="${this.coupleData.groom.photo}" alt="${this.coupleData.groom.name}" class="couple-photo" loading="lazy">
              <div class="photo-overlay"></div>
            </div>
            <div class="couple-info">
              <h3 class="couple-name">${this.escapeHtml(this.coupleData.groom.name)}</h3>
              <p class="couple-parents">
                Putra dari Bapak ${this.escapeHtml(this.coupleData.groom.father)} &amp; Ibu ${this.escapeHtml(this.coupleData.groom.mother)}
              </p>
              <p class="couple-description">${this.escapeHtml(this.coupleData.groom.description)}</p>
              <div class="couple-social">
                ${this.generateSocialLinks(this.coupleData.groom.social, 'groom')}
              </div>
            </div>
          </div>

          <div class="heart-divider" data-aos="zoom-in">
            <div class="heart-pulse">
              <i class="fas fa-heart"></i>
            </div>
          </div>

          <div class="couple-card bride-card" data-aos="fade-left">
            <div class="couple-photo-frame">
              <img src="${this.coupleData.bride.photo}" alt="${this.coupleData.bride.name}" class="couple-photo" loading="lazy">
              <div class="photo-overlay"></div>
            </div>
            <div class="couple-info">
              <h3 class="couple-name">${this.escapeHtml(this.coupleData.bride.name)}</h3>
              <p class="couple-parents">
                Putri dari Bapak ${this.escapeHtml(this.coupleData.bride.father)} &amp; Ibu ${this.escapeHtml(this.coupleData.bride.mother)}
              </p>
              <p class="couple-description">${this.escapeHtml(this.coupleData.bride.description)}</p>
              <div class="couple-social">
                ${this.generateSocialLinks(this.coupleData.bride.social, 'bride')}
              </div>
            </div>
          </div>
        </div>

        <div class="family-message" data-aos="fade-up">
          <div class="message-content">
            <p>"Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan do'a restu kepada putra-putri kami."</p>
            <div class="message-signature">
              <p>Keluarga Besar</p>
              <div class="families">
                <span>Al-Ghifary</span>
                <span class="and">&</span>
                <span>Permatasari</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const content = document.getElementById('content');
    if (content) {
      content.appendChild(section);
    } else {
      console.error('Content element not found');
      return;
    }

    this.addStyles();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  generateSocialLinks(social, person) {
    return `
      <a href="${social.instagram}" class="social-link" aria-label="Instagram ${person}" data-social="instagram" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="${social.facebook}" class="social-link" aria-label="Facebook ${person}" data-social="facebook" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-facebook"></i>
      </a>
      <a href="${social.whatsapp}" class="social-link" aria-label="WhatsApp ${person}" data-social="whatsapp" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-whatsapp"></i>
      </a>
    `;
  }

  setupEventListeners() {
    // Delegate all events for better performance
    document.addEventListener('click', (e) => {
      // Photo click handlers
      if (e.target.closest('.couple-photo-frame')) {
        const frame = e.target.closest('.couple-photo-frame');
        const photo = frame.querySelector('.couple-photo');
        if (photo) this.enlargePhoto(photo);
        return;
      }

      // Social link handlers
      if (e.target.closest('.social-link')) {
        e.preventDefault();
        const link = e.target.closest('.social-link');
        this.handleSocialClick(link);
        return;
      }
    });

    // Image error handling
    document.addEventListener('error', (e) => {
      if (e.target.classList.contains('couple-photo')) {
        this.handleImageError(e.target);
      }
    }, true);
  }

  enlargePhoto(photo) {
    if (!photo || !photo.src) return;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'photo-modal active';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" aria-label="Tutup">&times;</button>
        <img src="${photo.src}" alt="${photo.alt}" loading="eager">
        <div class="modal-caption">
          <h4>${this.escapeHtml(photo.alt)}</h4>
        </div>
      </div>
    `;

    // Add styles inline for immediate rendering
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      position: relative;
      animation: photoModalZoomIn 0.3s ease;
    `;

    modal.querySelector('img').style.cssText = `
      max-width: 100%;
      max-height: 70vh;
      border-radius: 10px;
      display: block;
      object-fit: contain;
    `;

    modal.querySelector('.modal-close').style.cssText = `
      position: absolute;
      top: -50px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 2.5rem;
      cursor: pointer;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.3s ease;
    `;

    modal.querySelector('.modal-caption').style.cssText = `
      color: white;
      text-align: center;
      margin-top: 20px;
      font-family: 'Quicksand', sans-serif;
    `;

    modal.querySelector('.modal-caption h4').style.cssText = `
      margin: 0;
      font-family: 'Playfair Display', serif;
      color: var(--sage);
      font-size: 1.3rem;
    `;

    // Event listeners for modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.style.opacity = '0';
      setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
      }
    });

    // Keyboard support
    const keyHandler = (e) => {
      if (e.key === 'Escape') {
        modal.style.opacity = '0';
        setTimeout(() => {
          modal.remove();
          document.removeEventListener('keydown', keyHandler);
        }, 300);
      }
    };
    document.addEventListener('keydown', keyHandler);

    document.body.appendChild(modal);
    setTimeout(() => modal.style.opacity = '1', 10);
  }

  handleImageError(img) {
    console.warn('Image failed to load:', img.src);
    const frame = img.closest('.couple-photo-frame');
    if (frame) {
      frame.innerHTML = `
        <div class="photo-placeholder">
          <i class="fas fa-user"></i>
          <p>Foto tidak tersedia</p>
        </div>
      `;
    }
  }

  handleSocialClick(link) {
    const url = link.getAttribute('href');
    const socialType = link.dataset.social;
    
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      this.showNotification(`Tautan ${socialType} belum tersedia`, 'info');
    }
  }

  showNotification(message, type = 'info') {
    if (window.showNotification) {
      window.showNotification(message, type);
      return;
    }

    console.log(`${type}: ${message}`);
  }

  showErrorState() {
    const section = document.getElementById('couple');
    if (section) {
      section.innerHTML = `
        <div class="container">
          <h2 class="title">Mempelai Pengantin</h2>
          <div style="text-align: center; padding: 40px 20px; color: var(--muted);">
            <p>Terjadi kesalahan dalam memuat informasi mempelai.</p>
          </div>
        </div>
      `;
    }
  }

  addStyles() {
    if (document.querySelector('style[data-couple]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-couple', 'true');
    style.textContent = `
      .couple-section {
        padding: 80px 20px;
        background: linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(233,241,234,0.7) 100%);
      }

      .section-subtitle {
        text-align: center;
        color: var(--muted);
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.2rem;
        margin-bottom: 60px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
      }

      .couple-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;
        max-width: 1000px;
        margin: 0 auto;
        position: relative;
      }

      .couple-card {
        flex: 1;
        max-width: 320px;
        text-align: center;
      }

      .couple-photo-frame {
        position: relative;
        width: 220px;
        height: 220px;
        margin: 0 auto 30px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 15px 35px rgba(33, 44, 38, 0.15);
        border: 4px solid rgba(255, 255, 255, 0.9);
        transition: all 0.4s ease;
        cursor: pointer;
      }

      .couple-photo-frame:hover {
        transform: scale(1.05);
        box-shadow: 0 20px 40px rgba(33, 44, 38, 0.2);
      }

      .couple-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }

      .couple-photo-frame:hover .couple-photo {
        transform: scale(1.1);
      }

      .photo-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, rgba(138,168,143,0.1), rgba(107,143,107,0.05));
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .couple-photo-frame:hover .photo-overlay {
        opacity: 1;
      }

      .photo-placeholder {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--sage-1), var(--sage-2));
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--sage-dark);
        font-family: 'Quicksand', sans-serif;
      }

      .photo-placeholder i {
        font-size: 3rem;
        margin-bottom: 10px;
      }

      .couple-info {
        padding: 0 15px;
      }

      .couple-name {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        color: var(--sage-dark);
        margin-bottom: 10px;
        font-weight: 600;
      }

      .couple-parents {
        color: var(--muted);
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.1rem;
        margin-bottom: 15px;
        line-height: 1.4;
      }

      .couple-description {
        color: var(--charcoal);
        font-family: 'Quicksand', sans-serif;
        font-size: 1rem;
        margin-bottom: 25px;
        line-height: 1.5;
      }

      .couple-social {
        display: flex;
        justify-content: center;
        gap: 15px;
      }

      .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 45px;
        background: rgba(138, 168, 143, 0.1);
        color: var(--sage-dark);
        border-radius: 50%;
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 1.1rem;
      }

      .social-link:hover {
        background: var(--sage-dark);
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(138, 168, 143, 0.3);
      }

      .heart-divider {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 2;
      }

      .heart-pulse {
        width: 70px;
        height: 70px;
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.8rem;
        animation: heartBeat 2s ease-in-out infinite;
        box-shadow: 0 8px 25px rgba(138, 168, 143, 0.3);
        border: 3px solid white;
      }

      @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .family-message {
        max-width: 600px;
        margin: 80px auto 0;
        padding: 40px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 20px;
        border: 1px solid rgba(138, 168, 143, 0.2);
        backdrop-filter: blur(10px);
        position: relative;
      }

      .message-content {
        text-align: center;
      }

      .message-content p {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.2rem;
        color: var(--muted);
        line-height: 1.6;
        margin-bottom: 30px;
        font-style: italic;
      }

      .message-signature p {
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        color: var(--sage-dark);
        margin-bottom: 15px;
        font-style: normal;
        font-size: 1.1rem;
      }

      .families {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        font-family: 'Playfair Display', serif;
        color: var(--charcoal);
        font-size: 1.1rem;
      }

      .families .and {
        color: var(--sage);
        font-style: italic;
        font-size: 1rem;
      }

      @keyframes photoModalZoomIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }

      @media (max-width: 768px) {
        .couple-container {
          flex-direction: column;
          gap: 40px;
        }

        .heart-divider {
          order: -1;
          margin-bottom: 30px;
        }

        .heart-pulse {
          width: 60px;
          height: 60px;
          font-size: 1.5rem;
        }

        .couple-photo-frame {
          width: 200px;
          height: 200px;
        }

        .couple-name {
          font-size: 1.4rem;
        }

        .couple-parents {
          font-size: 1rem;
        }

        .family-message {
          margin-top: 60px;
          padding: 30px 25px;
        }

        .message-content p {
          font-size: 1.1rem;
        }
      }

      @media (max-width: 480px) {
        .couple-section {
          padding: 60px 15px;
        }

        .couple-photo-frame {
          width: 180px;
          height: 180px;
        }

        .couple-name {
          font-size: 1.3rem;
        }

        .couple-parents {
          font-size: 0.95rem;
        }

        .social-link {
          width: 40px;
          height: 40px;
          font-size: 1rem;
        }

        .family-message {
          padding: 25px 20px;
          margin-top: 50px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .couple-photo-frame,
        .couple-photo,
        .social-link,
        .heart-pulse {
          transition: none;
          animation: none;
        }
        
        .couple-photo-frame:hover {
          transform: none;
        }
      }
    `;

    document.head.appendChild(style);
  }
}

// Initialize couple section
let coupleInformation;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    coupleInformation = new CoupleInformation();
  });
} else {
  coupleInformation = new CoupleInformation();
}
