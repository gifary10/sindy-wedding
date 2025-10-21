// rsvp.js - RSVP System - OPTIMIZED
class RSVPSystem {
  constructor() {
    this.guests = [];
    this.formData = {
      name: '',
      email: '',
      phone: '',
      attendance: 'yes',
      guests: 1,
      message: ''
    };
    this.init();
  }

  init() {
    try {
      this.createRSVPSection();
      this.setupEventListeners();
      this.loadGuests();
    } catch (error) {
      console.error('Error initializing RSVP system:', error);
    }
  }

  createRSVPSection() {
    const section = document.createElement('section');
    section.id = 'rsvp';
    section.className = 'rsvp-section';
    section.setAttribute('data-aos', 'fade-up');

    section.innerHTML = `
      <div class="container">
        <h2 class="title">Konfirmasi Kehadiran</h2>
        <p class="section-subtitle">Mohon konfirmasi kehadiran Anda paling lambat 7 hari sebelum acara</p>
        
        <div class="rsvp-container">
          <!-- RSVP Form -->
          <div class="rsvp-form-container" data-aos="fade-right">
            <form class="rsvp-form" id="rsvpForm">
              <div class="form-group">
                <label for="name">Nama Lengkap *</label>
                <input type="text" id="name" name="name" required 
                       placeholder="Masukkan nama lengkap Anda">
                <div class="error-message" id="nameError"></div>
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" 
                       placeholder="email@contoh.com (opsional)">
                <div class="error-message" id="emailError"></div>
              </div>

              <div class="form-group">
                <label for="phone">Nomor WhatsApp *</label>
                <input type="tel" id="phone" name="phone" required 
                       placeholder="62xxx" pattern="[0-9]{10,13}">
                <div class="error-message" id="phoneError"></div>
              </div>

              <div class="form-group">
                <label>Konfirmasi Kehadiran *</label>
                <div class="attendance-options">
                  <label class="option-btn">
                    <input type="radio" name="attendance" value="yes" checked>
                    <span class="option-content">
                      <i class="fas fa-check-circle"></i>
                      <span>Hadir</span>
                    </span>
                  </label>
                  <label class="option-btn">
                    <input type="radio" name="attendance" value="no">
                    <span class="option-content">
                      <i class="fas fa-times-circle"></i>
                      <span>Tidak Hadir</span>
                    </span>
                  </label>
                  <label class="option-btn">
                    <input type="radio" name="attendance" value="maybe">
                    <span class="option-content">
                      <i class="fas fa-question-circle"></i>
                      <span>Masih Ragu</span>
                    </span>
                  </label>
                </div>
              </div>

              <div class="form-group" id="guestsGroup">
                <label for="guests">Jumlah Tamu *</label>
                <select id="guests" name="guests" required>
                  ${Array.from({length: 6}, (_, i) => 
                    `<option value="${i + 1}">${i + 1} ${i === 0 ? 'Orang' : 'Orang'}</option>`
                  ).join('')}
                </select>
              </div>

              <div class="form-group">
                <label for="message">Ucapan & Doa</label>
                <textarea id="message" name="message" rows="4" 
                          placeholder="Tuliskan ucapan dan doa untuk mempelai..."></textarea>
              </div>

              <button type="submit" class="btn-submit">
                <i class="fas fa-paper-plane"></i>
                Kirim Konfirmasi
              </button>
            </form>
          </div>

          <!-- RSVP Info -->
          <div class="rsvp-info" data-aos="fade-left">
            <div class="info-card">
              <h3>Informasi Penting</h3>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="info-content">
                  <h4>Batas Konfirmasi</h4>
                  <p>H-7 sebelum acara (20 Juni 2026)</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-users"></i>
                </div>
                <div class="info-content">
                  <h4>Kuota Tamu</h4>
                  <p>Maksimal 5 orang per undangan</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-utensils"></i>
                </div>
                <div class="info-content">
                  <h4>Katering</h4>
                  <p>Menu halal dengan berbagai pilihan</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-parking"></i>
                </div>
                <div class="info-content">
                  <h4>Parkir</h4>
                  <p>Tersedia area parkir yang luas</p>
                </div>
              </div>

              <!-- Attendance Stats -->
              <div class="attendance-stats">
                <h4>Statistik Kehadiran</h4>
                <div class="stats-grid">
                  <div class="stat-item">
                    <div class="stat-number" id="confirmedCount">0</div>
                    <div class="stat-label">Konfirmasi</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-number" id="attendingCount">0</div>
                    <div class="stat-label">Hadir</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-number" id="totalGuests">0</div>
                    <div class="stat-label">Tamu</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Confirmation Modal -->
        <div class="confirmation-modal" id="confirmationModal">
          <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3>Konfirmasi Terkirim!</h3>
            <p id="modalMessage">Terima kasih telah mengonfirmasi kehadiran Anda.</p>
            <button class="btn-modal-close">Tutup</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('content').appendChild(section);
    this.addStyles();
  }

  setupEventListeners() {
    const form = document.getElementById('rsvpForm');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Attendance radio buttons
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    attendanceRadios.forEach(radio => {
      radio.addEventListener('change', () => this.handleAttendanceChange());
    });

    // Modal close buttons
    const modal = document.getElementById('confirmationModal');
    if (modal) {
      modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
      modal.querySelector('.btn-modal-close').addEventListener('click', () => this.closeModal());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal();
      });
    }

    // Form input validation
    this.setupFormValidation();
  }

  setupFormValidation() {
    const inputs = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      phone: document.getElementById('phone')
    };

    // Real-time validation
    Object.entries(inputs).forEach(([field, input]) => {
      if (input) {
        input.addEventListener('blur', () => this.validateField(field, input.value));
        input.addEventListener('input', () => this.clearError(field));
      }
    });
  }

  validateField(field, value) {
    const errorElement = document.getElementById(`${field}Error`);
    
    switch(field) {
      case 'name':
        if (!value.trim()) {
          this.showError('name', 'Nama lengkap wajib diisi');
          return false;
        }
        if (value.trim().length < 2) {
          this.showError('name', 'Nama minimal 2 karakter');
          return false;
        }
        break;
      
      case 'email':
        if (value && !this.isValidEmail(value)) {
          this.showError('email', 'Format email tidak valid');
          return false;
        }
        break;
      
      case 'phone':
        if (!value.trim()) {
          this.showError('phone', 'Nomor WhatsApp wajib diisi');
          return false;
        }
        if (!/^[0-9]{10,13}$/.test(value)) {
          this.showError('phone', 'Format nomor WhatsApp tidak valid');
          return false;
        }
        break;
    }
    
    this.clearError(field);
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(field, message) {
    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  clearError(field) {
    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }

  handleAttendanceChange() {
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    const guestsGroup = document.getElementById('guestsGroup');
    
    if (attendance !== 'yes') {
      guestsGroup.style.opacity = '0.5';
      guestsGroup.style.pointerEvents = 'none';
    } else {
      guestsGroup.style.opacity = '1';
      guestsGroup.style.pointerEvents = 'all';
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      phone: formData.get('phone').trim(),
      attendance: formData.get('attendance'),
      guests: parseInt(formData.get('guests')),
      message: formData.get('message').trim(),
      timestamp: new Date().toISOString(),
      id: this.generateId()
    };

    // Validate all fields
    if (!this.validateAllFields(data)) {
      return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;

    try {
      // Simulate API call
      await this.submitRSVP(data);
      
      // Add to local storage
      this.guests.push(data);
      this.saveGuests();
      
      // Show success modal
      this.showSuccessModal(data);
      
      // Reset form
      e.target.reset();
      this.handleAttendanceChange(); // Reset guests group state
      
    } catch (error) {
      this.showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  validateAllFields(data) {
    let isValid = true;

    if (!this.validateField('name', data.name)) isValid = false;
    if (data.email && !this.validateField('email', data.email)) isValid = false;
    if (!this.validateField('phone', data.phone)) isValid = false;

    return isValid;
  }

  async submitRSVP(data) {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, you would send data to your backend here
        console.log('RSVP Data:', data);
        resolve({ success: true });
      }, 1500);
    });
  }

  showSuccessModal(data) {
    const modal = document.getElementById('confirmationModal');
    const message = document.getElementById('modalMessage');
    
    let modalMessage = '';
    switch(data.attendance) {
      case 'yes':
        modalMessage = `Terima kasih ${data.name}! Konfirmasi kehadiran Anda untuk ${data.guests} tamu telah tercatat.`;
        break;
      case 'no':
        modalMessage = `Terima kasih ${data.name}! Kami menghargai konfirmasi ketidakhadiran Anda.`;
        break;
      case 'maybe':
        modalMessage = `Terima kasih ${data.name}! Kami mencatat kemungkinan kehadiran Anda.`;
        break;
    }
    
    if (data.message) {
      modalMessage += `<br><br><em>"${data.message}"</em>`;
    }

    message.innerHTML = modalMessage;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Update stats
    this.updateStats();
  }

  closeModal() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  loadGuests() {
    try {
      const saved = localStorage.getItem('weddingGuests');
      if (saved) {
        this.guests = JSON.parse(saved);
        this.updateStats();
      }
    } catch (error) {
      console.error('Error loading guests:', error);
    }
  }

  saveGuests() {
    try {
      localStorage.setItem('weddingGuests', JSON.stringify(this.guests));
    } catch (error) {
      console.error('Error saving guests:', error);
    }
  }

  updateStats() {
    const confirmedCount = this.guests.length;
    const attendingCount = this.guests.filter(g => g.attendance === 'yes').length;
    const totalGuests = this.guests.reduce((sum, guest) => sum + (guest.attendance === 'yes' ? guest.guests : 0), 0);

    document.getElementById('confirmedCount').textContent = confirmedCount;
    document.getElementById('attendingCount').textContent = attendingCount;
    document.getElementById('totalGuests').textContent = totalGuests;
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .rsvp-section {
        padding: 80px 20px;
        background: linear-gradient(180deg, rgba(233,241,234,0.7) 0%, rgba(255,255,255,0.9) 100%);
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

      .rsvp-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        max-width: 1000px;
        margin: 0 auto;
      }

      .rsvp-form-container {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(138, 168, 143, 0.2);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(33, 44, 38, 0.08);
      }

      .rsvp-form {
        space-y: 20px;
      }

      .form-group {
        margin-bottom: 25px;
      }

      .form-group label {
        display: block;
        margin-bottom: 8px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        color: var(--sage-dark);
        font-size: 0.95rem;
      }

      .form-group input,
      .form-group select,
      .form-group textarea {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid rgba(138, 168, 143, 0.3);
        border-radius: 10px;
        font-family: 'Quicksand', sans-serif;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.8);
      }

      .form-group input:focus,
      .form-group select:focus,
      .form-group textarea:focus {
        outline: none;
        border-color: var(--sage);
        box-shadow: 0 0 0 3px rgba(138, 168, 143, 0.1);
      }

      .form-group input::placeholder,
      .form-group textarea::placeholder {
        color: #a0a0a0;
      }

      .error-message {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 5px;
        display: none;
        font-family: 'Quicksand', sans-serif;
      }

      .attendance-options {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
      }

      .option-btn {
        cursor: pointer;
      }

      .option-btn input {
        display: none;
      }

      .option-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 12px;
        border: 2px solid rgba(138, 168, 143, 0.3);
        border-radius: 10px;
        transition: all 0.3s ease;
        text-align: center;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        color: var(--muted);
      }

      .option-btn input:checked + .option-content {
        border-color: var(--sage);
        background: rgba(138, 168, 143, 0.1);
        color: var(--sage-dark);
      }

      .option-content i {
        font-size: 1.2rem;
      }

      .option-content span {
        font-size: 0.85rem;
      }

      .btn-submit {
        width: 100%;
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
        border: none;
        padding: 15px;
        border-radius: 25px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 1rem;
      }

      .btn-submit:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(138, 168, 143, 0.3);
      }

      .btn-submit:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .rsvp-info {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .info-card {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(138, 168, 143, 0.2);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(33, 44, 38, 0.08);
      }

      .info-card h3 {
        font-family: 'Playfair Display', serif;
        color: var(--sage-dark);
        margin-bottom: 25px;
        font-size: 1.3rem;
        text-align: center;
      }

      .info-item {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
        padding: 15px;
        background: rgba(138, 168, 143, 0.05);
        border-radius: 12px;
        transition: all 0.3s ease;
      }

      .info-item:hover {
        transform: translateX(5px);
        background: rgba(138, 168, 143, 0.1);
      }

      .info-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1rem;
        flex-shrink: 0;
      }

      .info-content h4 {
        font-family: 'Quicksand', sans-serif;
        color: var(--sage-dark);
        margin: 0 0 5px 0;
        font-weight: 600;
        font-size: 0.95rem;
      }

      .info-content p {
        font-family: 'Quicksand', sans-serif;
        color: var(--muted);
        margin: 0;
        font-size: 0.85rem;
        line-height: 1.4;
      }

      .attendance-stats {
        margin-top: 30px;
        padding-top: 25px;
        border-top: 1px solid rgba(138, 168, 143, 0.2);
      }

      .attendance-stats h4 {
        font-family: 'Quicksand', sans-serif;
        color: var(--sage-dark);
        margin-bottom: 20px;
        text-align: center;
        font-weight: 600;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
      }

      .stat-item {
        text-align: center;
        padding: 15px 10px;
        background: rgba(138, 168, 143, 0.05);
        border-radius: 10px;
        transition: all 0.3s ease;
      }

      .stat-item:hover {
        transform: translateY(-3px);
        background: rgba(138, 168, 143, 0.1);
      }

      .stat-number {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--sage-dark);
        margin-bottom: 5px;
      }

      .stat-label {
        font-family: 'Quicksand', sans-serif;
        color: var(--muted);
        font-size: 0.8rem;
        font-weight: 600;
      }

      /* Confirmation Modal */
      .confirmation-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .confirmation-modal.active {
        opacity: 1;
        visibility: visible;
      }

      .modal-content {
        background: white;
        border-radius: 20px;
        padding: 40px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        position: relative;
        animation: modalSlideIn 0.3s ease;
      }

      @keyframes modalSlideIn {
        from {
          opacity: 0;
          transform: translateY(-50px) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .modal-close {
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--muted);
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2.5rem;
        margin: 0 auto 20px;
      }

      .modal-content h3 {
        font-family: 'Playfair Display', serif;
        color: var(--sage-dark);
        margin-bottom: 15px;
        font-size: 1.5rem;
      }

      .modal-content p {
        font-family: 'Quicksand', sans-serif;
        color: var(--muted);
        line-height: 1.6;
        margin-bottom: 25px;
      }

      .btn-modal-close {
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .btn-modal-close:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(138, 168, 143, 0.3);
      }

      /* Responsive */
      @media (max-width: 768px) {
        .rsvp-container {
          grid-template-columns: 1fr;
          gap: 30px;
        }

        .rsvp-form-container,
        .info-card {
          padding: 25px 20px;
        }

        .attendance-options {
          grid-template-columns: 1fr;
        }

        .stats-grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .stat-item {
          padding: 12px 8px;
        }

        .stat-number {
          font-size: 1.3rem;
        }

        .modal-content {
          padding: 30px 25px;
        }
      }

      @media (max-width: 480px) {
        .rsvp-form-container,
        .info-card {
          padding: 20px 15px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .info-item {
          padding: 12px;
        }

        .stats-grid {
          grid-template-columns: 1fr;
          gap: 8px;
        }

        .modal-content {
          padding: 25px 20px;
        }

        .modal-icon {
          width: 60px;
          height: 60px;
          font-size: 2rem;
        }
      }
    `;

    if (!document.querySelector('style[data-rsvp]')) {
      style.setAttribute('data-rsvp', 'true');
      document.head.appendChild(style);
    }
  }
}

// Initialize RSVP system
document.addEventListener('DOMContentLoaded', () => {
  new RSVPSystem();
});