export class WeddingNavigation {
  constructor() {
    this.navItems = [
      { icon: 'bi-house', label: 'Home', target: 'header' },
      { icon: 'bi-heart', label: 'Mempelai', target: 'couple' },
      { icon: 'bi-journal-text', label: 'Story', target: 'story' },
      { icon: 'bi-calendar', label: 'Acara', target: 'details' },
      { icon: 'bi-images', label: 'Galeri', target: 'gallery' }
    ];
    this.activeItem = 'header';
    this.audio = null;
    this.isPlaying = false;
    this.isAudioEnabled = false;
    this.init();
  }

  init() {
    this.createNavigation();
    this.setupNavigationEvents();
    this.setupScrollObserver();
    this.initAudio();
  }

  createNavigation() {
    if (document.getElementById('bottomNav')) return;

    const nav = document.createElement('nav');
    nav.id = 'bottomNav';
    nav.innerHTML = `
      <style>
        .bottom-nav {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 12px;
          box-shadow: 
            0 8px 32px rgba(47, 62, 70, 0.1),
            0 2px 8px rgba(0, 0, 0, 0.03),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.15);
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .bottom-nav:hover {
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 
            0 12px 40px rgba(47, 62, 70, 0.15),
            0 4px 12px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          transform: translateX(-50%) translateY(-2px);
        }

        .nav-container {
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px 18px;
          border-radius: 20px;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          min-width: 60px;
          height: 60px;
          background: transparent;
          border: none;
          font-family: 'Roboto', sans-serif;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, var(--hookers-green), var(--cambridge-blue));
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }

        .nav-item.active::before {
          opacity: 0.8;
        }

        .nav-item:hover::before {
          opacity: 0.3;
        }

        .nav-item.active:hover::before {
          opacity: 0.9;
        }

        .nav-icon {
          font-size: 1.3rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
        }

        .nav-item .nav-icon {
          color: rgba(255, 255, 255, 0.9);
        }

        .nav-item.active .nav-icon {
          color: white;
          transform: scale(1.1);
        }

        .nav-item:hover .nav-icon {
          color: white;
          transform: scale(1.05);
        }

        .nav-item.active:hover .nav-icon {
          color: white;
          transform: scale(1.15);
        }

        /* Music Toggle Button */
        .music-toggle {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          border-radius: 20px;
          cursor: pointer;
          min-width: 60px;
          height: 60px;
          background: transparent;
          border: none;
          transition: all 0.3s ease;
        }

        .music-toggle::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, var(--gold), var(--dark-slate-gray));
          opacity: 0;
          transition: all 0.3s ease;
          z-index: -1;
        }

        .music-toggle.active::before {
          opacity: 0.8;
        }

        .music-toggle:hover::before {
          opacity: 0.3;
        }

        .music-toggle.active:hover::before {
          opacity: 0.9;
        }

        .music-toggle .nav-icon {
          color: rgba(255, 255, 255, 0.9);
        }

        .music-toggle.active .nav-icon {
          color: white;
          transform: scale(1.1);
        }

        .music-toggle:hover .nav-icon {
          color: white;
          transform: scale(1.05);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .bottom-nav {
            top: 15px;
            padding: 10px;
            border-radius: 22px;
            background: rgba(255, 255, 255, 0.2);
          }

          .nav-item, .music-toggle {
            padding: 12px 16px;
            min-width: 55px;
            height: 55px;
          }

          .nav-icon {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 576px) {
          .bottom-nav {
            top: 12px;
            padding: 8px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.25);
          }

          .nav-container {
            gap: 6px;
          }

          .nav-item, .music-toggle {
            padding: 10px 14px;
            min-width: 50px;
            height: 50px;
          }

          .nav-icon {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 400px) {
          .nav-item, .music-toggle {
            padding: 8px 12px;
            min-width: 45px;
            height: 45px;
          }

          .nav-icon {
            font-size: 1rem;
          }
        }
      </style>

      <div class="bottom-nav">
        <div class="nav-container">
          ${this.navItems
            .map(
              (item) => `
              <button class="nav-item ${item.target === this.activeItem ? 'active' : ''}" 
                      data-target="${item.target}">
                <i class="${item.icon} nav-icon"></i>
              </button>
            `
            )
            .join('')}
          <!-- Music Toggle Button -->
          <button class="music-toggle" id="musicToggle">
            <i class="bi bi-music-note-beamed nav-icon"></i>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(nav);
  }

  initAudio() {
    // Create audio element but don't load immediately
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.volume = 0.5;
    
    // Setup music toggle
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
      musicToggle.addEventListener('click', () => {
        this.toggleMusic();
      });
    }

    // Show instruction for first-time users
    this.showMusicInstruction();
  }

  showMusicInstruction() {
    const hasSeenInstruction = localStorage.getItem('musicInstructionSeen');
    if (!hasSeenInstruction) {
      setTimeout(() => {
        const musicToggle = document.getElementById('musicToggle');
        if (musicToggle) {
          musicToggle.style.animation = 'pulse 2s infinite';
          
          const style = document.createElement('style');
          style.textContent = `
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
          `;
          document.head.appendChild(style);
        }
        
        localStorage.setItem('musicInstructionSeen', 'true');
      }, 2000);
    }
  }

  async toggleMusic() {
    const musicToggle = document.getElementById('musicToggle');
    
    if (!this.isAudioEnabled) {
      await this.enableAudio();
      return;
    }

    if (this.isPlaying) {
      this.pauseMusic();
      if (musicToggle) {
        musicToggle.classList.remove('active');
        musicToggle.innerHTML = '<i class="bi bi-music-note-beamed nav-icon"></i>';
      }
    } else {
      this.playMusic();
      if (musicToggle) {
        musicToggle.classList.add('active');
        musicToggle.innerHTML = '<i class="bi bi-pause-fill nav-icon"></i>';
      }
    }
  }

  async enableAudio() {
    try {
      // Set audio source only when user interacts
      this.audio.src = 'sound/music.mp3';
      
      await this.audio.play();
      this.isAudioEnabled = true;
      this.isPlaying = true;
      
      const musicToggle = document.getElementById('musicToggle');
      if (musicToggle) {
        musicToggle.classList.add('active');
        musicToggle.innerHTML = '<i class="bi bi-pause-fill nav-icon"></i>';
        musicToggle.style.animation = 'none';
      }
      
    } catch (error) {
      console.log('Audio enable failed:', error);
      this.showAudioError();
    }
  }

  async playMusic() {
    if (this.audio && this.isAudioEnabled) {
      try {
        await this.audio.play();
        this.isPlaying = true;
      } catch (error) {
        console.log('Play failed:', error);
        this.isPlaying = false;
      }
    }
  }

  pauseMusic() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  showAudioError() {
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
      const originalHTML = musicToggle.innerHTML;
      musicToggle.innerHTML = '<i class="bi bi-exclamation-triangle nav-icon"></i>';
      musicToggle.style.color = '#ff6b6b';
      
      setTimeout(() => {
        musicToggle.innerHTML = originalHTML;
        musicToggle.style.color = '';
      }, 2000);
    }
  }

  setupNavigationEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.nav-item')) {
        const navItem = e.target.closest('.nav-item');
        const targetId = navItem.getAttribute('data-target');
        
        if (targetId) {
          this.setActiveNavItem(targetId);
          this.scrollToSection(targetId);
        }
      }
    });
  }

  setupScrollObserver() {
    // Wait for sections to be created
    setTimeout(() => {
      const sections = this.navItems
        .filter(item => item.target !== 'header')
        .map(item => document.getElementById(item.target));
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const activeId = entry.target.id;
            this.setActiveNavItem(activeId);
          }
        });
      }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
      });

      sections.forEach(section => {
        if (section) observer.observe(section);
      });
    }, 500);
  }

  setActiveNavItem(targetId) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      if (item.getAttribute('data-target') === targetId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    this.activeItem = targetId;
  }

  scrollToSection(targetId) {
    if (targetId === 'header') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const target = document.getElementById(targetId);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }

  destroy() {
    if (this.audio) {
      this.pauseMusic();
      this.audio = null;
    }
  }
}