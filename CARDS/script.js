document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if(navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isVisible = navMenu.style.display === 'flex';
            
            if (isVisible) {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '80px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = '#0f1011';
                navMenu.style.padding = '20px';
                navMenu.style.borderBottom = '2px solid var(--primary)';
            }
        });
    }
});