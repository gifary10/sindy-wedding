// maps.js - Location Maps - OPTIMIZED
class WeddingMaps {
  constructor() {
    this.locations = [
      {
        id: 'akad',
        name: 'Soedirman Convention Centre',
        address: 'Jl. Raya Batujajar No.247, Batujajar Bar., Kec. Batujajar, Kabupaten Bandung Barat, Jawa Barat 40561',
        lat: -6.9155748,
        lng: 107.4921945,
        type: 'venue',
        description: 'Akad nikah akan dilaksanakan dengan khidmat di Ballroom A Soedirman Convention Centre'
      },
      {
        id: 'resepsi',
        name: 'Soedirman Convention Centre',
        address: 'Jl. Raya Batujajar No.247, Batujajar Bar., Kec. Batujajar, Kabupaten Bandung Barat, Jawa Barat 40561',
        lat: -6.9155748,
        lng: 107.4921945,
        type: 'venue',
        description: 'Resepsi pernikahan akan diselenggarakan di Grand Ballroom Soedirman Convention Centre dengan kapasitas hingga 500 tamu.'
      }
    ];
    
    this.maps = {};
    this.init();
  }

  init() {
    try {
      this.createMapsSection();
      this.loadGoogleMaps();
    } catch (error) {
      console.error('Error initializing maps:', error);
    }
  }

  createMapsSection() {
    const section = document.createElement('section');
    section.id = 'location';
    section.className = 'maps-section';
    section.setAttribute('data-aos', 'fade-up');

    section.innerHTML = `
      <div class="container">
        <h2 class="title">Lokasi Acara</h2>
        <p class="section-subtitle">Semua acara pernikahan akan dilaksanakan di Soedirman Convention Centre</p>
        
        <!-- Location Tabs -->
        <div class="location-tabs" data-aos="fade-up">
          ${this.locations.map((location, index) => `
            <button class="location-tab ${index === 0 ? 'active' : ''}" 
                    data-location="${location.id}">
              <i class="fas ${this.getLocationIcon(location.type)}"></i>
              <span>${location.id === 'akad' ? 'Akad Nikah' : 'Resepsi'}</span>
            </button>
          `).join('')}
        </div>

        <!-- Maps Container -->
        <div class="maps-container">
          ${this.locations.map((location, index) => `
            <div class="map-content ${index === 0 ? 'active' : ''}" 
                 id="map-${location.id}">
              <div class="map-placeholder">
                <div class="loading-spinner">
                  <i class="fas fa-map-marked-alt"></i>
                  <p>Memuat peta...</p>
                </div>
              </div>
              
              <div class="location-info">
                <h3 class="location-name">${location.id === 'akad' ? 'Akad Nikah' : 'Resepsi Pernikahan'}</h3>
                <div class="location-address">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>${location.address}</span>
                </div>
                <p class="location-description">${location.description}</p>
                
                <div class="location-actions">
                  <button class="btn-direction" onclick="weddingMaps.getDirections('${location.lat}', '${location.lng}')">
                    <i class="fas fa-route"></i>
                    Petunjuk Arah
                  </button>
                  <button class="btn-copy-address" onclick="weddingMaps.copyAddress('${location.address}')">
                    <i class="fas fa-copy"></i>
                    Salin Alamat
                  </button>
                </div>

                <!-- Embedded Map as Fallback -->
                <div class="embedded-map">
                  <h4>Lokasi di Google Maps</h4>
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

                <!-- Transportation Info -->
                <div class="transportation-info">
                  <h4>Akses Transportasi</h4>
                  <div class="transport-options">
                    <div class="transport-item">
                      <i class="fas fa-car"></i>
                      <span>Parkir tersedia untuk 300+ kendaraan</span>
                    </div>
                    <div class="transport-item">
                      <i class="fas fa-bus"></i>
                      <span>Akses mudah dari tol Pasteur</span>
                    </div>
                    <div class="transport-item">
                      <i class="fas fa-taxi"></i>
                      <span>Taxi & ride-hailing mudah dijumpai</span>
                    </div>
                    <div class="transport-item">
                      <i class="fas fa-info-circle"></i>
                      <span>Area strategis di Bandung Barat</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('content').appendChild(section);
    this.addStyles();
    this.setupEventListeners();
  }

