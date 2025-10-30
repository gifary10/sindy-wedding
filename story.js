export class WeddingStory {
  constructor(scrollReveal) {
    this.scrollReveal = scrollReveal;
    this.storyData = [
      {
        title: "Awal Cerita",
        descriptionGroom: "Kami sempat dekat dan saling jatuh cinta. Tapi waktu berkata lain — hubungan itu harus berakhir, dan kami memilih jalan masing-masing.",
        descriptionBride: "Aku masih ingat masa itu, masa muda yang penuh tawa dan rasa penasaran. Kami sempat bersama, tapi takdir membawa kami menjauh dengan cara yang lembut.",
        image: "images/story1.jpg",
        type: "meet"
      },
      {
        title: "Berjalan di Jalannya Masing-Masing",
        descriptionGroom: "Setelah perpisahan itu, aku mencoba fokus membangun hidup. Kadang terlintas kenangan, tapi aku biarkan waktu menyembuhkan.",
        descriptionBride: "Aku menikah, membangun keluarga, dan dikaruniai seorang putri yang manis. Enam tahun berlalu, penuh cerita, hingga akhirnya aku harus kembali berjalan sendiri.",
        image: "images/story2.jpg",
        type: "separate"
      },
      {
        title: "Pesan yang Tak Disangka",
        descriptionGroom: "Aku mengunggah foto di Instagram, mataku sedang luka. Tak pernah kuduga, pesan darinya masuk — menanyakan kabar. Dari satu pesan itu, percakapan panjang pun dimulai.",
        descriptionBride: "Aku melihat unggahannya, matanya tampak terluka. Tanpa pikir panjang, aku kirim pesan. Awalnya hanya basa-basi, tapi ternyata percakapan itu membuka banyak kenangan lama.",
        image: "images/story3.jpg",
        type: "reconnect"
      },
      {
        title: "Takdir Mempertemukan Lagi",
        descriptionGroom: "Dari obrolan itu aku tahu ia sudah berpisah. Ada perasaan yang pelan-pelan tumbuh lagi — hangat, tapi kali ini lebih matang. Rasanya seperti diberi kesempatan kedua.",
        descriptionBride: "Setelah sekian lama, kami kembali bicara dari hati ke hati. Rasanya berbeda, lebih tenang, lebih dewasa. Seperti takdir ingin kami menulis bab baru bersama.",
        image: "images/story4.jpg",
        type: "reunion"
      },
      {
        title: "Keyakinan yang Sama",
        descriptionGroom: "Kini aku yakin — perasaan ini bukan sekadar nostalgia. Aku ingin menjaganya, membangun rumah yang dulu sempat tertunda.",
        descriptionBride: "Aku pun yakin, kali ini bukan tentang kembali ke masa lalu. Ini tentang melangkah bersama, dengan hati yang sudah sama-sama belajar banyak.",
        image: "images/story5.jpg",
        type: "proposal"
      }
    ];
    this.init();
  }

  init() {
    this.createStorySection();
    setTimeout(() => {
      this.initScrollReveal();
      this.setupImageLoading();
    }, 100);
  }

  createStorySection() {
    if (document.getElementById('story')) return;

    const section = document.createElement('section');
    section.id = 'story';
    section.className = 'py-1';
    section.style.background = 'linear-gradient(160deg, #2f3e46 0%, #52796f 50%, #84a98c 100%)';
    section.innerHTML = this.getStoryHTML();

    const content = document.getElementById('content');
    if (content) content.appendChild(section);
  }

  getStoryHTML() {
    return `
      <style>
        .story-section {
          position: relative;
          overflow: hidden;
        }

        .story-timeline {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 0;
        }

        .story-timeline::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          background: linear-gradient(to bottom, var(--hookers-green), var(--cambridge-blue), var(--ash-gray));
          border-radius: 2px;
        }

        .story-item {
          position: relative;
          margin-bottom: 6rem;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .story-item:nth-child(odd) {
          justify-content: flex-start;
        }

        .story-item:nth-child(even) {
          justify-content: flex-end;
        }

        .story-item-content {
          position: relative;
          width: calc(50% - 4rem);
          background: rgba(255, 255, 255, 0.95);
          border-radius: 25px;
          box-shadow: 
            0 15px 50px rgba(82, 121, 111, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          min-height: 500px;
        }

        .story-item:hover .story-item-content {
          transform: translateY(-10px);
          box-shadow: 
            0 25px 70px rgba(82, 121, 111, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .story-item::before {
          content: '';
          position: absolute;
          top: 50%;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          border: 4px solid white;
          z-index: 2;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .story-item:nth-child(odd)::before {
          right: calc(50% - 15px);
          transform: translateY(-50%);
        }

        .story-item:nth-child(even)::before {
          left: calc(50% - 15px);
          transform: translateY(-50%);
        }

        .story-image-container {
          position: relative;
          width: 100%;
          height: 50%;
          min-height: 250px;
          overflow: hidden;
          background: var(--ash-gray);
          transition: all 0.4s ease;
        }

        .story-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .story-item:hover .story-image {
          transform: scale(1.02);
        }

        .story-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
        }

        .story-content {
          padding: 2.5rem;
          height: 50%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .story-title {
          font-family: 'Playfair Display', serif;
          color: var(--dark-slate-gray);
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-align: center;
          position: relative;
        }

        .story-title::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 3px;
          background: linear-gradient(to right, var(--hookers-green), var(--cambridge-blue));
          border-radius: 2px;
        }

        .story-descriptions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 0;
        }

        .description-column {
          padding: 1.5rem;
          border-radius: 15px;
          background: rgba(132, 169, 140, 0.1);
          transition: all 0.3s ease;
        }

        .description-column:hover {
          background: rgba(132, 169, 140, 0.15);
          transform: translateY(-3px);
        }

        .description-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--hookers-green);
          margin-bottom: 1rem;
          text-align: center;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .description-title::before {
          content: '';
          width: 20px;
          height: 2px;
          background: var(--hookers-green);
        }

        .description-title::after {
          content: '';
          width: 20px;
          height: 2px;
          background: var(--hookers-green);
        }

        .description-text {
          color: var(--charcoal);
          font-family: 'Raleway', Roboto;
          line-height: 1.7;
          text-align: center;
          opacity: 0.9;
          margin-bottom: 0;
          font-size: 0.95rem;
        }

        .story-type-badge {
          position: absolute;
          top: 15px;
          right: 20px;
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 5px 15px rgba(82, 121, 111, 0.3);
          z-index: 2;
        }

        .image-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--ash-gray);
          color: var(--dark-slate-gray);
          font-family: 'Raleway', Roboto;
        }

        .image-loading::after {
          content: 'Memuat gambar...';
          font-size: 0.9rem;
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .story-timeline::before {
            left: 30px;
          }

          .story-item {
            justify-content: flex-start !important;
            padding-left: 60px;
          }

          .story-item-content {
            width: 100%;
            margin-left: 0;
          }

          .story-item::before {
            left: 15px !important;
            right: auto !important;
          }

          .story-descriptions {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .story-content {
            padding: 2rem 1.5rem;
          }

          .story-image-container {
            min-height: 200px;
          }

          .story-title {
            font-size: 1.5rem;
          }

          .description-column {
            padding: 1rem;
          }

          .description-title {
            font-size: 1rem;
          }

          .description-text {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 576px) {
          .story-timeline {
            padding: 3rem 0;
          }

          .story-item {
            padding-left: 50px;
            margin-bottom: 4rem;
          }

          .story-item-content {
            min-height: 450px;
          }

          .story-content {
            padding: 1.5rem 1rem;
          }

          .story-image-container {
            min-height: 180px;
          }

          .story-title {
            font-size: 1.3rem;
          }

          .story-type-badge {
            right: 15px;
            padding: 0.4rem 0.8rem;
            font-size: 0.7rem;
          }

          .description-column {
            padding: 0.8rem;
          }

          .description-title {
            font-size: 0.9rem;
          }

          .description-text {
            font-size: 0.85rem;
          }
        }
      </style>

      <section class="story-section">
        <div class="container">
          <h2 class="section-title" style="color: #d0d4d4ff;">
  Our Love Story
</h2>
          <div class="story-timeline">
            ${this.storyData.map((story, index) => this.getStoryItemHTML(story, index)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  getStoryItemHTML(story, index) {
    const typeLabels = {
      'meet': 'Pertemuan',
      'separate': 'Berpisah',
      'reconnect': 'Terhubung Kembali',
      'reunion': 'Bersatu Kembali',
      'proposal': 'Komitmen'
    };

    return `
      <div class="story-item reveal-item">
        <div class="story-item-content">
          <div class="story-type-badge">${typeLabels[story.type]}</div>
          <div class="story-image-container">
            <img src="${story.image}" 
                 alt="${story.title}" 
                 class="story-image" 
                 loading="lazy"
                 onerror="this.style.display='none'; this.parentElement.classList.add('image-loading');">
            <div class="story-image-overlay"></div>
          </div>
          <div class="story-content">
            <h3 class="story-title">${story.title}</h3>
            <div class="story-descriptions">
              <div class="description-column">
                <h4 class="description-title">Gifary</h4>
                <p class="description-text">${story.descriptionGroom}</p>
              </div>
              <div class="description-column">
                <h4 class="description-title">Sindy</h4>
                <p class="description-text">${story.descriptionBride}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupImageLoading() {
    // Handle image loading with Intersection Observer for better performance
    const images = document.querySelectorAll('.story-image');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
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
          cleanup: true,
          mobile: true
        });
      });
    }
  }

  // Method untuk cleanup jika diperlukan
  destroy() {
    const section = document.getElementById('story');
    if (section) {
      section.remove();
    }
  }
}
