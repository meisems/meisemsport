// Hire Me Contact Modal
window.openContactModal = function() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('active');
    } else {
        console.error("Contact modal not found in DOM");
    }
};

window.closeContactModal = function() {
    const modal = document.getElementById('contactModal');
    if (modal) modal.classList.remove('active');
    
    const form = document.getElementById('contactForm');
    if (form) form.reset();
};

// Form handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) {
        console.warn("Contact form not found");
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value.trim() || "Client";
        const email = document.getElementById('contactEmail').value.trim();
        const service = document.getElementById('contactService').value;
        const message = document.getElementById('contactMessage').value.trim();

        const fbMessage = `Hi! I'm ${name} (${email}).%0A%0AInterested in: ${service}%0A%0AProject Details:%0A${message}%0A%0ALooking forward to your reply!`;

        window.open(`https://www.facebook.com/messages/t/meisems?message=${fbMessage}`, '_blank');
        closeContactModal();
    });
});
