export class WeddingGallery {
  constructor(scrollReveal) {
    this.scrollReveal = scrollReveal;
    this.galleryData = [
      {
        image: "images/gallery1.jpg",
        title: "Pre-Wedding Session",
        description: "Momen romantis di taman bunga"
      },
      {
        image: "images/gallery2.jpg",
        title: "Beach Photoshoot",
        description: "Sunset di pantai"
      },
      {
        image: "images/gallery3.jpg",
        title: "Urban Style",
        description: "Modern city vibes"
      },
      {
        image: "images/gallery4.jpg",
        title: "Traditional Moment",
        description: "Budaya dan tradisi"
      },
      {
        image: "images/gallery5.jpg",
        title: "Candid Laughs",
        description: "Tawa bahagia bersama"
      },
      {
        image: "images/gallery6.jpg",
        title: "Romantic Dinner",
        description: "Makan malam spesial"
      }
    ];
    this.init();
  }

  init() {
    this.createGallerySection();
    setTimeout(() => {
      this.initScrollReveal();
      this.initLightbox();
    }, 100);
  }

  createGallerySection() {
    if (document.getElementById('gallery')) return;

    const section = document.createElement('section');
    section.id = 'gallery';
    section.className = 'py-5';
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

        .gallery-filter {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid var(--cambridge-blue);
          color: var(--hookers-green);
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          font-family: 'Roboto', sans-serif;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          color: white;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(82, 121, 111, 0.3);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .gallery-item {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.1),
            0 5px 15px rgba(82, 121, 111, 0.2);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          aspect-ratio: 4/3;
        }

        .gallery-item:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.15),
            0 15px 35px rgba(82, 121, 111, 0.3);
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.6s ease;
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.1);
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(47, 62, 70, 0.8) 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
          opacity: 0;
          transition: all 0.4s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-title {
          color: white;
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          transform: translateY(20px);
          transition: transform 0.4s ease;
        }

        .gallery-description {
          color: rgba(255, 255, 255, 0.9);
          font-family: 'Roboto', sans-serif;
          font-size: 0.9rem;
          transform: translateY(20px);
          transition: transform 0.4s ease 0.1s;
        }

        .gallery-item:hover .gallery-title,
        .gallery-item:hover .gallery-description {
          transform: translateY(0);
        }

        .gallery-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--hookers-green);
          font-size: 1.5rem;
          transition: all 0.4s ease 0.2s;
          backdrop-filter: blur(10px);
        }

        .gallery-item:hover .gallery-icon {
          transform: translate(-50%, -50%) scale(1);
        }

        .gallery-cta {
          text-align: center;
          margin-top: 3rem;
        }

        .btn-gallery {
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          color: white;
          border: none;
          padding: 1.2rem 2.5rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          box-shadow: 0 10px 30px rgba(82, 121, 111, 0.3);
        }

        .btn-gallery:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(82, 121, 111, 0.4);
          color: white;
        }

        /* Lightbox Customization */
        .glightbox-container {
          background: rgba(47, 62, 70, 0.98);
        }

        .gslide-image img {
          border-radius: 15px;
        }

        .glightbox-clean .gclose, 
        .glightbox-clean .gnext, 
        .glightbox-clean .gprev {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }

        .glightbox-clean .gclose:hover, 
        .glightbox-clean .gnext:hover, 
        .glightbox-clean .gprev:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .gdesc-inner {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .gslide-title {
          font-family: 'Playfair Display', serif;
          color: var(--dark-slate-gray);
          font-weight: 700;
        }

        .gslide-desc {
          font-family: 'Roboto', sans-serif;
          color: var(--charcoal);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }

          .gallery-overlay {
            padding: 1.5rem;
          }

          .gallery-title {
            font-size: 1.3rem;
          }

          .gallery-description {
            font-size: 0.8rem;
          }

          .gallery-icon {
            width: 50px;
            height: 50px;
            font-size: 1.3rem;
          }

          .filter-btn {
            padding: 0.7rem 1.2rem;
            font-size: 0.9rem;
          }

          .btn-gallery {
            padding: 1rem 2rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 576px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .gallery-filter {
            gap: 0.5rem;
          }

          .filter-btn {
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
          }

          .gallery-overlay {
            padding: 1rem;
          }

          .gallery-title {
            font-size: 1.1rem;
          }

          .btn-gallery {
            padding: 0.9rem 1.8rem;
            font-size: 0.9rem;
          }
        }
      </style>

      <section class="gallery-section">
        <div class="container">
          <h2 class="section-title">Galeri Kenangan</h2>
          <p class="text-center text-muted mb-5" style="font-size: 1.1rem; font-family: 'Roboto', sans-serif;">
            Abadikan momen indah perjalanan cinta kami
          </p>

          <!-- Gallery Filter -->
          <div class="gallery-filter">
            <button class="filter-btn active" data-filter="all">All Photos</button>
            <button class="filter-btn" data-filter="prewedding">Pre-Wedding</button>
            <button class="filter-btn" data-filter="engagement">Engagement</button>
            <button class="filter-btn" data-filter="candid">Candid</button>
          </div>

          <!-- Gallery Grid -->
          <div class="gallery-grid">
            ${this.galleryData.map((item, index) => this.getGalleryItemHTML(item, index)).join('')}
          </div>

          <!-- Call to Action -->
          <div class="gallery-cta reveal-item">
            <a href="#" class="btn btn-gallery">
              <i class="bi bi-cloud-arrow-down"></i>
              Download Semua Foto
            </a>
          </div>
        </div>
      </section>
    `;
  }

  getGalleryItemHTML(item, index) {
    return `
      <div class="gallery-item reveal-item" data-category="prewedding">
        <img src="${item.image}" alt="${item.title}" class="gallery-image">
        <div class="gallery-overlay">
          <h4 class="gallery-title">${item.title}</h4>
          <p class="gallery-description">${item.description}</p>
        </div>
        <div class="gallery-icon">
          <i class="bi bi-zoom-in"></i>
        </div>
      </div>
    `;
  }

  initScrollReveal() {
    if (this.scrollReveal) {
      const revealElements = document.querySelectorAll('.reveal-item');
      revealElements.forEach((element) => {
        this.scrollReveal.reveal(element, {
          duration: 800,
          distance: '50px',
          easing: 'cubic-bezier(0.5, 0, 0, 1)',
          origin: 'bottom',
          cleanup: true
        });
      });
    }
  }

  initLightbox() {
    if (typeof GLightbox === 'function') {
      const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        autoplayVideos: false,
        selector: '.gallery-item'
      });
    }
  }
}