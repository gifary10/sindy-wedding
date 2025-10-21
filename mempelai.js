// mempelai.js - Couple Information - OPTIMIZED
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
    }
  }

  createCoupleSection() {
    const section = document.createElement('section');
    section.id = 'couple';
    section.className = 'couple-section';
    section.setAttribute('data-aos', 'fade-up');

    section.innerHTML = `
      <div class="container">
        <h2 class="title">Mempelai Pengantin</h2>
        <p class="section-subtitle">Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami</p>
        
        <div class="couple-container">
          <!-- Groom -->
          <div class="couple-card groom-card" data-aos="fade-right">
            <div class="couple-photo-frame">
              <img src="${this.coupleData.groom.photo}" alt="${this.coupleData.groom.name}" class="couple-photo" loading="lazy">
              <div class="photo-overlay"></div>
            </div>
            <div class="couple-info">
              <h3 class="couple-name">${this.coupleData.groom.name}</h3>
              <p class="couple-parents">
                Putra dari Bapak ${this.coupleData.groom.father} &amp; Ibu ${this.coupleData.groom.mother}
              </p>
              <p class="couple-description">${this.coupleData.groom.description}</p>
              <div class="couple-social">
                ${this.generateSocialLinks(this.coupleData.groom.social)}
              </div>
            </div>
          </div>

          <!-- Heart Divider -->
          <div class="heart-divider" data-aos="zoom-in">
            <div class="heart-pulse">
              <i class="fas fa-heart"></i>
            </div>
          </div>

          <!-- Bride -->
          <div class="couple-card bride-card" data-aos="fade-left">
            <div class="couple-photo-frame">
              <img src="${this.coupleData.bride.photo}" alt="${this.coupleData.bride.name}" class="couple-photo" loading="lazy">
              <div class="photo-overlay"></div>
            </div>
            <div class="couple-info">
              <h3 class="couple-name">${this.coupleData.bride.name}</h3>
              <p class="couple-parents">
                Putri dari Bapak ${this.coupleData.bride.father} &amp; Ibu ${this.coupleData.bride.mother}
              </p>
              <p class="couple-description">${this.coupleData.bride.description}</p>
              <div class="couple-social">
                ${this.generateSocialLinks(this.coupleData.bride.social)}
              </div>
            </div>
          </div>
        </div>

        <!-- Family Message -->
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

    document.getElementById('content').appendChild(section);
    this.addStyles();
  }

  generateSocialLinks(social) {
    return `
      <a href="${social.instagram}" class="social-link" aria-label="Instagram" target="_blank" rel="noopener">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="${social.facebook}" class="social-link" aria-label="Facebook" target="_blank" rel="noopener">
        <i class="fab fa-facebook"></i>
      </a>
      <a href="${social.whatsapp}" class="social-link" aria-label="WhatsApp" target="_blank" rel="noopener">
        <i class="fab fa-whatsapp"></i>
      </a>
    `;
  }

  setupEventListeners() {
    // Photo click handlers
    const photos = document.querySelectorAll('.couple-photo');
    photos.forEach(photo => {
      photo.addEventListener('click', () => this.enlargePhoto(photo));
      photo.addEventListener('error', () => this.handleImageError(photo));
    });

    // Social link handlers
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleSocialClick(e, link));
    });
  }

  enlargePhoto(photo) {
    // Create modal for enlarged photo view
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <img src="${photo.src}" alt="${photo.alt}">
        <p>${photo.alt}</p>
      </div>
    `;

    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    modal.querySelector('.modal-content').style.cssText = `
      max-width: 90%;
      max-height: 90%;
      position: relative;
      animation: zoomIn 0.3s ease;
    `;

    modal.querySelector('img').style.cssText = `
      max-width: 100%;
      max-height: 80vh;
      border-radius: 10px;
    `;

    modal.querySelector('.modal-close').style.cssText = `
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 2rem;
      cursor: pointer;
    `;

    modal.querySelector('p').style.cssText = `
      color: white;
      text-align: center;
      margin-top: 10px;
      font-family: 'Quicksand', sans-serif;
    `;

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

    document.body.appendChild(modal);
    setTimeout(() => modal.style.opacity = '1', 10);
  }

  handleImageError(img) {
    img.style.display = 'none';
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

  handleSocialClick(e, link) {
    e.preventDefault();
    const url = link.getAttribute('href');
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      this.showNotification('Tautan sosial media belum tersedia', 'info');
    }
  }

  showNotification(message, type = 'info') {
    // Implementation for showing notifications
    console.log(`${type}: ${message}`);
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .couple-section {
        padding: 80px 20px;
        background: linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(233,241,234,0.7) 100%);
      }

      .section-subtitle {
        text-align: center;
        color: var(--muted);
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.1rem;
        margin-bottom: 50px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
      }

      .couple-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 40px;
        max-width: 1000px;
        margin: 0 auto;
        position: relative;
      }

      .couple-card {
        flex: 1;
        max-width: 300px;
        text-align: center;
      }

      .couple-photo-frame {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 0 auto 25px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 15px 35px rgba(33, 44, 38, 0.15);
        border: 3px solid rgba(255, 255, 255, 0.8);
        transition: all 0.3s ease;
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
        transition: transform 0.3s ease;
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
        padding: 0 10px;
      }

      .couple-name {
        font-family: 'Playfair Display', serif;
        font-size: 1.4rem;
        color: var(--sage-dark);
        margin-bottom: 8px;
        font-weight: 600;
      }

      .couple-parents {
        color: var(--muted);
        font-family: 'Cormorant Garamond', serif;
        font-size: 1rem;
        margin-bottom: 12px;
        line-height: 1.4;
      }

      .couple-description {
        color: var(--charcoal);
        font-family: 'Quicksand', sans-serif;
        font-size: 0.9rem;
        margin-bottom: 20px;
        line-height: 1.5;
      }

      .couple-social {
        display: flex;
        justify-content: center;
        gap: 12px;
      }

      .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background: rgba(138, 168, 143, 0.1);
        color: var(--sage-dark);
        border-radius: 50%;
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 0.9rem;
      }

      .social-link:hover {
        background: var(--sage-dark);
        color: white;
        transform: translateY(-2px);
      }

      .heart-divider {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 2;
      }

      .heart-pulse {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        animation: heartBeat 2s ease-in-out infinite;
        box-shadow: 0 8px 25px rgba(138, 168, 143, 0.3);
      }

      @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .family-message {
        max-width: 600px;
        margin: 60px auto 0;
        padding: 30px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 16px;
        border: 1px solid rgba(138, 168, 143, 0.2);
        backdrop-filter: blur(10px);
      }

      .message-content {
        text-align: center;
      }

      .message-content p {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.1rem;
        color: var(--muted);
        line-height: 1.6;
        margin-bottom: 25px;
        font-style: italic;
      }

      .message-signature p {
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        color: var(--sage-dark);
        margin-bottom: 10px;
        font-style: normal;
      }

      .families {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-family: 'Playfair Display', serif;
        color: var(--charcoal);
      }

      .families .and {
        color: var(--sage);
        font-style: italic;
      }

      /* Photo Modal */
      @keyframes zoomIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }

      /* Responsive */
      @media (max-width: 768px) {
        .couple-container {
          flex-direction: column;
          gap: 30px;
        }

        .heart-divider {
          order: -1;
          margin-bottom: 20px;
        }

        .heart-pulse {
          width: 50px;
          height: 50px;
          font-size: 1.3rem;
        }

        .couple-photo-frame {
          width: 180px;
          height: 180px;
        }

        .couple-name {
          font-size: 1.3rem;
        }

        .family-message {
          margin-top: 40px;
          padding: 25px 20px;
        }
      }

      @media (max-width: 480px) {
        .couple-photo-frame {
          width: 160px;
          height: 160px;
        }

        .couple-name {
          font-size: 1.2rem;
        }

        .couple-parents {
          font-size: 0.9rem;
        }
      }
    `;

    if (!document.querySelector('style[data-couple]')) {
      style.setAttribute('data-couple', 'true');
      document.head.appendChild(style);
    }
  }
}

// Initialize couple section
document.addEventListener('DOMContentLoaded', () => {
  new CoupleInformation();
});