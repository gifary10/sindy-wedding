export class WeddingCountdown {
  constructor(scrollReveal) {
    this.scrollReveal = scrollReveal;
    this.weddingDate = new Date('2026-06-27T10:00:00+07:00');
    this.interval = null;
    this.init();
  }

  init() {
    this.createHeaderCountdown();
    this.startCountdown();
  }

  createHeaderCountdown() {
    // Pastikan elemen header countdown ada
    let countdownContainer = document.getElementById('header-countdown');
    if (!countdownContainer) {
      countdownContainer = document.createElement('div');
      countdownContainer.id = 'header-countdown';
      const headerContent = document.querySelector('.header-content');
      if (headerContent) {
        const weddingTitle = headerContent.querySelector('.wedding-title');
        if (weddingTitle && weddingTitle.nextElementSibling) {
          headerContent.insertBefore(countdownContainer, weddingTitle.nextElementSibling);
        } else {
          headerContent.appendChild(countdownContainer);
        }
      }
    }

    countdownContainer.innerHTML = `
      <div class="header-countdown">
        <div class="header-countdown-item">
          <div class="header-countdown-number" id="header-days">00</div>
          <div class="header-countdown-label">Hari</div>
        </div>
        <div class="header-countdown-item">
          <div class="header-countdown-number" id="header-hours">00</div>
          <div class="header-countdown-label">Jam</div>
        </div>
        <div class="header-countdown-item">
          <div class="header-countdown-number" id="header-minutes">00</div>
          <div class="header-countdown-label">Menit</div>
        </div>
        <div class="header-countdown-item">
          <div class="header-countdown-number" id="header-seconds">00</div>
          <div class="header-countdown-label">Detik</div>
        </div>
      </div>
    `;
  }

  startCountdown() {
    const updateCountdown = () => {
      const now = new Date();
      const diff = this.weddingDate - now;

      if (diff <= 0) {
        this.stopCountdown();
        this.setCountdownValues('00', '00', '00', '00');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      this.setCountdownValues(
        days.toString().padStart(2, '0'),
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
      );
    };

    updateCountdown();
    this.interval = setInterval(updateCountdown, 1000);
  }

  setCountdownValues(days, hours, minutes, seconds) {
    const d = document.getElementById('header-days');
    const h = document.getElementById('header-hours');
    const m = document.getElementById('header-minutes');
    const s = document.getElementById('header-seconds');

    if (d) d.textContent = days;
    if (h) h.textContent = hours;
    if (m) m.textContent = minutes;
    if (s) s.textContent = seconds;
  }

  stopCountdown() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  destroy() {
    this.stopCountdown();
  }
}