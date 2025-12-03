document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE NAVEGACIÓN MÓVIL (Igual que antes) ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // Asumiendo que añades CSS para .active en navbar
            if (navMenu.style.display === 'flex') {
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
                navMenu.style.zIndex = '999';
            }
        });
    }

    // --- LÓGICA DE MODALES (NUEVO) ---

    // 1. Función para abrir un modal específico
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            // Trampa de foco: Opcional, mejora accesibilidad
            const firstInput = modal.querySelector('input');
            if(firstInput) firstInput.focus();
        }
    }

    // 2. Función para cerrar cualquier modal activo
    function closeModal() {
        const activeModals = document.querySelectorAll('.modal-overlay.active');
        activeModals.forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // 3. ASIGNAR EVENTOS A LOS BOTONES DE APERTURA
    // Botón Básico
    document.getElementById('openModalBasic').addEventListener('click', () => {
        openModal('modalBasic');
    });
    // Botón Danger
    document.getElementById('openModalDanger').addEventListener('click', () => {
        openModal('modalDanger');
    });
    // Botón Formulario
    document.getElementById('openModalForm').addEventListener('click', () => {
        openModal('modalForm');
    });

    // 4. CERRAR MODAL (Botones X, Botones de acción, Clic afuera, Escape)
    
    // A) Botones "X" y botones con clase .close-action
    document.querySelectorAll('.close-btn, .close-action').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // B) Clic en el fondo oscuro (Overlay)
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            // Si el clic fue DIRECTAMENTE en el overlay (no en el contenido)
            if (e.target === overlay) {
                closeModal();
            }
        });
    });

    // C) Tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

});