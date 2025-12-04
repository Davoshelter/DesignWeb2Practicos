document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos
    const btnOpen = document.getElementById('btnOpen');
    const btnClose = document.getElementById('btnClose');
    const modal = document.getElementById('modal');
    const btnAccept = document.getElementById('btnAccept');

    // Función para abrir con reinicio de animación
    function openModal() {
        if (!modal.open) {
            modal.showModal();
            // Truco para reiniciar la animación CSS cada vez que se abre
            const wrapper = modal.querySelector('.modal-wrapper');
            wrapper.classList.remove('animate');
            void wrapper.offsetWidth; // Trigger reflow (forzar repintado)
            wrapper.classList.add('animate');
            
            // Sonido opcional (simulado visualmente en consola)
            console.log("🔊 System Alert Sound"); 
        }
    }

    // Función para cerrar
    function closeModal() {
        // Añadir clase de cierre si quisieras animación de salida (opcional)
        modal.close();
    }

    // Event Listeners
    if (btnOpen) btnOpen.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);

    // Lógica del botón de acción
    if (btnAccept) {
        btnAccept.addEventListener('click', () => {
            const originalText = btnAccept.textContent;
            
            // Estado de carga "Tech"
            btnAccept.textContent = "PROCESANDO_";
            btnAccept.style.background = "#333";
            btnAccept.style.color = "#fff";
            btnAccept.style.cursor = "wait";
            
            setTimeout(() => {
                closeModal();
                // Restaurar botón
                setTimeout(() => {
                    btnAccept.textContent = originalText;
                    btnAccept.style.background = ""; // Vuelve al color CSS original
                    btnAccept.style.color = "";
                    btnAccept.style.cursor = "pointer";
                }, 300);
            }, 800);
        });
    }

    // Cerrar al hacer clic en el backdrop (Grid)
    modal.addEventListener('click', (e) => {
        const rect = modal.querySelector('.modal-wrapper').getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || 
            e.clientY < rect.top || e.clientY > rect.bottom) {
            closeModal();
        }
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.open) closeModal();
        if (e.key === ' ' && !modal.open && document.activeElement !== btnOpen) {
            // Solo abrir con espacio si no estamos focuseados en el botón (para evitar doble disparo)
            e.preventDefault(); 
            openModal();
        }
    });
});document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos
    const btnOpen = document.getElementById('btnOpen');
    const btnClose = document.getElementById('btnClose');
    const modal = document.getElementById('modal');
    const btnAccept = document.getElementById('btnAccept');

    // Función para abrir con reinicio de animación
    function openModal() {
        if (!modal.open) {
            modal.showModal();
            // Truco para reiniciar la animación CSS cada vez que se abre
            const wrapper = modal.querySelector('.modal-wrapper');
            wrapper.classList.remove('animate');
            void wrapper.offsetWidth; // Trigger reflow (forzar repintado)
            wrapper.classList.add('animate');
            
            // Sonido opcional (simulado visualmente en consola)
            console.log("🔊 System Alert Sound"); 
        }
    }

    // Función para cerrar
    function closeModal() {
        // Añadir clase de cierre si quisieras animación de salida (opcional)
        modal.close();
    }

    // Event Listeners
    if (btnOpen) btnOpen.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);

    // Lógica del botón de acción
    if (btnAccept) {
        btnAccept.addEventListener('click', () => {
            const originalText = btnAccept.textContent;
            
            // Estado de carga "Tech"
            btnAccept.textContent = "PROCESANDO_";
            btnAccept.style.background = "#333";
            btnAccept.style.color = "#fff";
            btnAccept.style.cursor = "wait";
            
            setTimeout(() => {
                closeModal();
                // Restaurar botón
                setTimeout(() => {
                    btnAccept.textContent = originalText;
                    btnAccept.style.background = ""; // Vuelve al color CSS original
                    btnAccept.style.color = "";
                    btnAccept.style.cursor = "pointer";
                }, 300);
            }, 800);
        });
    }

    // Cerrar al hacer clic en el backdrop (Grid)
    modal.addEventListener('click', (e) => {
        const rect = modal.querySelector('.modal-wrapper').getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || 
            e.clientY < rect.top || e.clientY > rect.bottom) {
            closeModal();
        }
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.open) closeModal();
        if (e.key === ' ' && !modal.open && document.activeElement !== btnOpen) {
            // Solo abrir con espacio si no estamos focuseados en el botón (para evitar doble disparo)
            e.preventDefault(); 
            openModal();
        }
    });
});