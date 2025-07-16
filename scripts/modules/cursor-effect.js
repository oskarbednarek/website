export function initCursorEffect() {
    // 📱 Mobile Optimization: This effect is disabled on touch devices.
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return;
    }

    const cursorOuter = document.createElement('div');
    cursorOuter.className = 'cursor-outer';
    document.body.appendChild(cursorOuter);

    const cursorInner = document.createElement('div');
    cursorInner.className = 'cursor-inner';
    document.body.appendChild(cursorInner);

    const style = document.createElement('style');
    style.textContent = `
        body, a, button { cursor: none !important; }
        .cursor-outer { position: fixed; width: 30px; height: 30px; border: 1px solid rgba(14, 165, 233, 0.5); border-radius: 50%; pointer-events: none; z-index: 9999; opacity: 0; transition: width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s, transform 0.15s linear; }
        .cursor-inner { position: fixed; width: 5px; height: 5px; background-color: #0ea5e9; border-radius: 50%; pointer-events: none; z-index: 9999; opacity: 0; transition: transform 0.05s linear; }
    `;
    document.head.appendChild(style);

    let mouseX = 0, mouseY = 0;
    let isVisible = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isVisible) {
            cursorInner.style.opacity = '1';
            cursorOuter.style.opacity = '1';
            isVisible = true;
        }
    });

    const animateCursor = () => {
        cursorInner.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`;
        cursorOuter.style.transform = `translate(${mouseX - 15}px, ${mouseY - 15}px)`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOuter.style.width = '50px';
            cursorOuter.style.height = '50px';
            cursorOuter.style.borderColor = 'rgba(14, 165, 233, 0.8)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOuter.style.width = '30px';
            cursorOuter.style.height = '30px';
            cursorOuter.style.borderColor = 'rgba(14, 165, 233, 0.5)';
        });
    });
}