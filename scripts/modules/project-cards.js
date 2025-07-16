export function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    const projectTechStacks = {
        'SCRUM App': [{ name: 'C++' }, { name: 'ImGui' }],
    };

    const techColorMap = {
        'JavaScript': 'bg-yellow-900/50 text-yellow-300',
        'C++': 'bg-blue-800/50 text-blue-200',
        'ImGui': 'bg-purple-800/50 text-purple-200',
        'HTML5': 'bg-orange-900/50 text-orange-300',
        'CSS': 'bg-blue-900/50 text-blue-300',
        'DOM': 'bg-green-900/50 text-green-300',
        'Canvas API': 'bg-indigo-900/50 text-indigo-300',
        'Default': 'bg-sky-900/50 text-sky-300',
    };

    projectCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent?.trim() || '';
        const techStack = projectTechStacks[title] || [];
        const cardContent = card.querySelector('.p-6');

        if (techStack.length > 0 && cardContent) {
            const techDiv = document.createElement('div');
            techDiv.className = 'mt-3 flex flex-wrap gap-2';

            techStack.forEach(tech => {
                const pill = document.createElement('span');
                const colorClass = techColorMap[tech.name] || techColorMap['Default'];
                pill.className = `px-2 py-1 text-xs font-semibold rounded-full ${colorClass}`;
                pill.textContent = tech.name;
                techDiv.appendChild(pill);
            });
            // Insert tech pills before the link
            const link = cardContent.querySelector('a');
            if (link) {
                cardContent.insertBefore(techDiv, link);
            } else {
                cardContent.appendChild(techDiv);
            }
        }
    });
}