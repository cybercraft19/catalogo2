
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="assets/img/icon.ico" type="image/png">
    <title>catálogo de motos</title>
    <link rel="stylesheet" href="style">
    </head>
<body>
   <header class="header"> 

    <!-- Botón hamburguesa -->
    <button id="menu-btn">☰</button>

    <!-- Sidebar lateral -->
    <div id="sidebar">
        <a href="#inicio">Inicio</a>
        <a href="#catalogo">Catálogo</a>
        <a href="#videos">videos</a>
    </div>

    <!-- Fondo oscuro cuando se abre el menú -->
    <div id="blur-overlay"></div>

    <!-- reloj php -->
    <div class="reloj" id="reloj">
        <?php
        date_default_timezone_set('America/Bogota');
        echo date('H:i:s');
        ?>
    </div>

</header>

    <section id="inicio">
        <h1 class="title">
            catálogo de motos
        </h1>
        
        <p class="hi">
            bienvenido al catálogo de motos remington, el mejor catálogo del mundo si sabe parcero
        </p>
    </section>

    <main>
        <section id="catalogo">
        <p>
            motos de nuestra tienda:
        </p>
        <div class="contenedor">
        <div  class="susuki2">
            <img class="susuki" src="assets/img/susuki.webp" alt="Suzuki">
            <h2>susuki deportiva</h2>
            <p>100$</p>
        </div>
        <div  class="yamaha2">
            <img class="yamaha" src="assets/img/yamaha.jpg" alt="Yamaha">
            <h2>yamaha deportiva</h2>
            <p>150$</p>
        </div>
        <div  class="ktm2">
            <img class="ktm" src="assets/img/ktm.jpg" alt="KTM">
            <h2>ktm deportiva</h2>
            <p>250$</p>
        </div>
        <div  class="nmax2">
            <img class="nmax" src="assets/img/nmax.jpg" alt="NMAX">
            <h2>nmax deportiva</h2>
            <p>450$</p>
        </div>
        <div  class="auteco2">
            <img class="auteco" src="assets/img/auteco.jpg" alt="Auteco">
            <h2>auteco deportiva</h2>
            <p>650$</p>
        </div>
        <div  class="camilo2">
            <img class="camilo" src="assets/img/camilo.jpg" alt="Camilo">
            <h2>camilo deportiva</h2>
            <p>1000$</p>
        </div>
        </div>

        </section> 
<section id="videos">

    <h2 class="titulo-videos">
        Videos Destacados
    </h2>
<!-- cosa de videos kkkkk -->
    <div class="contenedor-videos">

        <!-- video 1 -->
        <div class="video-card">
            <video controls>
                <source src="assets/video/lol.mp4" type="video/mp4">
            </video>
        </div>

        <!-- video 2 -->
        <div class="video-card">
            <video controls>
                <source src="assets/video/poni.mp4" type="video/mp4">
            </video>
        </div>

        <!-- video 3 -->
        <div class="video-card">
            <video controls>
                <source src="assets/video/uwu.mp4" type="video/mp4">
            </video>
        </div>

    </div>

</section>
    </main>

    <footer>


    </footer>   
    <script src="script.js"></script>
</body>
</html>