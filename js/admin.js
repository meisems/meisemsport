// ===== ADMIN MODE =====
let isAdminMode = false;
const ADMIN_SECRET = "eliej627456";

function checkAdminMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin');
    
    if (adminParam === ADMIN_SECRET) {
        isAdminMode = true;
        document.body.classList.add('admin-mode');
    }
    
    if (sessionStorage.getItem('adminMode') === 'true') {
        isAdminMode = true;
        document.body.classList.add('admin-mode');
    }
    
    if (typeof toggleAboutAdminButton === 'function') toggleAboutAdminButton();
    
    const addBtn = document.getElementById('addProjectBtn');
    if (addBtn) addBtn.classList.toggle('visible', isAdminMode);
}

function showAdminMenu() {
    if (isAdminMode) {
        if (confirm('Exit Admin Mode?')) exitAdminMode();
    } else {
        const code = prompt('Enter admin code:');
        if (code === ADMIN_SECRET) {
            isAdminMode = true;
            sessionStorage.setItem('adminMode', 'true');
            document.body.classList.add('admin-mode');
            if (typeof renderProjects === 'function') renderProjects();
            if (typeof toggleAboutAdminButton === 'function') toggleAboutAdminButton();
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
    if (typeof renderProjects === 'function') renderProjects();
    if (typeof toggleAboutAdminButton === 'function') toggleAboutAdminButton();
}

function showAdminNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `position:fixed;top:20px;right:20px;background:#22c55e;color:white;padding:16px 24px;border-radius:12px;font-weight:600;z-index:9999;`;
    notification.textContent = '✅ Admin Mode Activated';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2500);
}

window.showAdminMenu = showAdminMenu;
window.exitAdminMode = exitAdminMode;
window.checkAdminMode = checkAdminMode;
