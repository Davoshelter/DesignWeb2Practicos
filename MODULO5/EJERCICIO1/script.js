/* ===============================================
   INTERACTIVIDAD ONLYTWO - CYBERPUNK
   =============================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // 1. Toggle del menú hamburguesa
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // 2. Cerrar menú al hacer click en enlaces internos
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Solo cerramos si es un link interno (evita cerrar en 'Volver al principal' si quieres animación distinta)
            setTimeout(() => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }, 100);
        });
    });

    // 3. Efecto Navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 6, 8, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 242, 255, 0.15)'; // Sombra un poco más fuerte
            navbar.style.borderBottom = '1px solid rgba(0, 242, 255, 0.3)';
        } else {
            navbar.style.background = 'rgba(5, 6, 8, 0.8)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
    });

    // 4. Scroll Spy Mejorado (Detección más precisa)
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        // Ajuste del offset para que la navegación cambie justo antes de llegar al título
        const scrollPosition = window.scrollY + (navbar.offsetHeight + 100);

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            // Removemos activo de todos primero
            link.classList.remove('active');
            
            // Verificamos si es un link interno (#) y coincide con la sección
            if (link.getAttribute('href').startsWith('#') && link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Caso especial: Si estamos muy arriba, activamos 'Inicio' por defecto si no hay nada seleccionado
        if (window.scrollY < 100) {
            const homeLink = document.querySelector('a[href="#inicio"]');
            if (homeLink) homeLink.classList.add('active');
        }
    });

    console.log('⚡ OnlyTWO System Online v2.0');
});