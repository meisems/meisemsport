// ===== MODAL =====
function openAddModal() {
    editingProjectId = null;
    currentTechTags = [];
    currentImageBase64 = null;
    document.getElementById('modalTitle').textContent = 'Add New Project';
    document.getElementById('projectForm').reset();
    document.getElementById('techTagsContainer').innerHTML = '';
    document.getElementById('projectModal').classList.add('active');
}

function openEditModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
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
    }
}

function renderTechTags() {
    const container = document.getElementById('techTagsContainer');
    container.innerHTML = currentTechTags.map(tech => `
        <div class="tech-tag-edit">${tech}<button onclick="removeTechTag('${tech}')">×</button></div>
    `).join('');
}

function removeTechTag(tech) {
    currentTechTags = currentTechTags.filter(t => t !== tech);
    renderTechTags();
}

// ===== IMAGE UPLOAD =====
function setupImageUpload() {
    const input = document.getElementById('imageUpload');
    if (!input) return;
    input.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            currentImageBase64 = ev.target.result;
            document.getElementById('formImageUrl').value = '[Image from computer]';
        };
        reader.readAsDataURL(file);
    });
}

// ===== FORM SUBMIT =====
function setupFormSubmit() {
    document.getElementById('projectForm').addEventListener('submit', function (e) {
        e.preventDefault();
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

        if (editingProjectId) {
            const project = projects.find(p => p.id === editingProjectId);
            if (project) Object.assign(project, projectData);
        } else {
            projects.push({ id: nextProjectId++, ...projectData });
        }

        saveProjects();
        renderProjects();
        closeModal();
    });
}

// ====================== CONTACT / HIRE ME MODAL ======================

function openContactModal() {
    document.getElementById('contactModal').classList.add('active');
}

function closeContactModal() {
    document.getElementById('contactModal').classList.remove('active');
    document.getElementById('contactForm').reset();
}

// Handle Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const service = document.getElementById('contactService').value;
    const message = document.getElementById('contactMessage').value.trim();

    const fbMessage = `Hi! I'm ${name} (${email}).%0A%0A` +
                     `Interested in: ${service}%0A%0A` +
                     `Project Details:%0A${message}%0A%0A` +
                     `Looking forward to your reply!`;

    const messengerLink = `https://www.facebook.com/messages/t/meisems?message=${fbMessage}`;

    window.open(messengerLink, '_blank');
    closeContactModal();
});
