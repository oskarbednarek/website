document.addEventListener('DOMContentLoaded', () => {
    // Create the skills section HTML structure
    const skillsSection = document.querySelector('.skills');

    // Skills data - customize as needed
    const skills = [
        { name: 'Classic JS', percent: 90, color: '#0ea5e9' },
        { name: 'HTML/CSS', percent: 100, color: '#2563eb' },
        { name: 'React', percent: 10, color: '#61dafb', learning: true },
        { name: 'C#', percent: 40, color: '#8a2be2' },
        { name: 'Python', percent: 75, color: '#3776ab' },
        { name: 'C++', percent: 60, color: '#f34b7d' },
        { name: 'Reverse Engineering', percent: 50, color: '#ff6347' }
    ];

    // Clear existing content
    skillsSection.innerHTML = '<h3 class="text-2xl font-bold mb-6">My Skills</h3>';

    // Create container for skills
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'max-w-4xl mx-auto';

    skills.forEach(skill => {
        // Create skill container
        const skillBlock = document.createElement('div');
        skillBlock.className = 'mb-5 relative group';
        skillBlock.setAttribute('data-aos', 'fade-right');

        // Create header with name and percentage
        const header = document.createElement('div');
        header.className = 'flex justify-between items-center mb-2';

        const nameElem = document.createElement('h4');
        nameElem.className = 'text-lg font-bold';
        nameElem.innerHTML = skill.learning ?
            `${skill.name} <span class="ml-2 px-2 py-1 bg-opacity-20 rounded text-sm bg-blue-500 text-blue-300 animate-pulse">Learning</span>` :
            skill.name;

        const percentElem = document.createElement('span');
        percentElem.className = 'text-sky-400 font-bold';
        percentElem.textContent = `${skill.percent}%`;

        header.appendChild(nameElem);
        header.appendChild(percentElem);

        // Create progress bar container
        const barContainer = document.createElement('div');
        barContainer.className = 'h-2 bg-gray-800 rounded-full overflow-hidden';

        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'h-full transition-all duration-1000 ease-out transform origin-left scale-x-0';
        progressBar.style.width = `${skill.percent}%`;
        progressBar.style.background = `linear-gradient(90deg, ${skill.color}, ${adjustColor(skill.color, 30)})`;

        // Create glow effect
        const glowEffect = document.createElement('div');
        glowEffect.className = 'absolute top-0 bottom-0 left-0 w-10 bg-white bg-opacity-20 transform -skew-x-30 translate-x-full filter blur-sm opacity-0 group-hover:animate-shine';

        // Add interactions
        skillBlock.addEventListener('mouseenter', () => {
            progressBar.classList.add('animate-pulse');
        });

        skillBlock.addEventListener('mouseleave', () => {
            progressBar.classList.remove('animate-pulse');
        });

        // Assemble the elements
        barContainer.appendChild(progressBar);
        barContainer.appendChild(glowEffect);
        skillBlock.appendChild(header);
        skillBlock.appendChild(barContainer);
        skillsContainer.appendChild(skillBlock);
    });

    skillsSection.appendChild(skillsContainer);

    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    @keyframes shine {
      0% { opacity: 0; transform: translateX(-100%) skewX(-30deg); }
      20% { opacity: 0.6; }
      100% { opacity: 0; transform: translateX(200%) skewX(-30deg); }
    }
    
    .group:hover .animate-shine {
      animation: shine 2s infinite;
    }
    
    .group:hover .transition-all {
      box-shadow: 0 0 8px 2px rgba(14, 165, 233, 0.4);
    }
  `;
    document.head.appendChild(styleSheet);

    // Trigger animation after a short delay
    setTimeout(() => {
        document.querySelectorAll('.transition-all').forEach(bar => {
            bar.classList.remove('scale-x-0');
        });
    }, 300);
});

// Helper function to adjust color brightness
function adjustColor(color, percent) {
    const R = parseInt(color.substring(1,3), 16);
    const G = parseInt(color.substring(3,5), 16);
    const B = parseInt(color.substring(5,7), 16);

    const adjustR = Math.min(255, Math.max(0, Math.round(R + (percent/100) * 255)));
    const adjustG = Math.min(255, Math.max(0, Math.round(G + (percent/100) * 255)));
    const adjustB = Math.min(255, Math.max(0, Math.round(B + (percent/100) * 255)));

    return '#' + ((1 << 24) + (adjustR << 16) + (adjustG << 8) + adjustB).toString(16).slice(1);
}