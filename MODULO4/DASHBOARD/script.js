document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

    navItems.forEach(item => {
        // Avoid adding listener to the 'Volver' button if it's not meant to be part of the active state logic
        if (!item.querySelector('span').textContent.includes('Volver')) {
            item.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent page jump

                // Remove active class from all items
                navItems.forEach(i => i.classList.remove('active'));

                // Add active class to the clicked item
                item.classList.add('active');
            });
        }
    });
});
