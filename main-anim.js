document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            const target = event.target.getAttribute("href");
            const targetElement = document.querySelector(target);
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth"
                });
                // Update the URL hash without jumping to the element
                history.pushState(null, null, target);
            }
        });
    });
});