// detail.js - Event Details - OPTIMIZED & FIXED
class EventDetails {
  constructor() {
    this.events = [
      {
        id: 'akad-resepsi',
        title: 'Akad Nikah & Resepsi',
        date: 'Sabtu, 27 Juni 2026',
        time: '10:00 - 16:00 WIB',
        location: 'Masjid Al-Ikhlas & Grand Ballroom Hotel Santika',
        address: 'Jl. Kemerdekaan No. 123, Jakarta Selatan',
        description: 'Prosesi akad nikah akan dilaksanakan dengan khidmat di Masjid Al-Ikhlas, dilanjutkan dengan syukuran pernikahan dan silaturahmi dengan keluarga dan sahabat',
        dressCode: 'Formal Muslim untuk Akad, Formal/Semi Formal untuk Resepsi',
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
      this.showErrorState();
    }
  }

  createEventsSection() {
    // Cek apakah section sudah ada
    if (document.getElementById('details')) return;

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

    const content = document.getElementById('content');
    if (content) {
      content.appendChild(section);
    } else {
      console.error('Content element not found');
      return;
    }

    this.addStyles();
  }

  createEventCard(event) {
    return `
      <div class="event-card" data-event="${event.id}">
        <div class="event-header">
          <h3 class="event-title">${event.title}</h3>
          <div class="event-icon">
            <i class="fas fa-glass-cheers"></i>
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
          <button class="btn-calendar" data-event="${event.id}">
            <i class="fas fa-calendar-plus"></i>
            Tambah ke Kalender
          </button>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    // Delegate events for better performance
    document.addEventListener('click', (e) => {
      // Calendar buttons
      if (e.target.closest('.btn-calendar')) {
        const button = e.target.closest('.btn-calendar');
        const eventId = button.dataset.event;
        this.addToCalendar(eventId);
        return;
      }

      // Card click effects
      if (e.target.closest('.event-card') && !e.target.closest('.event-actions')) {
        const card = e.target.closest('.event-card');
        card.classList.toggle('expanded');
      }
    });
  }

  addToCalendar(eventId) {
    const event = this.events.find(ev => ev.id === eventId);
    if (!event) {
      this.showNotification('Event tidak ditemukan', 'error');
      return;
    }

    try {
      const startDate = new Date('2026-06-27T10:00:00+07:00');
      const endDate = new Date('2026-06-27T16:00:00+07:00');

      const calendarData = {
        title: `Pernikahan ${event.title} - Gifary & Sindy`,
        description: `${event.description}\\n\\nLokasi: ${event.location}\\nAlamat: ${event.address}`,
        location: event.location,
        start: startDate,
        end: endDate
      };

      const googleCalendarUrl = this.generateGoogleCalendarUrl(calendarData);
      
      window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
      this.showNotification('Acara telah ditambahkan ke Google Calendar', 'success');
    } catch (error) {
      console.error('Error adding to calendar:', error);
      this.showNotification('Gagal menambahkan ke kalender', 'error');
    }
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
    // Use existing notification function if available
    if (window.showNotification) {
      window.showNotification(message, type);
      return;
    }

    // Fallback notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  showErrorState() {
    const section = document.getElementById('details');
    if (section) {
      section.innerHTML = `
        <div class="container">
          <h2 class="title">Detail Acara</h2>
          <div style="text-align: center; padding: 40px 20px; color: var(--muted);">
            <p>Terjadi kesalahan dalam memuat detail acara.</p>
          </div>
        </div>
      `;
    }
  }

  addStyles() {
    if (document.querySelector('style[data-events]')) return;

    const style = document.createElement('style');
    style.setAttribute('data-events', 'true');
    style.textContent = `
      .events-section {
        padding: 80px 20px;
        background: linear-gradient(180deg, rgba(233,241,234,0.7) 0%, rgba(255,255,255,0.9) 100%);
      }

      .section-subtitle {
        text-align: center;
        color: var(--muted);
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.2rem;
        margin-bottom: 50px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
      }

      .events-container {
        display: grid;
        grid-template-columns: 1fr;
        gap: 30px;
        max-width: 700px;
        margin: 0 auto;
      }

      .event-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(138, 168, 143, 0.2);
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 8px 25px rgba(33, 44, 38, 0.08);
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
        box-shadow: 0 15px 35px rgba(33, 44, 38, 0.12);
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
        padding: 15px;
        background: rgba(138, 168, 143, 0.05);
        border-radius: 12px;
        transition: background 0.3s ease;
      }

      .detail-item:hover {
        background: rgba(138, 168, 143, 0.1);
      }

      .detail-item i {
        color: var(--sage-dark);
        margin-top: 2px;
        min-width: 18px;
        font-size: 1rem;
      }

      .detail-item span,
      .detail-item div {
        color: var(--charcoal);
        font-family: 'Quicksand', sans-serif;
        line-height: 1.5;
        font-size: 1rem;
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
        gap: 15px;
        margin-top: 25px;
        flex-wrap: wrap;
      }

      .btn-calendar {
        flex: 1;
        min-width: 220px;
        padding: 14px 24px;
        border: none;
        border-radius: 25px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 1rem;
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
      }

      .btn-calendar:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(138, 168, 143, 0.3);
      }

      .additional-info {
        margin-top: 60px;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
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
        border-radius: 12px;
        border: 1px solid rgba(138, 168, 143, 0.1);
        transition: all 0.3s ease;
      }

      .info-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(33, 44, 38, 0.1);
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
        font-size: 1rem;
      }

      .info-content p {
        font-family: 'Quicksand', sans-serif;
        color: var(--muted);
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.4;
      }

      @media (max-width: 768px) {
        .events-section {
          padding: 60px 15px;
        }

        .section-subtitle {
          font-size: 1.1rem;
          margin-bottom: 40px;
        }

        .events-container {
          gap: 25px;
        }

        .event-card {
          padding: 25px 20px;
        }

        .event-header {
          flex-direction: column;
          gap: 15px;
          text-align: center;
        }

        .event-title {
          font-size: 1.3rem;
        }

        .event-icon {
          width: 45px;
          height: 45px;
          font-size: 1.1rem;
        }

        .event-actions {
          flex-direction: column;
        }

        .btn-calendar {
          min-width: auto;
          width: 100%;
        }

        .info-grid {
          grid-template-columns: 1fr;
          gap: 15px;
        }

        .info-item {
          padding: 18px;
        }
      }

      @media (max-width: 480px) {
        .event-card {
          padding: 20px 15px;
        }

        .event-title {
          font-size: 1.2rem;
        }

        .detail-item {
          padding: 12px;
          font-size: 0.9rem;
        }

        .info-item {
          padding: 15px;
        }
      }
    `;

    document.head.appendChild(style);
  }
}

// Initialize event details
let eventDetails;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    eventDetails = new EventDetails();
  });
} else {
  eventDetails = new EventDetails();
}
