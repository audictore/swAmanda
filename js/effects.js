//Efecto de desplazamiento del header
window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("down", window.scrollY > 0);
});

//Efecto de bars-menu para formar la X
document.querySelector(".bars_menu").addEventListener("click", animateBars);

//Variables de las líneas
var line1_bars = document.querySelector(".line1_bars-menu");
var line2_bars = document.querySelector(".line2_bars-menu");
var line3_bars = document.querySelector(".line3_bars-menu");

//Función de la animación de las barras
function animateBars(){
    line1_bars.classList.toggle("activeline1_bars-menu");
    line2_bars.classList.toggle("activeline2_bars-menu");
    line3_bars.classList.toggle("activeline3_bars-menu");
}

//función para mostrar el slide menu y oscurecer un poco la pantalla
document.addEventListener('DOMContentLoaded', function(){
    //Inicialización de variables
    const barsMenu = document.querySelector('.bars_menu');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    //Función para activar o desactivar el scroll y colocar el bars-menu encima de todo mientras esta activo
    function toggleScroll(){
        body.classList.toggle('no-scroll');
        /*if (menu.classList.contains('active')){
            barsMenu.style.zIndex = 3;
        }else{
            barsMenu.style.zIndex = '';
        }*/
    }

    barsMenu.addEventListener('click', function(){
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        toggleScroll();
    });

    overlay.addEventListener('click', function(){
        menu.classList.remove('active');
        overlay.classList.remove('active');
        animateBars();
        toggleScroll();
    });
});