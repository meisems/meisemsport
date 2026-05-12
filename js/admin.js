// ==================== admin.js - FIXED ====================

let isAdminMode = false;
const ADMIN_SECRET = "eliej627456";

function checkAdminMode() {
    console.log('🔐 checkAdminMode() called');
    
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin');
    
    if (adminParam === ADMIN_SECRET) {
        console.log('✅ Admin parameter found in URL');
        isAdminMode = true;
        sessionStorage.setItem('adminMode', 'true');
        document.body.classList.add('admin-mode');
        showAdminNotification('✅ Admin Mode Activated');
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    // Check sessionStorage (same tab/session)
    else if (sessionStorage.getItem('adminMode') === 'true') {
        console.log('✅ Admin mode found in sessionStorage');
        isAdminMode = true;
        document.body.classList.add('admin-mode');
    }
    else {
        console.log('❌ Not in admin mode');
        isAdminMode = false;
    }
    
    console.log('🔐 isAdminMode:', isAdminMode);
    
    // Toggle UI elements
    if (typeof toggleAboutAdminButton === 'function') {
        toggleAboutAdminButton();
    }
    
    const addBtn = document.getElementById('addProjectBtn');
    if (addBtn) {
        addBtn.classList.toggle('visible', isAdminMode);
    }
}

function showAdminMenu() {
    console.log('📋 showAdminMenu() called');
    
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
            
            if (typeof renderProjects === 'function') {
                renderProjects();
            }
            if (typeof toggleAboutAdminButton === 'function') {
                toggleAboutAdminButton();
            }
            
            const addBtn = document.getElementById('addProjectBtn');
            if (addBtn) {
                addBtn.classList.add('visible');
            }
            
            showAdminNotification('✅ Admin Mode Activated');
            console.log('✅ Admin mode enabled');
        } else if (code !== null) {
            alert('❌ Wrong admin code!');
            console.log('❌ Wrong admin code entered');
        }
    }
}

function exitAdminMode() {
    console.log('👋 exitAdminMode() called');
    
    isAdminMode = false;
    sessionStorage.removeItem('adminMode');
    document.body.classList.remove('admin-mode');
    
    if (typeof renderProjects === 'function') {
        renderProjects();
    }
    if (typeof toggleAboutAdminButton === 'function') {
        toggleAboutAdminButton();
    }
    
    const addBtn = document.getElementById('addProjectBtn');
    if (addBtn) {
        addBtn.classList.remove('visible');
    }
    
    console.log('✅ Admin mode exited');
}

function showAdminNotification(message = '✅ Admin Mode Activated') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Make functions available globally
window.showAdminMenu = showAdminMenu;
window.exitAdminMode = exitAdminMode;
window.checkAdminMode = checkAdminMode;

console.log('✅ admin.js loaded');
