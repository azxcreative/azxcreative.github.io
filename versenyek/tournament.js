// ============================================
// DOM Elements
// ============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const navMenuLinks = document.querySelectorAll('.nav__menu a');

// ============================================
// Mobile Navigation Toggle
// ============================================
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking any menu link (including VISSZA button)
if (navMenuLinks.length) {
    navMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navToggle && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target) &&
        navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll Spy for Active Navigation Links
// ============================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav(); // Initial call

// ============================================
// Scroll Reveal Animation (IntersectionObserver)
// ============================================
const revealElements = document.querySelectorAll('.lebonyolitas__step, .tournament-video, .prize-pool, .jelentkezes, .tournament-kapcsolat, .partnerek__grid, .tabella__list, .gyoztesek__grid');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
});

// ============================================
// Header Scroll Effect
// ============================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ============================================
// Prefers Reduced Motion Check
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--transition', '0.01s');
    document.documentElement.style.setProperty('--transition-fast', '0.01s');
}

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Keyboard Navigation Support
// ============================================
// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Focus trap for mobile menu
if (navMenu) {
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// ============================================
// Video Thumbnail → Modal
// ============================================
const videoThumbnail = document.getElementById('video-thumbnail');
const videoModal = document.getElementById('video-modal');
const videoModalClose = document.getElementById('video-modal-close');
const videoModalOverlay = document.getElementById('video-modal-overlay');
const videoModalIframe = document.getElementById('video-modal-iframe');

const videoSrc = 'https://www.youtube.com/embed/ZOVuj7Fm9bM?autoplay=1';

function openVideoModal() {
    if (videoModal && videoModalIframe) {
        videoModalIframe.src = videoSrc;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeVideoModal() {
    if (videoModal && videoModalIframe) {
        videoModal.classList.remove('active');
        videoModalIframe.src = '';
        document.body.style.overflow = '';
    }
}

if (videoThumbnail) {
    videoThumbnail.addEventListener('click', openVideoModal);
    videoThumbnail.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openVideoModal();
        }
    });
}

if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
}

if (videoModalOverlay) {
    videoModalOverlay.addEventListener('click', closeVideoModal);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});
