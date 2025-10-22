// countdown.js - Countdown Timer - OPTIMIZED & FIXED
class WeddingCountdown {
  constructor() {
    this.weddingDate = new Date('2026-06-27T10:00:00+07:00');
    this.elements = {};
    this.interval = null;
    this.init();
  }

  init() {
    try {
      this.createCountdownSection();
      this.startCountdown();
      this.setupIntersectionObserver();
    } catch (error) {
      console.error('Error initializing countdown:', error);
      this.showErrorState();
    }
  }

  createCountdownSection() {
    // Cek apakah section sudah ada
    if (document.getElementById('countdown')) {
      this.elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
      };
      return;
    }

    const countdownSection = document.createElement('section');
    countdownSection.id = 'countdown';
    countdownSection.className = 'countdown-section';
    countdownSection.setAttribute('data-aos', 'fade-up');

    countdownSection.innerHTML = `
      <div class="container">
        <h2 class="title">Menuju Hari Bahagia</h2>
        <div class="countdown-container">
          <div class="countdown-item">
            <div class="countdown-number" id="days">00</div>
            <div class="countdown-label">Hari</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-number" id="hours">00</div>
            <div class="countdown-label">Jam</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-number" id="minutes">00</div>
            <div class="countdown-label">Menit</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-number" id="seconds">00</div>
            <div class="countdown-label">Detik</div>
          </div>
        </div>
        <div class="countdown-message">
          <p>Tak terasa waktu terus berjalan, membawa kita semakin dekat dengan hari yang dinantikan</p>
        </div>
      </div>
    `;

    // Insert countdown after header
    const header = document.querySelector('header');
    const main = document.getElementById('content');
    if (header && main) {
      header.parentNode.insertBefore(countdownSection, header.nextSibling);
    } else {
      document.body.insertBefore(countdownSection, document.body.firstChild);
    }

    // Store element references
    this.elements = {
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds')
    };

    this.addStyles();
  }

  addStyles() {
    if (document.querySelector('style[data-countdown]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-countdown', 'true');
    style.textContent = `
      .countdown-section {
        background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(233,241,234,0.8) 100%);
        padding: 60px 20px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .countdown-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(138,168,143,0.3), transparent);
      }

      .countdown-container {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 40px 0;
        flex-wrap: wrap;
      }

      .countdown-item {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(138, 168, 143, 0.2);
        border-radius: 16px;
        padding: 25px 15px;
        min-width: 100px;
        box-shadow: 0 8px 25px rgba(33, 44, 38, 0.08);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .countdown-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--sage), var(--sage-dark));
      }

      .countdown-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(33, 44, 38, 0.12);
      }

      .countdown-number {
        font-family: 'Playfair Display', serif;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--sage-dark);
        line-height: 1;
        margin-bottom: 8px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.05);
      }

      .countdown-label {
        font-family: 'Quicksand', sans-serif;
        font-size: 0.9rem;
        color: var(--muted);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .countdown-message {
        max-width: 500px;
        margin: 30px auto 0;
        padding: 20px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 12px;
        border: 1px solid rgba(138, 168, 143, 0.1);
      }

      .countdown-message p {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.1rem;
        color: var(--muted);
        font-style: italic;
        margin: 0;
        line-height: 1.6;
      }

      @keyframes countdownPop {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }

      .countdown-changing {
        animation: countdownPop 0.3s ease;
      }

      @media (max-width: 768px) {
        .countdown-section {
          padding: 40px 15px;
        }

        .countdown-container {
          gap: 12px;
          margin: 30px 0;
        }

        .countdown-item {
          min-width: 80px;
          padding: 20px 10px;
        }

        .countdown-number {
          font-size: 2rem;
        }

        .countdown-label {
          font-size: 0.8rem;
        }
      }

      @media (max-width: 480px) {
        .countdown-container {
          gap: 8px;
        }

        .countdown-item {
          min-width: 70px;
          padding: 15px 8px;
        }

        .countdown-number {
          font-size: 1.7rem;
        }

        .countdown-label {
          font-size: 0.75rem;
        }
      }

      .wedding-passed {
        background: linear-gradient(135deg, rgba(233,241,234,0.9) 0%, rgba(207,227,208,0.8) 100%);
      }

      .wedding-passed .countdown-item {
        background: rgba(255, 255, 255, 0.9);
      }
    `;

    document.head.appendChild(style);
  }

  startCountdown() {
    this.updateCountdown();
    this.interval = setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown() {
    try {
      const now = new Date();
      const timeDifference = this.weddingDate - now;

      if (timeDifference <= 0) {
        this.handleWeddingDay();
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      this.updateDisplay(days, hours, minutes, seconds);
    } catch (error) {
      console.error('Error updating countdown:', error);
      this.showErrorState();
    }
  }

  updateDisplay(days, hours, minutes, seconds) {
    const formatNumber = (num) => num.toString().padStart(2, '0');

    this.updateElementWithAnimation('days', formatNumber(days));
    this.updateElementWithAnimation('hours', formatNumber(hours));
    this.updateElementWithAnimation('minutes', formatNumber(minutes));
    this.updateElementWithAnimation('seconds', formatNumber(seconds));
  }

  updateElementWithAnimation(elementId, newValue) {
    const element = this.elements[elementId];
    if (element && element.textContent !== newValue) {
      element.textContent = newValue;
      element.classList.add('countdown-changing');
      setTimeout(() => {
        element.classList.remove('countdown-changing');
      }, 300);
    }
  }

  handleWeddingDay() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    
    const countdownSection = document.getElementById('countdown');
    if (countdownSection) {
      countdownSection.classList.add('wedding-passed');
      
      const container = countdownSection.querySelector('.countdown-container');
      const message = countdownSection.querySelector('.countdown-message');
      
      if (container) {
        container.innerHTML = `
          <div style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 3rem; margin-bottom: 20px;">🎉</div>
            <h3 style="color: var(--sage-dark); font-family: 'Playfair Display', serif; margin-bottom: 15px; font-size: 1.5rem;">
              Hari Bahagia Telah Tiba!
            </h3>
            <p style="color: var(--muted); font-size: 1.1rem; line-height: 1.6;">
              Terima kasih telah menjadi bagian dari hari spesial kami. 
              Cinta dan kebahagiaan akan terus tumbuh dalam kehidupan pernikahan kami.
            </p>
          </div>
        `;
      }

      if (message) {
        message.innerHTML = `
          <p style="text-align: center; color: var(--sage-dark); font-weight: 600; font-size: 1rem;">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, 
            supaya kamu cenderung dan merasa tenteram kepadanya." (QS. Ar-Rum: 21)
          </p>
        `;
      }
    }
  }

  setupIntersectionObserver() {
    const countdownSection = document.getElementById('countdown');
    if (!countdownSection || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1 });

    observer.observe(countdownSection);
  }

  showErrorState() {
    const countdownSection = document.getElementById('countdown');
    if (countdownSection) {
      countdownSection.innerHTML = `
        <div class="container">
          <h2 class="title">Menuju Hari Bahagia</h2>
          <div style="text-align: center; padding: 40px 20px; color: var(--muted);">
            <p>Terjadi kesalahan dalam menampilkan countdown.</p>
            <p>Sabtu, 27 Juni 2026 — Jam 10:00 WIB</p>
          </div>
        </div>
      `;
    }
  }

  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// Initialize countdown when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new WeddingCountdown();
  });
} else {
  new WeddingCountdown();
}
