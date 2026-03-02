// RELOJ EN VIVO
setInterval(() => {
    fetch('reloj.php')
        .then(response => response.text())
        .then(time => document.getElementById('reloj').innerText = time);
}, 1000);

/* ===============================
   MENÚ LATERAL FUNCIONAL
================================= */

const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const blurOverlay = document.getElementById("blur-overlay");

// Cuando se hace clic en el botón
menuBtn.onclick = () => {
    sidebar.style.width = "250px";   // Abre el menú
    blurOverlay.style.display = "block"; // Activa fondo oscuro
};

// Cuando se hace clic en el fondo oscuro
blurOverlay.onclick = () => {
    sidebar.style.width = "0";   // Cierra el menú
    blurOverlay.style.display = "none"; // Quita fondo oscuro
};

/* ===============================
   REBOTE LOCO SOLO SUZUKI
================================= */

// Seleccionamos SOLO la Suzuki
const moto = document.querySelector(".susuki");

// Variables de posición
let x = 100;
let y = 100;

// Velocidad en cada eje
let dx = 1.5;
let dy = 1.5;

// Función que mueve la moto
function moverMoto() {

    // Actualizamos posición
    x += dx;
    y += dy;

    // Detecta borde derecho o izquierdo
    if (x <= 0 || x >= window.innerWidth - moto.offsetWidth) {
        dx *= -1; // Cambia dirección horizontal
    }

    // Detecta borde arriba o abajo
    if (y <= 0 || y >= window.innerHeight - moto.offsetHeight) {
        dy *= -1; // Cambia dirección vertical
    }

    // Aplicamos movimiento
    moto.style.transform = `translate(${x}px, ${y}px)`;

    // Repite animación suavemente
    requestAnimationFrame(moverMoto);
}

// Iniciamos movimiento
moverMoto();

/* ===============================
   MOVIMIENTO CIRCULAR - YAMAHA
================================= */

const yamaha = document.querySelector(".auteco");

let angulo = 0;
let radio = 80; // tamaño del círculo

function moverYamaha() {

    angulo += 0.03; // velocidad angular

    let x = Math.cos(angulo) * radio;
    let y = Math.sin(angulo) * radio;

    yamaha.style.transform = `translate(${x}px, ${y}px)`;

    requestAnimationFrame(moverYamaha);
}

moverYamaha();

/* ===============================
   GIRO + PULSAR - KTM
================================= */

const ktm = document.querySelector(".ktm");

let rot = 0;
let escala = 1;
let creciendo = true;

function moverKTM() {

    rot += 1; // velocidad de giro

    // efecto pulsar
    if (creciendo) {
        escala += 0.01;
        if (escala >= 1.3) creciendo = false;
    } else {
        escala -= 0.01;
        if (escala <= 0.8) creciendo = true;
    }

    ktm.style.transform = `
        rotate(${rot}deg)
        scale(${escala})
    `;

    requestAnimationFrame(moverKTM);
}

moverKTM();

