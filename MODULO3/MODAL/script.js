document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos
    const btnOpen = document.getElementById('btnOpen');
    const btnClose = document.getElementById('btnClose');
    const modal = document.getElementById('modal');
    const btnAccept = document.getElementById('btnAccept');

    // Función para abrir
    function openModal() {
        if (!modal.open) {
            modal.showModal();
            // Reiniciar animación CSS para que se vea el efecto zoom cada vez
            const wrapper = modal.querySelector('.modal-wrapper');
            wrapper.style.animation = 'none';
            wrapper.offsetHeight; /* Trigger reflow */
            wrapper.style.animation = 'zoomIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
    }

    // Función para cerrar
    function closeModal() {
        modal.close();
    }

    // Event Listeners
    if (btnOpen) {
        btnOpen.addEventListener('click', openModal);
    }

    if (btnClose) {
        btnClose.addEventListener('click', closeModal);
    }

    if (btnAccept) {
        btnAccept.addEventListener('click', () => {
            // Efecto de carga simulado en el botón
            const originalText = btnAccept.textContent;
            btnAccept.textContent = "PROCESANDO...";
            btnAccept.style.opacity = "0.7";
            
            setTimeout(() => {
                closeModal();
                // Restaurar botón después de cerrar
                setTimeout(() => {
                    btnAccept.textContent = originalText;
                    btnAccept.style.opacity = "1";
                }, 200);
            }, 600);
        });
    }

    // Cerrar al hacer clic fuera del contenido del modal
    modal.addEventListener('click', (e) => {
        const rect = modal.querySelector('.modal-wrapper').getBoundingClientRect();
        // Si el clic está fuera del wrapper, cerramos
        if (e.clientX < rect.left || e.clientX > rect.right || 
            e.clientY < rect.top || e.clientY > rect.bottom) {
            closeModal();
        }
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.open) {
            closeModal();
        }
        if (e.key === ' ' && !modal.open) {
            e.preventDefault(); // Evitar scroll
            openModal();
        }
    });
});