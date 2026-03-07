/* ===============================
   CONFIGURACIÓN RESPONSIVE
================================= */

// Detectar si es dispositivo móvil
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
   MOVIMIENTO CIRCULAR ADAPTATIVO
================================= */

// Configuración adaptativa según dispositivo
const animConfig = isMobile ? {
    velocidadBase: 0.04,  // Más lento en móvil
    radioBase: 60,        // Radio más pequeño
    rotacionMultiplicador: 30
} : {
    velocidadBase: 0.08,  // Normal en desktop
    radioBase: 150,       // Radio completo
    rotacionMultiplicador: 50
};

// Seleccionar motos y configurar animación
const motos = [
    { elemento: document.querySelector(".susuki"), angulo: 0, velocidad: animConfig.velocidadBase * 1.0, radio: animConfig.radioBase, rotacion: 0 },
    { elemento: document.querySelector(".yamaha"), angulo: 1, velocidad: animConfig.velocidadBase * 1.25, radio: animConfig.radioBase * 0.93, rotacion: 0 },
    { elemento: document.querySelector(".ktm"), angulo: 2, velocidad: animConfig.velocidadBase * 1.5, radio: animConfig.radioBase * 1.07, rotacion: 0 },
    { elemento: document.querySelector(".nmax"), angulo: 3, velocidad: animConfig.velocidadBase * 1.13, radio: animConfig.radioBase * 0.97, rotacion: 0 },
    { elemento: document.querySelector(".auteco"), angulo: 4, velocidad: animConfig.velocidadBase * 1.38, radio: animConfig.radioBase * 1.03, rotacion: 0 },
    { elemento: document.querySelector(".camilo"), angulo: 5, velocidad: animConfig.velocidadBase * 1.06, radio: animConfig.radioBase * 1.1, rotacion: 0 }
].filter(moto => moto.elemento !== null); // Filtrar elementos no encontrados

let animacionActiva = !prefersReducedMotion; // Respetar preferencia de movimiento reducido
let animationFrameId = null;

// Función optimizada de animación
function moverMotos() {
    if (!animacionActiva) return;
    
    motos.forEach(moto => {
        // Incrementar ángulo para movimiento circular
        moto.angulo += moto.velocidad;
        
        // Incrementar rotación de la imagen
        moto.rotacion += moto.velocidad * animConfig.rotacionMultiplicador;
        
        // Calcular posición circular
        const x = Math.cos(moto.angulo) * moto.radio;
        const y = Math.sin(moto.angulo) * moto.radio;
        
        // Aplicar transformación usando will-change para mejor performance
        moto.elemento.style.transform = `translate(${x}px, ${y}px) rotate(${moto.rotacion}deg)`;
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

