export function initGlassEffect() {
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('backdrop-blur-lg');
    }

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    .glass-card {
      background: rgba(31, 31, 31, 0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      transition: background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease;
    }
    .glass-card:hover {
      background: rgba(31, 31, 31, 0.7);
      border-color: rgba(14, 165, 233, 0.3);
      box-shadow: 0 8px 30px rgba(14, 165, 233, 0.1);
    }
  `;
    document.head.appendChild(styleSheet);

    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('glass-card');
    });
}