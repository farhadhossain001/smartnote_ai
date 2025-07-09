// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Screenshot Slider
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const sliderContainer = document.querySelector('.slider-container');

function showSlide(index) {
    if (!sliderContainer || !slides.length) return;

    const slideWidth = slides[0].offsetWidth + 20; // width + gap
    const scrollPosition = index * slideWidth;

    sliderContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentSlideIndex = index;
}

function changeSlide(direction) {
    const newIndex = currentSlideIndex + direction;

    if (newIndex >= slides.length) {
        showSlide(0);
    } else if (newIndex < 0) {
        showSlide(slides.length - 1);
    } else {
        showSlide(newIndex);
    }
}

function currentSlide(index) {
    showSlide(index - 1);
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    if (slides.length > 0) {
        showSlide(0);
    }
});

// Auto-play slider
setInterval(() => {
    if (slides.length > 0) {
        changeSlide(1);
    }
}, 4000);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .testimonial, .faq-item, .section-title');
    animateElements.forEach(el => observer.observe(el));
});

// Touch/swipe support for mobile slider
let startX = 0;
let endX = 0;
let isScrolling = false;

document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');

    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isScrolling = false;
        });

        sliderContainer.addEventListener('touchmove', (e) => {
            if (!isScrolling) {
                isScrolling = true;
            }
        });

        sliderContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            if (!isScrolling) {
                handleSwipe();
            }
        });

        // Handle scroll events to update active dot
        sliderContainer.addEventListener('scroll', () => {
            const slideWidth = slides[0] ? slides[0].offsetWidth + 20 : 270;
            const scrollLeft = sliderContainer.scrollLeft;
            const newIndex = Math.round(scrollLeft / slideWidth);

            if (newIndex !== currentSlideIndex && newIndex >= 0 && newIndex < slides.length) {
                currentSlideIndex = newIndex;
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === newIndex);
                });
            }
        });
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}

// Fixed phone mockup - no parallax effect
// Phone mockup stays in fixed position for better visual stability

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    } else {
        return num.toString();
    }
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('50K+')) {
                    animateCounter(stat, 50000);
                } else if (text.includes('4.8')) {
                    animateCounter(stat, 4.8);
                } else if (text.includes('1M+')) {
                    animateCounter(stat, 1000000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});

// Form validation (if contact form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'screenshots/1.png',
        'screenshots/2.png',
        'screenshots/3.png',
        'screenshots/4.png',
        'screenshots/5.png',
        'screenshots/6.png'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    // This would integrate with your analytics service
    console.log(`Clicked: ${element} - Action: ${action}`);
}

// Add click tracking to important buttons
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.btn-download, .btn-primary');
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackClick('download-button', 'click');
        });
    });
});

// Lazy loading for images (if more images are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);
