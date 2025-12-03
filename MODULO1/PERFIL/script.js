/* ===============================================
   INTERACTIVIDAD ONLYTWO
   =============================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // 1. Toggle del menú hamburguesa
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // 2. Cerrar menú al hacer click en enlaces (si aplica)
    navLinks.forEach(link => {
        // Si los enlaces son para navegación en la misma página (scroll), mantenemos el cierre.
        if(link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        }
    });

    // 3. Efecto Navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 16, 17, 1)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 242, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 16, 17, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    console.log('⚡ OnlyTWO System Online (Perfil)');
});