  getLocationIcon(type) {
    const icons = {
      'mosque': 'fa-mosque',
      'hotel': 'fa-hotel',
      'venue': 'fa-glass-cheers'
    };
    return icons[type] || 'fa-map-marker-alt';
  }

  setupEventListeners() {
    // Location tabs
    const tabs = document.querySelectorAll('.location-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const locationId = tab.dataset.location;
        this.switchLocation(locationId);
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });

    // Window resize handler
    window.addEventListener('resize', () => {
      Object.values(this.maps).forEach(map => {
        if (map && google && google.maps) {
          google.maps.event.trigger(map, 'resize');
        }
      });
    });
  }

  switchLocation(locationId) {
    // Hide all map contents
    const mapContents = document.querySelectorAll('.map-content');
    mapContents.forEach(content => content.classList.remove('active'));

    // Show selected map content
    const selectedContent = document.getElementById(`map-${locationId}`);
    if (selectedContent) {
      selectedContent.classList.add('active');
      
      // Initialize map if not already initialized
      this.initMap(locationId);
    }
  }

  loadGoogleMaps() {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      this.initializeAllMaps();
      return;
    }

    // For this implementation, we'll use the embedded maps only
    // since we don't have a Google Maps API key
    this.showFallbackMaps();
  }

  initializeAllMaps() {
    this.locations.forEach(location => {
      // Only initialize visible map
      const mapContent = document.getElementById(`map-${location.id}`);
      if (mapContent && mapContent.classList.contains('active')) {
        this.initMap(location.id);
      }
    });
  }

  initMap(locationId) {
    // Since we don't have API key, we'll show fallback
    this.showFallbackMap(locationId);
  }

  showFallbackMaps() {
    this.locations.forEach(location => {
      this.showFallbackMap(location.id);
    });
  }

  showFallbackMap(locationId) {
    const location = this.locations.find(loc => loc.id === locationId);
    const mapElement = document.querySelector(`#map-${locationId} .map-placeholder`);
    
    if (mapElement && location) {
      mapElement.innerHTML = `
        <div class="fallback-map">
          <div class="fallback-content">
            <i class="fas fa-map-marked-alt"></i>
            <h4>${location.name}</h4>
            <p>${location.address}</p>
            <a href="https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}" 
               target="_blank" rel="noopener" class="btn-fallback-map">
              Buka di Google Maps
            </a>
          </div>
        </div>
      `;
    }
  }

  getDirections(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  copyAddress(address) {
    navigator.clipboard.writeText(address).then(() => {
      this.showNotification('Alamat berhasil disalin', 'success');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = address;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showNotification('Alamat berhasil disalin', 'success');
    });
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
      .maps-section {
        padding: 80px 20px;
        background: linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(233,241,234,0.7) 100%);
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

      .location-tabs {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 40px;
        flex-wrap: wrap;
      }

      .location-tab {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        border: 1px solid rgba(138, 168, 143, 0.3);
        background: rgba(255, 255, 255, 0.8);
        color: var(--muted);
        border-radius: 25px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
      }

      .location-tab:hover {
        border-color: var(--sage);
        color: var(--sage-dark);
        transform: translateY(-2px);
      }

      .location-tab.active {
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
        border-color: transparent;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(138, 168, 143, 0.3);
      }

      .location-tab i {
        font-size: 1rem;
      }

      .maps-container {
        max-width: 1000px;
        margin: 0 auto;
      }

      .map-content {
        display: none;
      }

      .map-content.active {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        align-items: start;
      }

      .map-placeholder {
        height: 400px;
        background: linear-gradient(135deg, var(--sage-1), var(--sage-2));
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 25px rgba(33, 44, 38, 0.1);
      }

      .loading-spinner {
        text-align: center;
        color: var(--sage-dark);
      }

      .loading-spinner i {
        font-size: 3rem;
        margin-bottom: 15px;
        display: block;
      }

      .loading-spinner p {
        font-family: 'Quicksand', sans-serif;
        margin: 0;
        font-weight: 600;
      }

      .location-info {
        padding: 20px;
      }

      .location-name {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        color: var(--sage-dark);
        margin-bottom: 15px;
        font-weight: 600;
      }

      .location-address {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 20px;
        color: var(--charcoal);
        font-family: 'Quicksand', sans-serif;
      }

      .location-address i {
        color: var(--sage-dark);
        margin-top: 2px;
      }

      .location-description {
        color: var(--muted);
        font-family: 'Quicksand', sans-serif;
        line-height: 1.6;
        margin-bottom: 25px;
      }

      .location-actions {
        display: flex;
        gap: 12px;
        margin-bottom: 30px;
        flex-wrap: wrap;
      }

      .btn-direction,
      .btn-copy-address {
        flex: 1;
        min-width: 160px;
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

      .btn-direction {
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
      }

      .btn-direction:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(138, 168, 143, 0.3);
      }

      .btn-copy-address {
        background: rgba(138, 168, 143, 0.1);
        color: var(--sage-dark);
        border: 1px solid rgba(138, 168, 143, 0.3);
      }

      .btn-copy-address:hover {
        background: var(--sage-dark);
        color: white;
        transform: translateY(-2px);
      }

      .embedded-map {
        margin: 25px 0;
        padding: 20px;
        background: rgba(138, 168, 143, 0.05);
        border-radius: 12px;
      }

      .embedded-map h4 {
        font-family: 'Quicksand', sans-serif;
        color: var(--sage-dark);
        margin-bottom: 15px;
        font-weight: 600;
        text-align: center;
      }

      .transportation-info h4 {
        font-family: 'Quicksand', sans-serif;
        color: var(--sage-dark);
        margin-bottom: 15px;
        font-weight: 600;
      }

      .transport-options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .transport-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px;
        background: rgba(138, 168, 143, 0.05);
        border-radius: 8px;
        font-family: 'Quicksand', sans-serif;
        font-size: 0.85rem;
        color: var(--charcoal);
      }

      .transport-item i {
        color: var(--sage-dark);
        width: 16px;
      }

      /* Fallback Map Styles */
      .fallback-map {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      .fallback-content i {
        font-size: 3rem;
        color: var(--sage-dark);
        margin-bottom: 15px;
        display: block;
      }

      .fallback-content h4 {
        font-family: 'Playfair Display', serif;
        color: var(--sage-dark);
        margin-bottom: 8px;
      }

      .fallback-content p {
        font-family: 'Quicksand', sans-serif;
        color: var(--muted);
        margin-bottom: 20px;
      }

      .btn-fallback-map {
        background: linear-gradient(135deg, var(--sage), var(--sage-dark));
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        text-decoration: none;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        transition: all 0.3s ease;
        display: inline-block;
      }

      .btn-fallback-map:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(138, 168, 143, 0.3);
      }

      /* Responsive */
      @media (max-width: 768px) {
        .map-content.active {
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .location-tabs {
          justify-content: flex-start;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .location-tab {
          white-space: nowrap;
        }

        .location-actions {
          flex-direction: column;
        }

        .btn-direction,
        .btn-copy-address {
          min-width: auto;
        }

        .transport-options {
          grid-template-columns: 1fr;
        }

        .map-placeholder {
          height: 300px;
        }

        .embedded-map iframe {
          height: 250px;
        }
      }

      @media (max-width: 480px) {
        .location-info {
          padding: 15px 0;
        }

        .location-name {
          font-size: 1.3rem;
        }

        .embedded-map {
          padding: 15px;
        }

        .embedded-map iframe {
          height: 200px;
        }
      }
    `;

    if (!document.querySelector('style[data-maps]')) {
      style.setAttribute('data-maps', 'true');
      document.head.appendChild(style);
    }
  }
}

// Initialize maps
const weddingMaps = new WeddingMaps();