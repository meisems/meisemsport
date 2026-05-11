// ===== ADMIN MODE - Clean Version =====
let isAdminMode = false;
const ADMIN_SECRET = "eliej627456";

function checkAdminMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin');
    
    if (adminParam === ADMIN_SECRET) {
        isAdminMode = true;
        document.body.classList.add('admin-mode');
        console.log("%c✅ Admin Mode Activated via URL", "color: #22c55e; font-weight: bold");
    }
    
    // Check session storage
    if (sessionStorage.getItem('adminMode') === 'true') {
        isAdminMode = true;
        document.body.classList.add('admin-mode');
    }
    
    toggleAboutAdminButton();
    
    const addBtn = document.getElementById('addProjectBtn');
    if (addBtn) addBtn.style.display = isAdminMode ? 'block' : 'none';
}

function showAdminMenu() {
    if (isAdminMode) {
        if (confirm('Exit Admin Mode?')) {
            exitAdminMode();
        }
    } else {
        const code = prompt('Enter admin code:');
        if (code === ADMIN_SECRET) {
            isAdminMode = true;
            sessionStorage.setItem('adminMode', 'true');
            document.body.classList.add('admin-mode');
            renderProjects();
            toggleAboutAdminButton();
            showAdminNotification();
        } else {
            alert("❌ Wrong admin code!");
        }
    }
}

function exitAdminMode() {
    isAdminMode = false;
    sessionStorage.removeItem('adminMode');
    document.body.classList.remove('admin-mode');
    renderProjects();
    toggleAboutAdminButton();
}

function showAdminNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: linear-gradient(135deg, #22c55e, #15803d);
        color: white; padding: 16px 24px; border-radius: 12px;
        font-weight: 600; z-index: 9999; box-shadow: 0 10px 15px rgba(0,0,0,0.3);
    `;
    notification.textContent = '✅ Admin Mode Activated';
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 2500);
}

// Make functions available globally
window.showAdminMenu = showAdminMenu;
window.exitAdminMode = exitAdminMode;
window.checkAdminMode = checkAdminMode;
