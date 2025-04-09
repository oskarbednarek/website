document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // For GitHub Pages, simulate form submission
            const nameValue = this.elements.name.value;
            const emailValue = this.elements.email.value;

            // For real implementation, replace with actual form submission
            console.log('Form submitted:', {
                name: nameValue,
                email: emailValue,
                message: this.elements.message.value
            });

            // Show success message
            formSuccess.classList.remove('hidden');

            // Reset form
            this.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        });
    }
});