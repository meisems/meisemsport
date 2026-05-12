// ===== PROJECTS =====
function loadProjects() {
    const saved = localStorage.getItem('portfolioProjects');
    
    // FIXED: Always load from localStorage if it exists
    // This ensures changes persist across page refresh
    if (saved) {
        try {
            projects = JSON.parse(saved);
            console.log('✅ Loaded projects from localStorage');
        } catch (e) {
            console.error('Error parsing localStorage:', e);
            // Fallback to default projects if JSON is corrupt
        }
    } 
    // Only use default data from data.js if localStorage is empty
    
    // Update next ID
    if (projects.length > 0) {
        nextProjectId = Math.max(...projects.map(p => p.id)) + 1;
    }
}

function saveProjects() {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    console.log('%c💾 Changes saved to localStorage (persistent)', 'color: green; font-weight: bold;');
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
