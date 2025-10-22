// rsvp.js - RSVP + Kirim Hadiah - OPTIMIZED & FIXED
class RSVP {
  constructor() {
    this.modal = null;
    this.isSubmitting = false;
    this.init();
  }

  init() {
    try {
      this.createModal();
      this.bindEvents();
      this.setupFloatingButton();
    } catch (error) {
      console.error('Error initializing RSVP:', error);
    }
  }

  createModal() {
    if (document.querySelector('.rsvp-modal')) return;

    this.modal = document.createElement("div");
    this.modal.className = "rsvp-modal";
    this.modal.setAttribute('aria-hidden', 'true');
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-labelledby', 'rsvpModalTitle');

    this.modal.innerHTML = `
      <div class="rsvp-content">
        <button class="close-btn" aria-label="Tutup modal">&times;</button>
        <h2 id="rsvpModalTitle" class="modal-title">Konfirmasi Kehadiran & Hadiah</h2>
        
        <div class="tab-menu" role="tablist" aria-label="Pilih jenis konfirmasi">
          <button class="tab active" 
                  role="tab" 
                  aria-selected="true" 
                  aria-controls="rsvpTab"
                  id="rsvpTabBtn"
                  data-tab="rsvp">
            Konfirmasi Kehadiran
          </button>
          <button class="tab" 
                  role="tab" 
                  aria-selected="false" 
                  aria-controls="giftTab"
                  id="giftTabBtn"
                  data-tab="gift">
            Kirim Hadiah
          </button>
        </div>

        <div class="tab-content active" id="rsvpTab" role="tabpanel" aria-labelledby="rsvpTabBtn">
          <form id="rsvpForm" novalidate>
            <div class="form-group">
              <label for="guestName">Nama kamu *</label>
              <input type="text" id="guestName" name="name" required 
                     placeholder="Tulis nama kamu di sini" 
                     aria-describedby="nameHelp">
              <small id="nameHelp" class="help-text">Gunakan nama lengkap untuk memudahkan identifikasi</small>
            </div>

            <div class="form-group">
              <label for="guestPhone">Nomor WhatsApp kamu *</label>
              <input type="tel" id="guestPhone" name="phone" required 
                     placeholder="Contoh: 62812xxxx"
                     pattern="[0-9]{10,13}"
                     aria-describedby="phoneHelp">
              <small id="phoneHelp" class="help-text">Format: 62xxxxxxxxxx (tanpa + dan spasi)</small>
            </div>

            <div class="form-group">
              <label>Kamu bakal hadir gak nih? *</label>
              <div class="attendance" role="radiogroup" aria-labelledby="attendanceLabel">
                <label class="radio-label">
                  <input type="radio" name="attendance" value="hadir" required>
                  <span class="radio-custom"></span>
                  Iya, aku hadir!
                </label>
                <label class="radio-label">
                  <input type="radio" name="attendance" value="tidak">
                  <span class="radio-custom"></span>
                  Maaf, gak bisa datang
                </label>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-submit" id="submitRsvp" disabled>
                <i class="fas fa-paper-plane" aria-hidden="true"></i>
                Kirim Konfirmasi
              </button>
            </div>
          </form>

          <div class="thankyou" id="thankyouMessage" style="display: none;">
            <div class="thankyou-icon">
              <i class="fas fa-check-circle" aria-hidden="true"></i>
            </div>
            <h3>Terima kasih! 🙏</h3>
            <p>Konfirmasi kamu udah kami terima. Sampai ketemu di hari bahagia ya</p>
            <button class="btn-new" id="newRsvp">
              <i class="fas fa-plus" aria-hidden="true"></i>
              Isi Lagi
            </button>
          </div>
        </div>

        <div class="tab-content" id="giftTab" role="tabpanel" aria-labelledby="giftTabBtn" hidden>
          <div class="gift-intro">
            <p>Terima kasih sudah ingin berbagi kebahagiaan kami</p>
            <p>Kamu bisa kirim hadiah lewat transfer atau QRIS di bawah ini.</p>
          </div>

          <div class="gift-box">
            <div class="gift-icon">
              <i class="fas fa-university" aria-hidden="true"></i>
            </div>
            <h4>Transfer Bank</h4>
            <div class="bank-details">
              <p><strong>BCA</strong></p>
              <p class="account-number">1234567890</p>
              <p>a.n <strong>Gifary & Sindy</strong></p>
            </div>
            <button class="copy-btn" data-copy="1234567890" aria-describedby="copyHelp">
              <i class="fas fa-copy" aria-hidden="true"></i>
              Salin Nomor Rekening
            </button>
            <small id="copyHelp" class="help-text">Klik untuk menyalin ke clipboard</small>
          </div>

          <div class="gift-box">
            <div class="gift-icon">
              <i class="fas fa-qrcode" aria-hidden="true"></i>
            </div>
            <h4>QRIS</h4>
            <div class="qris-container">
              <img src="images/qris.png" alt="QR Code untuk pembayaran QRIS" class="qris-img" loading="lazy">
              <p class="qris-help">Scan QRIS untuk kirim hadiah secara cepat</p>
            </div>
          </div>

          <div class="gift-note">
            <p><strong>Catatan:</strong> Hadiah berupa transfer akan sangat membantu kami memulai kehidupan rumah tangga. Terima kasih atas kebaikan hati Anda.</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);
    this.addStyles();
  }

  addStyles() {
    if (document.querySelector('style[data-rsvp]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-rsvp', 'true');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap');

      .rsvp-modal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        visibility: hidden;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 10000;
        padding: 20px;
        box-sizing: border-box;
      }

      .rsvp-modal.active {
        visibility: visible;
        opacity: 1;
      }

      .rsvp-modal.active .rsvp-content {
        transform: translateY(0);
        opacity: 1;
      }

      .rsvp-content {
        background: #fff;
        border-radius: 20px;
        width: 100%;
        max-width: 480px;
        padding: 30px;
        box-sizing: border-box;
        position: relative;
        font-family: 'Roboto', sans-serif;
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        transform: translateY(-30px);
        opacity: 0;
        transition: all 0.3s ease;
        max-height: 90vh;
        overflow-y: auto;
      }

      .modal-title {
        text-align: center;
        color: var(--sage-dark);
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        margin: 0 0 25px 0;
        font-weight: 600;
      }

      .close-btn {
        position: absolute;
        right: 20px;
        top: 20px;
        border: none;
        background: none;
        font-size: 1.8rem;
        cursor: pointer;
        color: var(--muted);
        transition: color 0.3s ease;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .close-btn:hover {
        color: var(--sage-dark);
        background: rgba(138, 168, 143, 0.1);
      }

      .tab-menu {
        display: flex;
        background: rgba(138, 168, 143, 0.1);
        border-radius: 12px;
        padding: 6px;
        margin-bottom: 30px;
      }

      .tab {
        flex: 1;
        padding: 12px 16px;
        border: none;
        background: transparent;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        font-family: 'Roboto', sans-serif;
        font-size: 0.95rem;
        color: var(--muted);
      }

      .tab:hover {
        color: var(--sage-dark);
      }

      .tab.active {
        background: var(--sage-dark);
        color: white;
        box-shadow: 0 4px 12px rgba(138, 168, 143, 0.3);
      }

      .tab-content {
        display: none;
      }

      .tab-content.active {
        display: block;
        animation: tabFadeIn 0.3s ease;
      }

      @keyframes tabFadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .form-group {
        margin-bottom: 25px;
      }

      .form-group label {
        display: block;
        margin-bottom: 8px;
        color: var(--sage-dark);
        font-weight: 600;
        font-size: 0.95rem;
      }

      .form-group input {
        width: 100%;
        padding: 14px 16px;
        border: 2px solid #e0e6e2;
        border-radius: 10px;
        font-size: 1rem;
        background: #fafafa;
        transition: all 0.3s ease;
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
      }

      .form-group input:focus {
        border-color: var(--sage);
        outline: none;
        background: white;
        box-shadow: 0 0 0 3px rgba(138, 168, 143, 0.1);
      }

      .form-group input:invalid:not(:focus):not(:placeholder-shown) {
        border-color: var(--error);
      }

      .help-text {
        display: block;
        margin-top: 6px;
        color: var(--muted);
        font-size: 0.85rem;
        line-height: 1.4;
      }

      .attendance {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 10px;
      }

      .radio-label {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        border: 2px solid #e0e6e2;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        background: #fafafa;
      }

      .radio-label:hover {
        border-color: var(--sage);
        background: rgba(138, 168, 143, 0.05);
      }

      .radio-label input {
        display: none;
      }

      .radio-custom {
        width: 20px;
        height: 20px;
        border: 2px solid #ccc;
        border-radius: 50%;
        position: relative;
        transition: all 0.3s ease;
      }

      .radio-label input:checked + .radio-custom {
        border-color: var(--sage-dark);
        background: var(--sage-dark);
      }

      .radio-label input:checked + .radio-custom::after {
        content: '';
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .form-actions {
        margin-top: 30px;
      }

      .btn-submit {
        width: 100%;
        padding: 16px;
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Roboto', sans-serif;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }

      .btn-submit:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(138, 168, 143, 0.3);
      }

      .btn-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
      }

      .thankyou {
        text-align: center;
        padding: 30px 20px;
      }

      .thankyou-icon {
        font-size: 4rem;
        color: var(--success);
        margin-bottom: 20px;
      }

      .thankyou h3 {
        color: var(--sage-dark);
        margin-bottom: 15px;
        font-size: 1.4rem;
      }

      .thankyou p {
        color: var(--muted);
        margin-bottom: 25px;
        line-height: 1.5;
      }

      .btn-new {
        padding: 12px 24px;
        background: rgba(138, 168, 143, 0.1);
        color: var(--sage-dark);
        border: 2px solid rgba(138, 168, 143, 0.3);
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Roboto', sans-serif;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .btn-new:hover {
        background: rgba(138, 168, 143, 0.2);
        transform: translateY(-2px);
      }

      .gift-intro {
        text-align: center;
        margin-bottom: 30px;
      }

      .gift-intro p {
        color: var(--muted);
        margin: 8px 0;
        line-height: 1.5;
      }

      .gift-box {
        background: rgba(138, 168, 143, 0.05);
        border: 1px solid rgba(138, 168, 143, 0.2);
        border-radius: 15px;
        padding: 25px;
        margin-bottom: 20px;
        text-align: center;
      }

      .gift-icon {
        font-size: 2.5rem;
        color: var(--sage-dark);
        margin-bottom: 15px;
      }

      .gift-box h4 {
        color: var(--sage-dark);
        margin-bottom: 15px;
        font-size: 1.2rem;
      }

      .bank-details {
        margin-bottom: 20px;
      }

      .bank-details p {
        margin: 8px 0;
        color: var(--charcoal);
      }

      .account-number {
        font-family: 'Courier New', monospace;
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--sage-dark);
        background: rgba(255,255,255,0.8);
        padding: 10px;
        border-radius: 8px;
        margin: 12px 0;
      }

      .copy-btn {
        width: 100%;
        padding: 14px;
        background: var(--sage-dark);
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      .copy-btn:hover {
        background: var(--sage);
        transform: translateY(-2px);
      }

      .copy-btn.copied {
        background: var(--success);
      }

      .qris-container {
        margin: 20px 0;
      }

      .qris-img {
        width: 200px;
        height: 200px;
        border-radius: 12px;
        border: 2px solid #e0e6e2;
        margin: 0 auto;
        display: block;
      }

      .qris-help {
        color: var(--muted);
        margin-top: 15px;
        font-size: 0.9rem;
      }

      .gift-note {
        background: rgba(255, 243, 205, 0.3);
        border: 1px solid rgba(255, 193, 7, 0.2);
        border-radius: 10px;
        padding: 20px;
        margin-top: 25px;
      }

      .gift-note p {
        margin: 0;
        color: var(--charcoal);
        line-height: 1.5;
        font-size: 0.9rem;
      }

      @media (max-width: 768px) {
        .rsvp-content {
          padding: 25px 20px;
          max-width: 95%;
        }

        .modal-title {
          font-size: 1.3rem;
          margin-bottom: 20px;
        }

        .tab {
          padding: 10px 12px;
          font-size: 0.9rem;
        }

        .gift-box {
          padding: 20px;
        }

        .qris-img {
          width: 180px;
          height: 180px;
        }
      }

      @media (max-width: 480px) {
        .rsvp-content {
          padding: 20px 15px;
        }

        .tab-menu {
          flex-direction: column;
          gap: 5px;
        }

        .attendance {
          gap: 8px;
        }

        .radio-label {
          padding: 12px;
        }

        .thankyou {
          padding: 20px 15px;
        }

        .thankyou-icon {
          font-size: 3rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .rsvp-modal,
        .rsvp-content,
        .tab,
        .btn-submit,
        .btn-new,
        .copy-btn {
          transition: none;
        }
        
        .tab-content.active {
          animation: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  bindEvents() {
    if (!this.modal) return;

    // Open modal from floating button
    document.querySelector(".rsvp-floating-btn")?.addEventListener("click", () => {
      this.openModal();
    });

    // Close modal
    this.modal.querySelector(".close-btn").addEventListener("click", () => this.closeModal());
    this.modal.addEventListener("click", (e) => { 
      if (e.target === this.modal) this.closeModal();
    });

    // Tab switching
    const tabs = this.modal.querySelectorAll(".tab");
    const tabContents = this.modal.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const tabName = tab.dataset.tab;
        
        // Update tab states
        tabs.forEach(t => {
          t.classList.remove("active");
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add("active");
        tab.setAttribute('aria-selected', 'true');

        // Update tab content visibility
        tabContents.forEach(content => {
          content.classList.remove("active");
          content.hidden = true;
        });
        
        const activeContent = document.getElementById(`${tabName}Tab`);
        activeContent.classList.add("active");
        activeContent.hidden = false;

        // Focus management for accessibility
        activeContent.focus();
      });
    });

    // Form submission
    const form = this.modal.querySelector("#rsvpForm");
    const thankyou = this.modal.querySelector("#thankyouMessage");
    const newBtn = this.modal.querySelector("#newRsvp");

    if (form) {
      form.addEventListener("input", () => this.validateRsvpForm());
      form.addEventListener("submit", (e) => this.handleRsvpSubmit(e));
    }

    if (newBtn) {
      newBtn.addEventListener("click", () => {
        thankyou.style.display = "none";
        form.style.display = "block";
        form.reset();
        this.validateRsvpForm();
      });
    }

    // Copy button functionality
    this.modal.querySelectorAll(".copy-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const textToCopy = btn.dataset.copy;
        this.copyToClipboard(textToCopy, btn);
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  setupFloatingButton() {
    const floatingBtn = document.querySelector('.rsvp-floating-btn');
    if (floatingBtn) {
      // Ensure it's accessible
      floatingBtn.setAttribute('aria-label', 'Buka konfirmasi kehadiran dan kirim hadiah');
      floatingBtn.setAttribute('role', 'button');
    }
  }

  openModal() {
    if (!this.modal) return;

    this.modal.classList.add("active");
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = "hidden";

    // Reset form state
    const form = this.modal.querySelector("#rsvpForm");
    const thankyou = this.modal.querySelector("#thankyouMessage");
    if (form && thankyou) {
      form.style.display = "block";
      thankyou.style.display = "none";
      form.reset();
      this.validateRsvpForm();
    }

    // Focus management
    setTimeout(() => {
      const firstTab = this.modal.querySelector('.tab.active');
      if (firstTab) firstTab.focus();
    }, 100);
  }

  closeModal() {
    if (!this.modal) return;

    this.modal.classList.remove("active");
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = "";

    // Return focus to floating button
    const floatingBtn = document.querySelector('.rsvp-floating-btn');
    if (floatingBtn) {
      setTimeout(() => floatingBtn.focus(), 100);
    }
  }

  validateRsvpForm() {
    const form = this.modal.querySelector("#rsvpForm");
    const submitBtn = this.modal.querySelector("#submitRsvp");
    if (!form || !submitBtn) return;

    const name = form.guestName.value.trim();
    const phone = form.guestPhone.value.trim();
    const attendance = form.querySelector('input[name="attendance"]:checked');

    const isValid = name.length >= 2 && 
                   phone.length >= 10 && 
                   /^[0-9]+$/.test(phone) && 
                   attendance;

    submitBtn.disabled = !isValid;
    return isValid;
  }

  handleRsvpSubmit(e) {
    e.preventDefault();
    
    if (!this.validateRsvpForm() || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    const form = this.modal.querySelector("#rsvpForm");
    const thankyou = this.modal.querySelector("#thankyouMessage");
    const submitBtn = this.modal.querySelector("#submitRsvp");

    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Mengirim...';
      submitBtn.disabled = true;
    }

    // Simulate API call
    setTimeout(() => {
      try {
        const formData = {
          name: form.guestName.value.trim(),
          phone: form.guestPhone.value.trim(),
          attendance: form.querySelector('input[name="attendance"]:checked').value,
          timestamp: new Date().toISOString()
        };

        this.saveRsvp(formData);
        
        // Show success message
        form.style.display = "none";
        thankyou.style.display = "block";

        this.showNotification('Konfirmasi kehadiran berhasil dikirim!', 'success');
      } catch (error) {
        console.error('Error submitting RSVP:', error);
        this.showNotification('Gagal mengirim konfirmasi. Silakan coba lagi.', 'error');
      } finally {
        this.isSubmitting = false;
      }
    }, 1500);
  }

  saveRsvp(data) {
    try {
      const existingRsvps = JSON.parse(localStorage.getItem('wedding-rsvps') || '[]');
      existingRsvps.push(data);
      localStorage.setItem('wedding-rsvps', JSON.stringify(existingRsvps));
    } catch (error) {
      console.error('Error saving RSVP:', error);
      throw error;
    }
  }

  async copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      
      // Visual feedback
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Disalin!';
      button.classList.add('copied');
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('copied');
      }, 2000);

      this.showNotification('Nomor rekening berhasil disalin!', 'success');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      this.showNotification('Gagal menyalin ke clipboard', 'error');
    }
  }

  showNotification(message, type = 'info') {
    if (window.showNotification) {
      window.showNotification(message, type);
      return;
    }

    // Fallback notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}" aria-hidden="true"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  destroy() {
    if (this.modal && this.modal.parentNode) {
      this.modal.remove();
    }
  }
}

// Initialize RSVP
let rsvpSystem;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    rsvpSystem = new RSVP();
  });
} else {
  rsvpSystem = new RSVP();
}
