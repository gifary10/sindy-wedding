export class WeddingDetails {
  constructor(scrollReveal) {
    this.scrollReveal = scrollReveal;
    this.detailsData = {
      akad: {
        title: "Akad Nikah",
        date: "Sabtu, 27 Juni 2026",
        time: "08:00 - 10:00 WIB",
        location: "Pondok D'Queen Warung Pulus Batujajar",
        address: "Jl. Warung Pulus, Batujajar Bar., Kec. Batujajar, Kabupaten Bandung Barat, Jawa Barat 40561",
        mapUrl: "https://maps.app.goo.gl/mUEnkaq3g92xXtV26",
        description: "Prosesi akad nikah akan dilaksanakan di Pondok D'Queen Warung Pulus Batujajar dengan dihadiri oleh keluarga dan kerabat dekat."
      },
      resepsi: {
        title: "Resepsi Pernikahan",
        date: "Sabtu, 27 Juni 2026",
        time: "11:00 - 15:00 WIB",
        location: "Pondok D'Queen Warung Pulus Batujajar",
        address: "Jl. Warung Pulus, Batujajar Bar., Kec. Batujajar, Kabupaten Bandung Barat, Jawa Barat 40561",
        mapUrl: "https://maps.app.goo.gl/mUEnkaq3g92xXtV26",
        description: "Resepsi pernikahan akan dilanjutkan di Pondok D'Queen Warung Pulus Batujajar. Kami menantikan kehadiran Bapak/Ibu/Saudara/i."
      }
    };
    this.countdownDate = new Date('June 27, 2026 08:00:00').getTime();
    this.init();
  }

  init() {
    this.createDetailsSection();
    this.startCountdown();
    setTimeout(() => {
      this.initScrollReveal();
    }, 100);
  }

  createDetailsSection() {
    if (document.getElementById('details')) return;

    const section = document.createElement('section');
    section.id = 'details';
    section.className = 'py-5';
    section.style.background = 'linear-gradient(135deg, var(--white) 0%, var(--ash-gray) 100%)';
    section.innerHTML = this.getDetailsHTML();

    const content = document.getElementById('content');
    if (content) content.appendChild(section);
  }

  getDetailsHTML() {
    return `
      <style>
        .details-section {
          position: relative;
          overflow: hidden;
        }

        .countdown-container {
          background: linear-gradient(135deg, var(--hookers-green), var(--dark-slate-gray));
          border-radius: 25px;
          padding: 3rem 2rem;
          margin-bottom: 4rem;
          box-shadow: 
            0 20px 60px rgba(82, 121, 111, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .countdown-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.1;
        }

        .countdown-title {
          font-family: 'Playfair Display', serif;
          color: white;
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .countdown-timer {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .countdown-item {
          text-align: center;
          min-width: 100px;
        }

        .countdown-number {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 700;
          color: var(--gold);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .countdown-label {
          font-family: 'Roboto', sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .event-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 25px;
          padding: 3rem 2.5rem;
          box-shadow: 
            0 20px 60px rgba(82, 121, 111, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .event-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(to right, var(--hookers-green), var(--cambridge-blue), var(--ash-gray));
          border-radius: 4px 4px 0 0;
        }

        .event-card:hover {
          transform: translateY(-10px);
          box-shadow: 
            0 30px 80px rgba(82, 121, 111, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .event-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          box-shadow: 
            0 10px 30px rgba(82, 121, 111, 0.3),
            0 5px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
        }

        .event-card:hover .event-icon {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 
            0 15px 40px rgba(82, 121, 111, 0.4),
            0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .event-icon i {
          font-size: 2rem;
          color: white;
        }

        .event-title {
          font-family: 'Playfair Display', serif;
          color: var(--dark-slate-gray);
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-align: center;
          position: relative;
        }

        .event-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(to right, var(--hookers-green), var(--cambridge-blue));
          border-radius: 2px;
        }

        .event-info {
          margin-bottom: 2rem;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 1.2rem;
          padding: 1rem;
          background: rgba(132, 169, 140, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .info-item:hover {
          background: rgba(132, 169, 140, 0.15);
          transform: translateX(5px);
        }

        .info-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .info-icon i {
          font-size: 1.2rem;
          color: white;
        }

        .info-content {
          flex: 1;
        }

        .info-label {
          font-family: 'Roboto', sans-serif;
          font-size: 0.9rem;
          color: var(--hookers-green);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.3rem;
        }

        .info-value {
          font-family: 'Roboto', sans-serif;
          color: var(--charcoal);
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.4;
        }

        .event-description {
          color: var(--charcoal);
          font-family: 'Roboto', sans-serif;
          line-height: 1.7;
          text-align: center;
          opacity: 0.9;
          margin-bottom: 2rem;
          font-style: italic;
        }

        .btn-map {
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-width: 200px;
          box-shadow: 0 8px 25px rgba(82, 121, 111, 0.3);
        }

        .btn-map:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(82, 121, 111, 0.4);
          color: white;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .countdown-container {
            padding: 2rem 1.5rem;
            margin-bottom: 3rem;
          }

          .countdown-title {
            font-size: 1.8rem;
          }

          .countdown-timer {
            gap: 1.5rem;
          }

          .countdown-item {
            min-width: 80px;
          }

          .countdown-number {
            font-size: 2.5rem;
          }

          .event-card {
            padding: 2.5rem 2rem;
            margin-bottom: 2rem;
          }

          .event-icon {
            width: 70px;
            height: 70px;
            margin-bottom: 1.5rem;
          }

          .event-icon i {
            font-size: 1.8rem;
          }

          .event-title {
            font-size: 1.7rem;
          }
        }

        @media (max-width: 576px) {
          .countdown-container {
            padding: 1.5rem 1rem;
          }

          .countdown-title {
            font-size: 1.5rem;
          }

          .countdown-timer {
            gap: 1rem;
          }

          .countdown-item {
            min-width: 70px;
          }

          .countdown-number {
            font-size: 2rem;
          }

          .countdown-label {
            font-size: 0.8rem;
          }

          .event-card {
            padding: 2rem 1.5rem;
          }

          .event-icon {
            width: 60px;
            height: 60px;
          }

          .event-icon i {
            font-size: 1.5rem;
          }

          .event-title {
            font-size: 1.5rem;
          }

          .info-item {
            padding: 0.8rem;
          }

          .info-icon {
            width: 35px;
            height: 35px;
            margin-right: 0.8rem;
          }

          .info-icon i {
            font-size: 1rem;
          }

          .btn-map {
            padding: 0.9rem 1.8rem;
            min-width: 180px;
          }
        }
      </style>

      <section class="details-section">
        <div class="container">
          <h2 class="section-title">Detail Acara</h2>
          <p class="text-center text-muted mb-5" style="font-size: 1.1rem; font-family: 'Roboto', sans-serif;">
           Dengan penuh syukur dan kerendahan hati, kami berharap kehadiran Bapak/Ibu/Saudara/i untuk menyaksikan awal perjalanan baru kami dalam ikatan pernikahan.
          </p>

          <!-- Countdown Timer -->
          <div class="countdown-container reveal-item">
            <h3 class="countdown-title">Menuju Hari Bahagia</h3>
            <div class="countdown-timer" id="countdownTimer">
              <div class="countdown-item">
                <div class="countdown-number" id="days">00</div>
                <div class="countdown-label">Hari</div>
              </div>
              <div class="countdown-item">
                <div class="countdown-number" id="hours">00</div>
                <div class="countdown-label">Jam</div>
              </div>
              <div class="countdown-item">
                <div class="countdown-number" id="minutes">00</div>
                <div class="countdown-label">Menit</div>
              </div>
              <div class="countdown-item">
                <div class="countdown-number" id="seconds">00</div>
                <div class="countdown-label">Detik</div>
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <!-- Akad Nikah -->
            <div class="col-lg-5 col-md-6 mb-4">
              <div class="event-card reveal-item">
                <div class="event-icon">
                  <i class="bi bi-heart-fill"></i>
                </div>
                
                <h3 class="event-title">${this.detailsData.akad.title}</h3>
                
                <div class="event-info">
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="bi bi-calendar"></i>
                    </div>
                    <div class="info-content">
                      <div class="info-label">Tanggal</div>
                      <div class="info-value">${this.detailsData.akad.date}</div>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="bi bi-clock"></i>
                    </div>
                    <div class="info-content">
                      <div class="info-label">Waktu</div>
                      <div class="info-value">${this.detailsData.akad.time}</div>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="bi bi-geo-alt"></i>
                    </div>
                    <div class="info-content">
                      <div class="info-label">Lokasi</div>
                      <div class="info-value">${this.detailsData.akad.location}</div>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="bi bi-pin-map"></i>
                    </div>
                    <div class="info-content">
                      <div class="info-label">Alamat</div>
                      <div class="info-value">${this.detailsData.akad.address}</div>
                    </div>
                  </div>
                </div>

                <p class="event-description">${this.detailsData.akad.description}</p>
                
                <div class="text-center">
                  <a href="${this.detailsData.akad.mapUrl}" class="btn btn-map" target="_blank">
                    <i class="bi bi-map"></i> Lihat di Peta
                  </a>
                </div>
              </div>
            </div>

            <!-- Resepsi -->
            <div class="col-lg-5 col-md-6 mb-4">
              <div class="event-card reveal-item">
                <div class="event-icon">
                  <i class="bi bi-people-fill"></i>
                </div>
                
                <h3 class="event-title">${this.detailsData.resepsi.title}</h3>
                
                <div class="event-info">
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="bi bi-calendar"></i>
                    </div>
                    <div class="info-content">
                      <div class="info-label">Tanggal</div>
                      <div class="info-value">${this.detailsData.resepsi.date}</div>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="bi bi-clock"></i>
                    </div>
                    <div class="info-content">
                      <div class="info-label">Waktu</div>
                      <div class="info-value">${this.detailsData.resepsi.time}</div>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="bi bi-geo-alt"></i>
                    </div>
                    <div class="info-content">
                      <div class="info-label">Lokasi</div>
                      <div class="info-value">${this.detailsData.resepsi.location}</div>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="bi bi-pin-map"></i>
                    </div>
                    <div class="info-content">
                      <div class="info-label">Alamat</div>
                      <div class="info-value">${this.detailsData.resepsi.address}</div>
                    </div>
                  </div>
                </div>

                <p class="event-description">${this.detailsData.resepsi.description}</p>
                
                <div class="text-center">
                  <a href="${this.detailsData.resepsi.mapUrl}" class="btn btn-map" target="_blank">
                    <i class="bi bi-map"></i> Lihat di Peta
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  startCountdown() {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = this.countdownDate - now;

      if (distance < 0) {
        document.getElementById('countdownTimer').innerHTML = '<div class="text-white text-center w-100"><h4>Acara Sudah Berlangsung!</h4></div>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
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