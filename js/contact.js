window.openContactModal = function() {
    document.getElementById('contactModal').classList.add('active');
};

window.closeContactModal = function() {
    document.getElementById('contactModal').classList.remove('active');
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value || "Client";
            const email = document.getElementById('contactEmail').value || "";
            const service = document.getElementById('contactService').value || "";
            const message = document.getElementById('contactMessage').value || "";

            const text = `Hi! I'm ${name} (${email}).%0AInterested in: ${service}%0A%0A${message}`;
            window.open(`https://www.facebook.com/messages/t/meisems?message=${text}`, '_blank');
            closeContactModal();
        });
    }
});
