// Create animation.js
document.addEventListener('DOMContentLoaded', () => {
    // Create base animation styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    .slide-up-element {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s cubic-bezier(0.2, 0, 0, 1.0), 
                  transform 0.8s cubic-bezier(0.2, 0, 0, 1.0);
    }
    
    .slide-up-element.animated {
      opacity: 1;
      transform: translateY(0);
    }
  `;
    document.head.appendChild(styleSheet);

    // Apply staggered animations to text elements
    const createStaggerAnimation = (selector, delayIncrement = 0.1) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('slide-up-element');
            el.style.transitionDelay = `${index * delayIncrement}s`;
        });
    };

    // Create intersection observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    // Apply to various sections with staggered delays
    createStaggerAnimation('#projects h3, #projects p', 0.1);
    createStaggerAnimation('.skills h4', 0.07);

    // Observe all animation elements
    document.querySelectorAll('.slide-up-element').forEach(el => {
        observer.observe(el);
    });
});