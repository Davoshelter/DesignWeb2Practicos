/* ===============================================
   LÓGICA ONLYTWO + HOME VIEW
   =============================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const modules = document.querySelectorAll('.module');

    // --- FUNCIÓN PRINCIPAL DE VISUALIZACIÓN ---
    function showModule(moduleId) {
        
        // 1. Marcar botón activo
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-module') === moduleId) {
                link.classList.add('active');
            }
        });

        // 2. Mostrar/Ocultar Módulos
        if (moduleId === 'todos') {
            // MODO HOME: Ver todo
            modules.forEach(mod => {
                mod.classList.add('active');
                mod.style.display = 'block'; 
            });
        } else {
            // MODO FILTRO: Ver uno solo
            modules.forEach(mod => {
                mod.classList.remove('active');
                mod.style.display = 'none'; 
            });

            const targetModule = document.getElementById(moduleId);
            if (targetModule) {
                targetModule.style.display = 'block';
                setTimeout(() => {
                    targetModule.classList.add('active');
                }, 10);
            }
        }
    }

    // --- CLICKS EN EL MENÚ ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const moduleId = link.getAttribute('data-module');
            showModule(moduleId);

            // CERRAR MENÚ MÓVIL AL SELECCIONAR
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // --- TOGGLE MENÚ MÓVIL ---
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // --- CERRAR MENÚ AL HACER CLICK FUERA (Opcional, mejora UX) ---
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // --- INICIALIZAR EN HOME ---
    showModule('todos'); 
    
    console.log('⚡ OnlyTWO System Online');
});
