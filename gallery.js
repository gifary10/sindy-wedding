// gallery.js - Photo Gallery - OPTIMIZED & FIXED
class PhotoGallery {
  constructor() {
    this.images = [
      {
        src: 'images/a.jpg',
        alt: 'Momen Prewedding di Taman',
        category: 'prewedding'
      },
      {
        src: 'images/b.jpg',
        alt: 'Session Romantis Sunset',
        category: 'prewedding'
      },
      {
        src: 'images/c.jpg',
        alt: 'Candid Moment Bersama',
        category: 'candid'
      },
      {
        src: 'images/d.jpg',
        alt: 'Formal Portrait Couple',
        category: 'portrait'
      },
      {
        src: 'images/e.jpg',
        alt: 'Adventure Session',
        category: 'prewedding'
      },
      {
        src: 'images/f.jpg',
        alt: 'Intimate Moment',
        category: 'candid'
      },
      {
        src: 'images/g.jpg',
        alt: 'Studio Portrait',
        category: 'portrait'
      },
      {
        src: 'images/h.jpg',
        alt: 'Natural Outdoor',
        category: 'prewedding'
      },
      {
        src: 'images/i.jpg',
        alt: 'Black & White Emotion',
        category: 'portrait'
      }
    ];
    
    this.categories = ['all', 'prewedding', 'candid', 'portrait'];
    this.activeCategory = 'all';
    this.currentImageIndex = 0;
    this.observer = null;
    this.init();
  }

  init() {
    try {
      this.createGallerySection();
      this.setupEventListeners();
      this.setupIntersectionObserver();
    } catch (error) {
      console.error('Error initializing gallery:', error);
      this.showErrorState();
    }
  }

