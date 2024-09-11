const container = document.getElementById("container");

const guardaDiaNacimiento = localStorage.getItem('diaNacimiento') || "";
const guardaMesNacimiento = localStorage.getItem('mesNacimiento') || "";
const guardaAnoNacimiento = localStorage.getItem('anoNacimiento') || "";

const inputDiaNacimiento = document.createElement("input");
inputDiaNacimiento.type = "number";
inputDiaNacimiento.placeholder = "Día de nacimiento";
inputDiaNacimiento.value = guardaDiaNacimiento;  
container.appendChild(inputDiaNacimiento);

const inputMesNacimiento = document.createElement("input");
inputMesNacimiento.type = "number";
inputMesNacimiento.placeholder = "Mes de nacimiento";
inputMesNacimiento.value = guardaMesNacimiento;  
container.appendChild(inputMesNacimiento);

const inputAnoNacimiento = document.createElement("input");
inputAnoNacimiento.type = "number";
inputAnoNacimiento.placeholder = "Año de nacimiento";
inputAnoNacimiento.value = guardaAnoNacimiento;  
container.appendChild(inputAnoNacimiento);

const inputDiaHoy = document.createElement("input");
inputDiaHoy.type = "number";
inputDiaHoy.placeholder = "Día de hoy";
container.appendChild(inputDiaHoy);

const inputMesHoy = document.createElement("input");
inputMesHoy.type = "number";
inputMesHoy.placeholder = "Mes de hoy";
container.appendChild(inputMesHoy);

const inputAnoHoy = document.createElement("input");
inputAnoHoy.type = "number";
inputAnoHoy.placeholder = "Año de hoy";

container.appendChild(inputAnoHoy);

const botonFechas = document.createElement("button");
botonFechas.textContent = "Calcular fechas especiales ";
botonFechas.addEventListener("click", Calcular_fechas_especiales);
container.appendChild(botonFechas);

const botonEdad = document.createElement("button");
botonEdad.textContent = "Calcular mes y días para cumpleaños";
botonEdad.addEventListener("click", Calcular_edad_y_cumple);
container.appendChild(botonEdad);

let imprimir = document.createElement("p");
container.appendChild(imprimir);

function validarFecha(dia, mes, ano) {
    if (mes < 1 || mes > 12) {
        return false;
    }
    if (dia < 1 || dia > diasEnMes(mes, ano)) {
        return false;
    }
    return true;
}

function esBisiesto(ano) {
    return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
}

function diasEnMes(mes, ano) {
    const diasPorMes = [31, esBisiesto(ano) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return diasPorMes[mes - 1];
}

function guardarFechas() {
    localStorage.setItem('diaNacimiento', inputDiaNacimiento.value);
    localStorage.setItem('mesNacimiento', inputMesNacimiento.value);
    localStorage.setItem('anoNacimiento', inputAnoNacimiento.value);
}

let borrar = document.createElement("button");
borrar.textContent = "Borrar fechas para reiniciar";
borrar.addEventListener("click", borrarFechas);
container.appendChild(borrar);
function borrarFechas() {
    localStorage.removeItem('diaNacimiento');
    localStorage.removeItem('mesNacimiento');
    localStorage.removeItem('anoNacimiento');

    location.reload();
}


function Calcular_fechas_especiales() {
    const diaHoy = parseInt(inputDiaHoy.value);
    const mesHoy = parseInt(inputMesHoy.value);
    const anoHoy = parseInt(inputAnoHoy.value);

    if (!validarFecha(diaHoy, mesHoy, anoHoy)) {
        imprimir.innerText = "La fecha actual es inválida.";
        return;
    }

    const diasParaNavidad = calcularDiasHasta(25, 12, anoHoy, mesHoy, diaHoy);
    const diasParaAnioNuevo = calcularDiasHasta(1, 1, anoHoy + 1, mesHoy, diaHoy);

    if (diaHoy === 25 && mesHoy === 12) {
        imprimir.innerText = "¡Feliz Navidad!";
    } else if (diaHoy === 1 && mesHoy === 1) {
        imprimir.innerText = "¡Feliz Año Nuevo!";
    } else if (diasParaNavidad < diasParaAnioNuevo) {
        imprimir.innerText = `Faltan ${diasParaNavidad} días para Navidad`;
    } else {
        imprimir.innerText = `Faltan ${diasParaAnioNuevo} días para Año Nuevo`;
    }
}

function calcularDiasHasta(diaObjetivo, mesObjetivo, anoHoy, mesHoy, diaHoy) {
    let diasFaltantes = 0;

    if (mesHoy > mesObjetivo || (mesHoy === mesObjetivo && diaHoy > diaObjetivo)) {
        for (let mes = mesHoy; mes <= 12; mes++) {
            diasFaltantes += diasEnMes(mes, anoHoy);
        }
        for (let mes = 1; mes < mesObjetivo; mes++) {
            diasFaltantes += diasEnMes(mes, anoHoy + 1);
        }
        diasFaltantes += diaObjetivo;
        diasFaltantes -= diaHoy;
    } else {
        diasFaltantes += diasEnMes(mesHoy, anoHoy) - diaHoy;
        for (let mes = mesHoy + 1; mes < mesObjetivo; mes++) {
            diasFaltantes += diasEnMes(mes, anoHoy);
        }
        diasFaltantes += diaObjetivo;
    }

    return diasFaltantes;
}

function Calcular_edad_y_cumple() {
    const diaNacimiento = parseInt(inputDiaNacimiento.value);
    const mesNacimiento = parseInt(inputMesNacimiento.value);
    const anoNacimiento = parseInt(inputAnoNacimiento.value);

    const diaHoy = parseInt(inputDiaHoy.value);
    const mesHoy = parseInt(inputMesHoy.value);
    const anoHoy = parseInt(inputAnoHoy.value);

    if (!validarFecha(diaNacimiento, mesNacimiento, anoNacimiento) || !validarFecha(diaHoy, mesHoy, anoHoy)) {
        imprimir.innerText = `Por favor, ingresa fechas válidas.`;
        return;
    }

    guardarFechas();

    let edad = anoHoy - anoNacimiento
    let mes = mesHoy - mesNacimiento
    let dia = diaHoy - diaNacimiento
    if (mesHoy < mesNacimiento || (mesHoy === mesNacimiento && diaHoy < diaNacimiento)) {
        edad--;
    }

    const diasParaCumple = calcularDiasHasta(diaNacimiento, mesNacimiento, anoHoy, mesHoy, diaHoy);
    
    if (diaHoy === diaNacimiento && mesHoy === mesNacimiento) {
        imprimir.innerText = `¡Feliz Cumpleaños! Tienes ${edad} años.`;
    } else  {
        
        imprimir.innerText = `Tienes ${edad} años. Faltan ${mes*-1} meses y ${dia*-1} días  para tu cumpleaños.`;
    } if (mesHoy>mesNacimiento || diaHoy>diaNacimiento && mesHoy===mesNacimiento ) {
      imprimir.innerText = `Faltan ${diasParaCumple} días para tu cumpleaños.`
    } 
}
