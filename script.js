// ============================================================================
//                     DATOS DE ACTRICES (JSON)
// ============================================================================
console.log('✅ Script.js cargado correctamente');

const actresses = {
    'Mia': {
        name: 'Mia',
        gallery: [
            'assets/img/mia.jpg',
            'assets/img/miaback.jpg'
        ]
    },
    'Lana': {
        name: 'Lana',
        gallery: [
            'assets/img/lana.jpg',
            'assets/img/lanaback.webp'
        ]
    },
    'Violet': {
        name: 'Violet',
        gallery: [
            'assets/img/violet.jpg',
            'assets/img/violetback.jpg'
        ]
    },
    'Savanah': {
        name: 'Savanah',
        gallery: [
            'assets/img/savanah.jpg',
            'assets/img/savanaback'
        ]
    },
    'Lexi': {
        name: 'Lexi',
        gallery: [
            'assets/img/lexi.jpg',
            'assets/img/lexiback.webp'
        ]
    },
    'Camilo': {
        name: 'Camilo',
        gallery: [
            'assets/img/camilo.jpeg'
        ]
    }
};

// ============================================================================
//                      STORAGE - FAVORITOS Y RATINGS
// ============================================================================
const Storage = {
    getFavorites() {
        const data = localStorage.getItem('catalogo_favorites');
        return data ? JSON.parse(data) : [];
    },
    addFavorite(name) {
        const fav = this.getFavorites();
        if (!fav.includes(name)) {
            fav.push(name);
            localStorage.setItem('catalogo_favorites', JSON.stringify(fav));
        }
    },
    removeFavorite(name) {
        let fav = this.getFavorites();
        fav = fav.filter(item => item !== name);
        localStorage.setItem('catalogo_favorites', JSON.stringify(fav));
    },
    isFavorite(name) {
        return this.getFavorites().includes(name);
    },
    getRatings() {
        const data = localStorage.getItem('catalogo_ratings');
        return data ? JSON.parse(data) : {};
    },
    setRating(name, rating) {
        const ratings = this.getRatings();
        ratings[name] = {
            rating: rating,
            date: new Date().toISOString()
        };
        localStorage.setItem('catalogo_ratings', JSON.stringify(ratings));
    },
    getRating(name) {
        const ratings = this.getRatings();
        return ratings[name] ? ratings[name].rating : 0;
    }
};

// ============================================================================
//                      NOTIFICACIONES TOAST
// ============================================================================
function createToast(message, type = 'success', duration = 2500) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #ff7a00, #ffb84d)' : '#ff6b6b'};
        color: ${type === 'success' ? '#0a0a0a' : 'white'};
        padding: 16px 28px;
        border-radius: 50px;
        font-family: Poppins, sans-serif;
        font-weight: 700;
        font-size: 14px;
        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.4), 0 0 25px ${type === 'success' ? 'rgba(255, 122, 0, 0.3)' : 'rgba(255, 107, 107, 0.3)'};
        animation: slideInToast 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        z-index: 3000;
        backdrop-filter: blur(15px);
        border: 1.5px solid rgba(255, 255, 255, 0.2);
        letter-spacing: 0.5px;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutToast 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

// Agregar keyframes de toast a estilos globales
if (!document.querySelector('style[data-toast-animations]')) {
    const toastStyle = document.createElement('style');
    toastStyle.setAttribute('data-toast-animations', 'true');
    toastStyle.textContent = `
        @keyframes slideInToast {
            from { opacity: 0; transform: translateX(400px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutToast {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(400px); }
        }
    `;
    document.head.appendChild(toastStyle);
}

// ============================================================================
//                   CONFIGURACIÓN RESPONSIVE
// ============================================================================
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ANIMACIONES_ACTIVAS = !isMobile && !prefersReducedMotion;

// ============================================================================
//                   MENÚ LATERAL FUNCIONAL
// ============================================================================
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const blurOverlay = document.getElementById("blur-overlay");
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function openSidebar() {
    if (!sidebar || !blurOverlay || !menuBtn) return;
    sidebar.style.width = "250px";
    blurOverlay.style.display = "block";
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    if (!sidebar || !blurOverlay || !menuBtn) return;
    sidebar.style.width = "0";
    blurOverlay.style.display = "none";
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

if (menuBtn) menuBtn.addEventListener('click', openSidebar);
if (blurOverlay) blurOverlay.addEventListener('click', closeSidebar);
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => closeSidebar());
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.style.width === '250px') {
        closeSidebar();
    }
});

