// wishes.js - Wishes & Messages - OPTIMIZED & FIXED
class WeddingWishes {
  constructor() {
    this.wishes = [];
    this.currentPage = 1;
    this.wishesPerPage = 5;
    this.isSubmitting = false;
    this.observer = null;
    this.init();
  }

  init() {
    try {
      this.createWishesSection();
      this.setupEventListeners();
      this.loadWishes();
      this.setupIntersectionObserver();
    } catch (error) {
      console.error('Error initializing wishes:', error);
      this.showErrorState();
    }
  }

  createWishesSection() {
    if (document.getElementById('wishes')) return;

    const section = document.createElement('section');
    section.id = 'wishes';
    section.className = 'wishes-section';
    section.setAttribute('data-aos', 'fade-up');

    section.innerHTML = `
      <div class="container">
        <h2 class="title">Ucapan & Doa</h2>
        <p class="section-subtitle">Kirimkan ucapan dan doa restu untuk pernikahan kami</p>
        
        <div class="wish-form-container" data-aos="fade-up">
          <form class="wish-form" id="wishForm" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="guestName">Nama Lengkap *</label>
                <input type="text" id="guestName" name="name" required 
                       placeholder="Masukkan nama lengkap Anda" maxlength="50">
                <div class="error-message" id="nameError" aria-live="polite"></div>
              </div>
              <div class="form-group">
                <label for="guestRelation">Hubungan dengan mempelai *</label>
                <select id="guestRelation" name="relation" required>
                  <option value="">Pilih hubungan</option>
                  <option value="family">Keluarga</option>
                  <option value="friend">Teman</option>
                  <option value="colleague">Rekan Kerja</option>
                  <option value="relative">Kerabat</option>
                  <option value="other">Lainnya</option>
                </select>
                <div class="error-message" id="relationError" aria-live="polite"></div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="guestMessage">Pesan & Doa *</label>
              <textarea id="guestMessage" name="message" required 
                        placeholder="Tuliskan pesan dan doa terbaik Anda untuk kami..." 
                        rows="4" maxlength="500"></textarea>
              <div class="textarea-info">
                <span class="char-count">0/500 karakter</span>
              </div>
              <div class="error-message" id="messageError" aria-live="polite"></div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-submit" id="submitWish" disabled>
                <i class="fas fa-paper-plane" aria-hidden="true"></i>
                Kirim Ucapan
              </button>
              <button type="button" class="btn-preview" id="previewWish">
                <i class="fas fa-eye" aria-hidden="true"></i>
                Preview
              </button>
            </div>
          </form>
        </div>

        <div class="wishes-container" data-aos="fade-up">
          <div class="wishes-header">
            <h3 class="wishes-title">Ucapan dari Tamu Undangan</h3>
            <div class="wishes-stats">
              <span id="wishesCount">0 Ucapan</span>
            </div>
          </div>
          
          <div class="wishes-list" id="wishesList" aria-live="polite">
            <!-- Wishes will be loaded here -->
          </div>

          <div class="wishes-load-more" id="wishesLoadMore">
            <button class="btn-load-more" id="loadMoreWishes" aria-label="Muat lebih banyak ucapan">
              <i class="fas fa-chevron-down" aria-hidden="true"></i>
              Muat Lebih Banyak
            </button>
          </div>

          <div class="wishes-empty" id="wishesEmpty">
            <div class="empty-icon">
              <i class="fas fa-heart" aria-hidden="true"></i>
            </div>
            <h4>Belum Ada Ucapan</h4>
            <p>Jadilah yang pertama mengirimkan ucapan untuk kami!</p>
          </div>
        </div>
      </div>

      <div class="modal" id="previewModal" role="dialog" aria-labelledby="previewModalTitle" aria-hidden="true">
        <div class="modal-content">
          <button class="modal-close" id="closePreview" aria-label="Tutup preview">&times;</button>
          <h2 class="modal-title" id="previewModalTitle">Preview Ucapan Anda</h2>
          <div class="preview-content">
            <div class="preview-wish">
              <div class="wish-header">
                <div class="guest-avatar" aria-hidden="true">
                  <i class="fas fa-user"></i>
                </div>
                <div class="guest-info">
                  <h4 id="previewName">Nama Tamu</h4>
                  <span class="wish-relation" id="previewRelation">Hubungan</span>
                </div>
                <div class="wish-time">Sekarang</div>
              </div>
              <div class="wish-message">
                <p id="previewMessage">Pesan Anda akan muncul di sini...</p>
              </div>
            </div>
          </div>
          <div class="preview-actions">
            <button class="btn-secondary" id="editWish">
              <i class="fas fa-edit" aria-hidden="true"></i>
              Edit
            </button>
            <button class="btn-primary" id="confirmWish">
              <i class="fas fa-check" aria-hidden="true"></i>
              Konfirmasi Kirim
            </button>
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

  setupEventListeners() {
    // Form event delegation
    const form = document.getElementById('wishForm');
    if (form) {
      form.addEventListener('input', () => this.validateForm());
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Preview button
    const previewBtn = document.getElementById('previewWish');
    if (previewBtn) {
      previewBtn.addEventListener('click', () => this.previewWish());
    }

    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreWishes');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => this.loadMoreWishes());
    }

    // Character count for message textarea
    const messageTextarea = document.getElementById('guestMessage');
    if (messageTextarea) {
      messageTextarea.addEventListener('input', (e) => this.updateCharCount(e.target));
    }

    // Preview modal events
    this.setupPreviewModalEvents();

    // Like buttons delegation
    document.addEventListener('click', (e) => {
      if (e.target.closest('.wish-like-btn')) {
        const button = e.target.closest('.wish-like-btn');
        const wishId = parseInt(button.dataset.wishId);
        this.toggleLike(wishId);
      }
    });
  }

  setupPreviewModalEvents() {
    const previewModal = document.getElementById('previewModal');
    const closePreview = document.getElementById('closePreview');
    const editWish = document.getElementById('editWish');
    const confirmWish = document.getElementById('confirmWish');

    if (closePreview) {
      closePreview.addEventListener('click', () => {
        this.closePreviewModal();
      });
    }

    if (editWish) {
      editWish.addEventListener('click', () => {
        this.closePreviewModal();
      });
    }

    if (confirmWish) {
      confirmWish.addEventListener('click', () => {
        this.submitWish();
        this.closePreviewModal();
      });
    }

    if (previewModal) {
      previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
          this.closePreviewModal();
        }
      });

      // Keyboard support
      previewModal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closePreviewModal();
        }
      });
    }
  }

  closePreviewModal() {
    const previewModal = document.getElementById('previewModal');
    if (previewModal) {
      previewModal.setAttribute('aria-hidden', 'true');
      previewModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openPreviewModal() {
    const previewModal = document.getElementById('previewModal');
    if (previewModal) {
      previewModal.setAttribute('aria-hidden', 'false');
      previewModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus trap
      const focusableElements = previewModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }

  validateForm() {
    const form = document.getElementById('wishForm');
    const submitBtn = document.getElementById('submitWish');
    if (!form || !submitBtn) return false;

    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      const errorElement = document.getElementById(`${input.name}Error`);
      
      if (!input.value.trim()) {
        this.showError(input, errorElement, 'Field ini wajib diisi');
        isValid = false;
      } else if (input.name === 'name' && input.value.trim().length < 2) {
        this.showError(input, errorElement, 'Nama minimal 2 karakter');
        isValid = false;
      } else if (input.name === 'message' && input.value.trim().length < 10) {
        this.showError(input, errorElement, 'Pesan minimal 10 karakter');
        isValid = false;
      } else {
        this.clearError(input, errorElement);
      }
    });

    submitBtn.disabled = !isValid;
    return isValid;
  }

  showError(input, errorElement, message) {
    input.classList.add('error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  clearError(input, errorElement) {
    input.classList.remove('error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }

  updateCharCount(textarea) {
    const charCount = textarea.parentElement.querySelector('.char-count');
    if (charCount) {
      const count = textarea.value.length;
      charCount.textContent = `${count}/500 karakter`;
      
      if (count > 450) {
        charCount.style.color = 'var(--error)';
      } else if (count > 400) {
        charCount.style.color = 'var(--warning)';
      } else {
        charCount.style.color = 'var(--muted)';
      }
    }
  }

  previewWish() {
    if (!this.validateForm()) {
      this.showNotification('Harap lengkapi form dengan benar', 'error');
      return;
    }

    const formData = this.getFormData();

    // Update preview content
    document.getElementById('previewName').textContent = formData.name;
    document.getElementById('previewRelation').textContent = this.getRelationLabel(formData.relation);
    document.getElementById('previewMessage').textContent = formData.message;

    this.openPreviewModal();
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateForm()) {
      this.showNotification('Harap lengkapi form dengan benar', 'error');
      return;
    }

    this.previewWish();
  }

  submitWish() {
    if (this.isSubmitting) return;

    const formData = this.getFormData();
    this.isSubmitting = true;

    const submitBtn = document.getElementById('submitWish');
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Mengirim...';
      submitBtn.disabled = true;
    }

    // Simulate API call with better error handling
    setTimeout(() => {
      try {
        this.addWish({
          id: Date.now(),
          name: formData.name,
          relation: formData.relation,
          message: formData.message,
          timestamp: new Date().toISOString(),
          likes: 0
        });

        this.resetForm();
        this.showNotification('Ucapan berhasil dikirim! Terima kasih atas doa restunya.', 'success');
      } catch (error) {
        console.error('Error submitting wish:', error);
        this.showNotification('Gagal mengirim ucapan. Silakan coba lagi.', 'error');
      } finally {
        this.isSubmitting = false;
        if (submitBtn) {
          submitBtn.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Kirim Ucapan';
          submitBtn.disabled = true;
        }
      }
    }, 1500);
  }

  getFormData() {
    const form = document.getElementById('wishForm');
    return {
      name: form.guestName.value.trim(),
      relation: form.guestRelation.value,
      message: form.guestMessage.value.trim()
    };
  }

  resetForm() {
    const form = document.getElementById('wishForm');
    if (form) {
      form.reset();
      this.updateCharCount(form.guestMessage);
      this.validateForm();
    }
  }

  addWish(wish) {
    this.wishes.unshift(wish); // Add to beginning
    this.saveWishes();
    this.displayWishes();
  }

  loadWishes() {
    try {
      const savedWishes = localStorage.getItem('wedding-wishes');
      if (savedWishes) {
        this.wishes = JSON.parse(savedWishes);
      } else {
        // Load sample wishes
        this.wishes = this.getSampleWishes();
        this.saveWishes();
      }
      
      this.displayWishes();
    } catch (error) {
      console.error('Error loading wishes:', error);
      this.wishes = this.getSampleWishes();
      this.displayWishes();
    }
  }

  getSampleWishes() {
    return [
      {
        id: 1,
        name: 'Keluarga Besar',
        relation: 'family',
        message: 'Selamat menempuh hidup baru. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu!',
        timestamp: new Date('2024-01-15').toISOString(),
        likes: 5
      },
      {
        id: 2,
        name: 'Sahabat Masa Kecil',
        relation: 'friend',
        message: 'Akhirnya! Dari kecil sampai mau nikah, seneng banget lihat perjalanan kalian. Semoga langgeng sampai tua!',
        timestamp: new Date('2024-01-14').toISOString(),
        likes: 3
      }
    ];
  }

  saveWishes() {
    try {
      localStorage.setItem('wedding-wishes', JSON.stringify(this.wishes));
    } catch (error) {
      console.error('Error saving wishes:', error);
    }
  }

  displayWishes() {
    const wishesList = document.getElementById('wishesList');
    const emptyState = document.getElementById('wishesEmpty');
    const loadMoreContainer = document.getElementById('wishesLoadMore');
    const wishesCount = document.getElementById('wishesCount');

    if (!wishesList) return;

    // Update count
    if (wishesCount) {
      wishesCount.textContent = `${this.wishes.length} Ucapan`;
    }

    // Show/hide empty state
    if (emptyState) {
      emptyState.style.display = this.wishes.length === 0 ? 'block' : 'none';
    }

    // Show/hide load more
    if (loadMoreContainer) {
      const hasMore = this.wishes.length > this.currentPage * this.wishesPerPage;
      loadMoreContainer.style.display = hasMore ? 'block' : 'none';
    }

    // Calculate pagination
    const startIndex = 0;
    const endIndex = this.currentPage * this.wishesPerPage;
    const wishesToShow = this.wishes.slice(startIndex, endIndex);

    wishesList.innerHTML = wishesToShow.map(wish => this.createWishElement(wish)).join('');
  }

  createWishElement(wish) {
    const timeAgo = this.getTimeAgo(wish.timestamp);
    const relationLabel = this.getRelationLabel(wish.relation);

    return `
      <div class="wish-item" data-wish-id="${wish.id}">
        <div class="wish-header">
          <div class="guest-avatar" aria-hidden="true">
            <i class="fas fa-user"></i>
          </div>
          <div class="guest-info">
            <h4 class="guest-name">${this.escapeHtml(wish.name)}</h4>
            <span class="wish-relation">${relationLabel}</span>
          </div>
          <div class="wish-time">${timeAgo}</div>
        </div>
        <div class="wish-message">
          <p>${this.escapeHtml(wish.message)}</p>
        </div>
        <div class="wish-actions">
          <button class="wish-like-btn ${wish.likes > 0 ? 'liked' : ''}" 
                  data-wish-id="${wish.id}"
                  aria-label="${wish.likes > 0 ? 'Hapus suka' : 'Suka'} ucapan ini">
            <i class="fas fa-heart" aria-hidden="true"></i>
            <span class="like-count">${wish.likes}</span>
          </button>
        </div>
      </div>
    `;
  }

  getRelationLabel(relation) {
    const labels = {
      'family': 'Keluarga',
      'friend': 'Teman',
      'colleague': 'Rekan Kerja',
      'relative': 'Kerabat',
      'other': 'Tamu Undangan'
    };
    return labels[relation] || relation;
  }

  getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);

    if (diffInSeconds < 60) return 'Baru saja';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} hari lalu`;
    
    return time.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  toggleLike(wishId) {
    const wish = this.wishes.find(w => w.id === wishId);
    if (!wish) return;

    // Toggle like (in real app, this would be user-specific)
    wish.likes += wish.likes > 0 ? -1 : 1;
    this.saveWishes();
    
    // Update UI
    const likeBtn = document.querySelector(`.wish-like-btn[data-wish-id="${wishId}"]`);
    const likeCount = likeBtn?.querySelector('.like-count');
    
    if (likeBtn && likeCount) {
      likeBtn.classList.toggle('liked', wish.likes > 0);
      likeCount.textContent = wish.likes;
      likeBtn.setAttribute('aria-label', wish.likes > 0 ? 'Hapus suka' : 'Suka ucapan ini');
      
      // Add animation
      likeBtn.style.transform = 'scale(1.1)';
      setTimeout(() => {
        likeBtn.style.transform = 'scale(1)';
      }, 200);
    }
  }

  loadMoreWishes() {
    this.currentPage++;
    this.displayWishes();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      const wishItems = document.querySelectorAll('.wish-item');
      wishItems.forEach(item => this.observer.observe(item));
    }, 100);
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
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}" aria-hidden="true"></i>
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

  showErrorState() {
    const section = document.getElementById('wishes');
    if (section) {
      section.innerHTML = `
        <div class="container">
          <h2 class="title">Ucapan & Doa</h2>
          <div style="text-align: center; padding: 40px 20px; color: var(--muted);">
            <p>Terjadi kesalahan dalam memuat halaman ucapan.</p>
          </div>
        </div>
      `;
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  addStyles() {
    if (document.querySelector('style[data-wishes]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-wishes', 'true');
    style.textContent = `
      .wishes-section {
        padding: 80px 20px;
        background: linear-gradient(180deg, rgba(233,241,234,0.7) 0%, rgba(255,255,255,0.9) 100%);
      }

      .section-subtitle {
        text-align: center;
        color: var(--muted);
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.2rem;
        margin-bottom: 50px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
      }

      .wish-form-container {
        max-width: 700px;
        margin: 0 auto 60px;
      }

      .wish-form {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(138, 168, 143, 0.2);
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 8px 25px rgba(33, 44, 38, 0.08);
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 25px;
        margin-bottom: 25px;
      }

      .form-group {
        margin-bottom: 25px;
      }

      .form-group label {
        display: block;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        color: var(--sage-dark);
        margin-bottom: 10px;
        font-size: 1rem;
      }

      .form-group input,
      .form-group select,
      .form-group textarea {
        width: 100%;
        padding: 14px 18px;
        border: 2px solid rgba(138, 168, 143, 0.2);
        border-radius: 12px;
        font-family: 'Quicksand', sans-serif;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.8);
      }

      .form-group input:focus,
      .form-group select:focus,
      .form-group textarea:focus {
        outline: none;
        border-color: var(--sage);
        box-shadow: 0 0 0 3px rgba(138, 168, 143, 0.1);
        background: white;
      }

      .form-group input.error,
      .form-group select.error,
      .form-group textarea.error {
        border-color: var(--error);
      }

      .error-message {
        color: var(--error);
        font-size: 0.85rem;
        margin-top: 8px;
        display: none;
      }

      .textarea-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
      }

      .char-count {
        font-size: 0.85rem;
        color: var(--muted);
      }

      .form-actions {
        display: flex;
        gap: 15px;
        margin-top: 30px;
      }

      .btn-submit,
      .btn-preview {
        flex: 1;
        padding: 16px 24px;
        border: none;
        border-radius: 25px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 1rem;
      }

      .btn-submit {
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
      }

      .btn-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
      }

      .btn-submit:not(:disabled):hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(138, 168, 143, 0.3);
      }

      .btn-preview {
        background: rgba(138, 168, 143, 0.1);
        color: var(--sage-dark);
        border: 2px solid rgba(138, 168, 143, 0.3);
      }

      .btn-preview:hover {
        background: rgba(138, 168, 143, 0.2);
        transform: translateY(-2px);
      }

      .wishes-container {
        max-width: 800px;
        margin: 0 auto;
      }

      .wishes-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid rgba(138, 168, 143, 0.2);
      }

      .wishes-title {
        font-family: 'Playfair Display', serif;
        color: var(--sage-dark);
        font-size: 1.5rem;
        margin: 0;
      }

      .wishes-stats {
        font-family: 'Quicksand', sans-serif;
        color: var(--muted);
        font-size: 1rem;
        font-weight: 600;
      }

      .wishes-list {
        space-y: 25px;
      }

      .wish-item {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(138, 168, 143, 0.1);
        border-radius: 16px;
        padding: 25px;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(20px);
        animation: wishItemAppear 0.6s ease forwards;
        animation-play-state: paused;
      }

      @keyframes wishItemAppear {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .wish-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(33, 44, 38, 0.1);
      }

      .wish-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
      }

      .guest-avatar {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
      }

      .guest-info {
        flex: 1;
      }

      .guest-name {
        font-family: 'Quicksand', sans-serif;
        color: var(--sage-dark);
        margin: 0 0 6px 0;
        font-weight: 600;
        font-size: 1.1rem;
      }

      .wish-relation {
        font-family: 'Quicksand', sans-serif;
        color: var(--muted);
        font-size: 0.9rem;
        font-weight: 600;
      }

      .wish-time {
        font-family: 'Quicksand', sans-serif;
        color: var(--muted);
        font-size: 0.9rem;
      }

      .wish-message p {
        font-family: 'Quicksand', sans-serif;
        color: var(--charcoal);
        line-height: 1.6;
        margin: 0;
        font-size: 1rem;
      }

      .wish-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid rgba(138, 168, 143, 0.1);
      }

      .wish-like-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border: 1px solid rgba(138, 168, 143, 0.3);
        background: rgba(255, 255, 255, 0.9);
        border-radius: 20px;
        color: var(--muted);
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
      }

      .wish-like-btn:hover {
        border-color: var(--sage);
        color: var(--sage);
      }

      .wish-like-btn.liked {
        background: rgba(255, 182, 193, 0.2);
        border-color: #ffb6c1;
        color: #e91e63;
      }

      .like-count {
        font-weight: 600;
      }

      .wishes-empty {
        text-align: center;
        padding: 60px 20px;
        color: var(--muted);
      }

      .empty-icon {
        font-size: 4rem;
        margin-bottom: 20px;
        color: rgba(138, 168, 143, 0.5);
      }

      .wishes-empty h4 {
        font-family: 'Playfair Display', serif;
        color: var(--sage-dark);
        margin: 0 0 15px 0;
        font-size: 1.4rem;
      }

      .wishes-empty p {
        font-family: 'Quicksand', sans-serif;
        margin: 0;
        font-size: 1.1rem;
      }

      .wishes-load-more {
        text-align: center;
        margin-top: 40px;
      }

      .btn-load-more {
        padding: 14px 28px;
        border: 2px solid rgba(138, 168, 143, 0.3);
        background: rgba(255, 255, 255, 0.9);
        border-radius: 25px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        color: var(--sage-dark);
        cursor: pointer;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-size: 1rem;
      }

      .btn-load-more:hover {
        background: rgba(138, 168, 143, 0.1);
        transform: translateY(-2px);
      }

      .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .modal.active {
        opacity: 1;
        visibility: visible;
      }

      .modal-content {
        background: white;
        border-radius: 20px;
        padding: 40px;
        max-width: 500px;
        width: 90%;
        max-height: 90%;
        overflow-y: auto;
        position: relative;
        animation: modalAppear 0.3s ease;
      }

      @keyframes modalAppear {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .modal-close {
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--muted);
        transition: color 0.3s ease;
      }

      .modal-close:hover {
        color: var(--sage-dark);
      }

      .modal-title {
        font-family: 'Playfair Display', serif;
        color: var(--sage-dark);
        margin-bottom: 25px;
        text-align: center;
        font-size: 1.5rem;
      }

      .preview-content {
        margin: 25px 0;
      }

      .preview-wish {
        background: rgba(255, 255, 255, 0.9);
        border-radius: 12px;
        padding: 25px;
        border: 1px solid rgba(138, 168, 143, 0.2);
      }

      .preview-actions {
        display: flex;
        gap: 15px;
        margin-top: 30px;
      }

      .btn-primary,
      .btn-secondary {
        flex: 1;
        padding: 14px 20px;
        border: none;
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

      .btn-primary {
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(138, 168, 143, 0.3);
      }

      .btn-secondary {
        background: rgba(138, 168, 143, 0.1);
        color: var(--sage-dark);
        border: 2px solid rgba(138, 168, 143, 0.3);
      }

      .btn-secondary:hover {
        background: rgba(138, 168, 143, 0.2);
        transform: translateY(-2px);
      }

      @media (max-width: 768px) {
        .wishes-section {
          padding: 60px 15px;
        }

        .section-subtitle {
          font-size: 1.1rem;
          margin-bottom: 40px;
        }

        .wish-form {
          padding: 30px 25px;
        }

        .form-row {
          grid-template-columns: 1fr;
          gap: 0;
        }

        .form-actions {
          flex-direction: column;
        }

        .wishes-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        }

        .wish-item {
          padding: 20px;
        }

        .wish-header {
          flex-wrap: wrap;
        }

        .guest-info {
          min-width: 0;
        }

        .preview-actions {
          flex-direction: column;
        }

        .modal-content {
          padding: 30px 25px;
        }
      }

      @media (max-width: 480px) {
        .wish-form {
          padding: 25px 20px;
        }

        .wish-item {
          padding: 18px 15px;
        }

        .guest-avatar {
          width: 45px;
          height: 45px;
          font-size: 1.1rem;
        }

        .modal-content {
          padding: 25px 20px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .wish-item,
        .btn-submit,
        .btn-preview,
        .wish-like-btn,
        .btn-load-more {
          transition: none;
          animation: none;
        }
        
        .wish-item {
          opacity: 1;
          transform: none;
        }
      }
    `;

    document.head.appendChild(style);
  }
}

// Initialize wishes
let weddingWishes;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    weddingWishes = new WeddingWishes();
  });
} else {
  weddingWishes = new WeddingWishes();
}
