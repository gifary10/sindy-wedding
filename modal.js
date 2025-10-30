export class WeddingModal {
  constructor() {
    this.scriptURL = "https://script.google.com/macros/s/AKfycbxvLmI3UoOeEgQc8md45TsYY2ctV2Y0KE2onPiN4GPNOLwcghcZbtXiTSGxPcULgPPgug/exec";
    this.init();
  }

  init() {
    this.createModals();
    this.setupEventListeners();
  }

  createModals() {
    // Modal untuk Doa dan Harapan
    const prayerModalHTML = `
      <div class="modal fade" id="prayerModal" tabindex="-1" aria-labelledby="prayerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header bg-hookers-green text-white">
              <h5 class="modal-title" id="prayerModalLabel">
                <i class="bi bi-stars me-2"></i>Doa dan Harapan
              </h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="prayerForm">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="prayerName" class="form-label">Nama Lengkap</label>
                    <input type="text" class="form-control" id="prayerName" name="nama" placeholder="Masukkan nama lengkap" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="prayerRelationship" class="form-label">Hubungan dengan Mempelai</label>
                    <input type="text" class="form-control" id="prayerRelationship" name="hubungan" placeholder="Contoh: Teman, Keluarga, dll" required>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="prayerMessage" class="form-label">Doa dan Harapan</label>
                  <textarea class="form-control" id="prayerMessage" name="pesan" rows="5" 
                            placeholder="Tuliskan doa dan harapan terbaik Anda untuk kami..." 
                            required></textarea>
                  <div class="form-text">Doa dan harapan Anda sangat berarti bagi kami.</div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
              <button type="button" class="btn btn-success" id="submitPrayerBtn">
                <i class="bi bi-send me-2"></i>Kirim Doa
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Modal untuk Konfirmasi Kehadiran
    const rsvpModalHTML = `
      <div class="modal fade" id="rsvpModal" tabindex="-1" aria-labelledby="rsvpModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-hookers-green text-white">
              <h5 class="modal-title" id="rsvpModalLabel">
                <i class="bi bi-envelope-heart me-2"></i>Konfirmasi Kehadiran
              </h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="rsvpForm">
                <div class="mb-3">
                  <label for="guestName" class="form-label">Nama Lengkap</label>
                  <input type="text" class="form-control" id="guestName" name="nama" placeholder="Masukkan nama lengkap" required>
                </div>
                <div class="mb-3">
                  <label for="guestPhone" class="form-label">Nomor Telepon</label>
                  <input type="tel" class="form-control" id="guestPhone" name="telepon" placeholder="Contoh: 081234567890" required>
                </div>
                <div class="mb-3">
                  <label for="guestAttendance" class="form-label">Konfirmasi Kehadiran</label>
                  <select class="form-select" id="guestAttendance" name="kehadiran" required>
                    <option value="">Pilih Kehadiran</option>
                    <option value="Hadir">Hadir</option>
                    <option value="Tidak Hadir">Tidak Hadir</option>
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
              <button type="button" class="btn btn-success" id="submitRSVPBtn">
                <i class="bi bi-send me-2"></i>Kirim Konfirmasi
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Tambahkan modal ke body
    document.body.insertAdjacentHTML('beforeend', prayerModalHTML);
    document.body.insertAdjacentHTML('beforeend', rsvpModalHTML);

    // Tambahkan styling khusus untuk modal
    this.addModalStyles();
  }

  addModalStyles() {
    const styles = `
      <style>
        .modal-content {
          border-radius: 20px;
          border: none;
          box-shadow: 0 20px 60px rgba(47, 62, 70, 0.3);
          overflow: hidden;
        }

        .modal-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1.5rem 2rem;
        }

        .modal-body {
          padding: 2rem;
        }

        .modal-footer {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          padding: 1.5rem 2rem;
        }

        .form-control, .form-select {
          border-radius: 12px;
          border: 2px solid var(--ash-gray);
          padding: 0.75rem 1rem;
          transition: all 0.3s ease;
        }

        .form-control:focus, .form-select:focus {
          border-color: var(--hookers-green);
          box-shadow: 0 0 0 0.2rem rgba(82, 121, 111, 0.25);
        }

        .form-label {
          font-weight: 600;
          color: var(--dark-slate-gray);
          margin-bottom: 0.5rem;
        }

        .form-text {
          color: var(--cambridge-blue);
          font-size: 0.875rem;
        }

        .btn-success {
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          border: none;
          border-radius: 12px;
          padding: 0.75rem 2rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(82, 121, 111, 0.4);
        }

        .form-check-input:checked {
          background-color: var(--hookers-green);
          border-color: var(--hookers-green);
        }

        .bg-hookers-green {
          background: linear-gradient(135deg, var(--hookers-green), var(--dark-slate-gray)) !important;
        }
      </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
  }

  setupEventListeners() {
    // Event listener untuk tombol submit doa
    document.addEventListener('click', (e) => {
      if (e.target.id === 'submitPrayerBtn' || e.target.closest('#submitPrayerBtn')) {
        this.submitPrayer();
      }
      
      if (e.target.id === 'submitRSVPBtn' || e.target.closest('#submitRSVPBtn')) {
        this.submitRSVP();
      }
    });

    // Event listener untuk form submission (mencegah submit default)
    document.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    // Update tombol header
    this.updateHeaderButtons();
  }

  updateHeaderButtons() {
    const headerButtons = document.querySelector('.header-buttons');
    if (headerButtons) {
      headerButtons.innerHTML = `
        <button class="btn-custom" data-bs-toggle="modal" data-bs-target="#prayerModal">
          <i class="bi bi-stars me-2"></i>Doa dan Harapan
        </button>
        <button class="btn-custom" data-bs-toggle="modal" data-bs-target="#rsvpModal">
          <i class="bi bi-envelope me-2"></i>Konfirmasi Kehadiran
        </button>
      `;
    }
  }

  // Method untuk submit Doa dan Harapan
  async submitPrayer() {
    const form = document.getElementById('prayerForm');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const formData = new FormData(form);
      
      // Tambahkan parameter type untuk membedakan dengan RSVP
      const response = await fetch(this.scriptURL + "?type=ucap", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      console.log('Prayer submission result:', result);
      
      // Simpan ke localStorage sebagai backup
      this.saveToLocalStorage('prayers', {
        nama: document.getElementById('prayerName').value,
        hubungan: document.getElementById('prayerRelationship').value,
        pesan: document.getElementById('prayerMessage').value,
        timestamp: new Date().toISOString()
      });
      
      // Tutup modal dan reset form
      const modal = bootstrap.Modal.getInstance(document.getElementById('prayerModal'));
      if (modal) {
        modal.hide();
      }
      form.reset();
      
      // Tampilkan notifikasi sukses
      this.showSuccessMessage('Doa dan harapan Anda telah berhasil dikirim. Terima kasih!');
      
    } catch (error) {
      console.error('Error submitting prayer:', error);
      this.showErrorMessage('Maaf, terjadi kesalahan. Silakan coba lagi.');
    }
  }

  // Method untuk submit RSVP
  async submitRSVP() {
    const form = document.getElementById('rsvpForm');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const formData = new FormData(form);
      
      const response = await fetch(this.scriptURL, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      console.log('RSVP submission result:', result);
      
      // Simpan ke localStorage sebagai backup
      this.saveToLocalStorage('rsvp', {
        nama: document.getElementById('guestName').value,
        telepon: document.getElementById('guestPhone').value,
        kehadiran: document.getElementById('guestAttendance').value,
        timestamp: new Date().toISOString()
      });
      
      // Tutup modal dan reset form
      const modal = bootstrap.Modal.getInstance(document.getElementById('rsvpModal'));
      if (modal) {
        modal.hide();
      }
      form.reset();
      
      // Tampilkan notifikasi sukses
      this.showSuccessMessage('Konfirmasi kehadiran Anda telah berhasil dikirim. Terima kasih!');
      
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      this.showErrorMessage('Maaf, terjadi kesalahan. Silakan coba lagi.');
    }
  }

  saveToLocalStorage(type, data) {
    const key = `wedding_${type}`;
    const existingData = JSON.parse(localStorage.getItem(key) || '[]');
    existingData.push(data);
    localStorage.setItem(key, JSON.stringify(existingData));
  }

  showSuccessMessage(message) {
    this.showMessage(message, 'success');
  }

  showErrorMessage(message) {
    this.showMessage(message, 'error');
  }

  showMessage(message, type) {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Auto remove setelah 5 detik
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
}
