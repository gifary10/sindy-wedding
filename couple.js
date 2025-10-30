export class WeddingCouple {
  constructor(scrollReveal) {
    this.scrollReveal = scrollReveal;
    this.coupleData = {
      groom: {
        name: "Gifary",
        fullName: "Gifary Setia Putra",
        father: "Bapak Husen",
        mother: "Ibu Yuliawati",
        description: "Putra kedua, Lahir di Bandung pada 10 Maret 1995. Sosok pendiam namun memiliki hati yang tulus dan perhatian yang besar.",
        video: "videos/groom.webm",
        image: "images/groom.jpg",
        social: {
          instagram: "#",
          facebook: "#",
          twitter: "#"
        }
      },
      bride: {
        name: "Sindy",
        fullName: "Sindy Novia",
        father: "Bapak Apet",
        mother: "Ibu Dewi",
        description: "Putri pertama, Lahir di Bandung pada 22 Maret 1995. Ceria, penyayang, dan selalu menjadi sumber semangat bagi orang-orang di sekitarnya.",
        video: "videos/bride.webm",
        image: "images/bride.jpg",
        social: {
          instagram: "#",
          facebook: "#",
          twitter: "#"
        }
      }
    };
    this.currentMember = 'groom';
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.init();
  }

  init() {
    this.createCoupleSection();
    setTimeout(() => {
      this.initScrollReveal();
      this.setupSwipeEvents();
    }, 100);
  }

  createCoupleSection() {
    if (document.getElementById('couple')) return;

    const section = document.createElement('section');
    section.id = 'couple';
    section.className = 'py-1';
    section.style.background = 'linear-gradient(135deg, var(--white) 0%, var(--ash-gray) 100%)';
    section.innerHTML = this.getCoupleHTML();

    const content = document.getElementById('content');
    if (content) content.appendChild(section);
  }

  getCoupleHTML() {
    return `
      <style>
  .couple-section {
    position: relative;
    overflow: hidden;
    padding: 2rem 0;
  }

  .couple-card-container {
    position: relative;
    max-width: 576px;
    margin: 0 auto;
    perspective: 1000px;
  }

  .couple-card {
    position: relative;
    border-radius: 2px;
    padding: 0;
    box-shadow:
      0 20px 60px rgba(82, 121, 111, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    height: 600px;
    margin-bottom: 2rem;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .couple-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.7) 70%,
      rgba(0, 0, 0, 0.9) 100%
    );
    border-radius: 2px;
    z-index: 1;
    transition: all 0.5s ease;
  }

  .couple-video-container {
    position: absolute;
    inset: 0;
    border-radius: 2px;
    overflow: hidden;
    z-index: 0;
  }

  .couple-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .couple-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.5rem 1rem;
    color: white;
    text-align: center;
  }

  .couple-name {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    position: relative;
    display: inline-block;
  }

  .couple-name::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(to right, var(--gold), var(--cambridge-blue));
    border-radius: 2px;
  }

  .couple-fullname {
    font-family: 'Raleway', Roboto;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
    opacity: 0.95;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }

  .couple-parents {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-style: italic;
    margin-bottom: 1.5rem;
    opacity: 0.9;
    line-height: 1.4;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }

  .couple-description {
    font-family: 'Raleway', Roboto;
    line-height: 1.6;
    margin-bottom: 1rem;
    opacity: 0.9;
    font-size: 0.9rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    max-height: 100px;
    overflow: hidden;
  }

  .couple-social {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 0;
    flex-wrap: wrap;
  }

  .social-icon {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }

  .couple-navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .nav-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--hookers-green);
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .member-indicator {
    display: flex;
    gap: 0.5rem;
  }

  .indicator-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid var(--hookers-green);
  }

  .indicator-dot.active {
    background: var(--hookers-green);
  }

  .swipe-hint {
    text-align: center;
    color: var(--dark-slate-gray);
    font-family: 'Raleway', Roboto;
    font-size: 0.8rem;
    margin-top: 1rem;
    opacity: 0.7;
  }
</style>


      <section class="couple-section">
        <div class="container">
          <h2 class="section-title">Mempelai</h2>

          <div class="couple-card-container">
            <!-- Single Couple Card -->
            <div class="couple-card reveal-item" id="coupleCard">
              <div class="couple-video-container" id="videoContainer">
                <!-- Video will be dynamically inserted -->
              </div>
              <div class="couple-content">
                <!-- Content will be dynamically updated -->
              </div>
            </div>

            <!-- Navigation Controls -->
            <div class="couple-navigation">
              <button class="nav-button" id="prevButton" aria-label="Previous">
                <i class="bi bi-chevron-left"></i>
              </button>
              
              <div class="member-indicator">
                <div class="indicator-dot active" data-member="groom"></div>
                <div class="indicator-dot" data-member="bride"></div>
              </div>
              
              <button class="nav-button" id="nextButton" aria-label="Next">
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>

            <div class="swipe-hint">
              <i class="bi bi-arrow-left-right me-2"></i>
              Geser untuk melihat mempelai lainnya
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
          distance: '30px',
          easing: 'cubic-bezier(0.5, 0, 0, 1)',
          origin: 'bottom',
          cleanup: true,
          mobile: true
        });
      });
    }
  }

  setupSwipeEvents() {
    const card = document.getElementById('coupleCard');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const indicatorDots = document.querySelectorAll('.indicator-dot');

    // Initial render
    this.updateCardContent();

    // Button events
    prevButton.addEventListener('click', () => this.swipeToMember('groom'));
    nextButton.addEventListener('click', () => this.swipeToMember('bride'));

    // Indicator dot events
    indicatorDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const member = dot.getAttribute('data-member');
        this.swipeToMember(member);
      });
    });

    // Touch events for swipe
    card.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    // Mouse events for desktop swipe
    card.addEventListener('mousedown', (e) => {
      this.touchStartX = e.screenX;
      document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.swipeToMember('groom');
      } else if (e.key === 'ArrowRight') {
        this.swipeToMember('bride');
      }
    });
  }

  handleMouseUp(e) {
    this.touchEndX = e.screenX;
    this.handleSwipe();
    document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe right - show groom
        this.swipeToMember('groom');
      } else {
        // Swipe left - show bride
        this.swipeToMember('bride');
      }
    }
  }

  swipeToMember(member) {
    if (this.currentMember === member) return;

    const card = document.getElementById('coupleCard');
    const animationClass = member === 'groom' ? 'swipe-right' : 'swipe-left';

    // Add swipe animation
    card.classList.add(animationClass);

    // Update content after animation
    setTimeout(() => {
      this.currentMember = member;
      this.updateCardContent();
      card.classList.remove(animationClass);
    }, 250);
  }

  updateCardContent() {
    const member = this.coupleData[this.currentMember];
    const videoContainer = document.getElementById('videoContainer');
    const content = document.querySelector('.couple-content');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const indicatorDots = document.querySelectorAll('.indicator-dot');

    // Update video background
    videoContainer.innerHTML = `
      <video class="couple-video" autoplay muted loop playsinline poster="${member.image}">
        <source src="${member.video}" type="video/webm">
        Your browser does not support the video tag.
      </video>
      <img src="${member.image}" alt="${member.name}" class="couple-fallback-image">
    `;

    // Handle video loading and errors
    const video = videoContainer.querySelector('.couple-video');
    const fallbackImage = videoContainer.querySelector('.couple-fallback-image');
    
    video.addEventListener('error', () => {
      console.log(`Video ${member.video} failed to load, using fallback image`);
      video.style.display = 'none';
      fallbackImage.style.display = 'block';
    });

    video.addEventListener('loadeddata', () => {
      console.log(`Video ${member.video} loaded successfully`);
      fallbackImage.style.display = 'none';
    });

    // Try to play video
    video.play().catch(error => {
      console.log('Video autoplay failed:', error);
      video.style.display = 'none';
      fallbackImage.style.display = 'block';
    });

    // Update content - parents and description now come before social media
    content.innerHTML = `
      <h3 class="couple-name">${member.name}</h3>
      <p class="couple-fullname">${member.fullName}</p>
      <p class="couple-parents">${this.currentMember === 'groom' ? 'Putra' : 'Putri'} dari<br>${member.father} & ${member.mother}</p>
      <p class="couple-description">${member.description}</p>
      
      <div class="couple-social">
        <a href="${member.social.instagram}" class="social-icon" target="_blank" aria-label="Instagram ${member.name}">
          <i class="bi bi-instagram"></i>
        </a>
        <a href="${member.social.facebook}" class="social-icon" target="_blank" aria-label="Facebook ${member.name}">
          <i class="bi bi-facebook"></i>
        </a>
        <a href="${member.social.twitter}" class="social-icon" target="_blank" aria-label="Twitter ${member.name}">
          <i class="bi bi-twitter"></i>
        </a>
      </div>
    `;

    // Update button states
    prevButton.disabled = this.currentMember === 'groom';
    nextButton.disabled = this.currentMember === 'bride';

    // Update indicator dots
    indicatorDots.forEach(dot => {
      if (dot.getAttribute('data-member') === this.currentMember) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}
