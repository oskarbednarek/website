document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const target = event.target.getAttribute("href");
            document.querySelector(target).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});