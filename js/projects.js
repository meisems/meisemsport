// ===== PROJECTS =====
function loadProjects() {
    const saved = localStorage.getItem('portfolioProjects');
    projects = saved ? JSON.parse(saved) : [...defaultProjects];
    if (projects.length > 0) nextProjectId = Math.max(...projects.map(p => p.id)) + 1;
}

function saveProjects() {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
}

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-image-container">
                ${project.imageUrl
                    ? `<img src="${project.imageUrl}" alt="${project.title}" class="project-image" onerror="this.style.display='none'">`
                    : `<div class="project-image-placeholder">${project.icon}</div>`}
            </div>
            <div class="admin-controls ${isAdminMode ? 'visible' : ''}">
                <button class="admin-btn edit" onclick="openEditModal(${project.id})">✏️</button>
                <button class="admin-btn delete" onclick="deleteProject(${project.id})">🗑️</button>
            </div>
            <div class="project-header">
                <div class="project-icon">${project.icon}</div>
                <div class="project-category">${project.category}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
            </div>
            <div class="project-footer">
                <div class="tech-tags">${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}</div>
                <a href="${project.link}" target="_blank" class="project-link">Visit Project →</a>
            </div>
        `;
        grid.appendChild(card);
    });

    const addBtn = document.getElementById('addProjectBtn');
    if (addBtn) addBtn.classList.toggle('visible', isAdminMode);
}

function deleteProject(projectId) {
    if (confirm('Delete this project?')) {
        projects = projects.filter(p => p.id !== projectId);
        saveProjects();
        renderProjects();
    }
}
