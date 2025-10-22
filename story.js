// story.js - Love Story Timeline - OPTIMIZED & FIXED
class LoveStory {
  constructor() {
    this.stories = [
      {
        year: '2020',
        title: 'Pertemuan Pertama',
        description: 'Kami pertama kali bertemu di acara alumni kampus. Saat itu, tanpa disadari, benih-benih cinta mulai tumbuh dalam hati kami.',
        image: 'images/1.jpeg',
        icon: 'fas fa-handshake'
      },
      {
        year: '2021',
        title: 'Mulai Dekat',
        description: 'Hubungan kami semakin dekat melalui berbagai kesamaan minat dan nilai-nilai kehidupan. Setiap percakapan semakin mempererat ikatan batin.',
        image: 'images/2.jpeg',
        icon: 'fas fa-heart'
      },
      {
        year: '2022',
        title: 'Komitmen Bersama',
        description: 'Kami memutuskan untuk serius dalam menjalin hubungan dengan restu dari kedua keluarga. Perjalanan cinta kami memasuki babak baru.',
        image: 'images/3.jpeg',
        icon: 'fas fa-ring'
      },
      {
        year: '2023',
        title: 'Tunangan',
        description: 'Dengan penuh kebahagiaan, kami mengikat janji dalam acara pertunangan yang sederhana namun penuh makna di hadapan keluarga terdekat.',
        image: 'images/4.jpeg',
        icon: 'fas fa-gem'
      },
      {
        year: '2026',
        title: 'Hari Bahagia',
        description: 'Dan akhirnya, dengan izin Allah, kami akan menyatukan dua hati dalam ikatan pernikahan yang suci. Inilah puncak perjalanan cinta kami.',
        image: 'images/5.jpeg',
        icon: 'fas fa-church'
      }
    ];
    this.observer = null;
    this.init();
  }

  init() {
    try {
      this.createStorySection();
      this.setupEventListeners();
      this.setupIntersectionObserver();
    } catch (error) {
      console.error('Error initializing love story:', error);
      this.showErrorState();
    }
  }

