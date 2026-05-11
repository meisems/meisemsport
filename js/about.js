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

    const imageHTML = aboutData.imageUrl ? 
        `<img src="${aboutData.imageUrl}" alt="Profile" style="width:180px;height:180px;object-fit:cover;border-radius:50%;margin-bottom:20px;">` : '';

    container.innerHTML = `
        <div style="text-align:center;max-width:700px;margin:0 auto;">
            ${imageHTML}
            <p style="font-size:1.1rem;line-height:1.7;color:var(--text-secondary);">${aboutData.bio}</p>
            <div style="margin:25px 0;">
                <h3>Skills</h3>
                <div class="tech-tags" style="justify-content:center;">
                    ${aboutData.skills.map(s => `<span class="tech-tag">${s}</span>`).join('')}
                </div>
            </div>
            <p><strong>Experience:</strong> ${aboutData.experience}</p>
        </div>
    `;
}

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

// Show/Hide Edit Button based on Admin Mode
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
