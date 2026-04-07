// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeBtn = document.querySelector('.close-menu');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-content a');

const toggleMenu = () => {
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
};

mobileMenuBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('[data-reveal]');

const revealOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle delay
                const delay = entry.target.getAttribute('data-reveal-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
};

// Header Styling on Scroll
const header = document.querySelector('.header');
const handleHeaderScroll = () => {
    if (window.scrollY > 100) {
        header.style.padding = '0.6rem 0';
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        header.style.padding = '1rem 0';
        header.style.background = 'rgba(10, 10, 10, 0.85)';
    }
};

// Smooth Scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    window.addEventListener('scroll', handleHeaderScroll);
});

// Add a parallax effect to the hero section (optional but looks premium)
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scroll * 0.3}px)`;
    }
});
