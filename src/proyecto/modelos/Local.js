import { crearErrorDatosInvalidos } from '../errores/errorDatoInvalido.js'

function crearLocal(datos) {
    const local = {
        propietario : {},  clientes: []
    };

    local.id = datos.id


    if (!datos.propietario.nombre) {
        throw crearErrorDatosInvalidos('Falta el nombre del propietario');
    } else {
        local.propietario.nombre = datos.propietario.nombre;
    }

    if (!datos.propietario.apellido) {
        throw crearErrorDatosInvalidos('Falta el apellido del propietario');
    } else {
        local.propietario.apellido = datos.propietario.apellido;
    }

    if (!datos.propietario.mail) {
        throw crearErrorDatosInvalidos('Falta el mail del propietario');
    } else {
        local.propietario.mail = datos.propietario.mail;
    }

    if (!datos.propietario.password) {
        throw crearErrorDatosInvalidos('Falta el mail del propietario');
    } else {
        local.propietario.password = datos.propietario.password;
    }

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

    return local;
}

export { crearLocal };
