export class WeddingStory {
  constructor(scrollReveal) {
    this.scrollReveal = scrollReveal;
    this.storyData = [
      {
        year: "2018",
        title: "Awal Cerita",
        descriptionGroom: "Kami sempat dekat dan saling jatuh cinta. Tapi waktu berkata lain — hubungan itu harus berakhir, dan kami memilih jalan masing-masing.",
        descriptionBride: "Aku masih ingat masa itu, masa muda yang penuh tawa dan rasa penasaran. Kami sempat bersama, tapi takdir membawa kami menjauh dengan cara yang lembut.",
        image: "images/story1.jpg",
        type: "meet"
      },
      {
        year: "2019 - 2024",
        title: "Berjalan di Jalannya Masing-Masing",
        descriptionGroom: "Setelah perpisahan itu, aku mencoba fokus membangun hidup. Kadang terlintas kenangan, tapi aku biarkan waktu menyembuhkan.",
        descriptionBride: "Aku menikah, membangun keluarga, dan dikaruniai seorang putri yang manis. Enam tahun berlalu, penuh cerita, hingga akhirnya aku harus kembali berjalan sendiri.",
        image: "images/story2.jpg",
        type: "separate"
      },
      {
        year: "2024",
        title: "Pesan yang Tak Disangka",
        descriptionGroom: "Aku mengunggah foto di Instagram, mataku sedang luka. Tak pernah kuduga, pesan darinya masuk — menanyakan kabar. Dari satu pesan itu, percakapan panjang pun dimulai.",
        descriptionBride: "Aku melihat unggahannya, matanya tampak terluka. Tanpa pikir panjang, aku kirim pesan. Awalnya hanya basa-basi, tapi ternyata percakapan itu membuka banyak kenangan lama.",
        image: "images/story3.jpg",
        type: "reconnect"
      },
      {
        year: "2025",
        title: "Takdir Mempertemukan Lagi",
        descriptionGroom: "Dari obrolan itu aku tahu ia sudah berpisah. Ada perasaan yang pelan-pelan tumbuh lagi — hangat, tapi kali ini lebih matang. Rasanya seperti diberi kesempatan kedua.",
        descriptionBride: "Setelah sekian lama, kami kembali bicara dari hati ke hati. Rasanya berbeda, lebih tenang, lebih dewasa. Seperti takdir ingin kami menulis bab baru bersama.",
        image: "images/story4.jpg",
        type: "reunion"
      },
      {
        year: "2025",
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
    }, 100);
  }

  createStorySection() {
    if (document.getElementById('story')) return;

    const section = document.createElement('section');
    section.id = 'story';
    section.className = 'py-5';
    section.style.background = 'linear-gradient(135deg, var(--ash-gray) 0%, var(--white) 100%)';
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
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 25px;
          box-shadow: 
            0 15px 50px rgba(82, 121, 111, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

        .story-year {
          position: absolute;
          top: -30px;
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--dark-slate-gray);
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .story-item:nth-child(odd) .story-year {
          right: calc(50% + 3rem);
        }

        .story-item:nth-child(even) .story-year {
          left: calc(50% + 3rem);
        }

        .story-image-container {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 1.5rem;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.15),
            0 5px 15px rgba(82, 121, 111, 0.3);
          border: 4px solid white;
          transition: all 0.4s ease;
        }

        .story-item:hover .story-image-container {
          transform: scale(1.1);
          box-shadow: 
            0 15px 40px rgba(0, 0, 0, 0.2),
            0 8px 25px rgba(82, 121, 111, 0.4);
        }

        .story-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .story-item:hover .story-image {
          transform: scale(1.15);
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
          font-family: 'Roboto', sans-serif;
          line-height: 1.7;
          text-align: center;
          opacity: 0.9;
          margin-bottom: 0;
          font-size: 0.95rem;
        }

        .story-type-badge {
          position: absolute;
          top: -15px;
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

          .story-year {
            left: 80px !important;
            right: auto !important;
          }

          .story-descriptions {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .story-item-content {
            padding: 2rem 1.5rem;
          }

          .story-image-container {
            width: 100px;
            height: 100px;
          }

          .story-title {
            font-size: 1.5rem;
          }

          .story-year {
            font-size: 1.3rem;
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
            padding: 1.5rem 1rem;
          }

          .story-image-container {
            width: 80px;
            height: 80px;
          }

          .story-title {
            font-size: 1.3rem;
          }

          .story-year {
            font-size: 1.1rem;
            left: 70px !important;
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
          <h2 class="section-title">Our Love Story</h2>
          <p class="text-center text-muted mb-5" style="font-size: 1rem; font-family: 'Roboto', sans-serif;">
  “Tak ada yang kebetulan dalam perjalanan ini. Setiap pertemuan, jarak, dan waktu yang memisahkan hanyalah cara Tuhan mempersiapkan hati kami untuk bersatu di waktu terbaik-Nya.”
</p>


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
        <div class="story-year">${story.year}</div>
        <div class="story-item-content">
          <div class="story-type-badge">${typeLabels[story.type]}</div>
          <div class="story-image-container">
            <img src="${story.image}" alt="${story.title}" class="story-image">
          </div>
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
}
