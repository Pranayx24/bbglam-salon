// Initialize Lucide Icons
lucide.createIcons();

// Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');
const links = document.querySelectorAll('a, button, .service-card, .gallery-item, .mobile-menu-btn');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;

const animateCursor = () => {
    // Smooth easing for large cursor
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    // Faster easing for dot
    dotX += (mouseX - dotX) * 0.45;
    dotY += (mouseY - dotY) * 0.45;

    if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
    }
    if (cursorDot) {
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
    }

    requestAnimationFrame(animateCursor);
};

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Cursor Hover Effects
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        if (cursor) cursor.classList.add('hover');
    });
    link.addEventListener('mouseleave', () => {
        if (cursor) cursor.classList.remove('hover');
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeBtn = document.querySelector('.close-menu');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-content a');

const toggleMenu = () => {
    if (mobileNavOverlay) {
        mobileNavOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
    }
};

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('[data-reveal]');

const revealOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-reveal-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
};

// Header Styling on Scroll
const header = document.querySelector('.header');
const handleHeaderScroll = () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
};

// Parallax Effect for Hero
const handleHeroParallax = () => {
    const scroll = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scroll * 0.4}px)`;
        heroContent.style.opacity = 1 - (scroll / 700);
    }
};

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    animateCursor();
    
    // Remove loading class
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);
    
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        handleHeroParallax();
    });
});

// Smooth Scroll Refinement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header ? header.offsetHeight : 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Modal Logic
const modalOverlay = document.getElementById('book-modal');
const openModalBtns = document.querySelectorAll('.open-modal');
const closeModalBtn = document.querySelector('.modal-close');
const bookingForm = document.getElementById('booking-form');

const toggleModal = (show) => {
    if (modalOverlay) {
        modalOverlay.style.opacity = show ? '1' : '0';
        modalOverlay.style.visibility = show ? 'visible' : 'hidden';
        document.body.style.overflow = show ? 'hidden' : '';
    }
};

openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(true);
    });
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => toggleModal(false));
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) toggleModal(false);
    });
}

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('b-name').value;
        const service = document.getElementById('b-service').value;
        const date = document.getElementById('b-date').value;
        let time = document.getElementById('b-time').value;
        
        let [hours, minutes] = time.split(':');
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        let timeFormatted = `${hours}:${minutes} ${ampm}`;

        const message = `Hello BB Glam! I would like to book an appointment.\n\n*Name:* ${name}\n*Service:* ${service}\n*Date:* ${date}\n*Time:* ${timeFormatted}\n\nPlease confirm my slot!`;
        const whatsappUrl = `https://wa.me/919182984972?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        toggleModal(false);
        bookingForm.reset();
    });
}

// Services Tabs Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => {
            b.style.background = 'transparent';
            b.style.color = 'var(--gold)';
        });
        
        btn.style.background = 'var(--gold-gradient)';
        btn.style.color = '#000';
        
        tabPanes.forEach(pane => {
            pane.style.display = 'none';
        });
        
        const activePane = document.getElementById(targetTab);
        if (activePane) {
            activePane.style.display = 'block';
        }
    });
});

// FAQ Accordion Logic
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        const isOpen = answer.style.display === 'block';
        
        answer.style.display = isOpen ? 'none' : 'block';
        
        if (icon) {
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
});
