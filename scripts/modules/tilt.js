export function initTiltEffect() {
    // 📱 Mobile Optimization: This effect is disabled on touch devices.
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return;
    }

    const cards = document.querySelectorAll('.project-card');

    const handleTilt = (e) => {
        const card = e.currentTarget;
        const { left, top, width, height } = card.getBoundingClientRect();
        const mouseX = (e.clientX - left) / width - 0.5; // value from -0.5 to 0.5
        const mouseY = (e.clientY - top) / height - 0.5; // value from -0.5 to 0.5

        const rotateY = mouseX * 15; // Max rotation 7.5deg
        const rotateX = -mouseY * 15; // Max rotation 7.5deg

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const resetTilt = (e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    cards.forEach(card => {
        card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
}