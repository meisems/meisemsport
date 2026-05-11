let aboutData = {
    bio: "I'm a passionate Full-Stack Developer specializing in building modern web applications.",
    skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    experience: "3+ years"
};

// Load from localStorage
function loadAboutData() {
    const saved = localStorage.getItem('aboutData');
    if (saved) aboutData = JSON.parse(saved);
}

function saveAboutData() {
    localStorage.setItem('aboutData', JSON.stringify(aboutData));
}

function renderAbout() {
    const container = document.getElementById('aboutContent');
    if (!container) return;

    container.innerHTML = `
        <div class="about-text">
            <p>${aboutData.bio}</p>
            <div class="skills">
                <h3>Skills</h3>
                <div class="tech-tags">
                    ${aboutData.skills.map(skill => `<span class="tech-tag">${skill}</span>`).join('')}
                </div>
            </div>
            <p><strong>Experience:</strong> ${aboutData.experience}</p>
        </div>
    `;
}

// Modal Functions
function openAboutModal() {
    document.getElementById('aboutBio').value = aboutData.bio;
    document.getElementById('aboutSkills').value = aboutData.skills.join(', ');
    document.getElementById('aboutExperience').value = aboutData.experience;
    document.getElementById('aboutModal').classList.add('active');
}

function closeAboutModal() {
    document.getElementById('aboutModal').classList.remove('active');
}

document.getElementById('aboutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    aboutData.bio = document.getElementById('aboutBio').value;
    aboutData.skills = document.getElementById('aboutSkills').value.split(',').map(s => s.trim()).filter(Boolean);
    aboutData.experience = document.getElementById('aboutExperience').value;

    saveAboutData();
    renderAbout();
    closeAboutModal();
});

// Show admin button when in admin mode
function showAboutAdminButton() {
    const btn = document.getElementById('aboutAdminBtn');
    if (btn) btn.style.display = isAdminMode ? 'block' : 'none';
}
