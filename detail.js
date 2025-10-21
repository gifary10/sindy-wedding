// detail.js - Event Details - OPTIMIZED
class EventDetails {
  constructor() {
    this.events = [
      {
        id: 'akad',
        title: 'Akad Nikah',
        date: 'Sabtu, 27 Juni 2026',
        time: '10:00 - 11:00 WIB',
        location: 'Soedirman Convention Centre',
        address: 'Jl. Raya Batujajar No.247, Batujajar Bar., Kec. Batujajar, Kabupaten Bandung Barat, Jawa Barat 40561',
        description: 'Prosesi akad nikah akan dilaksanakan dengan khidmat di Ballroom A Soedirman Convention Centre',
        dressCode: 'Formal Muslim',
        mapLink: 'https://maps.google.com/?q=Soedirman+Convention+Centre,Batujajar',
        calendarLink: '#'
      },
      {
        id: 'resepsi',
        title: 'Resepsi Pernikahan',
        date: 'Sabtu, 27 Juni 2026',
        time: '12:00 - 16:00 WIB',
        location: 'Soedirman Convention Centre',
        address: 'Jl. Raya Batujajar No.247, Batujajar Bar., Kec. Batujajar, Kabupaten Bandung Barat, Jawa Barat 40561',
        description: 'Syukuran pernikahan dan silaturahmi dengan keluarga dan sahabat di Grand Ballroom',
        dressCode: 'Formal / Semi Formal',
        mapLink: 'https://maps.google.com/?q=Soedirman+Convention+Centre,Batujajar',
        calendarLink: '#'
      }
    ];
    this.init();
  }

  init() {
    try {
      this.createEventsSection();
      this.setupEventListeners();
    } catch (error) {
      console.error('Error initializing event details:', error);
    }
  }

