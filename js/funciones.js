var documento = document;
var ANCHO = 7;
var ALTO = 6;
var turno = true;
var array = new Array(ALTO);
var botones = new Array();

function creaArray() {
    for (var i = 0; i < array.length; i++) {
        array[i] = new Array(ANCHO);
    }

    for (var y = 0; y < array.length; y++) {
        for (var x = 0; x < array[y].length; x++) {
            array[y][x] = documento.getElementById(y + "," + x);
        }
    }
    pintaArray();
}

function pintaArray() {
    var body = documento.getElementsByTagName("body")[0];
    var tabla = documento.createElement("table");
    var tblBody = documento.createElement("tbody");
    for (var y = 0; y < array.length; y++) {
        var hilera = documento.createElement("tr");
        for (var x = 0; x < array[y].length; x++) {
            var celda = documento.createElement("td");
            var boton = documento.createElement("button");
            boton.type = 'button';
            boton.id = x + "," + y;
            boton.onmouseenter = resaltaUltimoDisponible;
            boton.onmouseup = resaltaUltimoDisponible;
            boton.onmouseout = restableceUltimoDisponible;
            boton.onmousedown = coloreaUltimoDisponible;
            celda.appendChild(boton);
            botones.push(boton);
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
}

function resaltaUltimoDisponible() {
    var fila = this.id.split(",", 1);
    for (var i = ALTO - 1; i >= 0; i--) {
        if (array[i][fila] == null) {
            documento.getElementById(fila + "," + i).style.backgroundColor = "lightgreen";
            i = -1;
        }
    }
}


function restableceUltimoDisponible() {
    var fila = this.id.split(",", 1);
    for (var i = ALTO - 1; i >= 0; i--) {
        if (array[i][fila] == null) {
            documento.getElementById(fila + "," + i).style.backgroundColor = "";
            i = -1;
        }
    }
}

function coloreaUltimoDisponible() {
    var fila = this.id.split(",", 1);
    for (var i = ALTO - 1; i >= 0; i--) {
        if (array[i][fila] == null) {
            if (turno) {
                documento.getElementById(fila + "," + i).style.backgroundColor = "yellow";
            } else {
                documento.getElementById(fila + "," + i).style.backgroundColor = "blue";
            }
            array[i][fila] = turno;
            turno = !turno;
            i = -1;
        }
    }
    compruebaGanador();
}

function compruebaGanador() {
    compruebaHorizontales();
    compruebaVerticales();
    compruebaDiagonales1();
    compruebaDiagonales2();
}

function muestraMensaje(txt){
    if (txt != "") {
        alert(txt);
        deshabilitaBotones();
    }
}

function compruebaHorizontales() {
    var contadorJugador1 = 0;
    var contadorJugador2 = 0;
    var texto = "";
    var salir = false;
    for (var y = 0; y < array.length; y++) {
        if (!salir) {
            contadorJugador1 = 0;
            contadorJugador2 = 0;
            for (var x = 0; x < array[y].length; x++) {
                if (array[y][x] == true) {
                    contadorJugador1++;
                    contadorJugador2 = 0;
                } else if (array[y][x] == false) {
                    contadorJugador2++;
                    contadorJugador1 = 0;
                } else {
                    contadorJugador1 = 0;
                    contadorJugador2 = 0;
                }
                if (contadorJugador1 == 4) {
                    texto = "Gana el jugador 1!";
                    salir = true;
                } else if (contadorJugador2 == 4) {
                    texto = "Gana el jugador 2!";
                    salir = true;
                }
            }
        }
    }
    muestraMensaje(texto);
}

function compruebaVerticales() {
    var contadorJugador1 = 0;
    var contadorJugador2 = 0;
    var texto = "";
    var salir = false;
    for (var x = 0; x < array[0].length; x++) {
        if (!salir) {
            contadorJugador1 = 0;
            contadorJugador2 = 0;
            for (var y = 0; y < array.length; y++) {
                if (array[y][x] == true) {
                    contadorJugador1++;
                    contadorJugador2 = 0;
                } else if (array[y][x] == false) {
                    contadorJugador2++;
                    contadorJugador1 = 0;
                } else {
                    contadorJugador1 = 0;
                    contadorJugador2 = 0;
                }
                if (contadorJugador1 == 4) {
                    texto = "Gana el jugador 1!";
                    salir = true;
                } else if (contadorJugador2 == 4) {
                    texto = "Gana el jugador 2!";
                    salir = true;
                }
            }
        }
    }
    muestraMensaje(texto);
}

function compruebaDiagonales1() {
    var numDiagonales = ALTO + ANCHO - 1;
    var fila = 0;
    var columna = 0;
    var y = 0;
    var x = 0;
    var texto = "";
    for (var i = 0; i < numDiagonales; i++) {
        var contadorJugador1 = 0;
        var contadorJugador2 = 0;
        y = fila;
        x = columna;
        if (fila < ALTO - 1) {
            fila++;
        } else {
            columna++;
        }
        while (y >= 0 && x <= ANCHO - 1) {
            if (array[y][x] == true) {
                contadorJugador1++;
                contadorJugador2 = 0;
            } else if (array[y][x] == false) {
                contadorJugador2++;
                contadorJugador1 = 0;
            } else {
                contadorJugador1 = 0;
                contadorJugador2 = 0;
            }
            if (contadorJugador1 == 4) {
                texto = "Gana el jugador 1!";
                //salir = true;
            } else if (contadorJugador2 == 4) {
                texto = "Gana el jugador 2!";
                //salir = true;
            }
            y--;
            x++;
        }
    }
    muestraMensaje(texto);
}

function compruebaDiagonales2() {
    var numDiagonales = ALTO + ANCHO - 1;
    var fila = 0;
    var columna = ANCHO - 1;
    var y;
    var x;
    var texto = "";
    for (var i = 0; i < numDiagonales; i++) {
        var contadorJugador1 = 0;
        var contadorJugador2 = 0;
        y = fila;
        x = columna;
        if (fila < ALTO - 1) {
            fila++;
        } else {
            columna--;
        }
        while (y >= 0 && x >= 0) {
            if (array[y][x] == true) {
                contadorJugador1++;
                contadorJugador2 = 0;
            } else if (array[y][x] == false) {
                contadorJugador2++;
                contadorJugador1 = 0;
            } else {
                contadorJugador1 = 0;
                contadorJugador2 = 0;
            }
            if (contadorJugador1 == 4) {
                texto = "Gana el jugador 1!";
                //salir = true;
            } else if (contadorJugador2 == 4) {
                texto = "Gana el jugador 2!";
                //salir = true;
            }
            y--;
            x--;
        }
    }
    muestraMensaje(texto);
}

function deshabilitaBotones() {
    for (var i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }
}
