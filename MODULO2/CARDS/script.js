document.addEventListener('DOMContentLoaded', () => {
    
    // VARIABLES
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('mainNav');
    const cartCountEl = document.getElementById('cartCount');
    const toastContainer = document.getElementById('toast-container');
    
    // Elementos del Modal
    const modal = document.getElementById('productModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalPrice = document.getElementById('modalPrice');
    const modalAddBtn = document.getElementById('modalAddBtn');

    let totalItems = 0;

    // --- 1. LÓGICA DEL MODAL ---
    
    // Abrir Modal
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Evitar que el clic se propague si fuera necesario
            e.stopPropagation();

            // Llenar datos desde atributos data-
            modalTitle.textContent = btn.getAttribute('data-title');
            modalDesc.textContent = btn.getAttribute('data-desc');
            modalPrice.textContent = btn.getAttribute('data-price');
            modalImg.src = btn.getAttribute('data-img');
            
            // Configurar botón de añadir dentro del modal
            modalAddBtn.setAttribute('data-product', btn.getAttribute('data-title'));

            // Mostrar modal
            modal.classList.add('active');
        });
    });

    // Cerrar Modal
    function closeModal() {
        modal.classList.remove('active');
    }

    closeModalBtn.addEventListener('click', closeModal);

    // Cerrar al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });


    // --- 2. LÓGICA DE COMPRA (GENERAL) ---
    // Manejamos botones de cartas Y el botón del modal
    function handleAddToCart(btn) {
        if(btn.classList.contains('loading') || btn.classList.contains('success')) return;

        const productName = btn.getAttribute('data-product');
        const originalText = btn.textContent; // Guardar texto original

        // Loading
        btn.classList.add('loading');
        // Si es el botón del modal, cambiar texto
        if(btn.tagName === 'BUTTON' && !btn.querySelector('.btn-text')) {
             btn.textContent = 'PROCESANDO...';
        }

        setTimeout(() => {
            btn.classList.remove('loading');
            btn.classList.add('success');
            
            if(btn.tagName === 'BUTTON' && !btn.querySelector('.btn-text')) {
                btn.textContent = '¡AÑADIDO!';
            } else {
                btn.querySelector('.btn-text').textContent = '¡AÑADIDO!';
            }

            // Update UI
            totalItems++;
            cartCountEl.textContent = totalItems;
            cartCountEl.classList.add('bump');
            setTimeout(() => cartCountEl.classList.remove('bump'), 300);

            showToast(productName);

            // Reset
            setTimeout(() => {
                btn.classList.remove('success');
                if(btn.tagName === 'BUTTON' && !btn.querySelector('.btn-text')) {
                    btn.textContent = 'AÑADIR AL CARRO AHORA';
                } else {
                    btn.querySelector('.btn-text').textContent = 'AÑADIR AL CARRO';
                }
                
                // Si estamos en modal, cerrar opcionalmente (aquí lo dejo abierto)
                // closeModal(); 
            }, 2000);
        }, 1000);
    }

    // Asignar evento a botones de cartas
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', () => handleAddToCart(btn));
    });

    // Asignar evento a botón del modal
    if(modalAddBtn) {
        modalAddBtn.addEventListener('click', () => handleAddToCart(modalAddBtn));
    }

    // --- 3. TOAST & NAV ---
    function showToast(product) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span style="font-size:1.2rem">✅</span><div><strong>Carrito Actualizado</strong><br><small>${product}</small></div>`;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    console.log('⚡ Cyber Shop: System Online');
});