  createEventsSection() {
    const section = document.createElement('section');
    section.id = 'details';
    section.className = 'events-section';
    section.setAttribute('data-aos', 'fade-up');

    section.innerHTML = `
      <div class="container">
        <h2 class="title">Detail Acara</h2>
        <p class="section-subtitle">Dengan segala kerendahan hati, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami</p>
        
        <div class="events-container">
          ${this.events.map(event => this.createEventCard(event)).join('')}
        </div>

        <!-- Venue Highlight -->
        <div class="venue-highlight" data-aos="fade-up">
          <div class="venue-content">
            <div class="venue-info">
              <h3>Soedirman Convention Centre</h3>
              <p>Sebagai venue eksklusif di Bandung Barat, Soedirman Convention Centre menyediakan fasilitas lengkap dan nyaman untuk menyelenggarakan acara pernikahan kami. Dengan kapasitas yang luas, parkir yang memadai, dan akses yang mudah, kami memilih venue ini untuk memberikan pengalaman terbaik bagi tamu undangan.</p>
              <div class="venue-features">
                <div class="feature-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Ballroom mewah dan elegan</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Parkir luas untuk 300+ kendaraan</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Akses mudah dari tol Pasteur</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check-circle"></i>
                  <span>Fasilitas AC dan sound system lengkap</span>
                </div>
              </div>
            </div>
            <div class="venue-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.1076345299734!2d107.48961978885498!3d-6.9155748000000035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e5465d772635%3A0xadf1c17b55b1d366!2sSoedirman%20Convention%20Centre!5e1!3m2!1sen!2sid!4v1761030302706!5m2!1sen!2sid" 
                width="100%" 
                height="300" 
                style="border:0; border-radius: 10px;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="additional-info" data-aos="fade-up">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-tshirt"></i>
              </div>
              <div class="info-content">
                <h4>Dress Code</h4>
                <p>Formal / Semi Formal dengan nuansa pastel</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-gift"></i>
              </div>
              <div class="info-content">
                <h4>Hadiah</h4>
                <p>Kehadiran Anda adalah hadiah terbaik bagi kami</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-parking"></i>
              </div>
              <div class="info-content">
                <h4>Parkir</h4>
                <p>Tersedia area parkir yang luas dan aman</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-utensils"></i>
              </div>
              <div class="info-content">
                <h4>Katering</h4>
                <p>Menu halal dengan variasi makanan Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('content').appendChild(section);
    this.addStyles();
  }

  createEventCard(event) {
    return `
      <div class="event-card" data-aos="flip-up" data-event="${event.id}">
        <div class="event-header">
          <h3 class="event-title">${event.title}</h3>
          <div class="event-icon">
            <i class="fas ${event.id === 'akad' ? 'fa-mosque' : 'fa-glass-cheers'}"></i>
          </div>
        </div>
        
        <div class="event-details">
          <div class="detail-item">
            <i class="fas fa-calendar-alt"></i>
            <span>${event.date}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-clock"></i>
            <span>${event.time}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <strong>${event.location}</strong>
              <p>${event.address}</p>
            </div>
          </div>
          <div class="detail-item">
            <i class="fas fa-info-circle"></i>
            <span>${event.description}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-tshirt"></i>
            <span><strong>Dress Code:</strong> ${event.dressCode}</span>
          </div>
        </div>

        <div class="event-actions">
          <button class="btn-map" onclick="eventDetails.openMap('${event.mapLink}')">
            <i class="fas fa-map"></i>
            Lihat Peta
          </button>
          <button class="btn-calendar" onclick="eventDetails.addToCalendar('${event.id}')">
            <i class="fas fa-calendar-plus"></i>
            Tambah ke Kalender
          </button>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    // Map buttons
    const mapButtons = document.querySelectorAll('.btn-map');
    mapButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const eventId = button.closest('.event-card').dataset.event;
        const event = this.events.find(ev => ev.id === eventId);
        if (event) {
          this.openMap(event.mapLink);
        }
      });
    });

    // Calendar buttons
    const calendarButtons = document.querySelectorAll('.btn-calendar');
    calendarButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const eventId = button.closest('.event-card').dataset.event;
        this.addToCalendar(eventId);
      });
    });

    // Card click effects
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.event-actions')) {
          card.classList.toggle('expanded');
        }
      });
    });
  }

  openMap(mapLink) {
    if (mapLink && mapLink !== '#') {
      window.open(mapLink, '_blank', 'noopener,noreferrer');
    } else {
      this.showNotification('Tautan peta belum tersedia', 'info');
    }
  }

  addToCalendar(eventId) {
    const event = this.events.find(ev => ev.id === eventId);
    if (!event) return;

    // Create calendar event data
    const startDate = event.id === 'akad' 
      ? new Date('2026-06-27T10:00:00+07:00')
      : new Date('2026-06-27T12:00:00+07:00');
    
    const endDate = event.id === 'akad'
      ? new Date('2026-06-27T11:00:00+07:00')
      : new Date('2026-06-27T16:00:00+07:00');

    const calendarData = {
      title: `Pernikahan ${event.title} - Gifary & Sindy`,
      description: `${event.description}\\n\\nLokasi: ${event.location}\\nAlamat: ${event.address}`,
      location: event.location,
      start: startDate,
      end: endDate
    };

    // Generate Google Calendar URL
    const googleCalendarUrl = this.generateGoogleCalendarUrl(calendarData);
    
    // Open calendar in new tab
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
    
    this.showNotification('Acara telah ditambahkan ke Google Calendar', 'success');
  }

  generateGoogleCalendarUrl(data) {
    const formatDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: data.title,
      details: data.description,
      location: data.location,
      dates: `${formatDate(data.start)}/${formatDate(data.end)}`
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .events-section {
        padding: 80px 20px;
        background: linear-gradient(180deg, rgba(233,241,234,0.7) 0%, rgba(255,255,255,0.9) 100%);
      }

      .section-subtitle {
        text-align: center;
        color: var(--muted);
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.1rem;
        margin-bottom: 50px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
      }

      .events-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 30px;
        max-width: 1000px;
        margin: 0 auto 60px;
      }

      .event-card {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(138, 168, 143, 0.2);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(33, 44, 38, 0.08);
        transition: all 0.3s ease;
        cursor: pointer;
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
        background: linear-gradient(90deg, var(--sage), var(--sage-dark));
      }

      .event-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(33, 44, 38, 0.12);
      }

      .event-card.expanded {
        transform: scale(1.02);
      }

      .event-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
      }

      .event-title {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        color: var(--sage-dark);
        margin: 0;
        font-weight: 600;
      }

      .event-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
      }

      .event-details {
        space-y: 15px;
      }

      .detail-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 15px;
        padding: 12px;
        background: rgba(138, 168, 143, 0.05);
        border-radius: 10px;
        transition: all 0.3s ease;
      }

      .detail-item:hover {
        background: rgba(138, 168, 143, 0.1);
        transform: translateX(5px);
      }

      .detail-item i {
        color: var(--sage-dark);
        margin-top: 2px;
        min-width: 16px;
      }

      .detail-item span,
      .detail-item div {
        font-family: 'Quicksand', sans-serif;
        color: var(--charcoal);
        line-height: 1.5;
      }

      .detail-item strong {
        color: var(--sage-dark);
        font-weight: 600;
      }

      .detail-item p {
        margin: 5px 0 0 0;
        color: var(--muted);
        font-size: 0.9rem;
      }

      .event-actions {
        display: flex;
        gap: 12px;
        margin-top: 25px;
        flex-wrap: wrap;
      }

      .btn-map,
      .btn-calendar {
        flex: 1;
        min-width: 140px;
        padding: 12px 20px;
        border: none;
        border-radius: 25px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 0.9rem;
      }

      .btn-map {
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
      }

      .btn-map:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(138, 168, 143, 0.3);
      }

      .btn-calendar {
        background: rgba(138, 168, 143, 0.1);
        color: var(--sage-dark);
        border: 1px solid rgba(138, 168, 143, 0.3);
      }

      .btn-calendar:hover {
        background: var(--sage-dark);
        color: white;
        transform: translateY(-2px);
      }

      /* Venue Highlight */
      .venue-highlight {
        max-width: 1000px;
        margin: 60px auto;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 15px 35px rgba(33, 44, 38, 0.08);
        border: 1px solid rgba(138, 168, 143, 0.2);
      }

      .venue-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        align-items: start;
      }

      .venue-info h3 {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        color: var(--sage-dark);
        margin-bottom: 20px;
        font-weight: 600;
      }

      .venue-info p {
        font-family: 'Quicksand', sans-serif;
        color: var(--charcoal);
        line-height: 1.6;
        margin-bottom: 25px;
      }

      .venue-features {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .feature-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: rgba(138, 168, 143, 0.05);
        border-radius: 8px;
        font-family: 'Quicksand', sans-serif;
        color: var(--charcoal);
      }

      .feature-item i {
        color: var(--sage-dark);
      }

      .venue-map {
        height: 100%;
      }

      .venue-map iframe {
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(33, 44, 38, 0.1);
      }

      /* Additional Info */
      .additional-info {
        max-width: 1000px;
        margin: 0 auto;
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
      }

      .info-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        border: 1px solid rgba(138, 168, 143, 0.2);
        transition: all 0.3s ease;
      }

      .info-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(33, 44, 38, 0.1);
      }

      .info-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
      }

      .info-content h4 {
        font-family: 'Quicksand', sans-serif;
        color: var(--sage-dark);
        margin: 0 0 5px 0;
        font-weight: 600;
      }

      .info-content p {
        font-family: 'Quicksand', sans-serif;
        color: var(--muted);
        margin: 0;
        font-size: 0.9rem;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .events-container {
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .event-card {
          padding: 25px;
        }

        .event-actions {
          flex-direction: column;
        }

        .btn-map,
        .btn-calendar {
          min-width: auto;
        }

        .venue-content {
          grid-template-columns: 1fr;
          gap: 30px;
        }

        .venue-highlight {
          padding: 30px;
          margin: 40px auto;
        }

        .info-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 480px) {
        .event-header {
          flex-direction: column;
          gap: 15px;
          text-align: center;
        }

        .event-title {
          font-size: 1.3rem;
        }

        .venue-highlight {
          padding: 20px;
        }

        .info-item {
          padding: 15px;
        }
      }
    `;

    if (!document.querySelector('style[data-events]')) {
      style.setAttribute('data-events', 'true');
      document.head.appendChild(style);
    }
  }
}

// Initialize event details
const eventDetails = new EventDetails();