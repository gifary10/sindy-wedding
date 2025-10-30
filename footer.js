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
          font-size: 1.2rem;
          text-align: center;
          margin: 1rem;
          color: var(--ash-gray);
          font-style: italic;
          position: relative;

        }

        .gift-section {
          text-align: center;
          margin-bottom: 2rem;
          padding: 0 1rem;
        }

        .gift-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: var(--gold);
          margin-bottom: 1.5rem;
        }

        .gift-description {
          font-family: 'Raleway', Roboto;
          font-size: 1rem;
          color: var(--ash-gray);
          margin-bottom: 2rem;
          line-height: 1.6;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .gift-options {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .gift-option {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 1rem;
          text-align: center;
          transition: all 0.3s ease;
          max-width: 300px;
          flex: 1;
        }

        .gift-option:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-5px);
        }

        .gift-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          color: white;
          font-size: 1.5rem;
        }

        .gift-option-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          color: var(--white);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .gift-details {
          font-family: 'Raleway', Roboto;
          font-size: 0.9rem;
          color: var(--ash-gray);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .gift-info {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 1.5rem;
          margin-top: 2rem;
        }

        .gift-note {
          font-family: 'Raleway', Roboto;
          font-size: 0.9rem;
          color: var(--cambridge-blue);
          font-style: italic;
          line-height: 1.5;
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
          font-family: 'Raleway', Roboto;
          font-size: 0.9rem;
          color: var(--ash-gray);
          margin-bottom: 0.5rem;
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

          <!-- Gift Information -->
          <div class="gift-section">
            <h4 class="gift-title">Kirim Hadiah</h4>
            <p class="gift-description">
              Kehadiran dan doa Anda sudah merupakan hadiah terindah bagi kami. 
              Namun jika Anda ingin memberikan tanda kasih, berikut informasi yang dapat digunakan:
            </p>

            <div class="gift-options">
              <div class="gift-option">
                <div class="gift-icon">
                  <i class="bi bi-wallet2"></i>
                </div>
                <h5 class="gift-option-title">Transfer Bank</h5>
                <div class="gift-details">
                  <strong>Bank Mandiri</strong><br>
                  132 0014 594 320<br>
                  Gifary Setia Putra
                </div>
              </div>

              <div class="gift-option">
                <div class="gift-icon">
                  <i class="bi bi-phone"></i>
                </div>
                <h5 class="gift-option-title">E-Wallet</h5>
                <div class="gift-details">
                  <strong>DANA</strong><br>
                  0878 2872 0834<br>
                  Sindy Novia
                </div>
              </div>              
            </div>

            <div class="gift-info">
              <p class="gift-note">
                * Untuk konfirmasi transfer atau informasi lebih lanjut, silakan hubungi keluarga mempelai. 
                Terima kasih atas perhatian dan kasih sayangnya.
              </p>
            </div>
          </div>

          <!-- Footer Bottom -->
          <div class="footer-bottom">
            <p class="footer-copyright">
              © 2026 Wedding Invitation Created By Gifary
            </p>
          </div>
        </div>
      </footer>
    `;
  }
}
