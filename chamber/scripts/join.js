document.addEventListener('DOMContentLoaded', () => {
    // Set the hidden timestamp field with the current date and time
    document.getElementById('timestamp').value = new Date().toISOString();

    // --- Modal Logic --- //
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('dialog');
    const closeButtons = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modalTarget;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('dialog');
            modal.close();
        });
    });
    
    // Close modal when clicking on the backdrop
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });
    });
});