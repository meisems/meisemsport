// ==================== js/app.js ====================

function init() {
    console.log('🚀 INITIALIZING APPLICATION...');
    
    // Step 0: Sync from cloud if configured
    console.log('Step 0: Checking cloud sync...');
    if (window.CloudSync && window.CloudSync.isConfigured()) {
        window.CloudSync.syncFromCloud().then(() => {
            continueInit();
        }).catch(() => {
            continueInit();
        });
    } else {
        continueInit();
    }
}

function continueInit() {
    // Step 1: Load and render projects
    console.log('Step 1: Loading projects from storage...');
    loadProjects();
    renderProjects();
    
    // Step 2: Initialize about section
    console.log('Step 2: Initializing about section...');
    initAbout();
    
    // Step 3: Initialize theme
    console.log('Step 3: Initializing theme...');
    initializeTheme();
    setupThemeToggle();
    
    // Step 4: Setup forms and modals
    console.log('Step 4: Setting up forms and modals...');
    setupFormSubmit();
    setupImageUpload();
    setupTechInputEnter();
    setupModalEscape();
    setupModalBackgroundClick();
    setupContactForm();
    setupContactModalListeners();
    
    // Step 5: Check admin mode
    console.log('Step 5: Checking admin mode...');
    checkAdminMode();
    toggleAboutAdminButton();  // ✅ Toggle button visibility after checking admin mode
    
    // Step 6: Setup keyboard shortcuts
    console.log('Step 6: Setting up keyboard shortcuts...');
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            showAdminMenu();
        }
    });
    
    console.log('✅ INITIALIZATION COMPLETE');
    console.log('📊 Total projects loaded:', projects.length);
    console.log('🔐 Admin mode:', isAdminMode);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
