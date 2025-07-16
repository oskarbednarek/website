export function initSkills() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;

    const skillsData = [
        { name: 'JavaScript (ES6+)', percent: 90, color: '#f7df1e' },
        { name: 'HTML5 & CSS3', percent: 95, color: '#e34f26' },
        { name: 'C++', percent: 75, color: '#00599c' },
        { name: 'Python', percent: 70, color: '#3776ab' },
        { name: 'C#', percent: 40, color: '#68217a' },
        { name: 'Reverse Engineering', percent: 50, color: '#ff6347' },
        { name: 'React', percent: 20, color: '#61dafb', learning: true },
    ];

    skillsSection.innerHTML = '<h3 class="text-3xl text-center font-bold mb-10">Technical Skills</h3>';
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'max-w-4xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-6';

    skillsData.forEach((skill, index) => {
        const skillBlock = document.createElement('div');
        skillBlock.setAttribute('data-aos', 'fade-right');
        skillBlock.setAttribute('data-aos-delay', `${index * 50}`);

        const header = document.createElement('div');
        header.className = 'flex justify-between items-center mb-1';

        const nameElem = document.createElement('h4');
        nameElem.className = 'text-lg font-semibold';
        nameElem.innerHTML = skill.learning
            ? `${skill.name} <span class="ml-2 px-2 py-0.5 text-xs rounded bg-blue-500/20 text-blue-300 animate-pulse">Learning</span>`
            : skill.name;

        const percentElem = document.createElement('span');
        percentElem.className = 'font-mono text-sky-400 font-medium';
        percentElem.textContent = `${skill.percent}%`;
        header.append(nameElem, percentElem);

        const barContainer = document.createElement('div');
        barContainer.className = 'h-2.5 bg-gray-800 rounded-full overflow-hidden';
        const progressBar = document.createElement('div');
        progressBar.className = 'h-full rounded-full';
        progressBar.style.width = `${skill.percent}%`;
        progressBar.style.backgroundColor = skill.color;
        barContainer.append(progressBar);

        skillBlock.append(header, barContainer);
        skillsContainer.appendChild(skillBlock);
    });

    skillsSection.appendChild(skillsContainer);
}