/* ===============================
   CONFIGURACIÓN RESPONSIVE
================================= */

// Detectar si es dispositivo móvil
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Desactivar animaciones en móvil para mejor rendimiento
const ANIMACIONES_ACTIVAS = !isMobile && !prefersReducedMotion;

/* ===============================
   MENÚ LATERAL FUNCIONAL
================================= */

const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const blurOverlay = document.getElementById("blur-overlay");
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function openSidebar() {
    sidebar.style.width = "250px";
    blurOverlay.style.display = "block";
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

function closeSidebar() {
    sidebar.style.width = "0";
    blurOverlay.style.display = "none";
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Restaurar scroll
}

// Abrir menú
menuBtn.addEventListener('click', openSidebar);

// Cerrar con overlay
blurOverlay.addEventListener('click', closeSidebar);

// Cerrar al hacer click en enlaces
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeSidebar();
    });
});

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.style.width === '250px') {
        closeSidebar();
    }
});

/* ===============================
   MOVIMIENTO SUTIL SOLO EN DESKTOP
================================= */

// Configuración minimalista solo para desktop
const animConfig = {
    velocidadBase: 0.03,  // Movimiento muy sutil
    radioBase: 8          // Radio pequeño (solo flotación leve)
};

// Seleccionar imágenes solo si las animaciones están activas
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

// Función de animación SIN ROTACIÓN - solo flotación sutil
function moverMotos() {
    if (!animacionActiva) return;
    
    motos.forEach(moto => {
        // Incrementar ángulo para movimiento circular suave
        moto.angulo += moto.velocidad;
        
        // Calcular posición circular (flotación leve)
        const x = Math.cos(moto.angulo) * moto.radio;
        const y = Math.sin(moto.angulo) * moto.radio;
        
        // Aplicar solo traslación (SIN rotación)
        moto.elemento.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    // Continuar animación
    animationFrameId = requestAnimationFrame(moverMotos);
}

// Pausar animaciones cuando la pestaña no está visible (ahorro de batería)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        animacionActiva = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    } else {
        animacionActiva = !prefersReducedMotion;
        if (animacionActiva && motos.length > 0) {
            moverMotos();
        }
    }
});

// Iniciar animación si está permitida
if (animacionActiva && motos.length > 0) {
    moverMotos();
}

/* ===============================
   OPTIMIZACIÓN DE PERFORMANCE
================================= */

// Lazy loading mejorado para videos
const videos = document.querySelectorAll('video');
if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.load(); // Cargar video cuando esté visible
                videoObserver.unobserve(video);
            }
        });
    }, { rootMargin: '50px' });
    
    videos.forEach(video => videoObserver.observe(video));
}

// Smooth scroll mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

