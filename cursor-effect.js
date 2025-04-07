// Create cursor-effect.js
document.addEventListener('DOMContentLoaded', () => {
    // Create custom cursor elements
    const cursorOuter = document.createElement('div');
    cursorOuter.className = 'cursor-outer';
    document.body.appendChild(cursorOuter);

    const cursorInner = document.createElement('div');
    cursorInner.className = 'cursor-inner';
    document.body.appendChild(cursorInner);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        body {
            cursor: none;
        }
        
        .cursor-outer {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 1px solid rgba(14, 165, 233, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            transition: width 0.2s, height 0.2s, opacity 0.2s;
            z-index: 9999;
            opacity: 0;
        }
        
        .cursor-inner {
            position: fixed;
            width: 6px;
            height: 6px;
            background-color: rgba(14, 165, 233, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
        }
        
        a, button, .project-card {
            cursor: none;
        }
        
        a:hover ~ .cursor-outer,
        button:hover ~ .cursor-outer,
        .project-card:hover ~ .cursor-outer {
            width: 60px;
            height: 60px;
            border-color: rgba(14, 165, 233, 0.8);
        }
    `;
    document.head.appendChild(style);

    // Add mouse move handler with smooth animation
    let mouseX = 0, mouseY = 0;
    let innerX = 0, innerY = 0;
    let outerX = 0, outerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Show cursors after first movement
        cursorInner.style.opacity = '1';
        cursorOuter.style.opacity = '1';
    });

    // Animated loop for smooth cursor movement
    function animateCursor() {
        innerX = lerp(innerX, mouseX, 0.2);
        innerY = lerp(innerY, mouseY, 0.2);
        outerX = lerp(outerX, mouseX, 0.1);
        outerY = lerp(outerY, mouseY, 0.1);

        cursorInner.style.left = `${innerX}px`;
        cursorInner.style.top = `${innerY}px`;
        cursorOuter.style.left = `${outerX}px`;
        cursorOuter.style.top = `${outerY}px`;

        requestAnimationFrame(animateCursor);
    }

    // Linear interpolation function for smooth movement
    function lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }

    animateCursor();

    // Detect interactive elements for cursor effects
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOuter.style.width = '60px';
            cursorOuter.style.height = '60px';
            cursorOuter.style.borderColor = 'rgba(14, 165, 233, 0.8)';
            cursorInner.style.backgroundColor = 'rgba(14, 165, 233, 1)';
        });

        el.addEventListener('mouseleave', () => {
            cursorOuter.style.width = '40px';
            cursorOuter.style.height = '40px';
            cursorOuter.style.borderColor = 'rgba(14, 165, 233, 0.5)';
            cursorInner.style.backgroundColor = 'rgba(14, 165, 233, 0.8)';
        });
    });
});