// ============================================================================
//                   MOVIMIENTO SUTIL EN DESKTOP
// ============================================================================
const animConfig = {
    velocidadBase: 0.03,
    radioBase: 8
};

const motos = ANIMACIONES_ACTIVAS ? [
    { elemento: document.querySelector(".susuki"), angulo: 0, velocidad: animConfig.velocidadBase * 1.0, radio: animConfig.radioBase },
    { elemento: document.querySelector(".yamaha"), angulo: 1, velocidad: animConfig.velocidadBase * 1.2, radio: animConfig.radioBase * 0.9 },
    { elemento: document.querySelector(".ktm"), angulo: 2, velocidad: animConfig.velocidadBase * 1.4, radio: animConfig.radioBase * 1.1 },
    { elemento: document.querySelector(".nmax"), angulo: 3, velocidad: animConfig.velocidadBase * 1.1, radio: animConfig.radioBase },
    { elemento: document.querySelector(".auteco"), angulo: 4, velocidad: animConfig.velocidadBase * 1.3, radio: animConfig.radioBase * 1.05 },
    { elemento: document.querySelector(".camilo"), angulo: 5, velocidad: animConfig.velocidadBase * 1.15, radio: animConfig.radioBase * 0.95 }
].filter(moto => moto.elemento !== null) : [];

let animacionActiva = ANIMACIONES_ACTIVAS;
let animationFrameId = null;

function moverMotos() {
    if (!animacionActiva) return;
    motos.forEach(moto => {
        moto.angulo += moto.velocidad;
        const x = Math.cos(moto.angulo) * moto.radio;
        const y = Math.sin(moto.angulo) * moto.radio;
        moto.elemento.style.transform = `translate(${x}px, ${y}px)`;
    });
    animationFrameId = requestAnimationFrame(moverMotos);
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        animacionActiva = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else {
        animacionActiva = !prefersReducedMotion;
        if (animacionActiva && motos.length > 0) moverMotos();
    }
});

if (animacionActiva && motos.length > 0) moverMotos();

// ============================================================================
//                   LAZY LOADING DE VIDEOS
// ============================================================================
const videos = document.querySelectorAll('video');
if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.load();
                videoObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '50px' });
    videos.forEach(video => videoObserver.observe(video));
}

// ============================================================================
//                   SMOOTH SCROLL
// ============================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================================================
//                   SISTEMA DE BÚSQUEDA Y FILTRADO
// ============================================================================
const searchInput = document.getElementById('search-input');
const favoritesBtn = document.getElementById('favorites-btn');
const catalogContainer = document.getElementById('catalogo-container');
const cardWrappers = document.querySelectorAll('.card-wrapper');

let showOnlyFavorites = false;

function filterCards() {
    const searchTerm = searchInput.value.toLowerCase();
    const favorites = Storage.getFavorites();
    
    cardWrappers.forEach(wrapper => {
        const actress = wrapper.getAttribute('data-actress');
        const matchesSearch = actress.toLowerCase().includes(searchTerm);
        const isFav = favorites.includes(actress);
        
        const shouldShow = matchesSearch && (!showOnlyFavorites || isFav);
        wrapper.style.display = shouldShow ? '' : 'none';
    });
}

searchInput.addEventListener('input', filterCards);

favoritesBtn.addEventListener('click', () => {
    showOnlyFavorites = !showOnlyFavorites;
    favoritesBtn.classList.toggle('active', showOnlyFavorites);
    filterCards();
});

// ============================================================================
//                   SISTEMA DE FAVORITOS
// ============================================================================
const favoriteBtns = document.querySelectorAll('.favorite-btn');

function updateFavoriteButton(btn) {
    const wrapper = btn.closest('.card-wrapper');
    const actress = wrapper.getAttribute('data-actress');
    const isFav = Storage.isFavorite(actress);
    btn.classList.toggle('favorited', isFav);
}

// Inicializar estado de favoritos
favoriteBtns.forEach(btn => updateFavoriteButton(btn));

favoriteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const wrapper = btn.closest('.card-wrapper');
        const actress = wrapper.getAttribute('data-actress');
        
        if (Storage.isFavorite(actress)) {
            Storage.removeFavorite(actress);
            createToast(`${actress} eliminada de favoritos`, 'success', 2000);
        } else {
            Storage.addFavorite(actress);
            createToast(`${actress} agregada a favoritos ♥`, 'success', 2000);
        }
        
        updateFavoriteButton(btn);
    });
});

// ============================================================================
//                   SISTEMA DE CALIFICACIÓN
// ============================================================================
const ratingModal = document.getElementById('rating-modal');
const ratingStarContainer = document.getElementById('star-rating');
const ratingSubmitBtn = document.getElementById('rating-submit');
const starsElements = document.querySelectorAll('.stars');

let currentRatingActress = null;
let currentRating = 0;

function renderStars(container) {
    container.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = '★';
        star.dataset.rating = i;
        star.addEventListener('click', () => {
            currentRating = i;
            updateStarDisplay(container);
        });
        star.addEventListener('mouseenter', () => {
            updateStarDisplay(container, i);
        });
        container.appendChild(star);
    }
    container.addEventListener('mouseleave', () => {
        updateStarDisplay(container);
    });
}

function updateStarDisplay(container, hoverRating = 0) {
    const stars = container.querySelectorAll('.star');
    const displayRating = hoverRating || currentRating;
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < displayRating);
    });
}

function showRatingModal(actress) {
    console.log('Mostrando modal de rating para:', actress);
    currentRatingActress = actress;
    currentRating = Storage.getRating(actress);
    
    if (!ratingStarContainer || !ratingModal) {
        console.error('Modal de rating o contenedor de estrellas no encontrado');
        return;
    }
    
    ratingStarContainer.innerHTML = '';
    renderStars(ratingStarContainer);
    updateStarDisplay(ratingStarContainer);
    
    ratingModal.classList.remove('hidden');
    console.log('Modal abierto, rating actual:', currentRating);
}

function closeRatingModal() {
    console.log('Cerrando modal de rating');
    if (ratingModal) {
        ratingModal.classList.add('hidden');
    }
    currentRatingActress = null;
    currentRating = 0;
}

function updateRatingDisplay(actress) {
    const rating = Storage.getRating(actress);
    const wrapper = document.querySelector(`[data-actress="${actress}"]`);
    if (wrapper) {
        const starsElement = wrapper.querySelector('.stars');
        const ratingCount = wrapper.querySelector('.rating-count');
        if (starsElement) {
            starsElement.setAttribute('data-rating', rating);
            if (ratingCount) ratingCount.textContent = rating || '0';
        }
    }
}

function handleStarClick(actress) {
    showRatingModal(actress);
}

// Inicializar displays de calificación
cardWrappers.forEach(wrapper => {
    const actress = wrapper.getAttribute('data-actress');
    updateRatingDisplay(actress);
    
    const starsElement = wrapper.querySelector('.stars');
    if (starsElement) {
        starsElement.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Click en estrellas de:', actress);
            handleStarClick(actress);
        });
        starsElement.classList.add('interactive');
        starsElement.style.cursor = 'pointer';
    } else {
        console.warn('No se encontró .stars para:', actress);
    }
});

// Evento submit del modal de calificación
if (ratingSubmitBtn) {
    console.log('Botón de rating encontrado, agregando event listener');
    ratingSubmitBtn.addEventListener('click', () => {
        console.log('Click en submit rating. Actriz:', currentRatingActress, 'Rating:', currentRating);
        if (currentRatingActress && currentRating > 0) {
            Storage.setRating(currentRatingActress, currentRating);
            updateRatingDisplay(currentRatingActress);
            
            const messages = {
                1: 'Puede mejorar',
                2: 'Buena calificación',
                3: 'Muy buena',
                4: 'Excelente',
                5: 'Perfecto, te encantó'
            };
            
            createToast(messages[currentRating] || 'Calificación guardada', 'success', 2500);
            closeRatingModal();
        } else {
            createToast('Selecciona una calificación', 'error', 2000);
        }
    });
} else {
    console.error('No se encontró el botón rating-submit');
}

