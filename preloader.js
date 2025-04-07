document.addEventListener('DOMContentLoaded', () => {
    // Create preloader with animated logo
    const preloader = document.createElement('div');
    preloader.className = 'fixed inset-0 flex flex-col items-center justify-center bg-black z-50';
    preloader.innerHTML = `
        <div class="mb-4">
            <h1 class="preloader-logo text-white text-4xl font-bold">
                <span>o</span><span>z</span><span>e</span><span>e</span><span class="text-sky-400">.</span><span class="text-sky-400">m</span><span class="text-sky-400">e</span>
            </h1>
        </div>
        <div class="loading-bar-container w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div class="loading-bar h-full w-0 bg-gradient-to-r from-sky-400 to-blue-500"></div>
        </div>
    `;

    document.body.prepend(preloader);

    // Add custom animation styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .preloader-logo span {
            display: inline-block;
            transform: translateY(20px);
            opacity: 0;
            animation: dropIn 0.3s ease forwards;
        }
        
        @keyframes dropIn {
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .preloader-logo span:nth-child(1) { animation-delay: 0.1s; }
        .preloader-logo span:nth-child(2) { animation-delay: 0.2s; }
        .preloader-logo span:nth-child(3) { animation-delay: 0.3s; }
        .preloader-logo span:nth-child(4) { animation-delay: 0.4s; }
        .preloader-logo span:nth-child(5) { animation-delay: 0.5s; }
        .preloader-logo span:nth-child(6) { animation-delay: 0.6s; }
        .preloader-logo span:nth-child(7) { animation-delay: 0.7s; }
        
        .loading-bar {
            animation: fillBar 1s 0.7s ease forwards;
        }
        
        @keyframes fillBar {
            to { width: 100%; }
        }
    `;
    document.head.appendChild(styleSheet);

    // Hide preloader after content loads with smooth fade
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.6s ease';

            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 1500); // Allow time for animation to complete
    });
});