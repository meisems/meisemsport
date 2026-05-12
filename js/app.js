// ==================== app.js ====================

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            showAdminMenu();
        }
    });
    
    console.log('✅ Event listeners setup');
}

// ===== INIT - CRITICAL ORDER =====
function init() {
    console.log('🚀 INITIALIZATION STARTING');
    
    // Step 1: Load projects from localStorage (or defaults)
    console.log('Step 1: Loading projects...');
    loadProjects();
    
    // Step 2: Render projects on page
    console.log('Step 2: Rendering projects...');
    renderProjects();
    
    // Step 3: Load about data
    console.log('Step 3: Loading about data...');
    loadAboutData();
    renderAbout();
    
    // Step 4: Initialize theme
    console.log('Step 4: Initializing theme...');
    initializeTheme();
    
    // Step 5: Setup event listeners
    console.log('Step 5: Setting up event listeners...');
    setupEventListeners();
    
    // Step 6: Setup forms
    console.log('Step 6: Setting up forms...');
    setupImageUpload();
    setupFormSubmit();
    
    // Step 7: Check admin mode
    console.log('Step 7: Checking admin mode...');
    checkAdminMode();
    toggleAboutAdminButton();
    initAbout();
    
    console.log('✅ INITIALIZATION COMPLETE!');
    console.log('📊 Total projects loaded:', projects.length);
}

// ===== RUN ON PAGE LOAD =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.onload = function() {
    console.log('🔄 Page fully loaded (window.onload)');
};
