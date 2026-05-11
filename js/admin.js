let isAdminMode = false;

function checkAdminMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin');
    
    if (adminParam === 'eliej627456') {
        isAdminMode = true;
        document.body.classList.add('admin-mode');
    }
    
    // Also support keyboard toggle
    toggleAboutAdminButton();
    // Toggle project admin buttons too if you have them
    const addBtn = document.getElementById('addProjectBtn');
    if (addBtn) addBtn.style.display = isAdminMode ? 'block' : 'none';
}

function showAdminMenu() {
    isAdminMode = !isAdminMode;
    document.body.classList.toggle('admin-mode', isAdminMode);
    toggleAboutAdminButton();
    
    // Optional: show a small notification
    if (isAdminMode) {
        console.log("%cAdmin Mode Activated", "color: #22c55e; font-weight: bold");
    }
}

function showAdminNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2563eb, #db2777);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 2000;
    `;
    notification.textContent = '✓ Admin Mode Activated';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function showAdminMenu() {
    if (isAdminMode) {
        if (confirm('Exit Admin Mode?')) exitAdminMode();
    } else {
        const code = prompt('Enter admin code:');
        if (code === ADMIN_SECRET) {
            isAdminMode = true;
            sessionStorage.setItem('adminMode', 'true');
            renderProjects();
            showAdminNotification();
        }
    }
}

function exitAdminMode() {
    isAdminMode = false;
    sessionStorage.removeItem('adminMode');
    renderProjects();
}
