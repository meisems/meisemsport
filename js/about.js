let aboutData = {
    imageUrl: "",
    bio: "Passionate full-stack developer creating modern and user-friendly web experiences.",
    skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    experience: "3+ years"
};

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

    let imageHTML = aboutData.imageUrl ? 
        `<img src="${aboutData.imageUrl}" alt="Profile" style="width: 180px; height: 180px; object-fit: cover; border-radius: 50%; margin-bottom: 20px;">` : 
        `<div style="width: 180px; height: 180px; background: #e2e8f0; border-radius: 50%; margin: 0 auto 20px;"></div>`;

    container.innerHTML = `
        <div style="text-align: center; max-width: 700px; margin: 0 auto;">
            ${imageHTML}
            <p style="font-size: 1.1rem; line-height: 1.7; color: var(--text-secondary);">${aboutData.bio}</p>
            
            <div style="margin: 25px 0;">
                <h3 style="margin-bottom: 12px;">Skills</h3>
                <div class="tech-tags" style="justify-content: center;">
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
    document.getElementById('aboutImageUrl').value = aboutData.imageUrl || '';
    document.getElementById('aboutModal').classList.add('active');
}

function closeAboutModal() {
    document.getElementById('aboutModal').classList.remove('active');
}

// Form Submit
document.getElementById('aboutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    aboutData.bio = document.getElementById('aboutBio').value;
    aboutData.skills = document.getElementById('aboutSkills').value.split(',').map(s => s.trim()).filter(Boolean);
    aboutData.experience = document.getElementById('aboutExperience').value;
    aboutData.imageUrl = document.getElementById('aboutImageUrl').value;

    saveAboutData();
    renderAbout();
    closeAboutModal();
});

// Show admin button
function toggleAboutAdminButton() {
    const btn = document.getElementById('aboutAdminBtn');
    if (btn) btn.style.display = isAdminMode ? 'block' : 'none';
}
