// ===== EVENT LISTENERS =====
function setupEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') showAdminMenu();
    });
}

// ===== INIT =====
function init() {
    // Load and render content
    loadProjects();
    renderProjects();
    
    loadAboutData();
    renderAbout();
    
    // Theme and other setups
    initializeTheme();
    setupEventListeners();
    setupImageUpload();
    setupFormSubmit();
    
    // Admin mode (must come after content is rendered)
    checkAdminMode();
    toggleAboutAdminButton();   // Ensure button visibility after admin check
    initAbout();
}

// Make sure global functions are available
window.onload = init;
