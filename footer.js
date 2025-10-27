export class WeddingFooter {
  constructor() {
    this.init();
  }

  init() {
    this.createFooter();
  }

  createFooter() {
    if (document.getElementById('footer')) return;

    const footer = document.createElement('footer');
    footer.id = 'footer';
    footer.innerHTML = this.getFooterHTML();

    const content = document.getElementById('content');
    if (content) content.appendChild(footer);
  }

  getFooterHTML() {
    return `
      <style>
        .wedding-footer {
          background: linear-gradient(135deg, var(--charcoal) 0%, var(--dark-slate-gray) 100%);
          color: var(--white);
          padding: 4rem 0 2rem;
          position: relative;
          overflow: hidden;
        }

        .wedding-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            var(--cambridge-blue) 50%, 
            transparent 100%);
        }

        .footer-hearts {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .footer-heart {
          position: absolute;
          color: var(--cambridge-blue);
          font-size: 1rem;
          opacity: 0;
          animation: footerHeartFloat 8s ease-in-out infinite;
        }

        @keyframes footerHeartFloat {
          0% {
            transform: translateY(100px) scale(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
            transform: translateY(0) scale(1) rotate(180deg);
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        .footer-content {
          position: relative;
          z-index: 2;
        }

        .footer-couple {
          text-align: center;
          margin-bottom: 3rem;
        }

        .footer-initials {
          font-family: 'Great Vibes', cursive;
          font-size: 4rem;
          color: var(--gold);
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .footer-couple-name {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(45deg, var(--ash-gray), var(--white));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-wedding-date {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: var(--cambridge-blue);
          letter-spacing: 3px;
        }

        .footer-quote {
          font-family: 'Dancing Script', cursive;
          font-size: 1.8rem;
          text-align: center;
          margin: 3rem 0;
          color: var(--ash-gray);
          font-style: italic;
          position: relative;
          padding: 0 2rem;
        }

        .footer-quote::before,
        .footer-quote::after {
          content: '"';
          font-size: 3rem;
          color: var(--gold);
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }

        .footer-quote::before {
          left: 0;
        }

        .footer-quote::after {
          right: 0;
        }

        .footer-family {
          text-align: center;
          margin-bottom: 3rem;
        }

        .family-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: var(--gold);
          margin-bottom: 2rem;
          position: relative;
          display: inline-block;
        }

        .family-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background: linear-gradient(to right, var(--cambridge-blue), var(--ash-gray));
        }

        .family-names {
          display: flex;
          justify-content: center;
          gap: 4rem;
          flex-wrap: wrap;
        }

        .family-group {
          text-align: center;
        }

        .family-role {
          font-family: 'Roboto', sans-serif;
          font-size: 1rem;
          color: var(--cambridge-blue);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .family-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: var(--white);
          font-weight: 600;
        }

        .footer-contact {
          text-align: center;
          margin-bottom: 3rem;
        }

        .contact-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: var(--gold);
          margin-bottom: 1.5rem;
        }

        .contact-info {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-3px);
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .contact-details {
          text-align: left;
        }

        .contact-label {
          font-family: 'Roboto', sans-serif;
          font-size: 0.8rem;
          color: var(--cambridge-blue);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.2rem;
        }

        .contact-value {
          font-family: 'Roboto', sans-serif;
          font-size: 1rem;
          color: var(--white);
          font-weight: 500;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .footer-bottom::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .footer-copyright {
          font-family: 'Roboto', sans-serif;
          font-size: 0.9rem;
          color: var(--ash-gray);
          margin-bottom: 0.5rem;
        }

        .footer-made-with {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          color: var(--cambridge-blue);
          font-style: italic;
        }

        .heart-pulse {
          color: var(--gold);
          animation: heartPulse 1.5s ease-in-out infinite;
          display: inline-block;
        }

        @keyframes heartPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .wedding-footer {
            padding: 3rem 0 1.5rem;
          }

          .footer-initials {
            font-size: 3rem;
          }

          .footer-couple-name {
            font-size: 1.7rem;
          }

          .footer-wedding-date {
            font-size: 1.1rem;
            letter-spacing: 2px;
          }

          .footer-quote {
            font-size: 1.5rem;
            margin: 2rem 0;
          }

          .family-names {
            gap: 2rem;
          }

          .family-name {
            font-size: 1.1rem;
          }

          .contact-info {
            gap: 1rem;
          }

          .contact-item {
            padding: 0.8rem 1.2rem;
          }

          .contact-icon {
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }
        }

        @media (max-width: 576px) {
          .footer-initials {
            font-size: 2.5rem;
          }

          .footer-couple-name {
            font-size: 1.5rem;
          }

          .footer-wedding-date {
            font-size: 1rem;
          }

          .footer-quote {
            font-size: 1.3rem;
            padding: 0 1rem;
          }

          .family-names {
            flex-direction: column;
            gap: 1.5rem;
          }

          .contact-info {
            flex-direction: column;
            align-items: center;
          }

          .contact-item {
            width: 100%;
            max-width: 300px;
            justify-content: flex-start;
          }
        }
      </style>

      <footer class="wedding-footer">
        <div class="footer-hearts" id="footerHearts"></div>
        
        <div class="container footer-content">
          <!-- Couple Information -->
          <div class="footer-couple">
            <div class="footer-initials">G & S</div>
            <h3 class="footer-couple-name">Gifary & Sindy</h3>
            <p class="footer-wedding-date">27 JUNI 2026</p>
          </div>

          <!-- Wedding Quote -->
          <div class="footer-quote">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, 
            supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. 
            Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
            <br><small style="font-size: 1rem; margin-top: 1rem; display: block;">- QS. Ar-Rum: 21</small>
          </div>

          <!-- Family Information -->
          <div class="footer-family">
            <h4 class="family-title">Keluarga Yang Berbahagia</h4>
            <div class="family-names">
              <div class="family-group">
                <div class="family-role">Keluarga Mempelai Pria</div>
                <div class="family-name">Bapak Husen & Ibu Yuliawati</div>
              </div>
              <div class="family-group">
                <div class="family-role">Keluarga Mempelai Wanita</div>
                <div class="family-name">Bapak Apet & Ibu Dewi</div>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="footer-contact">
            <h4 class="contact-title">Untuk Informasi Lebih Lanjut</h4>
            <div class="contact-info">
              <div class="contact-item">
                <div class="contact-icon">
                  <i class="bi bi-telephone"></i>
                </div>
                <div class="contact-details">
                  <div class="contact-label">Telepon</div>
                  <div class="contact-value">+62 812-3456-7890</div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">
                  <i class="bi bi-whatsapp"></i>
                </div>
                <div class="contact-details">
                  <div class="contact-label">WhatsApp</div>
                  <div class="contact-value">+62 838-2925-8640</div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">
                  <i class="bi bi-envelope"></i>
                </div>
                <div class="contact-details">
                  <div class="contact-label">Email</div>
                  <div class="contact-value">gifarysetia10@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer Bottom -->
          <div class="footer-bottom">
            <p class="footer-copyright">
              © 2026 The Wedding Invitation Created By Gifary Setia Putra
            </p>
            <p class="footer-made-with">
              Made with <span class="heart-pulse">❤</span> for our special day
            </p>
          </div>
        </div>
      </footer>
    `;
  }

  createFloatingHearts() {
    const heartsContainer = document.getElementById('footerHearts');
    if (!heartsContainer) return;

    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('div');
      heart.className = 'footer-heart';
      heart.innerHTML = '❤';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDelay = `${Math.random() * 8}s`;
      heartsContainer.appendChild(heart);
    }
  }
}