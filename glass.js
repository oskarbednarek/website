// Create glass.js
document.addEventListener('DOMContentLoaded', () => {
    // Add glassmorphism style to header
    const header = document.querySelector('header');
    header.classList.add('backdrop-blur-lg');
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';

    // Add glass cards to projects
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    .glass-card {
      background: rgba(31, 31, 31, 0.6);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      transition: all 0.4s ease;
    }
    
    .glass-card:hover {
      background: rgba(31, 31, 31, 0.8);
      border: 1px solid rgba(14, 165, 233, 0.3);
      box-shadow: 0 10px 30px rgba(14, 165, 233, 0.15);
    }
  `;
    document.head.appendChild(styleSheet);

    // Apply glass effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('glass-card');
    });
});