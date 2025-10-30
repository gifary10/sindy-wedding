import { WeddingNavigation } from './navigation.js';
import { WeddingCouple } from './couple.js';
import { WeddingStory } from './story.js';
import { WeddingDetails } from './details.js';
import { WeddingGallery } from './gallery.js';
import { WeddingFooter } from './footer.js';
import { WeddingModal } from './modal.js';
import { WeddingDataDisplay } from './tampil.js';

class WeddingApp {
  constructor() {
    this.scrollReveal = null;
    this.modal = null;
    this.dataDisplay = null;
    this.init();
  }

  async init() {
    // Initialize ScrollReveal
    await this.initScrollReveal();
    
    // Initialize all components
    this.initComponents();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Mark as loaded
    document.body.classList.add('loaded');
  }

  async initScrollReveal() {
    if (typeof ScrollReveal !== 'undefined') {
      this.scrollReveal = ScrollReveal({
        duration: 800,
        distance: '50px',
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        origin: 'bottom',
        cleanup: true,
        reset: false
      });
    } else {
      // Fallback if ScrollReveal is not available
      this.scrollReveal = {
        reveal: (element, options) => {
          element.classList.add('revealed');
        }
      };
    }
  }

  initComponents() {
    try {
      // Initialize navigation
      this.navigation = new WeddingNavigation();
      
      // Initialize modal
      this.modal = new WeddingModal();
      
      // Initialize couple section
      this.couple = new WeddingCouple(this.scrollReveal);
      
      // Initialize story section
      this.story = new WeddingStory(this.scrollReveal);
      
      // Initialize details section
      this.details = new WeddingDetails(this.scrollReveal);
      
      // Initialize gallery section
      this.gallery = new WeddingGallery(this.scrollReveal);
      
      // Initialize data display section
      this.dataDisplay = new WeddingDataDisplay();
      
      // Initialize footer
      this.footer = new WeddingFooter();
      
      // Create floating hearts for sections that need them
      setTimeout(() => {
        if (this.couple && typeof this.couple.createFloatingHearts === 'function') {
          this.couple.createFloatingHearts();
        }
        if (this.footer && typeof this.footer.createFloatingHearts === 'function') {
          this.footer.createFloatingHearts();
        }
      }, 1000);
    } catch (error) {
      console.error('Error initializing components:', error);
    }
  }

  setupEventListeners() {
    // Handle page load
    window.addEventListener('load', () => {
      this.handlePageLoad();
    });

    // Handle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.handleScroll();
      }, 10);
    });

    // Handle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });

    // Add loading state management
    this.setupLoadingState();
  }

  handlePageLoad() {
    // Add loaded class to body for transitions
    document.body.classList.add('loaded');
    
    // Initialize any lazy loading components
    this.initializeLazyComponents();
  }

  handleScroll() {
    // You can add scroll-based animations here
    this.updateNavigationOnScroll();
  }

  handleResize() {
    // Handle responsive behavior
    this.handleResponsiveElements();
  }

  updateNavigationOnScroll() {
    // Update active navigation item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-target') === currentSection) {
        item.classList.add('active');
      }
    });
  }

  handleResponsiveElements() {
    // Handle any responsive element adjustments
    const headerContent = document.querySelector('.header-content');
    if (headerContent && window.innerWidth < 768) {
      // Adjust header content for mobile
      headerContent.style.padding = '0 15px';
    }
  }

  setupLoadingState() {
    // Show loading state initially
    document.body.classList.add('loading');
    
    // Remove loading state after everything is ready
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
      }, 500);
    });
  }

  initializeLazyComponents() {
    // Initialize any components that need to be loaded after main content
    this.initializeCountdowns();
    this.initializeImageLoading();
  }

  initializeCountdowns() {
    // Additional countdown initialization if needed
    const countdownElements = document.querySelectorAll('.countdown-timer');
    countdownElements.forEach(element => {
      // You can add additional countdown logic here
    });
  }

  initializeImageLoading() {
    // Handle lazy loading of images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      images.forEach(img => {
        img.src = img.getAttribute('data-src');
        img.classList.remove('lazy');
      });
    }
  }
}

// Initialize the app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new WeddingApp();
  });
} else {
  new WeddingApp();
}

// Export for potential use in other modules
export { WeddingApp };
