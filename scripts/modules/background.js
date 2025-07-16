export function initBackground() {
    // 📱 Mobile Optimization: Use a simpler background for mobile devices.
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        createSimpleGradientBackground();
    } else {
        createCanvasBackground();
    }
}

function createCanvasBackground() {
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

    const setCanvasSize = () => {
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);
    };

    const drawGradientMesh = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const gradient = ctx.createRadialGradient(
            canvas.width * 0.3, canvas.height * 0.3, 0,
            canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.7
        );
        gradient.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
        gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const gradient2 = ctx.createRadialGradient(
            canvas.width * 0.7, canvas.height * 0.7, 0,
            canvas.width * 0.7, canvas.height * 0.7, canvas.width * 0.5
        );
        gradient2.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
        gradient2.addColorStop(1, 'rgba(10, 10, 10, 0)');
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    setCanvasSize();
    requestAnimationFrame(drawGradientMesh); // Use rAF for initial draw

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setCanvasSize();
            requestAnimationFrame(drawGradientMesh);
        }, 200);
    });
}

function createSimpleGradientBackground() {
    const simpleGradient = document.createElement('div');
    simpleGradient.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;
        background: radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.1), transparent 70%), 
                    radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.1), transparent 70%);
    `;
    document.body.prepend(simpleGradient);
}