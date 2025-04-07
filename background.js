// Optimized background.js
document.addEventListener('DOMContentLoaded', () => {
    // Only create canvas if user's device is powerful enough
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        // Create a canvas for the background
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.4';
        document.body.prepend(canvas);

        const ctx = canvas.getContext('2d', { alpha: true });

        // Set canvas size with pixel ratio awareness
        const setCanvasSize = () => {
            const pixelRatio = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * pixelRatio;
            canvas.height = window.innerHeight * pixelRatio;
            ctx.scale(pixelRatio, pixelRatio);
        };

        setCanvasSize();

        // Draw gradient with requestAnimationFrame
        function drawGradientMesh() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const gradient = ctx.createRadialGradient(
                canvas.width * 0.3, canvas.height * 0.3, 0,
                canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.7
            );

            gradient.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
            gradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.05)');
            gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add a second gradient for depth
            const gradient2 = ctx.createRadialGradient(
                canvas.width * 0.7, canvas.height * 0.7, 0,
                canvas.width * 0.7, canvas.height * 0.7, canvas.width * 0.5
            );

            gradient2.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
            gradient2.addColorStop(0.6, 'rgba(139, 92, 246, 0.03)');
            gradient2.addColorStop(1, 'rgba(10, 10, 10, 0)');

            ctx.fillStyle = gradient2;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        drawGradientMesh();

        // Debounce resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                setCanvasSize();
                drawGradientMesh();
            }, 200);
        });
    } else {
        // For mobile devices, add a simpler background
        const simpleGradient = document.createElement('div');
        simpleGradient.style.position = 'fixed';
        simpleGradient.style.top = '0';
        simpleGradient.style.left = '0';
        simpleGradient.style.width = '100%';
        simpleGradient.style.height = '100%';
        simpleGradient.style.zIndex = '-1';
        simpleGradient.style.background = 'radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.1), transparent 70%), radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.1), transparent 70%)';
        document.body.prepend(simpleGradient);
    }
});