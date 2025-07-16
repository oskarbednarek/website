export function initAOS() {
    if (typeof AOS === 'undefined') {
        console.error('AOS library is not loaded.');
        return;
    }

    AOS.init({
        duration: 800,
        easing: 'ease-in-out-quad',
        once: false,
        mirror: false, // Set to false to avoid re-triggering animations on scroll up
        offset: 100,
        disable: false //window.innerWidth < 768,
    });

    // Refresh AOS on window resize, but do it efficiently
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            AOS.refresh();
        }, 150);
    });
}