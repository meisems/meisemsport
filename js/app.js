// ===== EVENT LISTENERS =====
function setupEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') showAdminMenu();
    });
}

// ===== INIT =====
function init() {
    loadProjects();
    renderProjects();
    initializeTheme();
    setupEventListeners();
    checkAdminMode();
    setupImageUpload();
    setupFormSubmit();
}

window.onload = init;
