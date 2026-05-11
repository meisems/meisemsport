// ====================== HIRE ME / CONTACT MODAL ======================

function openContactModal() {
    document.getElementById('contactModal').classList.add('active');
}

function closeContactModal() {
    document.getElementById('contactModal').classList.remove('active');
    document.getElementById('contactForm').reset();
}

// Wait for DOM to be fully loaded before attaching listeners
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value.trim() || "Client";
            const email = document.getElementById('contactEmail').value.trim();
            const service = document.getElementById('contactService').value;
            const message = document.getElementById('contactMessage').value.trim();

            const fbMessage = `Hi! I'm ${name} (${email}).%0A%0A` +
                             `Interested in: ${service}%0A%0A` +
                             `Project Details:%0A${message}%0A%0A` +
                             `Looking forward to your reply!`;

            const messengerUrl = `https://www.facebook.com/messages/t/meisems?message=${fbMessage}`;

            window.open(messengerUrl, '_blank');
            closeContactModal();
        });
    }
});
