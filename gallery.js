// gallery.js - Photo Gallery - OPTIMIZED
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
    this.init();
  }

  init() {
    try {
      this.createGallerySection();
      this.setupEventListeners();
      this.setupIntersectionObserver();
    } catch (error) {
      console.error('Error initializing gallery:', error);
    }
  }

  createGallerySection() {
    const section = document.createElement('section');
    section.id = 'gallery';
    section.className = 'gallery-section';
    section.setAttribute('data-aos', 'fade-up');

    section.innerHTML = `
      <div class="container">
        <h2 class="title">Galeri Kenangan</h2>
        <p class="section-subtitle">Kumpulan momen indah yang mengabadikan perjalanan cinta kami</p>
        
        <!-- Category Filters -->
        <div class="gallery-filters" data-aos="fade-up">
          ${this.categories.map(category => `
            <button class="filter-btn ${category === 'all' ? 'active' : ''}" 
                    data-category="${category}">
              ${this.getCategoryLabel(category)}
            </button>
          `).join('')}
        </div>

        <!-- Gallery Grid -->
        <div class="gallery-grid" data-aos="fade-up">
          ${this.getFilteredImages().map((image, index) => this.createGalleryItem(image, index)).join('')}
        </div>

        <!-- Load More Button -->
        <div class="load-more-container" data-aos="fade-up">
          <button class="btn-load-more">
            <i class="fas fa-images"></i>
            Lihat Lebih Banyak
          </button>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <div class="lightbox" id="galleryLightbox">
        <div class="lightbox-content">
          <button class="lightbox-close">&times;</button>
          <button class="lightbox-nav lightbox-prev">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="lightbox-nav lightbox-next">
            <i class="fas fa-chevron-right"></i>
          </button>
          <img class="lightbox-image" src="" alt="">
          <div class="lightbox-caption">
            <h3 class="lightbox-title"></h3>
            <p class="lightbox-counter"></p>
          </div>
        </div>
      </div>
    `;

    document.getElementById('content').appendChild(section);
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
        <div class="gallery-image-wrapper">
          <img src="${image.src}" alt="${image.alt}" loading="lazy">
          <div class="gallery-overlay">
            <div class="overlay-content">
              <i class="fas fa-search-plus"></i>
              <p>${image.alt}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getFilteredImages() {
    if (this.activeCategory === 'all') {
      return this.images;
    }
    return this.images.filter(image => image.category === this.activeCategory);
  }

  setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        this.filterGallery(category);
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });

    // Gallery items
    this.delegateGalleryEvents();

    // Lightbox controls
    this.setupLightboxEvents();

    // Load more button
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => this.loadMoreImages());
    }
  }

  delegateGalleryEvents() {
    const gallery = document.querySelector('.gallery-grid');
    if (!gallery) return;

    gallery.addEventListener('click', (e) => {
      const galleryItem = e.target.closest('.gallery-item');
      if (galleryItem) {
        const index = parseInt(galleryItem.dataset.index);
        this.openLightbox(index);
      }
    });

    // Handle image errors
    gallery.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG') {
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

    // Click outside to close
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

    items.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        item.style.display = 'block';
        setTimeout(() => item.classList.add('active'), 10);
      } else {
        item.classList.remove('active');
        setTimeout(() => item.style.display = 'none', 300);
      }
    });

    // Re-initialize animations
    this.setupIntersectionObserver();
  }

  openLightbox(index) {
    this.currentImageIndex = index;
    const lightbox = document.getElementById('galleryLightbox');
    const filteredImages = this.getFilteredImages();
    const image = filteredImages[this.currentImageIndex];

    if (!image) return;

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');

    // Preload image
    const img = new Image();
    img.onload = () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxTitle.textContent = image.alt;
      lightboxCounter.textContent = `${this.currentImageIndex + 1} / ${filteredImages.length}`;
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    img.onerror = () => {
      this.handleImageError(lightboxImage);
    };
    img.src = image.src;
  }

  closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  navigateLightbox(direction) {
    const filteredImages = this.getFilteredImages();
    this.currentImageIndex = (this.currentImageIndex + direction + filteredImages.length) % filteredImages.length;
    this.openLightbox(this.currentImageIndex);
  }

  handleImageError(img) {
    img.style.display = 'none';
    const wrapper = img.closest('.gallery-image-wrapper');
    if (wrapper) {
      const overlay = wrapper.querySelector('.gallery-overlay');
      if (overlay) {
        overlay.innerHTML = `
          <div class="image-error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Gambar tidak dapat dimuat</p>
          </div>
        `;
      }
    }
  }

  loadMoreImages() {
    // Simulate loading more images
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
      loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
      loadMoreBtn.disabled = true;

      setTimeout(() => {
        // In a real app, you would fetch more images from server
        this.showNotification('Semua foto telah ditampilkan', 'info');
        loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Semua Foto Ditampilkan';
        loadMoreBtn.disabled = true;
      }, 1500);
    }
  }

  showNotification(message, type = 'info') {
    // Simple notification implementation
    console.log(`${type}: ${message}`);
  }

  setupIntersectionObserver() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px 0px'
    });

    galleryItems.forEach(item => {
      observer.observe(item);
    });
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .gallery-section {
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

      .gallery-filters {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 40px;
        flex-wrap: wrap;
      }

      .filter-btn {
        padding: 10px 20px;
        border: 1px solid rgba(138, 168, 143, 0.3);
        background: rgba(255, 255, 255, 0.8);
        color: var(--muted);
        border-radius: 25px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
      }

      .filter-btn:hover {
        border-color: var(--sage);
        color: var(--sage-dark);
        transform: translateY(-2px);
      }

      .filter-btn.active {
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
        border-color: transparent;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(138, 168, 143, 0.3);
      }

      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }

      .gallery-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.5s ease;
      }

      .gallery-item.active {
        opacity: 1;
        transform: translateY(0);
      }

      .gallery-item.animate-in {
        opacity: 1;
        transform: translateY(0);
      }

      .gallery-image-wrapper {
        position: relative;
        border-radius: 15px;
        overflow: hidden;
        aspect-ratio: 4/3;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(33, 44, 38, 0.1);
        transition: all 0.3s ease;
      }

      .gallery-image-wrapper:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(33, 44, 38, 0.15);
      }

      .gallery-image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .gallery-image-wrapper:hover img {
        transform: scale(1.05);
      }

      .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
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
        font-size: 2rem;
        margin-bottom: 10px;
        display: block;
      }

      .overlay-content p {
        font-family: 'Quicksand', sans-serif;
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.4;
      }

      .image-error {
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

      .image-error i {
        font-size: 2rem;
        margin-bottom: 10px;
      }

      .load-more-container {
        text-align: center;
      }

      .btn-load-more {
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .btn-load-more:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(138, 168, 143, 0.3);
      }

      .btn-load-more:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      /* Lightbox Styles */
      .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
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
        max-height: 80vh;
        border-radius: 10px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      }

      .lightbox-close {
        position: absolute;
        top: -50px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.3s ease;
        font-size: 1.2rem;
      }

      .lightbox-nav:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      .lightbox-prev {
        left: -70px;
      }

      .lightbox-next {
        right: -70px;
      }

      .lightbox-caption {
        color: white;
        text-align: center;
        margin-top: 20px;
        font-family: 'Quicksand', sans-serif;
      }

      .lightbox-title {
        margin: 0 0 8px 0;
        font-size: 1.2rem;
        font-weight: 600;
      }

      .lightbox-counter {
        margin: 0;
        color: #ccc;
        font-size: 0.9rem;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .gallery-grid {
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }

        .gallery-filters {
          gap: 8px;
        }

        .filter-btn {
          padding: 8px 16px;
          font-size: 0.85rem;
        }

        .lightbox-nav {
          width: 40px;
          height: 40px;
          font-size: 1rem;
        }

        .lightbox-prev {
          left: 10px;
        }

        .lightbox-next {
          right: 10px;
        }

        .lightbox-close {
          top: 10px;
          right: 10px;
        }
      }

      @media (max-width: 480px) {
        .gallery-grid {
          grid-template-columns: 1fr;
        }

        .gallery-filters {
          justify-content: flex-start;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .filter-btn {
          white-space: nowrap;
        }
      }
    `;

    if (!document.querySelector('style[data-gallery]')) {
      style.setAttribute('data-gallery', 'true');
      document.head.appendChild(style);
    }
  }
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', () => {
  new PhotoGallery();
});