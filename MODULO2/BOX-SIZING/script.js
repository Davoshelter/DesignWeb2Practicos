document.addEventListener('DOMContentLoaded', () => {
    
    // VARIABLES
    const sliders = {
        width: document.getElementById('width-slider'),
        padding: document.getElementById('padding-slider'),
        border: document.getElementById('border-slider'),
    };

    const values = {
        width: document.getElementById('width-value'),
        padding: document.getElementById('padding-value'),
        border: document.getElementById('border-value'),
    };

    const demos = {
        contentBox: document.getElementById('content-box-demo'),
        borderBox: document.getElementById('border-box-demo'),
    };

    const calcs = {
        contentBox: document.getElementById('content-box-calc'),
        borderBox: document.getElementById('border-box-calc'),
    };

    // FUNCIÓN DE ACTUALIZACIÓN
    function updateDemo() {
        const width = parseInt(sliders.width.value);
        const padding = parseInt(sliders.padding.value);
        const border = parseInt(sliders.border.value);

        // 1. Actualizar Textos Sliders
        values.width.textContent = `${width}px`;
        values.padding.textContent = `${padding}px`;
        values.border.textContent = `${border}px`;

        // 2. Actualizar Estilos CSS de las cajas
        const commonStyles = {
            width: `${width}px`,
            padding: `${padding}px`,
            borderWidth: `${border}px`,
        };

        Object.assign(demos.contentBox.style, commonStyles, { boxSizing: 'content-box' });
        Object.assign(demos.borderBox.style, commonStyles, { boxSizing: 'border-box' });

        // 3. GENERAR EL HTML DEL CÁLCULO MATEMÁTICO (MEJORADO)
        
        // --- Content-Box (Suma Todo) ---
        const totalContent = width + (padding * 2) + (border * 2);
        calcs.contentBox.innerHTML = `
            <div class="math-row"><span>Width CSS:</span> <span>${width}px</span></div>
            <div class="math-row"><span>Padding (L+R):</span> <span class="num-highlight">+ ${padding * 2}px</span></div>
            <div class="math-row"><span>Border (L+R):</span> <span class="num-highlight">+ ${border * 2}px</span></div>
            <div class="math-row total"><span>TOTAL REAL:</span> <span class="total-val">${totalContent}px</span></div>
        `;

        // --- Border-Box (Resta Espacio Interno) ---
        // El ancho total ES el width definido
        const contentSpace = width - (padding * 2) - (border * 2);
        const contentSpaceText = contentSpace > 0 ? `${contentSpace}px` : '0px (Colapsado)';
        
        calcs.borderBox.innerHTML = `
            <div class="math-row"><span>Width CSS:</span> <span class="total-val">${width}px</span></div>
            <div class="math-row"><span>Padding (L+R):</span> <span class="operator">-</span> ${padding * 2}px</div>
            <div class="math-row"><span>Border (L+R):</span> <span class="operator">-</span> ${border * 2}px</div>
            <div class="math-row total" style="font-size: 0.9rem; border-top: 1px dotted #555; margin-top:5px; color:#aaa;">
                <span>Espacio Útil:</span> <span>${contentSpaceText}</span>
            </div>
             <div class="math-row total" style="border-top:none; margin-top:0;">
                <span>TOTAL REAL:</span> <span class="total-val">${width}px</span>
            </div>
        `;
    }

    // EVENT LISTENERS
    Object.values(sliders).forEach(slider => {
        slider.addEventListener('input', updateDemo);
    });

    // Iniciar
    updateDemo();


    // NAVBAR TOGGLE
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