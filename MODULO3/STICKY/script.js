document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURACIÓN MENÚ HAMBURGUESA ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle abrir/cerrar
    if(navToggle){
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(navMenu.classList.contains('active')){
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // --- 2. SELECTORES DE NAVBARS PARA EFECTOS ---
    const navBasic = document.getElementById('navBasic');
    const navColorChange = document.getElementById('navColorChange');
    const navShrink = document.getElementById('navShrink');
    const navReveal = document.getElementById('navReveal');

    // Referencias a las secciones padre (para calcular offsets)
    const sectionBasic = document.getElementById('sectionBasic');
    // Para los otros usamos parentElement que es la section
    const sectionColor = navColorChange.parentElement;
    const sectionShrink = navShrink.parentElement;
    
    let lastScrollY = window.scrollY;
    let confettiFired = false; // Bandera para que el confeti no se dispare infinitamente

    // LISTENER DE SCROLL PRINCIPAL
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // A) Sombra para Navbar Básico (Simulación de Sticky State)
        // El offsetTop del nav cambia cuando es sticky, así que usamos la sección como referencia
        if (currentScrollY > sectionBasic.offsetTop + 50) {
            navBasic.classList.add('scrolled');
        } else {
            navBasic.classList.remove('scrolled');
        }

        // B) Navbar Cambio de Color
        if (currentScrollY > sectionColor.offsetTop + 50) {
            navColorChange.classList.add('scrolled');
        } else {
            navColorChange.classList.remove('scrolled');
        }

        // C) Navbar Shrink
        if (currentScrollY > sectionShrink.offsetTop + 50) {
            navShrink.classList.add('scrolled');
        } else {
            navShrink.classList.remove('scrolled');
        }

        // D) Navbar Reveal (Aparece al subir)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            // Bajando -> Ocultar
            navReveal.classList.add('hidden');
        } else {
            // Subiendo -> Mostrar
            navReveal.classList.remove('hidden');
        }

        // E) DETECCIÓN DE FINAL DE PÁGINA (CONFETI)
        // window.innerHeight + window.scrollY >= total height
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            if (!confettiFired) {
                lanzarConfeti();
                confettiFired = true; // Evita disparos múltiples
            }
        } else {
            // Opcional: Resetear si sube mucho para que pueda volver a salir al bajar
            if (currentScrollY < document.body.offsetHeight - 500) {
                confettiFired = false;
            }
        }
        
        lastScrollY = currentScrollY;
    });

    // --- FUNCIÓN DE CONFETI ---
    function lanzarConfeti() {
        console.log("🎉 Confeti disparado!");
        
        var duration = 3 * 1000; // 3 segundos
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
          var timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          var particleCount = 50 * (timeLeft / duration);
          
          // Lanza confeti desde dos puntos aleatorios
          confetti(Object.assign({}, defaults, { 
              particleCount, 
              origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
          }));
          confetti(Object.assign({}, defaults, { 
              particleCount, 
              origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
          }));
        }, 250);
    }

    console.log('Laboratorio de NavBars Sticky Inicializado.');
});