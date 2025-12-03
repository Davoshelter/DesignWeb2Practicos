document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para el Navbar que cambia de color ---
    const navColorChange = document.getElementById('navColorChange');
    const navColorChangeSection = navColorChange.parentElement;

    // --- Lógica para el Navbar que se encoge ---
    const navShrink = document.getElementById('navShrink');
    const navShrinkSection = navShrink.parentElement;

    // --- Lógica para el Navbar que se revela al subir ---
    const navReveal = document.getElementById('navReveal');
    let lastScrollY = window.scrollY;

    // Listener de scroll principal que controla todos los navbars
    window.addEventListener('scroll', () => {
        
        // 2. Control del Navbar con cambio de estilo
        // Se activa cuando el scroll supera el punto de inicio de su sección.
        if (window.scrollY > navColorChangeSection.offsetTop) {
            navColorChange.classList.add('scrolled');
        } else {
            navColorChange.classList.remove('scrolled');
        }

        // 3. Control del Navbar que se encoge
        // Se activa de manera similar al anterior.
        if (window.scrollY > navShrinkSection.offsetTop) {
            navShrink.classList.add('scrolled');
        } else {
            navShrink.classList.remove('scrolled');
        }

        // 4. Control del Navbar que aparece/desaparece
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            // Scrolling Down
            navReveal.classList.add('hidden');
        } else {
            // Scrolling Up
            navReveal.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;

    });

    console.log('Laboratorio de NavBars Sticky Inicializado.');
});