  createGallerySection() {
    if (document.getElementById('gallery')) return;

    const section = document.createElement('section');
    section.id = 'gallery';
    section.className = 'gallery-section';
    section.setAttribute('data-aos', 'fade-up');

    section.innerHTML = `
      <div class="container">
        <h2 class="title">Galeri Kenangan</h2>
        <p class="section-subtitle">Kumpulan momen indah yang mengabadikan perjalanan cinta kami</p>
        
        <div class="gallery-filters" data-aos="fade-up">
          ${this.categories.map(category => `
            <button class="filter-btn ${category === 'all' ? 'active' : ''}" 
                    data-category="${category}"
                    aria-label="Filter galeri ${this.getCategoryLabel(category)}">
              ${this.getCategoryLabel(category)}
            </button>
          `).join('')}
        </div>

        <div class="gallery-grid" data-aos="fade-up">
          ${this.getFilteredImages().map((image, index) => this.createGalleryItem(image, index)).join('')}
        </div>

        <div class="load-more-container" data-aos="fade-up">
          <button class="btn-load-more" aria-label="Muat lebih banyak foto">
            <i class="fas fa-images" aria-hidden="true"></i>
            Lihat Lebih Banyak
          </button>
        </div>
      </div>

      <div class="lightbox" id="galleryLightbox" role="dialog" aria-label="Galeri Foto">
        <div class="lightbox-content">
          <button class="lightbox-close" aria-label="Tutup galeri">&times;</button>
          <button class="lightbox-nav lightbox-prev" aria-label="Foto sebelumnya">
            <i class="fas fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button class="lightbox-nav lightbox-next" aria-label="Foto berikutnya">
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
          <img class="lightbox-image" src="" alt="" loading="eager">
          <div class="lightbox-caption">
            <h3 class="lightbox-title"></h3>
            <p class="lightbox-counter"></p>
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

  getCategoryLabel(category) {
    const labels = {
      'all': 'Semua Foto',
      'prewedding': 'Prewedding',
      'candid': 'Candid',
      'portrait': 'Portrait'
    };
    return labels[category] || category;
  }

  createGalleryItem(image, index) {
    return `
      <div class="gallery-item" data-category="${image.category}" data-index="${index}">
        <div class="gallery-image-wrapper" role="button" tabindex="0" aria-label="Buka gambar ${image.alt}">
          <img src="${image.src}" alt="${image.alt}" loading="lazy">
          <div class="gallery-overlay">
            <div class="overlay-content">
              <i class="fas fa-search-plus" aria-hidden="true"></i>
              <p>${this.escapeHtml(image.alt)}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  getFilteredImages() {
    if (this.activeCategory === 'all') {
      return this.images;
    }
    return this.images.filter(image => image.category === this.activeCategory);
  }

  setupEventListeners() {
    // Delegate all events for better performance
    document.addEventListener('click', (e) => {
      // Filter buttons
      if (e.target.closest('.filter-btn')) {
        const button = e.target.closest('.filter-btn');
        const category = button.dataset.category;
        this.filterGallery(category);
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        return;
      }

      // Gallery items
      if (e.target.closest('.gallery-image-wrapper')) {
        const item = e.target.closest('.gallery-item');
        const index = parseInt(item.dataset.index);
        this.openLightbox(index);
        return;
      }

      // Load more button
      if (e.target.closest('.btn-load-more')) {
        this.loadMoreImages();
        return;
      }
    });

    // Keyboard support for gallery items
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (focused && focused.classList.contains('gallery-image-wrapper')) {
          e.preventDefault();
          const item = focused.closest('.gallery-item');
          const index = parseInt(item.dataset.index);
          this.openLightbox(index);
        }
      }
    });

    // Image error handling
    document.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG' && e.target.closest('.gallery-item')) {
        this.handleImageError(e.target);
      }
    }, true);
  }

  setupLightboxEvents() {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox) return;

    // Close lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      this.closeLightbox();
    });

    // Navigation
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
      this.navigateLightbox(-1);
    });

    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
      this.navigateLightbox(1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;

      switch(e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          this.navigateLightbox(-1);
          break;
        case 'ArrowRight':
          this.navigateLightbox(1);
          break;
      }
    });

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        this.closeLightbox();
      }
    });
  }

  filterGallery(category) {
    this.activeCategory = category;
    const galleryGrid = document.querySelector('.gallery-grid');
    const items = galleryGrid.querySelectorAll('.gallery-item');

    let visibleCount = 0;

    items.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        item.style.display = 'block';
        visibleCount++;
        
        // Add animation delay for staggered appearance
        item.style.animationDelay = `${visibleCount * 0.1}s`;
        setTimeout(() => item.classList.add('active'), 50);
      } else {
        item.classList.remove('active');
        setTimeout(() => item.style.display = 'none', 300);
      }
    });

    // Update load more button visibility
    this.updateLoadMoreButton(visibleCount);

    // Animate filter change
    galleryGrid.style.animation = 'none';
    setTimeout(() => {
      galleryGrid.style.animation = 'galleryFilterChange 0.6s ease';
    }, 50);
  }

  updateLoadMoreButton(visibleCount) {
    const loadMoreContainer = document.querySelector('.load-more-container');
    if (loadMoreContainer) {
      loadMoreContainer.style.display = visibleCount > 0 ? 'block' : 'none';
    }
  }

  openLightbox(index) {
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');

    this.currentImageIndex = index;
    const filteredImages = this.getFilteredImages();
    const currentImage = filteredImages[index];

    if (!currentImage) {
      this.showNotification('Gambar tidak ditemukan', 'error');
      return;
    }

    // Set lightbox content
    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.alt;
    lightboxTitle.textContent = currentImage.alt;
    lightboxCounter.textContent = `${index + 1} / ${filteredImages.length}`;

    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Setup lightbox events if not already done
    this.setupLightboxEvents();

    // Preload adjacent images
    this.preloadAdjacentImages(index);
  }

  closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset lightbox image to save memory
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    lightboxImage.src = '';
    lightboxImage.alt = '';
  }

  navigateLightbox(direction) {
    const filteredImages = this.getFilteredImages();
    if (filteredImages.length === 0) return;

    this.currentImageIndex = (this.currentImageIndex + direction + filteredImages.length) % filteredImages.length;
    this.openLightbox(this.currentImageIndex);
  }

  preloadAdjacentImages(currentIndex) {
    const filteredImages = this.getFilteredImages();
    const indicesToPreload = [
      (currentIndex - 1 + filteredImages.length) % filteredImages.length,
      (currentIndex + 1) % filteredImages.length
    ];

    indicesToPreload.forEach(index => {
      const img = new Image();
      img.src = filteredImages[index].src;
    });
  }

  loadMoreImages() {
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (!loadMoreBtn) return;

    // Simulate loading
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Memuat...';
    loadMoreBtn.disabled = true;

    setTimeout(() => {
      this.showNotification('Semua foto telah ditampilkan', 'info');
      
      loadMoreBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Semua Foto Ditampilkan';
      setTimeout(() => {
        loadMoreBtn.style.display = 'none';
      }, 2000);
    }, 1500);
  }

  handleImageError(img) {
    console.warn('Gallery image failed to load:', img.src);
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
    img.alt = 'Gambar tidak tersedia';
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

    // Observe gallery items after DOM is ready
    setTimeout(() => {
      const items = document.querySelectorAll('.gallery-item');
      items.forEach(item => this.observer.observe(item));
    }, 100);
  }

  showNotification(message, type = 'info') {
    if (window.showNotification) {
      window.showNotification(message, type);
      return;
    }

    console.log(`${type}: ${message}`);
  }

  showErrorState() {
    const section = document.getElementById('gallery');
    if (section) {
      section.innerHTML = `
        <div class="container">
          <h2 class="title">Galeri Kenangan</h2>
          <div style="text-align: center; padding: 40px 20px; color: var(--muted);">
            <p>Terjadi kesalahan dalam memuat galeri foto.</p>
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
    if (document.querySelector('style[data-gallery]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-gallery', 'true');
    style.textContent = `
      .gallery-section {
        padding: 80px 20px;
        background: linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(233,241,234,0.7) 100%);
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

      .gallery-filters {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-bottom: 40px;
        flex-wrap: wrap;
      }

      .filter-btn {
        padding: 12px 24px;
        border: 2px solid rgba(138, 168, 143, 0.3);
        background: rgba(255, 255, 255, 0.9);
        border-radius: 25px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        color: var(--muted);
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.95rem;
      }

      .filter-btn:hover {
        border-color: var(--sage);
        color: var(--sage-dark);
        transform: translateY(-2px);
      }

      .filter-btn.active {
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        border-color: var(--sage);
        color: white;
        box-shadow: 0 4px 15px rgba(138, 168, 143, 0.3);
      }

      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 25px;
        margin-bottom: 50px;
      }

      .gallery-item {
        opacity: 0;
        transform: translateY(30px);
        animation: galleryItemAppear 0.6s ease forwards;
        animation-play-state: paused;
      }

      @keyframes galleryItemAppear {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes galleryFilterChange {
        0% { opacity: 0.8; }
        100% { opacity: 1; }
      }

      .gallery-image-wrapper {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(33, 44, 38, 0.1);
        transition: all 0.3s ease;
        aspect-ratio: 4/3;
        outline: none;
      }

      .gallery-image-wrapper:hover,
      .gallery-image-wrapper:focus {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(33, 44, 38, 0.15);
      }

      .gallery-image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }

      .gallery-image-wrapper:hover img {
        transform: scale(1.05);
      }

      .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(33,44,38,0.8), rgba(138,168,143,0.7));
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .gallery-image-wrapper:hover .gallery-overlay {
        opacity: 1;
      }

      .overlay-content {
        text-align: center;
        color: white;
        transform: translateY(20px);
        transition: transform 0.3s ease;
      }

      .gallery-image-wrapper:hover .overlay-content {
        transform: translateY(0);
      }

      .overlay-content i {
        font-size: 2.5rem;
        margin-bottom: 15px;
        display: block;
      }

      .overlay-content p {
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        margin: 0;
        font-size: 1rem;
        line-height: 1.4;
      }

      .load-more-container {
        text-align: center;
      }

      .btn-load-more {
        padding: 16px 36px;
        border: none;
        border-radius: 30px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 12px;
        font-size: 1rem;
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
        box-shadow: 0 8px 25px rgba(138, 168, 143, 0.3);
      }

      .btn-load-more:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 12px 30px rgba(138, 168, 143, 0.4);
      }

      .btn-load-more:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(33, 44, 38, 0.95);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .lightbox.active {
        opacity: 1;
        visibility: visible;
      }

      .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .lightbox-image {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }

      .lightbox-close {
        position: absolute;
        top: -60px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 3rem;
        cursor: pointer;
        transition: color 0.3s ease;
        z-index: 10001;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .lightbox-close:hover {
        color: var(--sage);
      }

      .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        backdrop-filter: blur(10px);
      }

      .lightbox-nav:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-50%) scale(1.1);
      }

      .lightbox-prev {
        left: -80px;
      }

      .lightbox-next {
        right: -80px;
      }

      .lightbox-caption {
        text-align: center;
        color: white;
        margin-top: 25px;
        max-width: 600px;
      }

      .lightbox-title {
        font-family: 'Playfair Display', serif;
        font-size: 1.4rem;
        margin: 0 0 10px 0;
        font-weight: 600;
      }

      .lightbox-counter {
        font-family: 'Quicksand', sans-serif;
        color: rgba(255, 255, 255, 0.8);
        font-size: 1rem;
        margin: 0;
      }

      @media (max-width: 768px) {
        .gallery-section {
          padding: 60px 15px;
        }

        .section-subtitle {
          font-size: 1.1rem;
          margin-bottom: 40px;
        }

        .gallery-filters {
          gap: 8px;
          margin-bottom: 30px;
        }

        .filter-btn {
          padding: 10px 20px;
          font-size: 0.9rem;
        }

        .gallery-grid {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .gallery-image-wrapper {
          border-radius: 12px;
        }

        .lightbox-content {
          max-width: 95%;
          max-height: 95%;
        }

        .lightbox-nav {
          width: 50px;
          height: 50px;
          font-size: 1.2rem;
        }

        .lightbox-prev {
          left: -60px;
        }

        .lightbox-next {
          right: -60px;
        }

        .lightbox-close {
          top: -50px;
          font-size: 2.5rem;
        }

        .lightbox-title {
          font-size: 1.2rem;
        }

        .btn-load-more {
          padding: 14px 28px;
          font-size: 0.95rem;
        }
      }

      @media (max-width: 480px) {
        .gallery-grid {
          grid-template-columns: 1fr;
          gap: 15px;
        }

        .gallery-filters {
          justify-content: stretch;
        }

        .filter-btn {
          flex: 1;
          min-width: 0;
          padding: 8px 16px;
          font-size: 0.85rem;
        }

        .lightbox-nav {
          position: fixed;
          bottom: 30px;
          top: auto;
          transform: none;
        }

        .lightbox-prev {
          left: 30px;
        }

        .lightbox-next {
          right: 30px;
        }

        .lightbox-caption {
          margin-top: 20px;
        }

        .lightbox-title {
          font-size: 1.1rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .gallery-item,
        .gallery-image-wrapper,
        .filter-btn,
        .btn-load-more,
        .lightbox-nav {
          transition: none;
          animation: none;
        }
        
        .gallery-item {
          opacity: 1;
          transform: none;
        }
        
        .gallery-image-wrapper:hover {
          transform: none;
        }
      }
    `;

    document.head.appendChild(style);
  }
}

// Initialize gallery
let photoGallery;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    photoGallery = new PhotoGallery();
  });
} else {
  photoGallery = new PhotoGallery();
}
