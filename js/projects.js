// ==================== js/storage.js ====================
// This file handles all localStorage operations

function loadProjects() {
    console.log('📂 loadProjects() - checking localStorage...');
    
    const saved = localStorage.getItem('portfolioProjects');
    
    // ✅ FIXED: Load from localStorage for ALL users (not just admin)
    if (saved) {
        try {
            projects = JSON.parse(saved);
            console.log('✅ Loaded from localStorage:', projects.length, 'projects');
        } catch (e) {
            console.error('❌ Error parsing localStorage:', e);
            projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
            console.log('📝 Using default projects instead');
        }
    } else {
        console.log('📝 No data in localStorage, using defaults');
        projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
    }
    
    if (projects.length > 0) {
        nextProjectId = Math.max(...projects.map(p => p.id)) + 1;
    }
    
    console.log('📊 Total projects loaded:', projects.length);
}

function saveProjects() {
    try {
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
        console.log('%c✅ SAVED to localStorage!', 'background: #22c55e; color: white; padding: 5px 10px;');
        console.log('💾 Saved', projects.length, 'projects');
        return true;
    } catch (error) {
        console.error('❌ Failed to save:', error);
        alert('Error saving projects: ' + error.message);
        return false;
    }
}

function renderProjects() {
    console.log('🎨 renderProjects() - rendering', projects.length, 'projects');
    
    const grid = document.getElementById('projectsGrid');
    if (!grid) {
        console.error('❌ projectsGrid not found!');
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

    console.log('✅ Projects rendered on page');
}

function deleteProject(projectId) {
    if (confirm('Delete this project?')) {
        projects = projects.filter(p => p.id !== projectId);
        if (saveProjects()) {
            renderProjects();
        }
    }
}
