import { crearErrorDatosInvalidos } from '../errores/errorDatoInvalido.js'

let nextId = 1

function crearLocal(datos, id = null) {
    const local = {
        clientes: []
    };

    if (!datos.nombre) {
        throw crearErrorDatosInvalidos('Falta el nombre del local');
    } else {
        local.nombre = datos.nombre;
    }

    if (!datos.cantidad) {
        throw crearErrorDatosInvalidos('Falta la cantidad de clientes por cola');
    } else {
        local.cantidad = datos.cantidad;
    }

    if (!datos.horarioMin && isNaN(Number(datos.horarioMin))) {
        throw crearErrorDatosInvalidos('Falta el horario máximo en formato 24 horas');
    } else {
        local.horarioMin = Number(datos.horarioMin);
    }

    if (!datos.horarioMax && isNaN(Number(datos.horarioMax))) {
        throw crearErrorDatosInvalidos('Falta el horario máximo en formato 24 horas');
    } else {
        local.horarioMax = Number(datos.horarioMax);
    }

    if (id) {
        local.id = Number(id);
    } else if (!isNaN(Number(datos.id))) {
        local.id = Number(datos.id);
    } else {
        local.id = nextId++;
    }

    return local;
}

export { crearLocal };