// ============================================================================
//                   ANIMACIONES DE ENTRADA
// ============================================================================
function addEntranceAnimations() {
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    
    cardWrappers.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.animation = `fadeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s forwards`;
    });
}

// Agregar styles de animación si no existen
if (!document.querySelector('style[data-entrance]')) {
    const entranceStyle = document.createElement('style');
    entranceStyle.setAttribute('data-entrance', 'true');
    entranceStyle.textContent = `
        @keyframes fadeIn {
            from { 
                opacity: 0; 
                transform: translateY(30px); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }
    `;
    document.head.appendChild(entranceStyle);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', addEntranceAnimations);

// ============================================================================
//                   GALERÍA MODAL
// ============================================================================
const galleryModal = document.getElementById('gallery-modal');
const galleryGrid = document.getElementById('gallery-grid');
const galleryTitle = document.getElementById('gallery-title');
const galleryBtns = document.querySelectorAll('.btn-gallery');

function showGallery(actress) {
    galleryTitle.textContent = `Galería de ${actress}`;
    galleryGrid.innerHTML = '';
    
    const actressData = actresses[actress];
    if (actressData && actressData.gallery.length > 0) {
        actressData.gallery.forEach((imgSrc, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.style.animation = `scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s forwards`;
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${actress} - Galería`;
            img.loading = 'lazy';
            item.appendChild(img);
            galleryGrid.appendChild(item);
        });
    } else {
        const empty = document.createElement('div');
        empty.className = 'gallery-item empty';
        empty.style.gridColumn = '1 / -1';
        empty.textContent = '😔 No hay imágenes disponibles';
        galleryGrid.appendChild(empty);
    }
    
    galleryModal.classList.remove('hidden');
}

galleryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const actress = btn.getAttribute('data-actress');
        showGallery(actress);
    });
});

// ============================================================================
//                   FLIP DE TARJETAS EN MÓVIL
// ============================================================================
if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    const cardLinks = document.querySelectorAll('.card-link');
    
    cardLinks.forEach(cardLink => {
        const motoCard = cardLink.querySelector('.moto-card');
        let isFlipped = false;
        let tapTimeout = null;
        
        cardLink.addEventListener('click', function(e) {
            if (isFlipped) return;
            e.preventDefault();
            motoCard.classList.add('flipped');
            isFlipped = true;
            tapTimeout = setTimeout(() => {
                motoCard.classList.remove('flipped');
                isFlipped = false;
            }, 3000);
        });
        
        let lastTap = 0;
        motoCard.addEventListener('touchend', function(e) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 500 && tapLength > 0) {
                e.preventDefault();
                motoCard.classList.remove('flipped');
                isFlipped = false;
                if (tapTimeout) clearTimeout(tapTimeout);
            }
            lastTap = currentTime;
        });
    });
}

// ============================================================================
//                   CERRAR MODALES
// ============================================================================
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-gallery, .modal-rating, .modal-auth, .user-panel');
        if (modal) {
            modal.classList.add('hidden');
        }
    });
});

// Cerrar modales al hacer clic fuera
document.addEventListener('click', (e) => {
    if (e.target.id === 'gallery-modal') {
        galleryModal.classList.add('hidden');
    }
    if (e.target.id === 'rating-modal') {
        ratingModal.classList.add('hidden');
    }
    if (e.target.id === 'auth-modal' || e.target.classList.contains('modal-auth')) {
        const authModal = document.querySelector('.modal-auth');
        if (authModal && e.target === authModal) {
            authModal.classList.add('hidden');
        }
    }
    if (e.target.id === 'user-panel' || e.target.classList.contains('user-panel')) {
        const userPanel = document.querySelector('.user-panel');
        if (userPanel && e.target === userPanel) {
            userPanel.classList.add('hidden');
        }
    }
});

// Cerrar modales con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (galleryModal) galleryModal.classList.add('hidden');
        if (ratingModal) ratingModal.classList.add('hidden');
        const authModal = document.querySelector('.modal-auth');
        const userPanel = document.querySelector('.user-panel');
        if (authModal) authModal.classList.add('hidden');
        if (userPanel) userPanel.classList.add('hidden');
    }
});

// ============================================================================
//                   INICIALIZACIÓN Y VERIFICACIÓN
// ============================================================================
console.log('🎨 CSS Variables:', getComputedStyle(document.documentElement).getPropertyValue('--accent'));
console.log('Elementos encontrados:');
console.log('  - Cards:', document.querySelectorAll('.card-wrapper').length);
console.log('  - Favorite buttons:', document.querySelectorAll('.favorite-btn').length);
console.log('  - Gallery buttons:', document.querySelectorAll('.btn-gallery').length);
console.log('  - Rating stars:', document.querySelectorAll('.stars').length);
console.log('✅ Todo inicializado correctamente');

// Verificar localStorage
if (typeof(Storage) !== "undefined") {
    console.log('💾 LocalStorage disponible');
} else {
    console.warn('LocalStorage no disponible');
}

// ============================================================================
//                   SISTEMA DE AUTENTICACIÓN
// ============================================================================

const AuthSystem = {
    currentUser: null,
    
    init() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.updateUserUI();
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        const userBtn = document.getElementById('user-btn');
        const authModal = document.querySelector('.modal-auth');
        const userPanel = document.querySelector('.user-panel');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const showRegisterLink = document.getElementById('show-register');
        const showLoginLink = document.getElementById('show-login');
        const logoutBtn = document.querySelector('.logout-btn');
        const loginSubmit = document.getElementById('login-submit');
        const registerSubmit = document.getElementById('register-submit');
        
        if (userBtn) {
            userBtn.addEventListener('click', () => {
                if (this.currentUser) {
                    this.showUserPanel();
                } else {
                    this.showAuthModal();
                }
            });
        }
        
        if (showRegisterLink) {
            showRegisterLink.addEventListener('click', (e) => {
                e.preventDefault();
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
                registerForm.classList.remove('hidden');
                loginForm.classList.add('hidden');
            });
        }
        
        if (showLoginLink) {
            showLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
            });
        }
        
        if (loginSubmit) {
            loginSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
        
        if (registerSubmit) {
            registerSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }
        
        // Event listener para Mi Perfil en el sidebar
        const sidebarProfile = document.getElementById('sidebar-profile');
        if (sidebarProfile) {
            sidebarProfile.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.currentUser) {
                    this.showUserPanel();
                    // Cerrar sidebar
                    const sidebar = document.getElementById('sidebar');
                    const menuBtn = document.getElementById('menu-btn');
                    if (sidebar) sidebar.classList.remove('active');
                    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
                } else {
                    this.showAuthModal();
                    // Cerrar sidebar
                    const sidebar = document.getElementById('sidebar');
                    const menuBtn = document.getElementById('menu-btn');
                    if (sidebar) sidebar.classList.remove('active');
                    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Event listeners para botones del panel de usuario
        const viewFavoritesBtn = document.getElementById('view-favorites');
        const viewRatingsBtn = document.getElementById('view-ratings');
        
        if (viewFavoritesBtn) {
            viewFavoritesBtn.addEventListener('click', () => {
                this.showFavorites();
            });
        }
        
        if (viewRatingsBtn) {
            viewRatingsBtn.addEventListener('click', () => {
                this.showRatings();
            });
        }
        
        // Cerrar modales
        document.querySelectorAll('.modal-auth, .user-panel').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        });
    },
    
    showAuthModal() {
        const authModal = document.querySelector('.modal-auth');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        
        if (authModal) {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            authModal.classList.remove('hidden');
        }
    },
    
    showUserPanel() {
        const userPanel = document.querySelector('.user-panel');
        if (userPanel && this.currentUser) {
            // Actualizar datos del panel
            const avatar = userPanel.querySelector('.user-avatar');
            const username = userPanel.querySelector('.user-panel-header h3');
            const email = userPanel.querySelector('.user-email');
            const favCount = userPanel.querySelector('.stat-item:nth-child(1) .stat-value');
            const ratingsCount = userPanel.querySelector('.stat-item:nth-child(2) .stat-value');
            const recoCount = userPanel.querySelector('.stat-item:nth-child(3) .stat-value');
            
            if (avatar) avatar.textContent = this.currentUser.username.charAt(0).toUpperCase();
            if (username) username.textContent = this.currentUser.username;
            if (email) email.textContent = this.currentUser.email;
            
            // Estadísticas
            const favorites = Storage.getFavorites();
            const ratings = Object.keys(Storage.getRatings()).length;
            const recommendations = RecommendSystem.getUserRecommendations().length;
            
            if (favCount) favCount.textContent = favorites.length;
            if (ratingsCount) ratingsCount.textContent = ratings;
            if (recoCount) recoCount.textContent = recommendations;
            
            userPanel.classList.remove('hidden');
        }
    },
    
    handleLogin() {
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        
        if (!username || !password) {
            createToast('Por favor completa todos los campos', 'error', 2500);
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            this.currentUser = { username: user.username, email: user.email };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.updateUserUI();
            document.querySelector('.modal-auth').classList.add('hidden');
            createToast(`Bienvenido, ${username}`, 'success', 3000);
        } else {
            createToast('Usuario o contraseña incorrectos', 'error', 2500);
        }
    },
    
    handleRegister() {
        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        
        if (!username || !email || !password || !confirmPassword) {
            createToast('Por favor completa todos los campos', 'error', 2500);
            return;
        }
        
        if (password !== confirmPassword) {
            createToast('Las contraseñas no coinciden', 'error', 2500);
            return;
        }
        
        if (password.length < 6) {
            createToast('La contraseña debe tener al menos 6 caracteres', 'error', 2500);
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.username === username)) {
            createToast('El usuario ya existe', 'error', 2500);
            return;
        }
        
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        this.currentUser = { username, email };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.updateUserUI();
        document.querySelector('.modal-auth').classList.add('hidden');
        createToast('Cuenta creada exitosamente', 'success', 3000);
    },
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUserUI();
        document.querySelector('.user-panel').classList.add('hidden');
        createToast('Sesión cerrada', 'success', 2000);
    },
    
    updateUserUI() {
        const userBtn = document.getElementById('user-btn');
        const userName = userBtn ? userBtn.querySelector('.user-name') : null;
        
        if (userName) {
            if (this.currentUser) {
                userName.textContent = this.currentUser.username;
            } else {
                userName.textContent = 'Ingresar';
            }
        }
    },
    
    showFavorites() {
        const favorites = Storage.getFavorites();
        
        if (favorites.length === 0) {
            createToast('No tienes favoritos aún', 'error', 2500);
            return;
        }
        
        // Cerrar el panel de usuario
        document.querySelector('.user-panel').classList.add('hidden');
        
        // Hacer scroll al catálogo y filtrar favoritos
        const catalogSection = document.getElementById('catalogo');
        if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Activar filtro de favoritos
        setTimeout(() => {
            const favBtn = document.getElementById('favorites-btn');
            if (favBtn && !favBtn.classList.contains('active')) {
                favBtn.click();
            }
            createToast(`Mostrando ${favorites.length} favoritos`, 'success', 2500);
        }, 500);
    },
    
    showRatings() {
        const ratings = Storage.getRatings();
        const ratingsList = Object.entries(ratings);
        
        if (ratingsList.length === 0) {
            createToast('No tienes calificaciones aún', 'error', 2500);
            return;
        }
        
        // Cerrar el panel de usuario
        document.querySelector('.user-panel').classList.add('hidden');
        
        // Crear mensaje con calificaciones
        let message = 'Tus calificaciones:\n';
        ratingsList.forEach(([actress, rating]) => {
            message += `${actress}: ${rating} estrellas\n`;
        });
        
        // Hacer scroll al catálogo
        const catalogSection = document.getElementById('catalogo');
        if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        createToast(`Tienes ${ratingsList.length} calificaciones`, 'success', 3000);
    }
};

// ============================================================================
//                   SISTEMA DE RECOMENDACIONES
// ============================================================================

const RecommendSystem = {
    init() {
        console.log('Inicializando sistema de recomendaciones...');
        this.setupEventListeners();
        this.loadRecommendations();
        this.loadVideosDelDia();
        console.log('Sistema de recomendaciones inicializado');
    },
    
    setupEventListeners() {
        const videoForm = document.getElementById('recommend-video-form');
        const actressForm = document.getElementById('recommend-actress-form');
        
        if (videoForm) {
            videoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleVideoRecommendation(e.target);
            });
        }
        
        if (actressForm) {
            actressForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleActressRecommendation(e.target);
            });
        }
    },
    
    handleVideoRecommendation(form) {
        if (!AuthSystem.currentUser) {
            createToast('Debes iniciar sesión para recomendar', 'error', 2500);
            return;
        }
        
        const videoUrl = document.getElementById('video-url').value.trim();
        const actress = document.getElementById('video-actress-name').value.trim();
        const description = document.getElementById('video-description').value.trim();
        
        if (!videoUrl || !actress || !description) {
            createToast('Por favor completa todos los campos', 'error', 2500);
            return;
        }
        
        const recommendation = {
            id: Date.now(),
            type: 'video',
            videoUrl,
            actress,
            description,
            user: AuthSystem.currentUser.username,
            votes: 0,
            timestamp: new Date().toISOString()
        };
        
        const recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');
        recommendations.push(recommendation);
        localStorage.setItem('recommendations', JSON.stringify(recommendations));
        
        form.reset();
        this.loadRecommendations();
        this.loadVideosDelDia();
        createToast('Video recomendado exitosamente', 'success', 3000);
        
        // Scroll suave a la sección de recomendaciones
        setTimeout(() => {
            const recList = document.querySelector('.recommendations-list');
            if (recList) {
                recList.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 500);
    },
    
    handleActressRecommendation(form) {
        if (!AuthSystem.currentUser) {
            createToast('Debes iniciar sesión para recomendar', 'error', 2500);
            return;
        }
        
        const actressName = document.getElementById('actress-name').value.trim();
        const imageUrl = document.getElementById('actress-image-url').value.trim();
        const reason = document.getElementById('actress-description').value.trim();
        
        if (!actressName || !imageUrl || !reason) {
            createToast('Por favor completa todos los campos', 'error', 2500);
            return;
        }
        
        const recommendation = {
            id: Date.now(),
            type: 'actress',
            actressName,
            imageUrl,
            reason,
            user: AuthSystem.currentUser.username,
            votes: 0,
            timestamp: new Date().toISOString()
        };
        
        const recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');
        recommendations.push(recommendation);
        localStorage.setItem('recommendations', JSON.stringify(recommendations));
        
        form.reset();
        this.loadRecommendations();
        createToast('Actriz recomendada exitosamente', 'success', 3000);
        
        // Scroll suave a la sección de recomendaciones
        setTimeout(() => {
            const recList = document.querySelector('.recommendations-list');
            if (recList) {
                recList.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 500);
    },
    
    loadRecommendations() {
        const recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');
        const grid = document.querySelector('.recommendations-grid');
        
        console.log('Cargando recomendaciones:', recommendations.length, 'encontradas');
        console.log('Grid encontrado:', grid ? 'Sí' : 'No');
        
        if (!grid) {
            console.error('No se encontró el elemento .recommendations-grid');
            return;
        }
        
        grid.innerHTML = '';
        
        if (recommendations.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: rgba(255,255,255,0.5); padding: 40px;">No hay recomendaciones aún. ¡Sé el primero!</div>';
            return;
        }
        
        // Ordenar por votos
        recommendations.sort((a, b) => b.votes - a.votes);
        
        recommendations.forEach(rec => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            
            // Verificar si el usuario actual es el autor
            const isAuthor = AuthSystem.currentUser && rec.user === AuthSystem.currentUser.username;
            const deleteBtn = isAuthor ? `<button class="delete-recommendation-btn" data-rec-id="${rec.id}" title="Eliminar recomendación">×</button>` : '';
            
            if (rec.type === 'video') {
                card.innerHTML = `
                    ${deleteBtn}
                    <h4>${rec.actress}</h4>
                    <p>${rec.description}</p>
                    <div class="recommendation-meta">
                        <span>Por ${rec.user}</span>
                        <span>${rec.votes} votos</span>
                    </div>
                `;
            } else {
                // Recomendación de actriz con imagen
                const imageHtml = rec.imageUrl ? `<img src="${rec.imageUrl}" alt="${rec.actressName}" class="recommendation-img" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 15px;" onerror="this.style.display='none'">` : '';
                card.innerHTML = `
                    ${deleteBtn}
                    ${imageHtml}
                    <h4>${rec.actressName}</h4>
                    <p>${rec.reason}</p>
                    <div class="recommendation-meta">
                        <span>Por ${rec.user}</span>
                        <span>${rec.votes} votos</span>
                    </div>
                `;
            }
            
            grid.appendChild(card);
        });
        
        // Agregar event listeners para botones de eliminar
        document.querySelectorAll('.delete-recommendation-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const recId = parseInt(e.target.dataset.recId);
                RecommendSystem.deleteRecommendation(recId);
            });
        });
    },
    
    loadVideosDelDia() {
        const recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');
        const videoRecs = recommendations.filter(r => r.type === 'video');
        const container = document.querySelector('.videos-dia-container');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        if (videoRecs.length === 0) {
            container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: rgba(255,255,255,0.5); padding: 40px;">No hay videos del día. ¡Recomienda uno!</div>';
            return;
        }
        
        // Mostrar los 6 videos más votados
        const topVideos = videoRecs.sort((a, b) => b.votes - a.votes).slice(0, 6);
        
        topVideos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-dia-card';
            card.innerHTML = `
                <div class="video-dia-info">
                    <div class="video-dia-actress">${video.actress}</div>
                    <div class="video-dia-description">${video.description}</div>
                    <div class="video-dia-meta">
                        <span class="video-dia-user">Por ${video.user}</span>
                        <span class="video-dia-votes">${video.votes} votos</span>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    },
    
    getUserRecommendations() {
        if (!AuthSystem.currentUser) return [];
        const recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');
        return recommendations.filter(r => r.user === AuthSystem.currentUser.username);
    },
    
    deleteRecommendation(recId) {
        if (!AuthSystem.currentUser) {
            createToast('Debes iniciar sesión', 'error', 2500);
            return;
        }
        
        const recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');
        const recIndex = recommendations.findIndex(r => r.id === recId);
        
        if (recIndex === -1) {
            createToast('Recomendación no encontrada', 'error', 2500);
            return;
        }
        
        // Verificar que el usuario actual es el autor
        if (recommendations[recIndex].user !== AuthSystem.currentUser.username) {
            createToast('No puedes eliminar recomendaciones de otros usuarios', 'error', 2500);
            return;
        }
        
        // Eliminar la recomendación
        recommendations.splice(recIndex, 1);
        localStorage.setItem('recommendations', JSON.stringify(recommendations));
        
        // Actualizar las vistas
        this.loadRecommendations();
        this.loadVideosDelDia();
        
        createToast('Recomendación eliminada', 'success', 2500);
    }
};

// ============================================================================
//                   NAVEGACIÓN
// ============================================================================

const Navigation = {
    init() {
        this.setupMenuItems();
    },
    
    setupMenuItems() {
        const menuItems = document.querySelectorAll('.menu-nav a');
        
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Cerrar el menú al hacer clic
                const menuBtn = document.getElementById('menu-btn');
                const sidebar = document.querySelector('.sidebar');
                
                if (sidebar && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
};

// ============================================================================
//                   INICIALIZACIÓN COMPLETA
// ============================================================================

// ============================================================================
//     PREVENIR FLIP DE TARJETAS EN ELEMENTOS INTERACTIVOS
// ============================================================================
function preventCardFlipOnInteractiveElements() {
    const cards = document.querySelectorAll('.moto-card');
    
    cards.forEach(card => {
        // Seleccionar todos los elementos interactivos dentro de la tarjeta
        const interactiveElements = card.querySelectorAll(
            '.stars, .btn-gallery, .btn-comprar, .favorite-btn, .rating-container'
        );
        
        interactiveElements.forEach(element => {
            // Cuando el mouse entra en un elemento interactivo
            element.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                card.classList.add('no-flip');
            });
            
            // Cuando el mouse sale de un elemento interactivo
            element.addEventListener('mouseleave', () => {
                card.classList.remove('no-flip');
            });
        });
    });
    
    console.log('✅ Sistema de prevención de flip inicializado');
}

document.addEventListener('DOMContentLoaded', () => {
    AuthSystem.init();
    RecommendSystem.init();
    Navigation.init();
    preventCardFlipOnInteractiveElements();
    
    console.log('Sistema de autenticación inicializado');
    console.log('Sistema de recomendaciones inicializado');
});

