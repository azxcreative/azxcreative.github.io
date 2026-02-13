// ============================================
// Support Progress Configuration
// ============================================
const supportGoal = 500000;
const stretchGoal = 700000;
let supportCurrent = 0; // Update this value manually to change progress

// ============================================
// Legendák section – supporter/partner names shown in the cloud
// Add new names as a new string in the array below (one per line for clarity).
// ============================================
const supporterNames = [
    'AZXcreative',
    'SupplyblockTV',
    'HungarianProSeries',
    'A Te Neved!'
    // Add more names here, e.g.:
    // 'NewPartnerName',
];

// ============================================
// DOM Elements
// ============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const tamogatokCloud = document.getElementById('tamogatok-cloud');

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

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

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
// Support Progress Bar Update (Removed - no longer needed)
// ============================================

// ============================================
// Render Supporter Cloud
// ============================================
function renderSupporterCloud() {
    if (!tamogatokCloud) return;

    tamogatokCloud.innerHTML = '';
    
    supporterNames.forEach(name => {
        const span = document.createElement('span');
        span.textContent = name;
        tamogatokCloud.appendChild(span);
    });
}

renderSupporterCloud();

// ============================================
// Scroll Reveal Animation (IntersectionObserver)
// ============================================
const revealElements = document.querySelectorAll('.section, .tournament-card, .program-card, .info-chip, .tier-card, .video-card, .product-card, .accordion-item');

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
// Accordion Functionality (GYIK)
// ============================================
const accordionHeaders = document.querySelectorAll('.accordion-item__header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        const content = header.nextElementSibling;

        // Close all other accordions
        accordionHeaders.forEach(otherHeader => {
            if (otherHeader !== header) {
                otherHeader.setAttribute('aria-expanded', 'false');
                const otherContent = otherHeader.nextElementSibling;
                if (otherContent) {
                    otherContent.style.maxHeight = '0';
                }
            }
        });

        // Toggle current accordion
        if (isExpanded) {
            header.setAttribute('aria-expanded', 'false');
            content.style.maxHeight = '0';
        } else {
            header.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});

// ============================================
// Toast Notification
// ============================================
function showToast(message, duration = 3000) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ============================================
// Contact Form Validation & Submission
// ============================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation
        if (!name || !email || !message) {
            showToast('Kérlek, töltsd ki az összes mezőt!', 3000);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Kérlek, adj meg egy érvényes email címet!', 3000);
            return;
        }

        // Simulate form submission (since no backend)
        showToast('Köszönjük az üzeneted! Hamarosan válaszolunk.', 4000);
        contactForm.reset();
    });
}

// ============================================
// Adomány Modal
// ============================================
const tamogatasAdomanyBtn = document.getElementById('tamogatas-adomany-btn');
const adomanyModal = document.getElementById('adomany-modal');
const adomanyModalClose = document.getElementById('adomany-modal-close');
const adomanyModalOverlay = document.getElementById('adomany-modal-overlay');
const adomanyElfogadomBtn = document.getElementById('adomany-elfogadom-btn');
const adomanyMethods = document.getElementById('adomany-methods');

function openAdomanyModal() {
    if (adomanyModal) {
        // Reset: show Elfogadom button, hide payment methods
        if (adomanyElfogadomBtn) adomanyElfogadomBtn.parentElement.style.display = '';
        if (adomanyMethods) adomanyMethods.style.display = 'none';
        adomanyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAdomanyModal() {
    if (adomanyModal) {
        adomanyModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Open modal from Támogatás section button
if (tamogatasAdomanyBtn) {
    tamogatasAdomanyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAdomanyModal();
    });
}

// Elfogadom click → hide Elfogadom, reveal payment methods
if (adomanyElfogadomBtn) {
    adomanyElfogadomBtn.addEventListener('click', () => {
        adomanyElfogadomBtn.parentElement.style.display = 'none';
        if (adomanyMethods) adomanyMethods.style.display = '';
    });
}

// Close modal
if (adomanyModalClose) {
    adomanyModalClose.addEventListener('click', closeAdomanyModal);
}

if (adomanyModalOverlay) {
    adomanyModalOverlay.addEventListener('click', closeAdomanyModal);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && adomanyModal && adomanyModal.classList.contains('active')) {
        closeAdomanyModal();
    }
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
// Floating CTA Button - Show after Hero
// ============================================
const floatingCTA = document.querySelector('.floating-cta');
const heroSection = document.getElementById('hero');

function toggleFloatingCTA() {
    if (!floatingCTA || !heroSection) return;
    
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const scrollPosition = window.pageYOffset + window.innerHeight;
    
    // Show button only after scrolling past hero section
    if (window.pageYOffset > heroBottom - window.innerHeight) {
        floatingCTA.classList.add('visible');
    } else {
        floatingCTA.classList.remove('visible');
    }
}

window.addEventListener('scroll', toggleFloatingCTA);
window.addEventListener('resize', toggleFloatingCTA);
toggleFloatingCTA(); // Initial check

// ============================================
// Prefers Reduced Motion Check
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition', '0.01s');
    document.documentElement.style.setProperty('--transition-fast', '0.01s');
}

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all initializations are complete
    renderSupporterCloud();
    updateActiveNav();
    
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Lazy Loading for Images (if needed)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

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
// Video Thumbnail → Modal (Rólunk)
// ============================================
const rolunkVideoThumb = document.getElementById('rolunk-video-thumbnail');
const rolunkVideoModal = document.getElementById('rolunk-video-modal');
const rolunkVideoClose = document.getElementById('rolunk-video-modal-close');
const rolunkVideoOverlay = document.getElementById('rolunk-video-modal-overlay');
const rolunkVideoIframe = document.getElementById('rolunk-video-modal-iframe');

const rolunkVideoSrc = 'https://www.youtube.com/embed/6O9eGtQ7cXU?autoplay=1';

function openRolunkVideo() {
    if (rolunkVideoModal && rolunkVideoIframe) {
        rolunkVideoIframe.src = rolunkVideoSrc;
        rolunkVideoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeRolunkVideo() {
    if (rolunkVideoModal && rolunkVideoIframe) {
        rolunkVideoModal.classList.remove('active');
        rolunkVideoIframe.src = '';
        document.body.style.overflow = '';
    }
}

if (rolunkVideoThumb) {
    rolunkVideoThumb.addEventListener('click', openRolunkVideo);
    rolunkVideoThumb.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openRolunkVideo();
        }
    });
}

// Támogatás thumbnail uses the same modal
const tamogatasVideoThumb = document.getElementById('tamogatas-video-thumbnail');
if (tamogatasVideoThumb) {
    tamogatasVideoThumb.addEventListener('click', openRolunkVideo);
    tamogatasVideoThumb.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openRolunkVideo();
        }
    });
}

if (rolunkVideoClose) {
    rolunkVideoClose.addEventListener('click', closeRolunkVideo);
}

if (rolunkVideoOverlay) {
    rolunkVideoOverlay.addEventListener('click', closeRolunkVideo);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && rolunkVideoModal && rolunkVideoModal.classList.contains('active')) {
        closeRolunkVideo();
    }
});

// ============================================
// Média Section — Megtekintés buttons → same modal
// ============================================
document.querySelectorAll('.media-video-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const videoUrl = btn.dataset.video;
        if (rolunkVideoModal && rolunkVideoIframe && videoUrl) {
            rolunkVideoIframe.src = videoUrl;
            rolunkVideoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});
