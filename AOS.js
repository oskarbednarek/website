// Optimized AOS.js implementation for smooth animations and better performance

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with optimized settings
    AOS.init({
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        once: false,
        mirror: true,
        offset: 120,
        anchorPlacement: 'top-bottom',
        disable: window.innerWidth < 768 ? true : false, // Disable on mobile for performance
        startEvent: 'DOMContentLoaded',
        debounceDelay: 50,
        throttleDelay: 99
    });

    // Refresh AOS on window resize with debounce for better performance
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            AOS.refresh();
        }, 200);
    });

    // Apply animations to specific elements
    setupAnimatedElements();

    // Set up performance optimizations
    setupPerformanceOptimizations();

    // Add custom animation styles
    addCustomStyles();

    // Check for reduced motion preference
    checkReducedMotion();
});

// Set up animated elements with staggered effects
function setupAnimatedElements() {
    // Project cards with staggered animations
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString());
        card.setAttribute('data-aos-duration', '800');
    });

    // Skills section with sequential animations
    const skillsHeading = document.querySelector('.skills h3');
    if (skillsHeading) {
        skillsHeading.setAttribute('data-aos', 'flip-up');
    }

    // Work section parallax images
    document.querySelectorAll('.parallax-container img').forEach(img => {
        img.setAttribute('data-aos', 'zoom-in');
        img.setAttribute('data-aos-duration', '1200');
    });

    // About section animations
    const aboutImg = document.querySelector('#about img');
    if (aboutImg) {
        aboutImg.setAttribute('data-aos', 'fade-left');
        aboutImg.setAttribute('data-aos-duration', '1000');
    }

    // Social icons with sequential animations
    document.querySelectorAll('.social-icon').forEach((icon, index) => {
        icon.setAttribute('data-aos', 'fade-up');
        icon.setAttribute('data-aos-delay', (index * 100).toString());
        icon.setAttribute('data-aos-duration', '600');
    });
}

// Performance optimizations for animations
function setupPerformanceOptimizations() {
    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Apply will-change only during animation time
                element.style.willChange = 'transform, opacity';

                // Remove will-change after animation completes to free up resources
                setTimeout(() => {
                    element.style.willChange = 'auto';
                }, parseInt(element.getAttribute('data-aos-duration') || 800) + 50);
            }
        });
    }, {threshold: 0.1, rootMargin: '50px'});

    // Observe elements with AOS attributes
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// Add custom animation styles for smoother transitions
function addCustomStyles() {
    const customEasing = document.createElement('style');
    customEasing.textContent = `
        [data-aos] {
            transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1.0) !important;
            backface-visibility: hidden;
        }
        
        /* Enhanced fade animations with 3D acceleration */
        [data-aos='fade-up'] {
            transform: translate3d(0, 30px, 0);
        }
        
        [data-aos='fade-down'] {
            transform: translate3d(0, -30px, 0);
        }
        
        [data-aos='fade-right'] {
            transform: translate3d(-30px, 0, 0);
        }
        
        [data-aos='fade-left'] {
            transform: translate3d(30px, 0, 0);
        }
        
        /* Smoother animation when elements come into view */
        [data-aos].aos-animate {
            transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
        
        /* Custom animation for flip-up */
        [data-aos='flip-up'] {
            transform: perspective(2500px) rotateX(-15deg);
            opacity: 0;
        }
        
        [data-aos='flip-up'].aos-animate {
            transform: perspective(2500px) rotateX(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(customEasing);
}

// Check for reduced motion preference and disable animations if needed
function checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable animations completely for accessibility
        AOS.init({ disable: true });

        // Make all elements visible immediately
        document.querySelectorAll('[data-aos]').forEach(element => {
            element.removeAttribute('data-aos');
            element.removeAttribute('data-aos-delay');
            element.removeAttribute('data-aos-duration');
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.style.transition = 'none';
        });
    }

    // Listen for changes in the preference
    prefersReducedMotion.addEventListener('change', event => {
        if (event.matches) {
            AOS.init({ disable: true });
        } else {
            AOS.init({ disable: false });
            AOS.refresh();
        }
    });
}