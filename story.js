// story.js - Love Story Timeline - OPTIMIZED
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
    this.init();
  }

  init() {
    try {
      this.createStorySection();
      this.setupEventListeners();
    } catch (error) {
      console.error('Error initializing love story:', error);
    }
  }

  createStorySection() {
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

        <!-- Love Quote -->
        <div class="love-quote" data-aos="fade-up">
          <div class="quote-content">
            <i class="fas fa-quote-left"></i>
            <p>"Cinta sejati bukan tentang menemukan orang yang sempurna, tetapi tentang belajar melihat orang yang tidak sempurna dengan cara yang sempurna."</p>
            <i class="fas fa-quote-right"></i>
          </div>
          <div class="quote-author">- Gifary & Sindy -</div>
        </div>
      </div>
    `;

    document.getElementById('content').appendChild(section);
    this.addStyles();
  }

  createStoryItem(story, index) {
    const isEven = index % 2 === 0;
    const animation = isEven ? 'fade-right' : 'fade-left';

    return `
      <div class="timeline-item" data-aos="${animation}">
        <div class="timeline-marker">
          <div class="marker-icon">
            <i class="${story.icon}"></i>
          </div>
          <div class="marker-year">${story.year}</div>
        </div>
        
        <div class="timeline-content ${isEven ? 'left' : 'right'}">
          <div class="story-card">
            <div class="story-image">
              <img src="${story.image}" alt="${story.title}" loading="lazy">
              <div class="image-overlay">
                <i class="fas fa-expand"></i>
              </div>
            </div>
            <div class="story-text">
              <h3 class="story-title">${story.title}</h3>
              <p class="story-description">${story.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    // Image click handlers
    const storyImages = document.querySelectorAll('.story-image');
    storyImages.forEach(image => {
      image.addEventListener('click', () => this.enlargeImage(image));
      image.addEventListener('error', () => this.handleImageError(image));
    });

    // Intersection Observer for timeline animation
    this.setupIntersectionObserver();
  }

  enlargeImage(imageElement) {
    const img = imageElement.querySelector('img');
    if (!img) return;

    const modal = document.createElement('div');
    modal.className = 'story-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <img src="${img.src}" alt="${img.alt}">
        <div class="modal-caption">
          <h4>${img.alt}</h4>
          <p>${this.getStoryDescription(img.alt)}</p>
        </div>
      </div>
    `;

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
      animation: zoomIn 0.3s ease;
    `;

    modal.querySelector('img').style.cssText = `
      max-width: 100%;
      max-height: 70vh;
      border-radius: 10px;
      display: block;
    `;

    modal.querySelector('.modal-close').style.cssText = `
      position: absolute;
      top: -40px;
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
    `;

    modal.querySelector('.modal-caption').style.cssText = `
      color: white;
      text-align: center;
      margin-top: 15px;
      font-family: 'Quicksand', sans-serif;
    `;

    modal.querySelector('.modal-caption h4').style.cssText = `
      margin: 0 0 8px 0;
      font-family: 'Playfair Display', serif;
      color: var(--sage);
    `;

    modal.querySelector('.modal-caption p').style.cssText = `
      margin: 0;
      color: #ccc;
      line-height: 1.5;
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

    document.body.appendChild(modal);
    setTimeout(() => modal.style.opacity = '1', 10);
  }

  getStoryDescription(title) {
    const story = this.stories.find(s => s.title === title);
    return story ? story.description : 'Momen berharga dalam perjalanan cinta kami';
  }

  handleImageError(imageElement) {
    const img = imageElement.querySelector('img');
    if (img) {
      img.style.display = 'none';
    }
    
    const overlay = imageElement.querySelector('.image-overlay');
    if (overlay) {
      overlay.innerHTML = `
        <div class="image-placeholder">
          <i class="fas fa-image"></i>
          <p>Foto tidak tersedia</p>
        </div>
      `;
    }
  }

  setupIntersectionObserver() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    });

    timelineItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(item);
    });
  }

  addStyles() {
    const style = document.createElement('style');
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
        font-size: 1.1rem;
        margin-bottom: 60px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
      }

      .timeline {
        position: relative;
        max-width: 1000px;
        margin: 0 auto;
      }

      .timeline::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 3px;
        height: 100%;
        background: linear-gradient(180deg, var(--sage), var(--sage-dark));
        border-radius: 2px;
      }

      .timeline-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 60px;
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
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.3rem;
        box-shadow: 0 8px 25px rgba(138, 168, 143, 0.3);
        border: 3px solid white;
      }

      .marker-year {
        margin-top: 8px;
        font-family: 'Playfair Display', serif;
        font-size: 1.1rem;
        color: var(--sage-dark);
        font-weight: 600;
        background: white;
        padding: 4px 12px;
        border-radius: 15px;
        border: 1px solid rgba(138, 168, 143, 0.2);
      }

      .timeline-content {
        width: 45%;
        position: relative;
      }

      .timeline-content.left {
        margin-right: auto;
        padding-right: 60px;
      }

      .timeline-content.right {
        margin-left: auto;
        padding-left: 60px;
      }

      .story-card {
        background: rgba(255, 255, 255, 0.9);
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
        height: 200px;
        overflow: hidden;
        cursor: pointer;
      }

      .story-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
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
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        color: white;
        font-size: 1.5rem;
      }

      .story-image:hover .image-overlay {
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
        font-size: 2.5rem;
        margin-bottom: 10px;
      }

      .story-text {
        padding: 25px;
      }

      .story-title {
        font-family: 'Playfair Display', serif;
        font-size: 1.3rem;
        color: var(--sage-dark);
        margin-bottom: 12px;
        font-weight: 600;
      }

      .story-description {
        font-family: 'Quicksand', sans-serif;
        color: var(--charcoal);
        line-height: 1.6;
        margin: 0;
      }

      .love-quote {
        max-width: 600px;
        margin: 80px auto 0;
        text-align: center;
        padding: 40px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 20px;
        border: 1px solid rgba(138, 168, 143, 0.2);
        backdrop-filter: blur(10px);
        position: relative;
      }

      .quote-content {
        position: relative;
        margin-bottom: 20px;
      }

      .quote-content i:first-child {
        position: absolute;
        top: -10px;
        left: -10px;
        font-size: 2rem;
        color: var(--sage);
        opacity: 0.3;
      }

      .quote-content i:last-child {
        position: absolute;
        bottom: -20px;
        right: -10px;
        font-size: 2rem;
        color: var(--sage);
        opacity: 0.3;
      }

      .quote-content p {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.3rem;
        color: var(--muted);
        line-height: 1.6;
        margin: 0;
        font-style: italic;
      }

      .quote-author {
        font-family: 'Playfair Display', serif;
        color: var(--sage-dark);
        font-weight: 600;
        font-size: 1.1rem;
      }

      /* Story Modal */
      @keyframes zoomIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }

      /* Responsive */
      @media (max-width: 768px) {
        .timeline::before {
          left: 30px;
        }

        .timeline-item {
          justify-content: flex-start;
          margin-bottom: 40px;
        }

        .timeline-marker {
          left: 30px;
        }

        .timeline-content {
          width: calc(100% - 80px);
          margin-left: 80px !important;
          padding: 0 !important;
        }

        .marker-icon {
          width: 50px;
          height: 50px;
          font-size: 1.1rem;
        }

        .marker-year {
          font-size: 1rem;
        }

        .story-image {
          height: 180px;
        }

        .love-quote {
          margin-top: 60px;
          padding: 30px 25px;
        }

        .quote-content p {
          font-size: 1.1rem;
        }
      }

      @media (max-width: 480px) {
        .timeline-marker {
          left: 20px;
        }

        .timeline-content {
          width: calc(100% - 60px);
          margin-left: 60px !important;
        }

        .marker-icon {
          width: 45px;
          height: 45px;
          font-size: 1rem;
        }

        .story-text {
          padding: 20px;
        }

        .story-title {
          font-size: 1.2rem;
        }

        .love-quote {
          padding: 25px 20px;
        }
      }
    `;

    if (!document.querySelector('style[data-story]')) {
      style.setAttribute('data-story', 'true');
      document.head.appendChild(style);
    }
  }
}

// Initialize love story
document.addEventListener('DOMContentLoaded', () => {
  new LoveStory();
});