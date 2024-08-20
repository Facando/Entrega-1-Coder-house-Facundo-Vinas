
    
    const nacimiento = function () {
    
    let dia_n = parseInt(prompt("Ingresa tu dia de nacimiento"));
    let mes_n = parseInt(prompt("Ingresa tu mes de nacimiento"));
    let anio_n = parseInt(prompt("Ingresa tu anio de nacimiento"));

    
    alert(`Tu dia de nacimiento es ${dia_n}/${mes_n}/${anio_n}`);
    return {dia_n, mes_n, anio_n} ;
    
    
}

const fecha_actual = function () {
     
    let diahoy = parseInt(prompt("Ingresa el dia de hoy"));
    let meshoy = parseInt(prompt("Ingresa el mes de hoy"));
    alert(`Hoy es ${diahoy}/${meshoy}/2024`);
    
    return {diahoy, meshoy};
}



function fecha(dia_n, mes_n, anio_n,diahoy, meshoy) {
    
    alert(`Hoy es ${diahoy}/${meshoy}/2024`);
    
    if (dia_n <= diahoy && mes_n <= meshoy) {
        alert("Feliz cumpleaños "+ (2024 - anio_n));
    } else  if (dia_n > diahoy && mes_n > meshoy) {
        let resultadoDia = dia_n - diahoy;
        let resultadoMes = mes_n - meshoy;
        let diastotales = resultadoDia + resultadoMes*30
        alert(`Faltan ${resultadoDia} días y ${resultadoMes} meses para tu cumpleaños o 
        ${diastotales} días \n todavia tenes ${2024 - anio_n-1} anios`);
    }

}

const aniosfuturos = function (anio_n) {
    let anio_f = parseInt(prompt("Ingresa el anio que deseas saber"));
    anioResultado = anio_f - anio_n;
    alert(`En ${anio_f} tendras ${anioResultado} anios`);
}

let fin = true;

const fechaNacimiento = nacimiento();
const fechaActual = fecha_actual();
        
while (fin) {
    

let menu = parseInt(prompt("Ingresa el numero de la opcion que deseas \n 1. Calcular edad de hoy \n 2. Calcular edad futura" + "\n 3. Salir"));

switch (menu) {
    case 1:
        console.log("opcion 1");
        fecha(fechaNacimiento.dia_n, fechaNacimiento.mes_n, fechaNacimiento.anio_n, fechaActual.diahoy, fechaActual.meshoy);
        break;
    case 2:
        console.log("opcion 2");
        aniosfuturos( fechaNacimiento.anio_n);
        break;
    case 3:
        fin = false;
        console.log("Finaliza el programa");
        break;
    default:
        alert("Opcion no valida");
        fin = false;
        break;
}



}









