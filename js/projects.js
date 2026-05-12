// ==================== projects.js ====================

function loadProjects() {
    console.log('📂 loadProjects() called');
    
    const saved = localStorage.getItem('portfolioProjects');
    
    if (saved) {
        try {
            projects = JSON.parse(saved);
            console.log('✅ Loaded from localStorage:', projects.length, 'projects');
        } catch (e) {
            console.error('❌ Error parsing localStorage:', e);
            projects = JSON.parse(JSON.stringify(defaultProjects));
        }
    } else {
        console.log('📝 No data in localStorage, using defaults');
        projects = JSON.parse(JSON.stringify(defaultProjects));
    }
    
    if (projects.length > 0) {
        nextProjectId = Math.max(...projects.map(p => p.id)) + 1;
    }
    
    console.log('📊 Current projects:', projects);
}

function saveProjects() {
    try {
        const dataToSave = JSON.stringify(projects);
        localStorage.setItem('portfolioProjects', dataToSave);
        console.log('%c✅ SAVED to localStorage! ', 'background: #22c55e; color: white; padding: 5px 10px; border-radius: 3px;');
        console.log('Projects saved:', projects.length, 'items');
        return true;
    } catch (error) {
        console.error('❌ Failed to save projects:', error);
        alert('Error saving projects: ' + error.message);
        return false;
    }
}

function renderProjects() {
    console.log('🎨 renderProjects() called with', projects.length, 'projects');
    
    const grid = document.getElementById('projectsGrid');
    if (!grid) {
        console.error('❌ projectsGrid element not found!');
        return;
    }
    
    grid.innerHTML = '';

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <div class="project-image-container">
                ${project.imageUrl
                    ? `<img src="${project.imageUrl}" alt="${project.title}" class="project-image" onerror="this.style.display='none'">`
                    : `<div class="project-image-placeholder">${project.icon}</div>`}
            </div>
            <div class="admin-controls ${isAdminMode ? 'visible' : ''}">
                <button class="admin-btn edit" onclick="openEditModal(${project.id})" title="Edit">✏️</button>
                <button class="admin-btn delete" onclick="deleteProject(${project.id})" title="Delete">🗑️</button>
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
    if (addBtn) {
        addBtn.classList.toggle('visible', isAdminMode);
    }
    
    console.log('✅ Projects rendered on page');
}

function deleteProject(projectId) {
    console.log('🗑️ Deleting project:', projectId);
    
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(p => p.id !== projectId);
        console.log('Project deleted. Remaining:', projects.length);
        
        if (saveProjects()) {
            renderProjects();
            console.log('✅ Delete saved and rendered');
        }
    }
}

window.exportProjects = function() {
    const dataStr = JSON.stringify(projects, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'projects.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert("✅ Projects exported! Paste the content into js/data.js to make changes permanent.");
};
