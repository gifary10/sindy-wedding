export class WeddingGallery {
  constructor(scrollReveal) {
    this.scrollReveal = scrollReveal;
    this.galleryData = [
      {
        src: "images/gallery1.jpg"
      },
      {
        src: "images/gallery2.jpg"
      },
      {
        src: "images/gallery3.jpg"
      },
      {
        src: "images/gallery4.jpg"
      },
      {
        src: "images/gallery5.jpg"
      },
      {
        src: "images/gallery6.jpg"
      },
      {
        src: "images/gallery1.jpg"
      },
      {
        src: "images/gallery2.jpg"
      },
      {
        src: "images/gallery3.jpg"
      },
      {
        src: "images/gallery4.jpg"
      },
      {
        src: "images/gallery5.jpg"
      },
      {
        src: "images/gallery6.jpg"
      }
    ];
    this.init();
  }

  init() {
    this.createGallerySection();
    setTimeout(() => {
      this.initScrollReveal();
      this.setupGalleryLightbox();
      this.setupTouchEvents();
    }, 100);
  }

  createGallerySection() {
    if (document.getElementById('gallery')) return;

    const section = document.createElement('section');
    section.id = 'gallery';
    section.className = 'py-1';
    section.style.background = 'linear-gradient(135deg, var(--ash-gray) 0%, var(--white) 100%)';
    section.innerHTML = this.getGalleryHTML();

    const content = document.getElementById('content');
    if (content) content.appendChild(section);
  }

  getGalleryHTML() {
    return `
      <style>
        .gallery-section {
          position: relative;
          overflow: hidden;
        }

        .gallery-container {
          position: relative;
          width: 100%;
          max-width: 576px;
          margin: 0 auto;
          padding: 0 15px;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .gallery-item {
          position: relative;
          border-radius: 0px;
          overflow: hidden;
          aspect-ratio: 1;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: var(--ash-gray);
          box-shadow: 
            0 8px 25px rgba(47, 62, 70, 0.1),
            0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .gallery-item:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            0 15px 40px rgba(47, 62, 70, 0.15),
            0 8px 20px rgba(0, 0, 0, 0.08);
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.05);
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 60%,
            rgba(0, 0, 0, 0.4) 100%
          );
          opacity: 0;
          transition: all 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 1rem;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-caption {
          color: white;
          font-family: 'Raleway', Roboto;
          font-size: 0.85rem;
          font-weight: 500;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
          transform: translateY(10px);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .gallery-caption {
          transform: translateY(0);
        }

        .gallery-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--ash-gray);
          color: var(--dark-slate-gray);
          font-family: 'Raleway', Roboto;
          font-size: 0.9rem;
        }

        .gallery-loading::after {
          content: 'Memuat...';
        }

        /* Fullscreen Lightbox Styles */
        .gallery-lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          z-index: 9999;
          display: none;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-lightbox.active {
          display: flex;
          opacity: 1;
        }

        .lightbox-content {
          position: relative;
          width: 90%;
          height: 70%;
          max-width: 500px;
          max-height: 500px;
        }

        .lightbox-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 12px;
        }

        .lightbox-caption {
          position: absolute;
          bottom: -50px;
          left: 0;
          right: 0;
          text-align: center;
          color: white;
          font-family: 'Raleway', Roboto;
          font-size: 1rem;
          padding: 1rem;
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10000;
        }

        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10000;
        }

        .lightbox-prev {
          left: 20px;
        }

        .lightbox-next {
          right: 20px;
        }

        .lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-nav:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: translateY(-50%) scale(1);
        }

        .lightbox-nav:disabled:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-50%) scale(1);
        }

        /* Touch Navigation Hints */
        .touch-hints {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1.5rem;
          color: var(--dark-slate-gray);
          font-family: 'Raleway', Roboto;
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .touch-hint {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Loading Animation */
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }

        .gallery-item.loading {
          animation: shimmer 1.5s infinite linear;
          background: linear-gradient(
            to right,
            var(--ash-gray) 0%,
            var(--cambridge-blue) 20%,
            var(--ash-gray) 40%,
            var(--ash-gray) 100%
          );
          background-size: 800px 104px;
        }
        
        /* Landscape Mode */
        @media (max-height: 500px) and (orientation: landscape) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .lightbox-content {
            height: 85%;
            max-height: 300px;
          }
        }
      </style>

      <section class="gallery-section">
        <div class="container">
          <h2 class="section-title">Galeri Kenangan</h2>
          <p class="text-center text-muted mb-4" style="font-size: 1rem; font-family: 'Raleway', Roboto;">
            Abadikan momen-momen indah dalam perjalanan cinta kami
          </p>

          <div class="gallery-container">
            <div class="gallery-grid" id="galleryGrid">
              ${this.galleryData.map((item, index) => this.getGalleryItemHTML(item, index)).join('')}
            </div>

            <div class="touch-hints">
              <div class="touch-hint">
                <i class="bi bi-arrows-expand"></i>
                <span>Tap untuk memperbesar</span>
              </div>
              <div class="touch-hint">
                <i class="bi bi-arrow-left-right"></i>
                <span>Geser untuk navigasi</span>
              </div>
            </div>
          </div>

          <!-- Lightbox -->
          <div class="gallery-lightbox" id="galleryLightbox">
            <button class="lightbox-close" id="lightboxClose">
              <i class="bi bi-x-lg"></i>
            </button>
            
            <button class="lightbox-nav lightbox-prev" id="lightboxPrev">
              <i class="bi bi-chevron-left"></i>
            </button>
            
            <div class="lightbox-content">
              <img id="lightboxImage" class="lightbox-image" src="" alt="">
              <div class="lightbox-caption" id="lightboxCaption"></div>
            </div>
            
            <button class="lightbox-nav lightbox-next" id="lightboxNext">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>
    `;
  }

  getGalleryItemHTML(item, index) {
    return `
      <div class="gallery-item reveal-item" data-index="${index}">
        <img src="${item.src}" 
             alt="Gallery image ${index + 1}" 
             class="gallery-image"
             loading="lazy"
             onload="this.parentElement.classList.remove('loading')"
             onerror="this.style.display='none'; this.parentElement.classList.add('gallery-loading');">
        <div class="gallery-overlay">
          <div class="gallery-caption">Gallery image ${index + 1}</div>
        </div>
      </div>
    `;
  }

  initScrollReveal() {
    if (this.scrollReveal) {
      const revealElements = document.querySelectorAll('.reveal-item');
      revealElements.forEach((element) => {
        this.scrollReveal.reveal(element, {
          duration: 600,
          distance: '30px',
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          origin: 'bottom',
          cleanup: true,
          mobile: true
        });
      });
    }
  }

  setupGalleryLightbox() {
    this.currentImageIndex = 0;
    this.touchStartX = 0;
    this.touchEndX = 0;

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    // Open lightbox on image click
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.openLightbox(index);
      });

      // Add loading class initially
      item.classList.add('loading');
    });

    // Lightbox navigation
    lightboxClose.addEventListener('click', () => this.closeLightbox());
    lightboxPrev.addEventListener('click', () => this.showPreviousImage());
    lightboxNext.addEventListener('click', () => this.showNextImage());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;

      switch(e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          this.showPreviousImage();
          break;
        case 'ArrowRight':
          this.showNextImage();
          break;
      }
    });

    // Touch events for swipe navigation
    lightbox.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    // Close lightbox when clicking on background
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        this.closeLightbox();
      }
    });
  }

  setupTouchEvents() {
    // Prevent zoom on double tap for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      let lastTap = 0;
      
      item.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
          e.preventDefault();
        }
        
        lastTap = currentTime;
      });
    });
  }

  openLightbox(index) {
    this.currentImageIndex = index;
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    const imageData = this.galleryData[index];
    
    // Preload image for lightbox
    const img = new Image();
    img.onload = () => {
      lightboxImage.src = imageData.src;
      lightboxCaption.textContent = `Gallery image ${index + 1}`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      this.updateNavigationButtons();
    };
    img.src = imageData.src;
  }

  closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  showPreviousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.updateLightboxImage();
    }
  }

  showNextImage() {
    if (this.currentImageIndex < this.galleryData.length - 1) {
      this.currentImageIndex++;
      this.updateLightboxImage();
    }
  }

  updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const imageData = this.galleryData[this.currentImageIndex];

    // Add fade transition
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
      lightboxImage.src = imageData.src;
      lightboxCaption.textContent = `Gallery image ${this.currentImageIndex + 1}`;
      lightboxImage.style.opacity = '1';
      this.updateNavigationButtons();
    }, 200);
  }

  updateNavigationButtons() {
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    lightboxPrev.disabled = this.currentImageIndex === 0;
    lightboxNext.disabled = this.currentImageIndex === this.galleryData.length - 1;
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe right - previous image
        this.showPreviousImage();
      } else {
        // Swipe left - next image
        this.showNextImage();
      }
    }
  }

  // Method untuk cleanup
  destroy() {
    const section = document.getElementById('gallery');
    if (section) {
      section.remove();
    }
    
    // Remove event listeners
    const lightbox = document.getElementById('galleryLightbox');
    if (lightbox) {
      lightbox.removeEventListener('touchstart', () => {});
      lightbox.removeEventListener('touchend', () => {});
    }
  }
}
