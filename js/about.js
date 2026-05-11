// ==================== ABOUT DATA ====================
let aboutData = {
    imageUrl: "",
    bio: "Passionate full-stack developer creating modern and user-friendly web experiences.",
    skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    experience: "3+ years"
};

// Load from localStorage
function loadAboutData() {
    const saved = localStorage.getItem('aboutData');
    if (saved) {
        aboutData = JSON.parse(saved);
    }
}

// Save to localStorage
function saveAboutData() {
    localStorage.setItem('aboutData', JSON.stringify(aboutData));
}

// Render About Me section
function renderAbout() {
    const container = document.getElementById('aboutContent');
    if (!container) return;

    let imageHTML = aboutData.imageUrl 
        ? `<img src="${aboutData.imageUrl}" alt="Profile Picture" class="profile-img">`
        : `<div class="profile-placeholder"></div>`;

    container.innerHTML = `
        <div class="about-wrapper">
            ${imageHTML}
            <p class="about-bio">${aboutData.bio}</p>
            
            <div class="skills-section">
                <h3>Skills</h3>
                <div class="tech-tags">
                    ${aboutData.skills.map(skill => 
                        `<span class="tech-tag">${skill}</span>`
                    ).join('')}
                </div>
            </div>
            
            <p class="experience"><strong>Experience:</strong> ${aboutData.experience}</p>
        </div>
    `;
}

// Open Edit Modal
function openAboutModal() {
    document.getElementById('aboutBio').value = aboutData.bio;
    document.getElementById('aboutSkills').value = aboutData.skills.join(', ');
    document.getElementById('aboutExperience').value = aboutData.experience;
    document.getElementById('aboutImageUrl').value = aboutData.imageUrl || '';
    
    document.getElementById('aboutModal').classList.add('active');
}

// Close Edit Modal
function closeAboutModal() {
    document.getElementById('aboutModal').classList.remove('active');
}

// Save changes from modal
document.getElementById('aboutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    aboutData.bio = document.getElementById('aboutBio').value.trim();
    aboutData.skills = document.getElementById('aboutSkills').value
                        .split(',').map(s => s.trim()).filter(Boolean);
    aboutData.experience = document.getElementById('aboutExperience').value.trim();
    aboutData.imageUrl = document.getElementById('aboutImageUrl').value.trim();
    
    saveAboutData();
    renderAbout();
    closeAboutModal();
});

// Show/Hide Admin Button
function toggleAboutAdminButton() {
    const btn = document.getElementById('aboutAdminBtn');
    if (btn) {
        btn.style.display = isAdminMode ? 'block' : 'none';
    }
}

// Initialize About Me
function initAbout() {
    loadAboutData();
    renderAbout();
    toggleAboutAdminButton();
}

// Make functions globally available
window.openAboutModal = openAboutModal;
window.closeAboutModal = closeAboutModal;
window.initAbout = initAbout;
