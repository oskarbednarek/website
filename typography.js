document.addEventListener('DOMContentLoaded', () => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    h1, h2, h3, h4 {
      font-family: 'Inter', 'Roboto', sans-serif;
      letter-spacing: -0.02em;
    }
    
    body {
      font-family: 'Inter', 'Roboto', sans-serif;
      line-height: 1.7;
    }
    
    .hero h1 {
      font-size: clamp(2.5rem, 5vw, 4rem);
      background: linear-gradient(90deg, #fff, #0ea5e9);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1.2;
    }
  `;
    document.head.appendChild(styleSheet);

    // Add Inter font for better typography
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap';
    document.head.appendChild(fontLink);
    // Add to typography.js
    document.addEventListener('DOMContentLoaded', () => {
        // Your existing code...

        // Add gradient text effect to section headings
        document.querySelectorAll('h2').forEach(heading => {
            const span = heading.querySelector('span.text-sky-400');
            if (span) {
                span.classList.remove('text-sky-400');
                span.classList.add('gradient-text');

                const styleSheet = document.createElement('style');
                styleSheet.textContent = `
                .gradient-text {
                    background: linear-gradient(90deg, #0ea5e9, #2563eb, #7c3aed);
                    background-size: 200% auto;
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: textShimmer 3s ease infinite alternate;
                }
                
                @keyframes textShimmer {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 100% 50%; }
                }
            `;
                document.head.appendChild(styleSheet);
            }
        });
    });
});
