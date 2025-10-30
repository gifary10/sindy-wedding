export class WeddingDetails {
  constructor(scrollReveal) {
    this.scrollReveal = scrollReveal;
    this.detailsData = {
      location: "Pondok D'Queen Warung Pulus Batujajar",
      address: "Jl. Warung Pulus, Batujajar Bar., Kec. Batujajar, Kabupaten Bandung Barat, Jawa Barat 40561",
      mapUrl: "https://maps.app.goo.gl/mUEnkaq3g92xXtV26",
      events: [
        {
          title: "Akad Nikah",
          date: "Sabtu, 27 Juni 2026",
          time: "08:00 - 10:00 WIB",
          description: "Gunakan dress code nuansa putih atau krem, melambangkan kesucian dan ketulusan dalam prosesi akad nikah yang dihadiri oleh keluarga dan kerabat dekat.",
          icon: "bi-heart-fill"
        },
        {
          title: "Resepsi Pernikahan",
          date: "Sabtu, 27 Juni 2026", 
          time: "11:00 - 15:00 WIB",
          description: "Gunakan dress code nuansa sage, menghadirkan kesan tenang, elegan, dan harmonis pada acara resepsi. Kami menantikan kehadiran Bapak/Ibu/Saudara/i.",
          icon: "bi-people-fill"
        }
      ]
    };
    this.init();
  }

  init() {
    this.createDetailsSection();
    setTimeout(() => {
      this.initScrollReveal();
    }, 100);
  }

  createDetailsSection() {
    if (document.getElementById('details')) return;

    const section = document.createElement('section');
    section.id = 'details';
    section.className = 'py-1';
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

        .event-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 15px;
          padding: 1rem 1rem;
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

        .event-header {
          text-align: center;
          margin-bottom: 3rem;
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
          font-size: 1.8rem;
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

        .events-timeline {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3rem;
          position: relative;
        }

        .events-timeline::before {
          content: '';
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 2px;
          background: linear-gradient(90deg, var(--hookers-green), var(--cambridge-blue));
          border-radius: 1px;
        }

        .event-timeline-item {
          text-align: center;
          flex: 1;
          position: relative;
        }

        .event-timeline-item::before {
          content: '';
          position: absolute;
          top: 35px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          border: 3px solid white;
          box-shadow: 0 3px 10px rgba(82, 121, 111, 0.3);
          z-index: 2;
        }

        .event-time {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--hookers-green);
          margin-bottom: 2rem;
        }

        .event-label {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          color: var(--dark-slate-gray);
          font-weight: 600;
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
          font-family: 'Raleway', Roboto;
          font-size: 0.9rem;
          color: var(--hookers-green);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.3rem;
        }

        .info-value {
          font-family: 'Raleway', Roboto;
          color: var(--charcoal);
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.4;
        }

        .event-description {
          color: var(--charcoal);
          font-family: 'Raleway', Roboto;
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

      </style>

      <section class="details-section">
        <div class="container">
          <h2 class="section-title">Detail Acara</h2>
          <p class="text-center text-muted mb-5" style="font-size: 1.1rem; font-family: 'Raleway', Roboto;">
           Dengan penuh syukur dan kerendahan hati, kami berharap kehadiran Bapak/Ibu/Saudara/i untuk menyaksikan awal perjalanan baru kami dalam ikatan pernikahan.
          </p>

          <div class="row justify-content-center">
            <!-- Single Combined Event Card -->
            <div class="col-lg-8 col-md-10 mb-4">
              <div class="event-card reveal-item">
                <div class="event-header">
                  <div class="event-icon">
                    <i class="bi bi-calendar-heart"></i>
                  </div>
                  <h3 class="event-title">Akad Nikah & Resepsi</h3>
                </div>
                
                <!-- Events Timeline -->
                <div class="events-timeline">
                  ${this.detailsData.events.map((event, index) => `
                    <div class="event-timeline-item">
                      <div class="event-time">${event.time}</div>
                      <div class="event-label">${event.title}</div>
                    </div>
                  `).join('')}
                </div>

                <div class="event-info">
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="bi bi-calendar"></i>
                    </div>
                    <div class="info-content">
                      <div class="info-label">Tanggal</div>
                      <div class="info-value">${this.detailsData.events[0].date}</div>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="bi bi-geo-alt"></i>
                    </div>
                    <div class="info-content">
                      <div class="info-label">Lokasi</div>
                      <div class="info-value">${this.detailsData.location}</div>
                    </div>
                  </div>
                  
                  <div class="info-item">
                    <div class="info-icon">
                      <i class="bi bi-pin-map"></i>
                    </div>
                    <div class="info-content">
                      <div class="info-label">Alamat</div>
                      <div class="info-value">${this.detailsData.address}</div>
                    </div>
                  </div>
                </div>

                <div class="event-descriptions">
                  ${this.detailsData.events.map(event => `
                    <div class="event-description">
                      <strong>${event.title}:</strong> ${event.description}
                    </div>
                  `).join('')}
                </div>
                
                <div class="text-center">
                  <a href="${this.detailsData.mapUrl}" class="btn btn-map" target="_blank">
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
