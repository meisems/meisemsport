// ===== ADMIN MODE =====
function checkAdminMode() {
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('admin');

    if (adminParam === ADMIN_SECRET || sessionStorage.getItem('adminMode') === 'true') {
        isAdminMode = true;
        sessionStorage.setItem('adminMode', 'true');
        if (adminParam) window.history.replaceState({}, document.title, window.location.pathname);
        renderProjects();
        showAdminNotification();
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
