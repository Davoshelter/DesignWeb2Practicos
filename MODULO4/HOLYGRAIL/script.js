document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav a');

    // Set the first link as active by default
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent page jump

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to the clicked link
            link.classList.add('active');
        });
    });
});
