export class WeddingDataDisplay {
  constructor() {
    this.scriptURL = 'https://script.google.com/macros/s/AKfycbxsyq6SPXkh6UhRfOp9MMkUoyWvvtNZWR1XxSVxpERJ0QSM4JeJdO0vtz_Uw0Nk8MuyXw/exec';
    this.data = {
      rsvp: { hadir: 0, tidakHadir: 0 },
      messages: []
    };
    this.init();
  }

  init() {
    this.createDataDisplaySection();
    this.loadData();

    // Hapus interval pembaruan otomatis
    // setInterval(() => {
    //   this.loadData();
    // }, 30000);
  }

  createDataDisplaySection() {
    if (document.getElementById('dataDisplay')) return;

    const section = document.createElement('section');
    section.id = 'dataDisplay';
    section.className = 'py-1';
    section.style.background = 'linear-gradient(135deg, var(--white) 0%, var(--ash-gray) 100%)';
    section.innerHTML = this.getDataDisplayHTML();

    const content = document.getElementById('content');
    if (content) content.appendChild(section);
  }

  getDataDisplayHTML() {
    return `
      <style>
        .data-display-section {
          font-family: 'Raleway', Roboto;
          color: var(--charcoal);
          position: relative;
          overflow: hidden;
        }

        .data-container {
          max-width: 576px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .data-title {
          text-align: center;
          color: var(--dark-slate-gray);
          margin-bottom: 3rem;
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          position: relative;
        }

        .data-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(to right, var(--hookers-green), var(--cambridge-blue));
          border-radius: 2px;
        }

        .stats-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .stat-card {
          background: rgba(211, 211, 211, 0.2);
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
          width: 130px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(to right, var(--hookers-green), var(--cambridge-blue));
          border-radius: 4px 4px 0 0;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 20px 50px rgba(82, 121, 111, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          color: white;
          font-size: 1.5rem;
          box-shadow: 0 5px 15px rgba(82, 121, 111, 0.3);
        }

        .stat-card h3 {
          margin-bottom: 0.8rem;
          color: var(--hookers-green);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-value {
          font-size: 3rem;
          font-weight: 700;
          color: var(--dark-slate-gray);
          margin: 0;
          font-family: 'Playfair Display', serif;
        }

        .messages-container {
          background: rgba(255, 255, 255, 0);
          border-radius: 5px;
          padding: 1rem;
          height: 550px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .message-card {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
          padding: 1rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          position: relative;
          animation: fadeInUp 0.5s ease;
          transition: all 0.3s ease;
          border-left: 4px solid var(--cambridge-blue);
        }

        .message-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .message-sender {
          font-weight: 500;
          color: var(--hookers-green);
          font-size: 1rem;
        }

        .message-relationship {
          background: var(--ash-gray);
          color: var(--dark-slate-gray);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .message-content {
          font-size: 0.8rem;
          line-height: 1.5;
          color: var(--charcoal);
          margin-bottom: 0.5rem;
        }

        .message-date {
          font-style: italic;
          font-size: 0.8rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--cambridge-blue);
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: var(--ash-gray);
        }

        .empty-text {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .empty-subtext {
          font-size: 0.9rem;
          opacity: 0.7;
        }

        .loading-state {
          text-align: center;
          padding: 3rem;
          color: var(--cambridge-blue);
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--ash-gray);
          border-top: 4px solid var(--hookers-green);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        .error-state {
          text-align: center;
          padding: 3rem;
          color: #e74c3c;
        }

        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .refresh-container {
          text-align: center;
          margin-top: 1.5rem;
        }

        .refresh-btn {
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(82, 121, 111, 0.3);
        }

        .refresh-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(82, 121, 111, 0.4);
        }

        .refresh-btn:active {
          transform: translateY(0);
        }

        .refresh-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .refresh-btn .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Custom Scrollbar */
        .messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: rgba(132, 169, 140, 0.1);
          border-radius: 3px;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: var(--cambridge-blue);
          border-radius: 3px;
        }

        .messages-container::-webkit-scrollbar-thumb:hover {
          background: var(--hookers-green);
        }
      </style>

      <section class="data-display-section">
        <div class="container">
          <h2 class="section-title">Ucapan & Doa</h2>
          <p class="text-center text-muted mb-5" style="font-size: 1.1rem; font-family: 'Raleway', Roboto;">
            Terima kasih atas doa dan ucapan yang telah diberikan. Semua sangat berarti bagi kami.
          </p>

          <div class="data-container">
            <div class="stats-container">
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="bi bi-check-circle"></i>
                </div>
                <h3>Hadir</h3>
                <p class="stat-value" id="hadirCount">0</p>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="bi bi-x-circle"></i>
                </div>
                <h3>Tidak Hadir</h3>
                <p class="stat-value" id="tidakHadirCount">0</p>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="bi bi-chat-heart"></i>
                </div>
                <h3>Total Ucapan</h3>
                <p class="stat-value" id="totalMessages">0</p>
              </div>
            </div>

            <div class="messages-container" id="messagesContainer">
              <div class="loading-state">
                <div class="loading-spinner"></div>
                <p>Memuat ucapan...</p>
              </div>
            </div>

            <div class="refresh-container">
              <button class="refresh-btn" id="refreshBtn">
                <i class="bi bi-arrow-clockwise"></i>
                Perbarui Data
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async loadData() {
    try {
      // Update loading state
      this.showLoadingState();

      // Disable refresh button during loading
      this.toggleRefreshButton(false);

      // Load RSVP data
      const rsvpData = await this.fetchJSONP(`${this.scriptURL}?type=rsvp`);
      this.updateRSVPCounts(rsvpData);

      // Load messages data
      const messagesData = await this.fetchJSONP(`${this.scriptURL}?type=ucap`);
      this.updateMessages(messagesData);

      // Re-enable refresh button
      this.toggleRefreshButton(true);

    } catch (error) {
      console.error('Error loading data:', error);
      this.showErrorState('Gagal memuat data. Silakan coba lagi.');
      
      // Re-enable refresh button on error too
      this.toggleRefreshButton(true);
    }
  }

  fetchJSONP(url) {
    const callbackName = 'jsonp_callback_' + Math.round(Math.random() * 1e5);
    return new Promise((resolve, reject) => {
      window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        resolve(data);
      };
      
      const script = document.createElement('script');
      script.src = `${url}&callback=${callbackName}`;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  updateRSVPCounts(data) {
    const hadirCount = document.getElementById('hadirCount');
    const tidakHadirCount = document.getElementById('tidakHadirCount');

    if (hadirCount) hadirCount.textContent = data.hadir ?? 0;
    if (tidakHadirCount) tidakHadirCount.textContent = data.tidakHadir ?? 0;
    
    // Store for later use
    this.data.rsvp = data;
  }

  updateMessages(rows) {
    const container = document.getElementById('messagesContainer');
    if (!container) return;

    // Update total messages count
    const totalMessages = document.getElementById('totalMessages');
    if (totalMessages) {
      totalMessages.textContent = rows?.length || 0;
    }

    if (!rows || rows.length === 0) {
      this.showEmptyState();
      return;
    }

    // Store messages for later use
    this.data.messages = rows;

    // Sort messages by date (newest first)
    const sortedMessages = [...rows].sort((a, b) => {
      return new Date(b.tanggal || 0) - new Date(a.tanggal || 0);
    });

    container.innerHTML = sortedMessages.map((message, index) => `
      <div class="message-card" style="animation-delay: ${index * 0.1}s">
        <div class="message-header">
          <div class="message-sender">${this.escapeHtml(message.nama || 'Tamu')}</div>
          <div class="message-relationship">${this.escapeHtml(message.hubungan || 'Teman')}</div>
        </div>
        <div class="message-content">
          ${this.escapeHtml(message.pesan || 'Tidak ada pesan')}
        </div>
        <div class="message-footer">
          <div class="message-date">${this.formatDate(message.tanggal || '')}</div>
        </div>
      </div>
    `).join('');
  }

  showLoadingState() {
    const container = document.getElementById('messagesContainer');
    if (container) {
      container.innerHTML = `
        <div class="loading-state">
          <div class="loading-spinner"></div>
          <p>Memuat ucapan...</p>
        </div>
      `;
    }
  }

  showEmptyState() {
    const container = document.getElementById('messagesContainer');
    if (container) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <i class="bi bi-chat-square"></i>
          </div>
          <div class="empty-text">Belum ada ucapan</div>
          <div class="empty-subtext">Jadilah yang pertama mengirimkan ucapan!</div>
        </div>
      `;
    }
  }

  showErrorState(message) {
    const container = document.getElementById('messagesContainer');
    if (container) {
      container.innerHTML = `
        <div class="error-state">
          <div class="error-icon">
            <i class="bi bi-exclamation-triangle"></i>
          </div>
          <div class="empty-text">${message}</div>
        </div>
      `;
    }
  }

  toggleRefreshButton(enable) {
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      if (enable) {
        refreshBtn.disabled = false;
        refreshBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Perbarui Data';
      } else {
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = '<div class="spinner"></div> Memuat...';
      }
    }
  }

  setupEventListeners() {
    // Add event listener for refresh button
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.loadData();
      });
    }
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  formatDate(dateString) {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  }

  destroy() {
    const section = document.getElementById('dataDisplay');
    if (section) section.remove();
  }
}