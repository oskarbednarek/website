document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dynamic year in footer
    const footerText = document.querySelector('.footer .text-muted');
    const currentYear = new Date().getFullYear();
    footerText.textContent = `© ${currentYear} ozee.me`;

    // Carousel auto-slide interval
    $('.carousel').carousel({
        interval: 3000
    });

    // Modal show event
    $('#exampleModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget); // Button that triggered the modal
        const modal = $(this);
        modal.find('.modal-body').text('This is a dynamically updated modal content.');
    });
});