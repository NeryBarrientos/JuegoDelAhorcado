//Selectores
var pantalla_principal = document.querySelector(".contenedor");
var pantalla_agregar = document.querySelector(".contenedor_agregar");
var pantalla_juego = document.querySelector(".contenedor_juego");
let palabraSecreta = "";
var palabraarray = [];
var limpiar = document.getElementById("nuevo_juego");
var intentos = '6';
var letras_incorrectas = '';
var letras_acertadas = '';
var espacio_vacio = document.getElementById("palabra");
document.getElementById('textarea_intentos').value = intentos;
document.getElementById('textarea_letras').value = letras_incorrectas;
pantalla_agregar.style.display = 'none';
pantalla_juego.style.display = 'none';
document.addEventListener("keydown", jugar);


// Array palabras
var palabras = ['html', 'alura', 'oracle', 'tiktok', 'pikachu', 'angular', 'juego', 'github', 'laptop', 'animales', 'asiatico', 'cocinar', 'jamon', 'queso', 'centavo']

// Muestra la pantalla principal y oculta las demas
function mostrarPrincipal() {
    intentos = '6'
    letras_incorrectas = ''
    letras_acertadas = ''
    document.getElementById('textarea_intentos').value = intentos;
    document.getElementById('textarea_letras').value = letras_incorrectas;
    document.getElementById("ahorcado").src="/imagenes/ahorcado_" + intentos +".png";
    pantalla_principal.style.display = "flex";
    pantalla_agregar.style.display = "none";
    pantalla_juego.style.display = "none";
    Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'Usted volvió al menú principal',
    })
}
//Escoge palabra al azar
function palabra_al_azar() {
    var tam = palabras.length
    var random = Math.floor(Math.random() * tam);
    palabraSecreta = palabras[random]
}

// Muestra la pantalla de agregar palabras y oculta las demas
function mostrarAgregar() {
    document.getElementById("textarea").value = "";
    pantalla_principal.style.display = "none";
    pantalla_juego.style.display = "none";
    pantalla_agregar.style.display = "block";
    intentos = '6'
    letras_incorrectas = ''
    letras_acertadas = ''
    document.getElementById('textarea_intentos').value = intentos;
    document.getElementById('textarea_letras').value = letras_incorrectas;
    document.getElementById("ahorcado").src="/imagenes/ahorcado_" + intentos +".png";
    document.removeEventListener("keydown",jugar)
}
//Comprueba si se acertó la palabra
function compruebaFin() {
    if (!palabraarray.includes('_') && pantalla_juego.style.display == "flex") {
        intentos = '6'
        letras_incorrectas = ''
        letras_acertadas = ''
        document.getElementById('textarea_intentos').value = intentos;
        document.getElementById('textarea_letras').value = letras_incorrectas;
        Swal.fire({
            icon: 'success',
            title: 'Ganaste',
            text: 'Juego terminado, Seras redireccionado al menu principal',
        })
        pantalla_principal.style.display = "flex";
        pantalla_agregar.style.display = "none";
        pantalla_juego.style.display = "none";
    }
}
//Dibuja los guiones
function dibujarlineas() {
    var tam = palabraSecreta.length;
    palabraarray = []
    for (var i = 0; i < tam; i++) {
        palabraarray[i] = '_';
    }
    espacio_vacio.innerHTML = palabraarray.join("");
}
//Funcion jugar principal
function jugar(event) {
    document.addEventListener("keydown", jugar);
    if (parseInt(intentos) > 1) {
        compruebaFin()
        let teclapresionada = event.key;
        teclapresionada = teclapresionada.toLowerCase()
        if (palabraSecreta.includes(teclapresionada) && !letras_acertadas.includes(teclapresionada)) {
            for (var i = 0; i < palabraSecreta.length; i++) {
                if (teclapresionada == palabraSecreta[i]) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Letra acertada',
                        showConfirmButton : false,
                        backdrop: false,
                        timer: 750,
                        toast: true,
                        position: 'bottom-end',
                        color: '#F3F5FC',
                        background: 'url(/imagenes/texturas.jpg)'
                    })
                    letras_acertadas += teclapresionada
                    palabraarray[i] = teclapresionada
                }
            }
            espacio_vacio.innerHTML = palabraarray.join("");
        } else if (letras_acertadas.includes(teclapresionada) || letras_incorrectas.includes(teclapresionada)) {
            Swal.fire({
                icon: 'success',
                title: 'Tecla ya presionada',
                showConfirmButton : false,
                backdrop: false,
                timer: 750,
                toast: true,
                position: 'top',
                color: '#F3F5FC',
                background: 'url(/imagenes/texturas.jpg)'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Letra incorrecta',
                showConfirmButton : false,
                backdrop: false,
                timer: 750,
                toast: true,
                position: 'bottom-end',
                color: '#F3F5FC',
                background: 'url(/imagenes/texturas.jpg)'
            })
            intentos = parseInt(intentos) - 1
            document.getElementById('textarea_intentos').value = intentos;
            letras_incorrectas = letras_incorrectas + '  ' + teclapresionada
            document.getElementById('textarea_letras').value = letras_incorrectas;
            document.getElementById("ahorcado").src = "/imagenes/ahorcado_" + intentos + ".png";
        }
        jugar()
    } else {
        intentos = '6'
        letras_incorrectas = ''
        letras_acertadas = ''
        document.getElementById('textarea_intentos').value = intentos;
        document.getElementById('textarea_letras').value = letras_incorrectas;
        Swal.fire({
            icon: 'error',
            title: 'Perdiste',
            text: 'No encontraste la palabra correcta, Intente jugar de nuevo',
        })
        pantalla_principal.style.display = "flex";
        pantalla_agregar.style.display = "none";
        pantalla_juego.style.display = "none";
        document.getElementById("ahorcado").src = "/imagenes/ahorcado_" + intentos + ".png";
    }
}

// Muestra la pantalla del juego y oculta las demas
function mostrarJuego() {
    pantalla_principal.style.display = "none";
    pantalla_juego.style.display = "flex";
    pantalla_agregar.style.display = "none";
    intentos = '6'
    letras_incorrectas = ''
    letras_acertadas = ''
    document.getElementById('textarea_intentos').value = intentos;
    document.getElementById('textarea_letras').value = letras_incorrectas;
    document.getElementById("ahorcado").src = "/imagenes/ahorcado_" + intentos + ".png";
    palabra_al_azar();
    dibujarlineas();
    jugar()
}
//Reinicia la partida
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
    var texto = document.getElementById("textarea").value;
    intentos = '6'
    letras_incorrectas = ''
    letras_acertadas = ''
    document.getElementById('textarea_intentos').value = intentos;
    document.getElementById('textarea_letras').value = letras_incorrectas;
    document.getElementById("ahorcado").src="/imagenes/ahorcado_" + intentos +".png";
    document.removeEventListener("keydown",jugar)
    if (texto.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No ingreso ningun caracter, Intente de nuevo',
        })
        texto = document.getElementById("textarea").value = '';
    }
    else if (texto.length <= 8) {
        intentos = '6'
        letras_incorrectas = ''
        letras_acertadas = ''
        document.getElementById('textarea_intentos').value = intentos;
        document.getElementById('textarea_letras').value = letras_incorrectas;
        document.getElementById("ahorcado").src="/imagenes/ahorcado_" + intentos +".png";
        palabras.push(texto.toLowerCase());
        mostrarJuego()
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
        document.getElementById("textarea").value = "";
    }
}