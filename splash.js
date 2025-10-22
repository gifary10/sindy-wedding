// splash.js - Splash Screen with Video - OPTIMIZED
class SplashScreen {
  constructor() {
    this.splashDuration = 4000; // 4 seconds
    this.videoLoaded = false;
    this.init();
  }

  init() {
    try {
      this.createSplashScreen();
      this.loadVideo();
      this.setupEventListeners();
    } catch (error) {
      console.error('Error initializing splash screen:', error);
      this.hideSplash(); // Fallback if splash fails
    }
  }

  createSplashScreen() {
    const splash = document.createElement('div');
    splash.id = 'splashScreen';
    splash.className = 'splash-screen';
    
    splash.innerHTML = `
      <div class="splash-video-container">
        <video class="splash-video" muted playsinline preload="auto">
          <source src="sound/splash.webm" type="video/webm">
          <source src="sound/splash.mp4" type="video/mp4">
          Browser Anda tidak mendukung video splash screen.
        </video>
        <div class="video-overlay"></div>
      </div>
      
      <div class="splash-content">
        <div class="splash-logo">
          <div class="logo-icon">
            <i class="fas fa-heart"></i>
          </div>
          <h1 class="logo-text">Gifary & Sindy</h1>
        </div>
        
        <div class="splash-loading">
          <div class="loading-spinner"></div>
          <p class="loading-text">Memuat Undangan...</p>
        </div>
        
        <div class="splash-skip">
          <button class="skip-btn" id="skipSplash">
            Lewati
          </button>
        </div>
      </div>
    `;

    document.body.prepend(splash); // Add to beginning of body
    this.addStyles();
  }

