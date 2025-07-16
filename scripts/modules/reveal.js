export function initImageReveal() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    .reveal-img { clip-path: inset(0 100% 0 0); transition: clip-path 1.2s cubic-bezier(0.7, 0, 0.175, 1); }
    .reveal-img.revealed { clip-path: inset(0 0 0 0); }
    .reveal-container { position: relative; overflow: hidden; line-height: 0; }
    .reveal-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0ea5e9; transform: translateX(-101%); z-index: 1; }
    .reveal-container.animate .reveal-overlay { animation: reveal-sweep 1.2s cubic-bezier(0.7, 0, 0.175, 1); }
    @keyframes reveal-sweep {
      0% { transform: translateX(-101%); }
      45% { transform: translateX(0); }
      100% { transform: translateX(101%); }
    }
  `;
    document.head.appendChild(styleSheet);

    document.querySelectorAll('.project-card img').forEach(img => {
        const container = document.createElement('div');
        container.className = 'reveal-container';

        const overlay = document.createElement('div');
        overlay.className = 'reveal-overlay';

        img.classList.add('reveal-img');
        img.parentNode.insertBefore(container, img);
        container.append(img, overlay);
    });

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const img = container.querySelector('.reveal-img');
                container.classList.add('animate');
                setTimeout(() => img.classList.add('revealed'), 400);
                obs.unobserve(container);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.reveal-container').forEach(container => {
        revealObserver.observe(container);
    });
}