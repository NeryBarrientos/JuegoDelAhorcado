//Selectores
var pantalla_principal = document.querySelector(".contenedor");
var pantalla_agregar = document.querySelector(".contenedor_agregar");
var pantalla_juego = document.querySelector(".contenedor_juego");
let palabraSecreta = "";
var c = document.getElementById("mycanvas");
var tablero = c.getContext("2d");
var limpiar = document.getElementById("nuevo_juego");
pantalla_agregar.style.display = 'none';
pantalla_juego.style.display = 'none';


limpiar.addEventListener("click",function(){
	c.width=c.width;
},false);

// Array palabras
let palabras = ['html', 'alura', 'oracle', 'tiktok', 'pikachu', 'angular', 'juego', 'github', 'laptop', 'animales', 'asiatico', 'cocinar', 'jamon', 'queso', 'centavo']

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

function palabra_al_azar() {
    var tam = palabras.length
    var random = Math.floor(Math.random() * tam);
    palabraSecreta = palabras[random]
}

// Muestra la pantalla de agregar palabras y oculta las demas
function mostrarAgregar() {
    pantalla_principal.style.display = "none";
    pantalla_juego.style.display = "none";
    pantalla_agregar.style.display = "block";
}

function dibujarlineas() {
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#F3F5F6";
    tablero.strokeStyle = "#0A3871";
    alert(palabraSecreta)
    let anchura = 800/palabraSecreta.length;
    for (let i = 0; i < palabraSecreta.length; i++){
        
        tablero.moveTo(20 + (anchura*i), 400)
        tablero.lineTo(70 + (anchura*i), 400)
    }
    tablero.stroke();
    tablero.closePath();
}


// Muestra la pantalla del juego y oculta las demas
function mostrarJuego() {
    pantalla_principal.style.display = "none";
    pantalla_juego.style.display = "flex";
    pantalla_agregar.style.display = "none";
    palabra_al_azar();
    // alert(palabraSecreta);
    dibujarlineas();
}

function nuevo_juego() {
    Swal.fire({
        title: 'Estas seguro de reiniciar la partida?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, reiniciar!'
    }).then((result) => {
        if (result.isConfirmed) {
            mostrarJuego();
            Swal.fire(
                'Información!',
                'Reiniciaste la partida, suerte!',
                'info'
            )
        }
    })
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
        cancelButtonText: 'Cancelar',
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
//Agrega una palabra a la lsita de palabras
function agregar() {
    let texto = document.getElementById("textarea").value;
    texto
    if (texto.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No ingreso ningun caracter, Intente de nuevo',
        })
    }
    else if (texto.length <= 8) {
        mostrarJuego()
        palabras.push(texto.toLowerCase());
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