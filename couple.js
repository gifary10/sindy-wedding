export class WeddingCouple {
  constructor(scrollReveal) {
    this.scrollReveal = scrollReveal;
    this.coupleData = {
      groom: {
        name: "Gifary",
        fullName: "Gifary Setia Putra",
        father: "Bapak Husen",
        mother: "Ibu Yuliawati",
        description: "Putra kedua dari Bapak Husen dan Ibu Yuliawati. Pendiam dan cuek, tapi selalu punya cara sederhana untuk menunjukkan perhatian. Suka main futsal dan menikmati waktu tenang bersama orang terdekat.",
        image: "images/groom.jpg",
        social: {
          instagram: "#",
          facebook: "#",
          twitter: "#"
        }
      },
      bride: {
        name: "Sindy",
        fullName: "Sindy Novia",
        father: "Bapak Apet",
        mother: "Ibu Dewi",
        description: "Putri pertama dari Bapak Apet dan Ibu Dewi. Ceria, hangat, dan penuh perhatian. Suka nonton drama dan selalu punya senyum yang bisa menenangkan hati.",
        image: "images/bride.jpg",
        social: {
          instagram: "#",
          facebook: "#",
          twitter: "#"
        }
      }
    };
    this.init();
  }

  init() {
    this.createCoupleSection();
    setTimeout(() => {
      this.initScrollReveal();
    }, 100);
  }

  createCoupleSection() {
    if (document.getElementById('couple')) return;

    const section = document.createElement('section');
    section.id = 'couple';
    section.className = 'py-5';
    section.style.background = 'linear-gradient(135deg, var(--white) 0%, var(--ash-gray) 100%)';
    section.innerHTML = this.getCoupleHTML();

    const content = document.getElementById('content');
    if (content) content.appendChild(section);
  }

  getCoupleHTML() {
    return `
      <style>
        .couple-section {
          position: relative;
          overflow: hidden;
        }

        .couple-hearts {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-heart {
          position: absolute;
          color: var(--hookers-green);
          font-size: 1.5rem;
          opacity: 0;
          animation: heartFloat 6s ease-in-out infinite;
        }

        @keyframes heartFloat {
          0% {
            transform: translateY(100px) scale(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
            transform: translateY(0) scale(1) rotate(180deg);
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        .couple-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 25px;
          padding: 3rem 2rem;
          box-shadow: 
            0 20px 60px rgba(82, 121, 111, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
        }

        .couple-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(to right, var(--hookers-green), var(--cambridge-blue), var(--ash-gray));
          border-radius: 4px 4px 0 0;
        }

        .couple-card:hover {
          transform: translateY(-10px);
          box-shadow: 
            0 30px 80px rgba(82, 121, 111, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .couple-image-container {
          position: relative;
          width: 200px;
          height: 200px;
          margin: 0 auto 2rem;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.1),
            0 5px 15px rgba(82, 121, 111, 0.3);
          border: 4px solid white;
          transition: all 0.4s ease;
        }

        .couple-card:hover .couple-image-container {
          transform: scale(1.05);
          box-shadow: 
            0 20px 45px rgba(0, 0, 0, 0.15),
            0 8px 25px rgba(82, 121, 111, 0.4);
        }

        .couple-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .couple-card:hover .couple-image {
          transform: scale(1.1);
        }

        .couple-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(82, 121, 111, 0.2), rgba(132, 169, 140, 0.2));
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .couple-card:hover .couple-image-overlay {
          opacity: 1;
        }

        .couple-name {
          color: var(--dark-slate-gray);
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-align: center;
          position: relative;
          display: inline-block;
        }

        .couple-name::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(to right, var(--hookers-green), var(--cambridge-blue));
          border-radius: 2px;
        }

        .couple-fullname {
          color: var(--hookers-green);
          font-family: 'Roboto', sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 1rem;
          text-align: center;
        }

        .couple-parents {
          color: var(--charcoal);
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-style: italic;
          margin-bottom: 1.5rem;
          text-align: center;
          opacity: 0.8;
        }

        .couple-description {
          color: var(--charcoal);
          font-family: 'Roboto', sans-serif;
          line-height: 1.7;
          text-align: center;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .couple-social {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: auto;
        }

        .social-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1.2rem;
        }

        .social-icon:hover {
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 8px 20px rgba(82, 121, 111, 0.4);
          color: white;
        }

        .couple-ornament {
          text-align: center;
          margin: 3rem 0;
          position: relative;
        }

        .couple-ornament::before,
        .couple-ornament::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .couple-ornament::before {
          left: calc(50% - 120px);
        }

        .couple-ornament::after {
          right: calc(50% - 120px);
        }

        .ornament-heart {
          color: var(--gold);
          font-size: 2.5rem;
          animation: heartBeat 2s ease-in-out infinite;
        }

        @keyframes heartBeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .couple-card {
            padding: 2rem 1.5rem;
            margin-bottom: 2rem;
          }

          .couple-image-container {
            width: 180px;
            height: 180px;
          }

          .couple-name {
            font-size: 1.8rem;
          }

          .couple-fullname {
            font-size: 1rem;
          }

          .couple-parents {
            font-size: 1.1rem;
          }

          .couple-ornament::before,
          .couple-ornament::after {
            width: 60px;
          }

          .couple-ornament::before {
            left: calc(50% - 80px);
          }

          .couple-ornament::after {
            right: calc(50% - 80px);
          }
        }

        @media (max-width: 576px) {
          .couple-card {
            padding: 1.5rem 1rem;
          }

          .couple-image-container {
            width: 150px;
            height: 150px;
          }

          .couple-name {
            font-size: 1.6rem;
          }

          .couple-ornament::before,
          .couple-ornament::after {
            width: 40px;
          }

          .couple-ornament::before {
            left: calc(50% - 60px);
          }

          .couple-ornament::after {
            right: calc(50% - 60px);
          }
        }
      </style>

      <section class="couple-section">
        <div class="couple-hearts" id="coupleHearts"></div>
        
        <div class="container">
          <h2 class="section-title">Mempelai</h2>
          <p class="text-center text-muted mb-5" style="font-size: 1rem; font-family: 'Roboto', sans-serif;">
            Di antara jutaan langkah yang pernah ditempuh, akhirnya dua hati ini menemukan rumahnya — dalam ikatan suci bernama pernikahan.
          </p>

          <div class="row justify-content-center">
            <!-- Mempelai Pria -->
            <div class="col-lg-5 col-md-6 mb-4">
              <div class="couple-card reveal-item">
                <div class="couple-image-container">
                  <img src="${this.coupleData.groom.image}" alt="${this.coupleData.groom.name}" class="couple-image">
                  <div class="couple-image-overlay"></div>
                </div>
                
                <h3 class="couple-name">${this.coupleData.groom.name}</h3>
                <p class="couple-fullname">${this.coupleData.groom.fullName}</p>
                <p class="couple-parents">Putra dari<br>${this.coupleData.groom.father} & ${this.coupleData.groom.mother}</p>
                <p class="couple-description">${this.coupleData.groom.description}</p>
                
                <div class="couple-social">
                  <a href="${this.coupleData.groom.social.instagram}" class="social-icon" target="_blank">
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a href="${this.coupleData.groom.social.facebook}" class="social-icon" target="_blank">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a href="${this.coupleData.groom.social.twitter}" class="social-icon" target="_blank">
                    <i class="bi bi-twitter"></i>
                  </a>
                </div>
              </div>
            </div>

            <!-- Heart Ornament -->
            <div class="col-lg-2 col-md-12 d-flex align-items-center justify-content-center my-4">
              <div class="couple-ornament">
                <div class="ornament-heart">❤</div>
              </div>
            </div>

            <!-- Mempelai Wanita -->
            <div class="col-lg-5 col-md-6 mb-4">
              <div class="couple-card reveal-item">
                <div class="couple-image-container">
                  <img src="${this.coupleData.bride.image}" alt="${this.coupleData.bride.name}" class="couple-image">
                  <div class="couple-image-overlay"></div>
                </div>
                
                <h3 class="couple-name">${this.coupleData.bride.name}</h3>
                <p class="couple-fullname">${this.coupleData.bride.fullName}</p>
                <p class="couple-parents">Putri dari<br>${this.coupleData.bride.father} & ${this.coupleData.bride.mother}</p>
                <p class="couple-description">${this.coupleData.bride.description}</p>
                
                <div class="couple-social">
                  <a href="${this.coupleData.bride.social.instagram}" class="social-icon" target="_blank">
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a href="${this.coupleData.bride.social.facebook}" class="social-icon" target="_blank">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a href="${this.coupleData.bride.social.twitter}" class="social-icon" target="_blank">
                    <i class="bi bi-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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

  createFloatingHearts() {
    const heartsContainer = document.getElementById('coupleHearts');
    if (!heartsContainer) return;

    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = '❤';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDelay = `${Math.random() * 6}s`;
      heartsContainer.appendChild(heart);
    }
  }
}