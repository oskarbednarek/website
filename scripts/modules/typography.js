export function initTypography() {
    // Inject Google Font for 'Inter'
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
    document.head.appendChild(fontLink);

    // Inject base typography styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4 { letter-spacing: -0.02em; }
        .hero h1 { font-size: clamp(2.5rem, 5vw, 3.75rem); background: linear-gradient(90deg, #fff, #a7cce5); -webkit-background-clip: text; background-clip: text; color: transparent; line-height: 1.2; }
        .gradient-text {
            background: linear-gradient(90deg, #0ea5e9, #6366f1, #a855f7);
            background-size: 200% auto;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: textShimmer 4s ease-in-out infinite alternate;
        }
        @keyframes textShimmer {
            from { background-position: 0% 50%; }
            to { background-position: 100% 50%; }
        }
    `;
    document.head.appendChild(styleSheet);

    // Apply gradient text effect to spans in headings
    document.querySelectorAll('h2, .hero h1').forEach(heading => {
        heading.querySelectorAll('span.text-sky-400').forEach(span => {
            span.classList.remove('text-sky-400');
            span.classList.add('gradient-text');
        });
    });
}