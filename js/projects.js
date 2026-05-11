// ===== PROJECTS =====
function loadProjects() {
    // For now, we use the defaultProjects defined in data.js
    // Later we can load from a JSON file if needed
    projects = projects || [];
    if (projects.length === 0) {
        // fallback
        projects = [...defaultProjects]; // if you still have defaultProjects
    }
    nextProjectId = Math.max(...projects.map(p => p.id), 0) + 1;
}

function saveProjects() {
    // This will only save locally for admin preview
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    console.log("💾 Projects saved locally. Copy them to data.js to make public!");
}

// Add this new function for admin
window.exportProjects = function() {
    const dataStr = JSON.stringify(projects, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'projects.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert("✅ Projects exported! Paste the content into js/data.js to make changes public.");
};

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
