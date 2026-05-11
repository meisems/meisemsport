// Minimal Hire Me Modal - For Testing
console.log("✅ contact.js loaded successfully");

window.openContactModal = function() {
    console.log("Hire Me button clicked!");
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('active');
        console.log("Modal opened successfully");
    } else {
        console.error("❌ Modal with id 'contactModal' not found!");
        alert("Modal not found! Please check if the HTML is added.");
    }
};

window.closeContactModal = function() {
    const modal = document.getElementById('contactModal');
    if (modal) modal.classList.remove('active');
};
