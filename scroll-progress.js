// Create scroll-progress.js
document.addEventListener('DOMContentLoaded', () => {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.width = '0%';
    progressBar.style.background = 'linear-gradient(90deg, #0ea5e9, #2563eb)';
    progressBar.style.zIndex = '1000';
    progressBar.style.transition = 'width 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = `${scrollProgress}%`;

        // Add shadow effect as user scrolls down
        if (scrollTop > 50) {
            progressBar.style.boxShadow = '0 0 10px rgba(14, 165, 233, 0.7)';
        } else {
            progressBar.style.boxShadow = 'none';
        }
    });
    // const sections = document.querySelectorAll('section[id]');
    // const navContainer = document.createElement('div');
    // navContainer.className = 'fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:block';
    // navContainer.innerHTML = '<div class="flex flex-col space-y-4"></div>';
    // document.body.appendChild(navContainer);
    //
    // sections.forEach((section, index) => {
    //     const dot = document.createElement('a');
    //     dot.href = `#${section.id}`;
    //     dot.className = 'w-3 h-3 rounded-full bg-white bg-opacity-30 transition-all duration-300 hover:bg-sky-400 hover:scale-125';
    //     dot.setAttribute('data-section', section.id);
    //
    //     navContainer.querySelector('div').appendChild(dot);
    // });
    //
    // // Update active section on scroll
    // window.addEventListener('scroll', () => {
    //     const scrollPosition = window.scrollY + (window.innerHeight / 2);
    //
    //     sections.forEach(section => {
    //         const sectionTop = section.offsetTop;
    //         const sectionHeight = section.offsetHeight;
    //
    //         if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
    //             document.querySelector(`[data-section="${section.id}"]`).classList.add('bg-sky-400', 'scale-125');
    //             document.querySelector(`[data-section="${section.id}"]`).classList.remove('bg-opacity-30');
    //         } else {
    //             document.querySelector(`[data-section="${section.id}"]`).classList.remove('bg-sky-400', 'scale-125');
    //             document.querySelector(`[data-section="${section.id}"]`).classList.add('bg-opacity-30');
    //         }
    //     });
    // });
});