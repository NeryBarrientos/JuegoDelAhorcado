//Selectores
var pantalla_principal = document.querySelector(".contenedor");
var pantalla_agregar = document.querySelector(".contenedor_agregar");
var pantalla_juego = document.querySelector(".contenedor_juego");
pantalla_agregar.style.display = 'none';
pantalla_juego.style.display = 'none';

// Array palabras
const palabras = ['html', 'alura', 'oracle', 'tiktok', 'pikachu', 'angular', 'juego', 'github', 'laptop', 'animales', 'asiatico', 'cocinar', 'jamon', 'queso', 'centavo']

// Muestra la pantalla principal y oculta las demas
function mostrarPrincipal() {
    pantalla_principal.style.display = "flex";
    pantalla_agregar.style.display = "none";
    pantalla_juego.style.display = "none";
    Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'Usted volvió al menú principal',
    })
}
// Muestra la pantalla de agregar palabras y oculta las demas
function mostrarAgregar() {
    pantalla_principal.style.display = "none";
    pantalla_juego.style.display = "none";
    pantalla_agregar.style.display = "block";
}
// Muestra la pantalla del juego y oculta las demas
function mostrarJuego() {
    pantalla_principal.style.display = "none";
    pantalla_juego.style.display = "flex";
    pantalla_agregar.style.display = "none";
}
// Muestra un mensaje que abandonó el juego y regresa al menú principal
function desistir() {
    Swal.fire({
        title: 'Estas seguro de abandonar la partida?',
        text: "Serás regresado al menú principal",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, abandonar!'
    }).then((result) => {
        if (result.isConfirmed) {
            pantalla_principal.style.display = "flex";
            pantalla_juego.style.display = "none";
            pantalla_agregar.style.display = "none";
            Swal.fire(
                'Información!',
                'Abandonaste el juego,volviste al menú principal',
                'info'
            )
        }
    })
}

function agregar() {
    let texto = document.getElementById("textarea").value;
    if (texto.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No ingreso ningun caracter, Intente de nuevo',
        })
    }
    else if (texto.length <= 8) {
        mostrarJuego()
        palabras.push(texto);
        Swal.fire({
            icon: 'success',
            title: 'Exito!',
            text: 'Palabra ' + texto + ' Agregada Exitosamente',
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Palabras con maximo 8 letras, Intente de nuevo',
        })
        document.getElementById("textarea").value = ""
    }
}