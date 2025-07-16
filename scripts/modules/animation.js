export function initTextAnimations() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    .slide-up-element {
      opacity: 0;
      transform: translateY(25px);
      transition: opacity 0.8s cubic-bezier(0.2, 0, 0, 1), transform 0.8s cubic-bezier(0.2, 0, 0, 1);
    }
    .slide-up-element.animated {
      opacity: 1;
      transform: translateY(0);
    }
  `;
    document.head.appendChild(styleSheet);

    const createStaggerAnimation = (selector, delayIncrement = 0.08) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('slide-up-element');
            el.style.transitionDelay = `${index * delayIncrement}s`;
        });
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                obs.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.1 });

    // Apply staggered animations
    createStaggerAnimation('#projects h3, #projects p');
    createStaggerAnimation('.skills h4', 0.05);

    document.querySelectorAll('.slide-up-element').forEach(el => {
        observer.observe(el);
    });
}