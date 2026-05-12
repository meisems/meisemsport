// ==================== js/about.js ====================

let aboutData = {
    imageUrl: "",
    bio: "Passionate full-stack developer creating modern and user-friendly web experiences.",
    skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    experience: "3+ years"
};

// ── Cloud helpers ────────────────────────────────────────────────────────────

function isCloudSyncAvailable() {
    return typeof window.CloudSync !== 'undefined' && window.CloudSync.isConfigured();
}

// ── Load ─────────────────────────────────────────────────────────────────────

async function loadAboutData() {
    console.log('📝 Loading about data...');

    // 1. Try cloud first (if configured)
    if (isCloudSyncAvailable()) {
        try {
            console.log('☁️ Attempting cloud load for about data...');
            const cloudData = await window.CloudSync.loadFromCloud();
            if (cloudData && cloudData.aboutData) {
                aboutData = cloudData.aboutData;
                // Keep localStorage in sync
                localStorage.setItem('aboutData', JSON.stringify(aboutData));
                console.log('✅ About data loaded from cloud');
                return;
            }
        } catch (e) {
            console.warn('⚠️ Cloud load failed, falling back to localStorage:', e);
        }
    }

    // 2. Fall back to localStorage
    const saved = localStorage.getItem('aboutData');
    if (saved) {
        try {
            aboutData = JSON.parse(saved);
            console.log('✅ About data loaded from localStorage');
        } catch (e) {
            console.error('Error loading about data:', e);
        }
    }
}

// ── Save ──────────────────────────────────────────────────────────────────────

async function saveAboutData() {
    // Always write to localStorage first (fast, offline-safe)
    try {
        localStorage.setItem('aboutData', JSON.stringify(aboutData));
        console.log('✅ About data saved to localStorage');
    } catch (e) {
        console.error('Error saving about data to localStorage:', e);
        return false;
    }

    // Then push to cloud (if configured)
    if (isCloudSyncAvailable()) {
        try {
            console.log('☁️ Syncing about data to cloud...');
            const success = await window.CloudSync.syncToCloud();
            if (success) {
                console.log('✅ About data synced to cloud');
            } else {
                console.warn('⚠️ Cloud sync failed — data saved locally only');
            }
        } catch (e) {
            console.warn('⚠️ Cloud sync error — data saved locally only:', e);
        }
    }

    return true;
}

// ── Render ────────────────────────────────────────────────────────────────────

function renderAbout() {
    console.log('🎨 Rendering about section...');
    const container = document.getElementById('aboutContent');
    if (!container) {
        console.error('❌ aboutContent element not found');
        return;
    }

    const imageHTML = aboutData.imageUrl
        ? `<img src="${aboutData.imageUrl}" alt="Profile" style="width:180px;height:180px;object-fit:cover;border-radius:50%;margin-bottom:20px;">`
        : '';

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
    console.log('✅ About section rendered');
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function openAboutModal() {
    console.log('📋 Opening about edit modal...');

    const modal = document.getElementById('aboutModal');
    if (!modal) {
        console.error('❌ aboutModal not found!');
        return;
    }

    document.getElementById('aboutBio').value = aboutData.bio;
    document.getElementById('aboutSkills').value = aboutData.skills.join(', ');
    document.getElementById('aboutExperience').value = aboutData.experience;
    document.getElementById('aboutImageUrl').value = aboutData.imageUrl || '';

    modal.classList.add('active');
    console.log('✅ About modal opened');
}

function closeAboutModal() {
    console.log('❌ Closing about modal');
    const modal = document.getElementById('aboutModal');
    if (modal) modal.classList.remove('active');
}

// ── Admin toggle ──────────────────────────────────────────────────────────────

function toggleAboutAdminButton() {
    console.log('🔐 toggleAboutAdminButton() called, isAdminMode =', isAdminMode);

    const btn = document.getElementById('aboutAdminBtn');
    if (!btn) {
        console.error('❌ aboutAdminBtn element not found!');
        return;
    }

    if (isAdminMode) {
        btn.style.display = 'block';
        console.log('✅ About edit button VISIBLE (admin mode)');
    } else {
        btn.style.display = 'none';
        console.log('❌ About edit button HIDDEN (not admin)');
    }
}

// ── Form setup ────────────────────────────────────────────────────────────────

function setupAboutForm() {
    console.log('📋 Setting up about form...');
    const aboutForm = document.getElementById('aboutForm');
    if (!aboutForm) {
        console.error('❌ aboutForm not found!');
        return;
    }

    aboutForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('📝 Submitting about form...');

        aboutData.bio = document.getElementById('aboutBio').value;
        aboutData.skills = document.getElementById('aboutSkills').value
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0);
        aboutData.experience = document.getElementById('aboutExperience').value;
        aboutData.imageUrl = document.getElementById('aboutImageUrl').value || '';

        console.log('💾 New about data:', aboutData);

        const saved = await saveAboutData();
        if (saved) {
            renderAbout();
            closeAboutModal();
            console.log('✅ About section updated!');
        } else {
            console.error('❌ Failed to save about data');
            alert('Error saving changes');
        }
    });

    console.log('✅ About form ready');
}

// ── Image upload ──────────────────────────────────────────────────────────────

function setupAboutImageUpload() {
    console.log('🖼️ Setting up about image upload...');
    const imageUpload = document.getElementById('aboutImageUpload');
    if (!imageUpload) {
        console.warn('⚠️ aboutImageUpload element not found');
        return;
    }

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        console.log('📸 Image file selected:', file.name);

        const reader = new FileReader();
        reader.onload = (ev) => {
            document.getElementById('aboutImageUrl').value = ev.target.result;
            console.log('✅ Image converted to base64');
        };
        reader.readAsDataURL(file);
    });
}

// ── Init ──────────────────────────────────────────────────────────────────────

async function initAbout() {
    console.log('🚀 Initializing about section...');
    await loadAboutData();
    renderAbout();
    setupAboutForm();
    setupAboutImageUpload();
    console.log('✅ About section initialized');
}
