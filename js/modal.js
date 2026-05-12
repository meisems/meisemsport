// ==================== modal.js ====================

function openAddModal() {
    console.log('📝 openAddModal()');
    editingProjectId = null;
    currentTechTags = [];
    currentImageBase64 = null;
    document.getElementById('modalTitle').textContent = 'Add New Project';
    document.getElementById('projectForm').reset();
    document.getElementById('techTagsContainer').innerHTML = '';
    document.getElementById('projectModal').classList.add('active');
}

function openEditModal(projectId) {
    console.log('✏️ openEditModal():', projectId);
    
    const project = projects.find(p => p.id === projectId);
    if (!project) {
        console.error('❌ Project not found:', projectId);
        return;
    }
    
    editingProjectId = projectId;
    currentTechTags = [...project.technologies];
    currentImageBase64 = null;

    document.getElementById('modalTitle').textContent = 'Edit Project';
    document.getElementById('formIcon').value = project.icon;
    document.getElementById('formTitle').value = project.title;
    document.getElementById('formCategory').value = project.category;
    document.getElementById('formDescription').value = project.description;
    document.getElementById('formImageUrl').value = project.imageUrl || '';
    document.getElementById('formLink').value = project.link;
    
    renderTechTags();
    document.getElementById('projectModal').classList.add('active');
}

function closeModal() {
    console.log('❌ closeModal()');
    document.getElementById('projectModal').classList.remove('active');
    document.getElementById('projectForm').reset();
    currentTechTags = [];
    currentImageBase64 = null;
    document.getElementById('techTagsContainer').innerHTML = '';
    editingProjectId = null;
}

// ===== TECH TAGS =====
function addTechTag() {
    const input = document.getElementById('techInput');
    const tech = input.value.trim();
    
    if (tech && !currentTechTags.includes(tech)) {
        currentTechTags.push(tech);
        input.value = '';
        renderTechTags();
        console.log('➕ Tech tag added:', tech);
    }
}

function renderTechTags() {
    const container = document.getElementById('techTagsContainer');
    container.innerHTML = currentTechTags.map(tech => `
        <div class="tech-tag-edit">${tech}<button type="button" onclick="removeTechTag('${tech}')">×</button></div>
    `).join('');
}

function removeTechTag(tech) {
    currentTechTags = currentTechTags.filter(t => t !== tech);
    renderTechTags();
    console.log('➖ Tech tag removed:', tech);
}

// ===== IMAGE UPLOAD =====
function setupImageUpload() {
    const input = document.getElementById('imageUpload');
    if (!input) {
        console.warn('⚠️ imageUpload element not found');
        return;
    }
    
    input.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        
        console.log('🖼️ Image selected:', file.name);
        
        const reader = new FileReader();
        reader.onload = ev => {
            currentImageBase64 = ev.target.result;
            document.getElementById('formImageUrl').value = '[Image from computer]';
            console.log('✅ Image loaded (base64)');
        };
        reader.readAsDataURL(file);
    });
}

// ===== FORM SUBMIT =====
function setupFormSubmit() {
    const form = document.getElementById('projectForm');
    if (!form) {
        console.error('❌ projectForm not found!');
        return;
    }
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('📤 Form submitted');
        
        const imageUrl = currentImageBase64 || document.getElementById('formImageUrl').value.trim();

        const projectData = {
            icon: document.getElementById('formIcon').value,
            title: document.getElementById('formTitle').value,
            category: document.getElementById('formCategory').value,
            description: document.getElementById('formDescription').value,
            imageUrl: imageUrl || null,
            link: document.getElementById('formLink').value,
            technologies: currentTechTags
        };

        console.log('📦 Project data:', projectData);

        if (editingProjectId) {
            console.log('🔄 Updating project:', editingProjectId);
            const project = projects.find(p => p.id === editingProjectId);
            if (project) {
                Object.assign(project, projectData);
                console.log('✅ Project updated');
            }
        } else {
            console.log('✨ Creating new project');
            projects.push({ id: nextProjectId++, ...projectData });
            console.log('✅ Project created, new ID:', nextProjectId - 1);
        }

        // CRITICAL: Save to localStorage
        console.log('💾 Saving to localStorage...');
        if (saveProjects()) {
            renderProjects();
            closeModal();
            console.log('✅ Complete! All saved and rendered');
        } else {
            console.error('❌ Failed to save!');
        }
    });
}