  loadVideo() {
    const video = document.querySelector('.splash-video');
    if (!video) {
      this.hideSplash();
      return;
    }

    video.addEventListener('loadeddata', () => {
      this.videoLoaded = true;
      this.startSplashSequence();
    });

    video.addEventListener('error', () => {
      console.warn('Splash video failed to load, using fallback');
      this.videoLoaded = false;
      this.startSplashSequence();
    });

    video.addEventListener('ended', () => {
      this.hideSplash();
    });

    // Try to play video
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.warn('Video autoplay failed, continuing without video');
        this.videoLoaded = false;
        this.startSplashSequence();
      });
    }
  }

  setupEventListeners() {
    // Skip button
    const skipBtn = document.getElementById('skipSplash');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        this.hideSplash();
      });
    }

    // Tap anywhere to skip (mobile friendly)
    const splash = document.getElementById('splashScreen');
    if (splash) {
      splash.addEventListener('click', (e) => {
        if (e.target === splash || e.target.classList.contains('video-overlay')) {
          this.hideSplash();
        }
      });
    }

    // Keyboard skip
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        this.hideSplash();
      }
    });
  }

  startSplashSequence() {
    const splash = document.getElementById('splashScreen');
    if (!splash) return;

    // Show splash content with animation
    setTimeout(() => {
      splash.classList.add('active');
    }, 100);

    // Auto hide after duration
    this.splashTimeout = setTimeout(() => {
      this.hideSplash();
    }, this.splashDuration);
  }

  hideSplash() {
    const splash = document.getElementById('splashScreen');
    if (!splash) return;

    // Clear timeout if still running
    if (this.splashTimeout) {
      clearTimeout(this.splashTimeout);
    }

    // Stop video
    const video = document.querySelector('.splash-video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    // Add fade out animation
    splash.classList.add('fade-out');

    // Remove from DOM after animation
    setTimeout(() => {
      splash.remove();
      this.triggerContentLoad();
    }, 600);
  }

  triggerContentLoad() {
    // Dispatch event to signal that splash is done
    const event = new CustomEvent('splashComplete');
    document.dispatchEvent(event);

    // Start main content animations if AOS is available
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }

    // Start background music if available
    const audio = document.getElementById('weddingAudio');
    if (audio && audio.paused) {
      audio.play().catch(() => {
        // Autoplay might be blocked, we'll handle this in main script
      });
    }
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .splash-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--sage-dark), var(--charcoal));
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.5s ease;
      }

      .splash-screen.active {
        opacity: 1;
      }

      .splash-screen.fade-out {
        opacity: 0;
        pointer-events: none;
      }

      .splash-video-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .splash-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.7) saturate(1.2);
      }

      .video-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          45deg,
          rgba(33, 44, 38, 0.8) 0%,
          rgba(138, 168, 143, 0.4) 50%,
          rgba(33, 44, 38, 0.8) 100%
        );
      }

      .splash-content {
        position: relative;
        z-index: 2;
        text-align: center;
        color: white;
        padding: 20px;
        max-width: 90%;
        animation: fadeInUp 1s ease 0.5s both;
      }

      .splash-logo {
        margin-bottom: 40px;
      }

      .logo-icon {
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        animation: pulse 2s infinite;
      }

      .logo-icon i {
        font-size: 2.5rem;
        color: white;
      }

      .logo-text {
        font-family: 'Playfair Display', serif;
        font-size: clamp(1.8rem, 4vw, 2.5rem);
        margin: 0;
        text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        background: linear-gradient(90deg, #ffffff, #e8f4e8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .splash-loading {
        margin-bottom: 30px;
      }

      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        margin: 0 auto 15px;
        animation: spin 1s linear infinite;
      }

      .loading-text {
        font-family: 'Quicksand', sans-serif;
        font-size: 0.9rem;
        margin: 0;
        opacity: 0.9;
        letter-spacing: 0.5px;
      }

      .splash-skip {
        position: absolute;
        bottom: 30px;
        left: 0;
        right: 0;
      }

      .skip-btn {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 10px 24px;
        border-radius: 25px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.85rem;
        letter-spacing: 0.5px;
      }

      .skip-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
      }

      /* Animations */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
        }
        50% {
          transform: scale(1.05);
          box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
        }
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      /* Responsive */
      @media (max-width: 768px) {
        .splash-content {
          padding: 15px;
        }

        .logo-icon {
          width: 70px;
          height: 70px;
          margin-bottom: 15px;
        }

        .logo-icon i {
          font-size: 2rem;
        }

        .splash-logo {
          margin-bottom: 30px;
        }

        .loading-spinner {
          width: 35px;
          height: 35px;
        }

        .skip-btn {
          padding: 8px 20px;
          font-size: 0.8rem;
        }
      }

      @media (max-width: 480px) {
        .logo-icon {
          width: 60px;
          height: 60px;
        }

        .logo-icon i {
          font-size: 1.8rem;
        }

        .splash-logo {
          margin-bottom: 25px;
        }

        .splash-skip {
          bottom: 20px;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .splash-screen {
          transition: opacity 0.3s ease;
        }

        .logo-icon {
          animation: none;
        }

        .loading-spinner {
          animation: none;
          border-top-color: transparent;
        }

        .splash-content {
          animation: none;
          opacity: 1;
          transform: none;
        }

        .skip-btn:hover {
          transform: none;
        }
      }

      /* Print styles */
      @media print {
        .splash-screen {
          display: none !important;
        }
      }
    `;

    if (!document.querySelector('style[data-splash]')) {
      style.setAttribute('data-splash', 'true');
      document.head.appendChild(style);
    }
  }
}

// Initialize splash screen when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only show splash screen on initial load
  if (!sessionStorage.getItem('splashShown')) {
    new SplashScreen();
    sessionStorage.setItem('splashShown', 'true');
  } else {
    // If splash was already shown, trigger content load immediately
    const event = new CustomEvent('splashComplete');
    document.dispatchEvent(event);
  }
});

// Handle page refresh - reset splash if needed
window.addEventListener('beforeunload', () => {
  // Optional: Reset splash for demo purposes
  // sessionStorage.removeItem('splashShown');
});