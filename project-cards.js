document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    // Define unique tech stacks for each project with more detailed information
    const projectTechStacks = {
        'Wordle game': [
            { name: 'JavaScript', color: 'yellow', level: 'Intermediate' },
            { name: 'HTML5', color: 'orange', level: 'Advanced' },
            { name: 'CSS', color: 'blue', level: 'Advanced' }
        ],
        'Huzz any word': [
            { name: 'JavaScript', color: 'yellow', level: 'Advanced' },
            { name: 'DOM manipulation', color: 'green', level: 'Advanced' }
        ],
        'Snake': [
            { name: 'JavaScript', color: 'yellow', level: 'Advanced' },
            { name: 'Canvas API', color: 'indigo', level: 'Intermediate' },
            { name: 'CSS', color: 'blue', level: 'Intermediate' }
        ],
        'Vigenere': [
            { name: 'C++', color: 'purple', level: 'Advanced' },
            { name: 'Algorithms', color: 'pink', level: 'Advanced' },
            { name: 'Cryptography', color: 'red', level: 'Intermediate' }
        ]
    };

    projectCards.forEach(card => {
        // Get project title to determine which tech stack to use
        const projectTitle = card.querySelector('h3')?.textContent?.trim() || '';
        // Get tech stack based on project title or use default
        const techStack = projectTechStacks[projectTitle] || [
            { name: 'HTML', color: 'orange', level: 'Beginner' },
            { name: 'CSS', color: 'blue', level: 'Beginner' },
            { name: 'JavaScript', color: 'yellow', level: 'Beginner' }
        ];

        // Create tech stack pills container
        const techDiv = document.createElement('div');
        techDiv.className = 'mt-3 flex flex-wrap gap-2 project-tech opacity-0 transition-opacity duration-300';

        techStack.forEach(tech => {
            const pill = document.createElement('span');

            // Map color names to Tailwind classes
            const colorMap = {
                yellow: { bg: 'bg-yellow-800', text: 'text-yellow-300' },
                blue: { bg: 'bg-blue-900', text: 'text-blue-300' },
                orange: { bg: 'bg-orange-900', text: 'text-orange-300' },
                purple: { bg: 'bg-purple-900', text: 'text-purple-300' },
                green: { bg: 'bg-green-900', text: 'text-green-300' },
                indigo: { bg: 'bg-indigo-900', text: 'text-indigo-300' },
                pink: { bg: 'bg-pink-900', text: 'text-pink-300' },
                red: { bg: 'bg-red-900', text: 'text-red-300' }
            };

            const colorClasses = colorMap[tech.color] || { bg: 'bg-sky-900', text: 'text-sky-300' };
            pill.className = `px-2 py-1 ${colorClasses.bg} bg-opacity-40 text-xs rounded-full ${colorClasses.text} flex items-center gap-1 hover:bg-opacity-60 transition-all duration-200`;

            // Create icon based on technology type (optional)
            const icon = document.createElement('span');
            if (tech.name.includes('JavaScript')) {
                icon.innerHTML = '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>';
            } else if (tech.name.includes('HTML')) {
                icon.innerHTML = '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>';
            } else if (tech.name.includes('CSS')) {
                icon.innerHTML = '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414v-.001z"/></svg>';
            } else if (tech.name.includes('Algorithm')) {
                icon.innerHTML = '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M22 14H2v-4h20m-1 7H3c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h18c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"/></svg>';
            }

            pill.appendChild(icon);
            pill.innerHTML += `<span>${tech.name}</span>`;

            // Add a tooltip with skill level
            pill.setAttribute('title', `${tech.level} level`);
            pill.style.position = 'relative';

            techDiv.appendChild(pill);
        });

        // Find card content container
        const cardContent = card.querySelector('.p-6');
        cardContent.appendChild(techDiv);

        // Add hover effect
        card.addEventListener('mouseenter', () => {
            techDiv.classList.remove('opacity-0');
            overlay.classList.remove('opacity-0');
            overlay.classList.add('opacity-100');
            overlay.querySelector('span').classList.remove('translate-y-4', 'opacity-0');
        });

        card.addEventListener('mouseleave', () => {
            techDiv.classList.add('opacity-0');
            overlay.classList.remove('opacity-100');
            overlay.classList.add('opacity-0');
            overlay.querySelector('span').classList.add('translate-y-4', 'opacity-0');
        });
    });
});