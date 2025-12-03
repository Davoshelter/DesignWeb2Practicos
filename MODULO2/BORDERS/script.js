document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LÓGICA DE PESTAÑAS (TABS SYSTEM)
    // ==========================================
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;
            const targetContent = document.getElementById(targetId);

            if(targetContent) {
                // Remover clases activas
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(tc => tc.classList.remove('active'));

                // Activar seleccionado
                tab.classList.add('active');
                targetContent.classList.add('active');
            }
        });
    });

    // ==========================================
    // 2. LIVE EDITOR (CONSOLA)
    // ==========================================
    const inputs = {
        width: document.getElementById('border-width'),
        style: document.getElementById('border-style'),
        color: document.getElementById('border-color'),
        radius: document.getElementById('border-radius'),
    };

    const previewBox = document.getElementById('preview-box');

    function updatePreview() {
        if(previewBox && inputs.width) {
            previewBox.style.borderWidth = inputs.width.value;
            previewBox.style.borderStyle = inputs.style.value;
            previewBox.style.borderColor = inputs.color.value;
            previewBox.style.borderRadius = inputs.radius.value;
            
            // Efecto extra: Cambiar sombra según el color seleccionado
            previewBox.style.boxShadow = `0 0 20px ${inputs.color.value}40`; // 40 es transparencia Hex
        }
    }

    // Escuchar cambios en todos los inputs
    Object.values(inputs).forEach(input => {
        if(input) {
            input.addEventListener('input', updatePreview);
        }
    });

    // Inicializar
    updatePreview();

    // ==========================================
    // 3. NAVBAR TOGGLE (MÓVIL)
    // ==========================================
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
                navMenu.style.zIndex = '999';
            }
        });
    }
});