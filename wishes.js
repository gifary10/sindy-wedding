// wishes.js - Wishes & Messages System - OPTIMIZED
class WishesSystem {
  constructor() {
    this.wishes = [];
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.init();
  }

  init() {
    try {
      this.createWishesSection();
      this.setupEventListeners();
      this.loadWishes();
    } catch (error) {
      console.error('Error initializing wishes system:', error);
    }
  }

  createWishesSection() {
    const section = document.createElement('section');
    section.id = 'wishes';
    section.className = 'wishes-section';
    section.setAttribute('data-aos', 'fade-up');

    section.innerHTML = `
      <div class="container">
        <h2 class="title">Ucapan & Doa</h2>
        <p class="section-subtitle">Berikan ucapan dan doa restu untuk pernikahan kami</p>
        
        <div class="wishes-container">
          <!-- Wishes Form -->
          <div class="wishes-form-container" data-aos="fade-right">
            <form class="wishes-form" id="wishesForm">
              <div class="form-header">
                <h3>Tulis Ucapan</h3>
                <p>Bagikan kebahagiaan dan doa Anda untuk kami</p>
              </div>

              <div class="form-group">
                <label for="wisherName">Nama Anda *</label>
                <input type="text" id="wisherName" name="name" required 
                       placeholder="Masukkan nama Anda">
                <div class="error-message" id="nameError"></div>
              </div>

              <div class="form-group">
                <label for="wisherMessage">Ucapan & Doa *</label>
                <textarea id="wisherMessage" name="message" rows="4" required
                          placeholder="Tuliskan ucapan dan doa untuk mempelai..."></textarea>
                <div class="error-message" id="messageError"></div>
                <div class="char-count">
                  <span id="charCount">0</span>/500 karakter
                </div>
              </div>

              <button type="submit" class="btn-submit-wish">
                <i class="fas fa-paper-plane"></i>
                Kirim Ucapan
              </button>
            </form>
          </div>

          <!-- Wishes List -->
          <div class="wishes-list-container" data-aos="fade-left">
            <div class="wishes-header">
              <h3>Ucapan dari Tamu</h3>
              <div class="wishes-stats">
                <span id="totalWishes">0</span> Ucapan
              </div>
            </div>

            <div class="wishes-list" id="wishesList">
              <div class="loading-wishes">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Memuat ucapan...</p>
              </div>
            </div>

            <!-- Pagination -->
            <div class="wishes-pagination" id="wishesPagination">
              <button class="btn-prev" disabled>
                <i class="fas fa-chevron-left"></i>
                Sebelumnya
              </button>
              <span class="page-info">Halaman 1</span>
              <button class="btn-next">
                Selanjutnya
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('content').appendChild(section);
    this.addStyles();
  }

  setupEventListeners() {
    const form = document.getElementById('wishesForm');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Character count for message
    const messageInput = document.getElementById('wisherMessage');
    if (messageInput) {
      messageInput.addEventListener('input', () => this.updateCharCount());
    }

    // Pagination
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousPage());
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextPage());
    }

    // Real-time validation
    this.setupFormValidation();
  }

  setupFormValidation() {
    const nameInput = document.getElementById('wisherName');
    const messageInput = document.getElementById('wisherMessage');

    if (nameInput) {
      nameInput.addEventListener('blur', () => this.validateField('name', nameInput.value));
      nameInput.addEventListener('input', () => this.clearError('name'));
    }

    if (messageInput) {
      messageInput.addEventListener('blur', () => this.validateField('message', messageInput.value));
      messageInput.addEventListener('input', () => this.clearError('message'));
    }
  }

  validateField(field, value) {
    const errorElement = document.getElementById(`${field}Error`);
    
    switch(field) {
      case 'name':
        if (!value.trim()) {
          this.showError('name', 'Nama wajib diisi');
          return false;
        }
        if (value.trim().length < 2) {
          this.showError('name', 'Nama minimal 2 karakter');
          return false;
        }
        break;
      
      case 'message':
        if (!value.trim()) {
          this.showError('message', 'Ucapan wajib diisi');
          return false;
        }
        if (value.trim().length < 5) {
          this.showError('message', 'Ucapan minimal 5 karakter');
          return false;
        }
        if (value.length > 500) {
          this.showError('message', 'Ucapan maksimal 500 karakter');
          return false;
        }
        break;
    }
    
    this.clearError(field);
    return true;
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

  updateCharCount() {
    const messageInput = document.getElementById('wisherMessage');
    const charCount = document.getElementById('charCount');
    
    if (messageInput && charCount) {
      const count = messageInput.value.length;
      charCount.textContent = count;
      
      if (count > 450) {
        charCount.style.color = '#e74c3c';
      } else if (count > 400) {
        charCount.style.color = '#f39c12';
      } else {
        charCount.style.color = 'var(--muted)';
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name').trim(),
      message: formData.get('message').trim(),
      timestamp: new Date().toISOString(),
      id: this.generateId()
    };

    // Validate all fields
    if (!this.validateAllFields(data)) {
      return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('.btn-submit-wish');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;

    try {
      // Simulate API call
      await this.submitWish(data);
      
      // Add to local storage
      this.wishes.unshift(data); // Add to beginning for newest first
      this.saveWishes();
      
      // Show success notification
      this.showSuccessNotification(data.name);
      
      // Reset form
      e.target.reset();
      this.updateCharCount();
      
      // Refresh wishes list
      this.currentPage = 1;
      this.renderWishes();
      
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
    if (!this.validateField('message', data.message)) isValid = false;

    return isValid;
  }

  async submitWish(data) {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, you would send data to your backend here
        console.log('Wish Data:', data);
        resolve({ success: true });
      }, 1000);
    });
  }

  showSuccessNotification(name) {
    this.showNotification(`Terima kasih ${name}! Ucapan Anda telah terkirim.`, 'success');
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

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  loadWishes() {
    try {
      const saved = localStorage.getItem('weddingWishes');
      if (saved) {
        this.wishes = JSON.parse(saved);
        this.renderWishes();
      } else {
        // Load sample wishes if none exist
        this.loadSampleWishes();
      }
    } catch (error) {
      console.error('Error loading wishes:', error);
      this.loadSampleWishes();
    }
  }

  loadSampleWishes() {
    this.wishes = [
      {
        id: '1',
        name: 'Keluarga Besar',
        message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu!',
        timestamp: new Date('2026-05-01').toISOString()
      },
      {
        id: '2',
        name: 'Sahabat Mempelai',
        message: 'Akhirnya hari yang ditunggu datang juga! Semoga pernikahan kalian penuh berkah dan kebahagiaan. Love you both!',
        timestamp: new Date('2026-05-02').toISOString()
      }
    ];
    this.saveWishes();
    this.renderWishes();
  }

  saveWishes() {
    try {
      localStorage.setItem('weddingWishes', JSON.stringify(this.wishes));
    } catch (error) {
      console.error('Error saving wishes:', error);
    }
  }

  renderWishes() {
    const wishesList = document.getElementById('wishesList');
    const totalWishes = document.getElementById('totalWishes');
    const pagination = document.getElementById('wishesPagination');
    
    if (!wishesList) return;

    // Update total count
    if (totalWishes) {
      totalWishes.textContent = this.wishes.length;
    }

    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedWishes = this.wishes.slice(startIndex, endIndex);
    const totalPages = Math.ceil(this.wishes.length / this.itemsPerPage);

    if (paginatedWishes.length === 0) {
      wishesList.innerHTML = `
        <div class="empty-wishes">
          <i class="fas fa-comments"></i>
          <h4>Belum ada ucapan</h4>
          <p>Jadilah yang pertama memberikan ucapan dan doa!</p>
        </div>
      `;
    } else {
      wishesList.innerHTML = paginatedWishes.map(wish => this.createWishItem(wish)).join('');
    }

    // Update pagination
    this.updatePagination(totalPages);
  }

  createWishItem(wish) {
    const timeAgo = this.getTimeAgo(wish.timestamp);
    
    return `
      <div class="wish-item" data-aos="fade-up">
        <div class="wish-avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="wish-content">
          <div class="wish-header">
            <h4 class="wisher-name">${this.escapeHtml(wish.name)}</h4>
            <span class="wish-time">${timeAgo}</span>
          </div>
          <p class="wish-message">${this.escapeHtml(wish.message)}</p>
        </div>
      </div>
    `;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  getTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
      return 'Baru saja';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} menit yang lalu`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} jam yang lalu`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} hari yang lalu`;
    } else {
      return past.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  }

  updatePagination(totalPages) {
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const pageInfo = document.querySelector('.page-info');

    if (prevBtn) {
      prevBtn.disabled = this.currentPage === 1;
    }
    if (nextBtn) {
      nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;
    }
    if (pageInfo) {
      pageInfo.textContent = `Halaman ${this.currentPage} dari ${totalPages}`;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderWishes();
      this.scrollToWishesList();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.wishes.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.renderWishes();
      this.scrollToWishesList();
    }
  }

  scrollToWishesList() {
    const wishesList = document.getElementById('wishesList');
    if (wishesList) {
      wishesList.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .wishes-section {
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

      .wishes-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        max-width: 1000px;
        margin: 0 auto;
      }

      .wishes-form-container {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(138, 168, 143, 0.2);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(33, 44, 38, 0.08);
        height: fit-content;
        position: sticky;
        top: 20px;
      }

      .form-header {
        text-align: center;
        margin-bottom: 25px;
      }

      .form-header h3 {
        font-family: 'Playfair Display', serif;
        color: var(--sage-dark);
        margin-bottom: 8px;
        font-size: 1.3rem;
      }

      .form-header p {
        font-family: 'Quicksand', sans-serif;
        color: var(--muted);
        margin: 0;
        font-size: 0.9rem;
      }

      .wishes-form {
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
      .form-group textarea {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid rgba(138, 168, 143, 0.3);
        border-radius: 10px;
        font-family: 'Quicksand', sans-serif;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.8);
        resize: vertical;
      }

      .form-group input:focus,
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

      .char-count {
        text-align: right;
        font-size: 0.8rem;
        color: var(--muted);
        margin-top: 5px;
        font-family: 'Quicksand', sans-serif;
      }

      .btn-submit-wish {
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

      .btn-submit-wish:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(138, 168, 143, 0.3);
      }

      .btn-submit-wish:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .wishes-list-container {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(138, 168, 143, 0.2);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(33, 44, 38, 0.08);
      }

      .wishes-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(138, 168, 143, 0.2);
      }

      .wishes-header h3 {
        font-family: 'Playfair Display', serif;
        color: var(--sage-dark);
        margin: 0;
        font-size: 1.3rem;
      }

      .wishes-stats {
        font-family: 'Quicksand', sans-serif;
        color: var(--muted);
        font-weight: 600;
        font-size: 0.9rem;
        background: rgba(138, 168, 143, 0.1);
        padding: 6px 12px;
        border-radius: 15px;
      }

      .wishes-list {
        max-height: 500px;
        overflow-y: auto;
        space-y: 20px;
        margin-bottom: 25px;
      }

      .wishes-list::-webkit-scrollbar {
        width: 6px;
      }

      .wishes-list::-webkit-scrollbar-track {
        background: rgba(138, 168, 143, 0.1);
        border-radius: 3px;
      }

      .wishes-list::-webkit-scrollbar-thumb {
        background: var(--sage);
        border-radius: 3px;
      }

      .loading-wishes {
        text-align: center;
        padding: 40px 20px;
        color: var(--muted);
      }

      .loading-wishes i {
        font-size: 2rem;
        margin-bottom: 15px;
        display: block;
      }

      .empty-wishes {
        text-align: center;
        padding: 40px 20px;
        color: var(--muted);
      }

      .empty-wishes i {
        font-size: 3rem;
        margin-bottom: 15px;
        display: block;
        color: var(--sage);
      }

      .empty-wishes h4 {
        font-family: 'Playfair Display', serif;
        color: var(--sage-dark);
        margin-bottom: 8px;
      }

      .wish-item {
        display: flex;
        gap: 15px;
        padding: 20px;
        background: rgba(138, 168, 143, 0.05);
        border-radius: 15px;
        transition: all 0.3s ease;
        border: 1px solid transparent;
      }

      .wish-item:hover {
        border-color: rgba(138, 168, 143, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(33, 44, 38, 0.1);
      }

      .wish-avatar {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
        flex-shrink: 0;
      }

      .wish-content {
        flex: 1;
        min-width: 0;
      }

      .wish-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
        gap: 10px;
      }

      .wisher-name {
        font-family: 'Quicksand', sans-serif;
        color: var(--sage-dark);
        margin: 0;
        font-weight: 600;
        font-size: 0.95rem;
      }

      .wish-time {
        font-family: 'Quicksand', sans-serif;
        color: var(--muted);
        font-size: 0.8rem;
        white-space: nowrap;
      }

      .wish-message {
        font-family: 'Quicksand', sans-serif;
        color: var(--charcoal);
        margin: 0;
        line-height: 1.5;
        word-wrap: break-word;
      }

      .wishes-pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 20px;
        border-top: 1px solid rgba(138, 168, 143, 0.2);
      }

      .btn-prev,
      .btn-next {
        background: rgba(138, 168, 143, 0.1);
        color: var(--sage-dark);
        border: 1px solid rgba(138, 168, 143, 0.3);
        padding: 8px 16px;
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

      .btn-prev:hover:not(:disabled),
      .btn-next:hover:not(:disabled) {
        background: var(--sage-dark);
        color: white;
        transform: translateY(-1px);
      }

      .btn-prev:disabled,
      .btn-next:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      .page-info {
        font-family: 'Quicksand', sans-serif;
        color: var(--muted);
        font-size: 0.9rem;
        font-weight: 600;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .wishes-container {
          grid-template-columns: 1fr;
          gap: 30px;
        }

        .wishes-form-container {
          position: static;
        }

        .wishes-form-container,
        .wishes-list-container {
          padding: 25px 20px;
        }

        .wishes-header {
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
        }

        .wishes-list {
          max-height: 400px;
        }

        .wish-item {
          padding: 15px;
        }

        .wish-avatar {
          width: 45px;
          height: 45px;
          font-size: 1.1rem;
        }

        .wishes-pagination {
          flex-direction: column;
          gap: 15px;
        }

        .btn-prev,
        .btn-next {
          width: 100%;
          justify-content: center;
        }
      }

      @media (max-width: 480px) {
        .wishes-form-container,
        .wishes-list-container {
          padding: 20px 15px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .wish-item {
          flex-direction: column;
          text-align: center;
          gap: 10px;
        }

        .wish-header {
          flex-direction: column;
          gap: 5px;
        }

        .wish-avatar {
          align-self: center;
        }
      }
    `;

    if (!document.querySelector('style[data-wishes]')) {
      style.setAttribute('data-wishes', 'true');
      document.head.appendChild(style);
    }
  }
}

// Initialize wishes system
document.addEventListener('DOMContentLoaded', () => {
  new WishesSystem();
});