  createStorySection() {
    if (document.getElementById('story')) return;

    const section = document.createElement('section');
    section.id = 'story';
    section.className = 'story-section';
    section.setAttribute('data-aos', 'fade-up');

    section.innerHTML = `
      <div class="container">
        <h2 class="title">Perjalanan Cinta Kami</h2>
        <p class="section-subtitle">Setiap momen berharga yang mengantarkan kami pada hari bahagia ini</p>
        
        <div class="timeline">
          ${this.stories.map((story, index) => this.createStoryItem(story, index)).join('')}
        </div>

        <div class="love-quote" data-aos="fade-up">
          <div class="quote-content">
            <i class="fas fa-quote-left" aria-hidden="true"></i>
            <p>"Cinta sejati bukan tentang menemukan orang yang sempurna, tetapi tentang belajar melihat orang yang tidak sempurna dengan cara yang sempurna."</p>
            <i class="fas fa-quote-right" aria-hidden="true"></i>
          </div>
          <div class="quote-author">- Gifary & Sindy -</div>
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

  createStoryItem(story, index) {
    const isEven = index % 2 === 0;
    const animation = isEven ? 'fade-right' : 'fade-left';

    return `
      <div class="timeline-item" data-year="${story.year}">
        <div class="timeline-marker">
          <div class="marker-icon">
            <i class="${story.icon}" aria-hidden="true"></i>
          </div>
          <div class="marker-year">${story.year}</div>
        </div>
        
        <div class="timeline-content ${isEven ? 'left' : 'right'}">
          <div class="story-card">
            <div class="story-image" role="button" tabindex="0" aria-label="Perbesar gambar ${story.title}">
              <img src="${story.image}" alt="${story.title}" loading="lazy">
              <div class="image-overlay">
                <i class="fas fa-expand" aria-hidden="true"></i>
              </div>
            </div>
            <div class="story-text">
              <h3 class="story-title">${this.escapeHtml(story.title)}</h3>
              <p class="story-description">${this.escapeHtml(story.description)}</p>
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

  setupEventListeners() {
    // Delegate all image clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('.story-image')) {
        const imageElement = e.target.closest('.story-image');
        this.enlargeImage(imageElement);
        return;
      }
    });

    // Keyboard support for image enlargement
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (focused && focused.classList.contains('story-image')) {
          e.preventDefault();
          this.enlargeImage(focused);
        }
      }
    });

    // Image error handling
    document.addEventListener('error', (e) => {
      if (e.target.classList.contains('story-image') || e.target.parentElement.classList.contains('story-image')) {
        this.handleImageError(e.target);
      }
    }, true);
  }

  enlargeImage(imageElement) {
    const img = imageElement.querySelector('img');
    if (!img || !img.src) return;

    const storyTitle = imageElement.closest('.story-card')?.querySelector('.story-title')?.textContent || 'Momen Cinta';
    const storyDescription = this.getStoryDescription(storyTitle);

    const modal = document.createElement('div');
    modal.className = 'story-modal active';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Galeri Foto');
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" aria-label="Tutup galeri">&times;</button>
        <img src="${img.src}" alt="${img.alt}" loading="eager">
        <div class="modal-caption">
          <h4>${this.escapeHtml(img.alt)}</h4>
          <p>${this.escapeHtml(storyDescription)}</p>
        </div>
      </div>
    `;

    // Inline styles for immediate rendering
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      position: relative;
      animation: storyModalZoomIn 0.3s ease;
    `;

    modal.querySelector('img').style.cssText = `
      max-width: 100%;
      max-height: 70vh;
      border-radius: 10px;
      display: block;
      object-fit: contain;
    `;

    modal.querySelector('.modal-close').style.cssText = `
      position: absolute;
      top: -50px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 2.5rem;
      cursor: pointer;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.3s ease;
    `;

    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.style.opacity = '0';
      setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
      }
    });

    // Keyboard support
    const keyHandler = (e) => {
      if (e.key === 'Escape') {
        modal.style.opacity = '0';
        setTimeout(() => {
          modal.remove();
          document.removeEventListener('keydown', keyHandler);
        }, 300);
      }
    };
    document.addEventListener('keydown', keyHandler);

    document.body.appendChild(modal);
    setTimeout(() => modal.style.opacity = '1', 10);
  }

  getStoryDescription(title) {
    const story = this.stories.find(s => s.title === title);
    return story ? story.description : 'Momen berharga dalam perjalanan cinta kami';
  }

  handleImageError(img) {
    console.warn('Story image failed to load:', img.src);
    const imageContainer = img.closest('.story-image');
    if (imageContainer) {
      imageContainer.innerHTML = `
        <div class="image-placeholder">
          <i class="fas fa-image" aria-hidden="true"></i>
          <p>Foto tidak tersedia</p>
        </div>
      `;
    }
  }

  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      this.animateTimelineItems();
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    });

    // Observe timeline items after a short delay
    setTimeout(() => {
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        this.observer.observe(item);
      });
    }, 100);
  }

  animateTimelineItems() {
    // Fallback for browsers without IntersectionObserver
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }, index * 200);
    });
  }

  showErrorState() {
    const section = document.getElementById('story');
    if (section) {
      section.innerHTML = `
        <div class="container">
          <h2 class="title">Perjalanan Cinta Kami</h2>
          <div style="text-align: center; padding: 40px 20px; color: var(--muted);">
            <p>Terjadi kesalahan dalam memuat cerita cinta kami.</p>
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
    if (document.querySelector('style[data-story]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-story', 'true');
    style.textContent = `
      .story-section {
        padding: 80px 20px;
        background: linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(233,241,234,0.7) 100%);
        position: relative;
        overflow: hidden;
      }

      .section-subtitle {
        text-align: center;
        color: var(--muted);
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.2rem;
        margin-bottom: 60px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
      }

      .timeline {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 0;
      }

      .timeline::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 100%;
        background: linear-gradient(180deg, var(--sage), var(--sage-dark));
        border-radius: 4px;
      }

      .timeline-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 80px;
        position: relative;
      }

      .timeline-marker {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
      }

      .marker-icon {
        width: 70px;
        height: 70px;
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        box-shadow: 0 8px 25px rgba(138, 168, 143, 0.3);
        border: 4px solid white;
        transition: transform 0.3s ease;
      }

      .timeline-item:hover .marker-icon {
        transform: scale(1.1);
      }

      .marker-year {
        margin-top: 10px;
        font-family: 'Playfair Display', serif;
        font-size: 1.2rem;
        color: var(--sage-dark);
        font-weight: 600;
        background: white;
        padding: 6px 15px;
        border-radius: 20px;
        border: 2px solid rgba(138, 168, 143, 0.2);
        box-shadow: 0 4px 15px rgba(138, 168, 143, 0.1);
      }

      .timeline-content {
        width: 45%;
        position: relative;
      }

      .timeline-content.left {
        margin-right: auto;
        padding-right: 80px;
      }

      .timeline-content.right {
        margin-left: auto;
        padding-left: 80px;
      }

      .story-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(138, 168, 143, 0.2);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(33, 44, 38, 0.08);
        transition: all 0.3s ease;
      }

      .story-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(33, 44, 38, 0.12);
      }

      .story-image {
        position: relative;
        height: 250px;
        overflow: hidden;
        cursor: pointer;
        outline: none;
      }

      .story-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }

      .story-card:hover .story-image img {
        transform: scale(1.05);
      }

      .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        color: white;
        font-size: 1.8rem;
      }

      .story-image:hover .image-overlay,
      .story-image:focus .image-overlay {
        opacity: 1;
      }

      .image-placeholder {
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

      .image-placeholder i {
        font-size: 3rem;
        margin-bottom: 15px;
      }

      .story-text {
        padding: 30px;
      }

      .story-title {
        font-family: 'Playfair Display', serif;
        font-size: 1.4rem;
        color: var(--sage-dark);
        margin-bottom: 15px;
        font-weight: 600;
      }

      .story-description {
        font-family: 'Quicksand', sans-serif;
        color: var(--charcoal);
        line-height: 1.6;
        margin: 0;
        font-size: 1rem;
      }

      .love-quote {
        max-width: 700px;
        margin: 100px auto 0;
        text-align: center;
        padding: 50px 40px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 20px;
        border: 1px solid rgba(138, 168, 143, 0.2);
        backdrop-filter: blur(10px);
        position: relative;
      }

      .quote-content {
        position: relative;
        margin-bottom: 25px;
      }

      .quote-content i:first-child {
        position: absolute;
        top: -20px;
        left: -10px;
        font-size: 2.5rem;
        color: var(--sage);
        opacity: 0.3;
      }

      .quote-content i:last-child {
        position: absolute;
        bottom: -30px;
        right: -10px;
        font-size: 2.5rem;
        color: var(--sage);
        opacity: 0.3;
      }

      .quote-content p {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.4rem;
        color: var(--muted);
        line-height: 1.6;
        margin: 0;
        font-style: italic;
      }

      .quote-author {
        font-family: 'Playfair Display', serif;
        color: var(--sage-dark);
        font-weight: 600;
        font-size: 1.2rem;
      }

      @keyframes storyModalZoomIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }

      @media (max-width: 768px) {
        .timeline::before {
          left: 30px;
        }

        .timeline-item {
          justify-content: flex-start;
          margin-bottom: 60px;
        }

        .timeline-marker {
          left: 30px;
        }

        .timeline-content {
          width: calc(100% - 100px);
          margin-left: 100px !important;
          padding: 0 !important;
        }

        .marker-icon {
          width: 60px;
          height: 60px;
          font-size: 1.3rem;
        }

        .marker-year {
          font-size: 1.1rem;
        }

        .story-image {
          height: 200px;
        }

        .love-quote {
          margin-top: 80px;
          padding: 40px 30px;
        }

        .quote-content p {
          font-size: 1.2rem;
        }
      }

      @media (max-width: 480px) {
        .story-section {
          padding: 60px 15px;
        }

        .timeline-marker {
          left: 20px;
        }

        .timeline-content {
          width: calc(100% - 80px);
          margin-left: 80px !important;
        }

        .marker-icon {
          width: 50px;
          height: 50px;
          font-size: 1.1rem;
        }

        .story-text {
          padding: 25px 20px;
        }

        .story-title {
          font-size: 1.3rem;
        }

        .love-quote {
          padding: 30px 25px;
          margin-top: 60px;
        }

        .quote-content p {
          font-size: 1.1rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .timeline-item,
        .story-card,
        .story-image img,
        .marker-icon {
          transition: none;
          animation: none;
        }
        
        .story-card:hover {
          transform: none;
        }
        
        .timeline-item {
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }
}

// Initialize love story
let loveStory;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loveStory = new LoveStory();
  });
} else {
  loveStory = new LoveStory();
}
