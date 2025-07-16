export function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed; top: 0; left: 0; height: 3px; width: 0%;
        background: linear-gradient(90deg, #0ea5e9, #2563eb);
        z-index: 1000;
        transition: width 0.1s linear;
    `;
    document.body.appendChild(progressBar);

    let scrollTimeout;
    const updateProgress = () => {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = `${scrollProgress}%`;
    };

    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(updateProgress);
    }, { passive: true });
}