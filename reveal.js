// Add to a new file called reveal.js
document.addEventListener('DOMContentLoaded', () => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    .reveal-img {
      clip-path: inset(0 100% 0 0);
      transition: clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1);
    }
    
    .reveal-img.revealed {
      clip-path: inset(0 0 0 0);
    }
    
    .reveal-container {
      position: relative;
      overflow: hidden;
    }
    
    .reveal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #0ea5e9;
      transform: translateX(-100%);
      z-index: 1;
    }
    
    .reveal-container.animate .reveal-overlay {
      animation: reveal-sweep 1.2s cubic-bezier(0.77, 0, 0.175, 1);
    }
    
    @keyframes reveal-sweep {
      0% { transform: translateX(-100%); }
      50% { transform: translateX(0); }
      100% { transform: translateX(100%); }
    }
  `;
    document.head.appendChild(styleSheet);

    // Apply to all project images
    const projectImages = document.querySelectorAll('.project-card img');
    projectImages.forEach(img => {
        const container = document.createElement('div');
        container.className = 'reveal-container';

        const overlay = document.createElement('div');
        overlay.className = 'reveal-overlay';

        // Replace image with container
        const parent = img.parentNode;
        img.classList.add('reveal-img');
        parent.insertBefore(container, img);
        container.appendChild(img);
        container.appendChild(overlay);
    });

    // Create observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const img = container.querySelector('.reveal-img');

                // Trigger animations
                container.classList.add('animate');
                setTimeout(() => {
                    img.classList.add('revealed');
                }, 300);

                revealObserver.unobserve(container);
            }
        });
    }, { threshold: 0.3 });

    // Observe all containers
    document.querySelectorAll('.reveal-container').forEach(container => {
        revealObserver.observe(container);
    });
});