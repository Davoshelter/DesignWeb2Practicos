document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const sliders = {
        all: document.getElementById('padding-all'),
        top: document.getElementById('padding-top'),
        right: document.getElementById('padding-right'),
        bottom: document.getElementById('padding-bottom'),
        left: document.getElementById('padding-left'),
    };

    const values = {
        all: document.getElementById('padding-all-value'),
        top: document.getElementById('padding-top-value'),
        right: document.getElementById('padding-right-value'),
        bottom: document.getElementById('padding-bottom-value'),
        left: document.getElementById('padding-left-value'),
    };

    const sizeIndicators = {
        top: document.getElementById('sizeTop'),
        right: document.getElementById('sizeRight'),
        bottom: document.getElementById('sizeBottom'),
        left: document.getElementById('sizeLeft'),
    };

    const demoBox = document.getElementById('demoBox');
    const cssCode = document.getElementById('cssCode');
    const syncToggle = document.getElementById('syncAll');
    const resetBtn = document.getElementById('resetBtn');
    const randomBtn = document.getElementById('randomBtn');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Estado inicial
    let syncEnabled = syncToggle.checked;
    const defaultPadding = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    };

    // Funciones principales
    function updatePadding() {
        const padding = {
            top: parseInt(sliders.top.value),
            right: parseInt(sliders.right.value),
            bottom: parseInt(sliders.bottom.value),
            left: parseInt(sliders.left.value),
        };

        // Aplicar padding al demo box
        demoBox.style.padding = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`;

        // Actualizar valores visuales
        values.top.textContent = `${padding.top}px`;
        values.right.textContent = `${padding.right}px`;
        values.bottom.textContent = `${padding.bottom}px`;
        values.left.textContent = `${padding.left}px`;

        // Actualizar indicadores de tamaño
        sizeIndicators.top.textContent = `top: ${padding.top}px`;
        sizeIndicators.right.textContent = `right: ${padding.right}px`;
        sizeIndicators.bottom.textContent = `bottom: ${padding.bottom}px`;
        sizeIndicators.left.textContent = `left: ${padding.left}px`;

        // Si está sincronizado, actualizar el slider "all" y su valor
        if (syncEnabled) {
            const allValue = padding.top; // Todos iguales cuando está sincronizado
            sliders.all.value = allValue;
            values.all.textContent = `${allValue}px`;
        } else {
            // Si no está sincronizado, calcular el promedio para mostrar
            const avg = Math.round((padding.top + padding.right + padding.bottom + padding.left) / 4);
            sliders.all.value = avg;
            values.all.textContent = `${avg}px (promedio)`;
        }

        // Generar código CSS con formato
        generateCssCode(padding);

        // Agregar efecto visual de actualización
        demoBox.style.boxShadow = `0 0 30px rgba(0, 242, 255, 0.3)`;
        setTimeout(() => {
            demoBox.style.boxShadow = `0 0 20px rgba(0, 242, 255, 0.1)`;
        }, 300);
    }

    function generateCssCode(padding) {
        const { top, right, bottom, left } = padding;
        let cssRule = '';

        // Determinar la forma más eficiente de escribir el padding
        if (top === right && top === bottom && top === left) {
            cssRule = `<span class="property">padding</span>: <span class="value">${top}</span><span class="unit">px</span>;`;
        } else if (top === bottom && right === left) {
            cssRule = `<span class="property">padding</span>: <span class="value">${top}</span><span class="unit">px</span> <span class="value">${right}</span><span class="unit">px</span>;`;
        } else if (right === left) {
            cssRule = `<span class="property">padding</span>: <span class="value">${top}</span><span class="unit">px</span> <span class="value">${right}</span><span class="unit">px</span> <span class="value">${bottom}</span><span class="unit">px</span>;`;
        } else {
            cssRule = `<span class="property">padding</span>: <span class="value">${top}</span><span class="unit">px</span> <span class="value">${right}</span><span class="unit">px</span> <span class="value">${bottom}</span><span class="unit">px</span> <span class="value">${left}</span><span class="unit">px</span>;`;
        }

        cssCode.innerHTML = cssRule;
    }

    function resetToDefault() {
        sliders.top.value = defaultPadding.top;
        sliders.right.value = defaultPadding.right;
        sliders.bottom.value = defaultPadding.bottom;
        sliders.left.value = defaultPadding.left;
        
        if (syncEnabled) {
            sliders.all.value = defaultPadding.top;
        }
        
        updatePadding();
        
        // Efecto visual de reinicio
        demoBox.style.border = '2px solid var(--primary)';
        setTimeout(() => {
            demoBox.style.border = '1px dashed var(--secondary)';
        }, 500);
    }

    function randomizePadding() {
        const randomValues = {
            top: Math.floor(Math.random() * 101),
            right: Math.floor(Math.random() * 101),
            bottom: Math.floor(Math.random() * 101),
            left: Math.floor(Math.random() * 101)
        };

        sliders.top.value = randomValues.top;
        sliders.right.value = randomValues.right;
        sliders.bottom.value = randomValues.bottom;
        sliders.left.value = randomValues.left;
        
        if (syncEnabled) {
            syncToggle.checked = false;
            syncEnabled = false;
        }
        
        updatePadding();
        
        // Efecto visual aleatorio
        demoBox.style.border = '2px solid var(--primary)';
        demoBox.style.transform = 'scale(1.05)';
        setTimeout(() => {
            demoBox.style.border = '1px dashed var(--secondary)';
            demoBox.style.transform = 'scale(1)';
        }, 300);
    }

    function copyCssToClipboard() {
        const cssText = cssCode.innerText;
        navigator.clipboard.writeText(cssText).then(() => {
            // Mostrar retroalimentación visual
            const originalText = cssCode.innerHTML;
            cssCode.innerHTML = '<span style="color:#27c93f;">¡CSS copiado al portapapeles!</span>';
            setTimeout(() => {
                cssCode.innerHTML = originalText;
            }, 1500);
        });
    }

    // Event Listeners
    sliders.all.addEventListener('input', (e) => {
        const value = e.target.value;
        if (syncEnabled) {
            sliders.top.value = value;
            sliders.right.value = value;
            sliders.bottom.value = value;
            sliders.left.value = value;
        }
        updatePadding();
    });

    ['top', 'right', 'bottom', 'left'].forEach(side => {
        sliders[side].addEventListener('input', () => {
            if (syncEnabled) {
                const value = sliders[side].value;
                sliders.top.value = value;
                sliders.right.value = value;
                sliders.bottom.value = value;
                sliders.left.value = value;
            }
            updatePadding();
        });
    });

    syncToggle.addEventListener('change', (e) => {
        syncEnabled = e.target.checked;
        if (syncEnabled) {
            // Sincronizar todos los valores al valor actual del top
            const currentTopValue = sliders.top.value;
            sliders.right.value = currentTopValue;
            sliders.bottom.value = currentTopValue;
            sliders.left.value = currentTopValue;
        }
        updatePadding();
    });

    resetBtn.addEventListener('click', resetToDefault);
    randomBtn.addEventListener('click', randomizePadding);

    // Copiar código al hacer clic
    cssCode.addEventListener('click', copyCssToClipboard);

    // Navegación móvil
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Inicialización
    updatePadding();
});