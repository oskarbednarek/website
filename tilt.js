// Create tilt.js
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;

        // Calculate mouse position relative to card center
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;

        // Calculate rotation (smaller values for subtler effect)
        const rotateY = mouseX * 0.05;
        const rotateX = -mouseY * 0.05;

        // Apply transform with perspective
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease';

        // Add highlight effect based on mouse position
        const highlight = card.querySelector('.highlight') || createHighlight(card);
        highlight.style.opacity = '0.1';
        highlight.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }

    function createHighlight(card) {
        const highlight = document.createElement('div');
        highlight.className = 'highlight';
        highlight.style.position = 'absolute';
        highlight.style.width = '100px';
        highlight.style.height = '100px';
        highlight.style.borderRadius = '50%';
        highlight.style.background = 'radial-gradient(circle, white 0%, transparent 70%)';
        highlight.style.pointerEvents = 'none';
        highlight.style.opacity = '0';
        highlight.style.transition = 'opacity 0.2s ease';
        highlight.style.top = '0';
        highlight.style.left = '0';
        highlight.style.transform = 'translate(-50%, -50%)';
        highlight.style.filter = 'blur(10px)';
        highlight.style.zIndex = '5';

        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(highlight);
        return highlight;
    }

    function resetTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        this.style.transition = 'transform 0.5s ease';

        const highlight = this.querySelector('.highlight');
        if (highlight) highlight.style.opacity = '0';
    }
});