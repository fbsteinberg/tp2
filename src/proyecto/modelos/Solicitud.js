import { crearErrorDatosInvalidos } from '../errores/errorDatoInvalido.js'

let nextId = 1

function crearSolicitud(datos, id = null) {
    const solicitud = {};

    solicitud.id = nextId


    if (!solicitud.idLocal) {
        throw crearErrorDatosInvalidos('Falta el id del local')
    } else {
        solicitud.idLocal = datos.idLocal
    }

    if (!solicitud.estado) {
        throw crearErrorDatosInvalidos('Falta el estado de la solicitud')
    } else {
        solicitud.estado = datos.estado
    }

    if (!solicitud.fechaSolicitud) {
        throw crearErrorDatosInvalidos('falta el dni')
    } else {
        solicitud.dni = datos.dni;
    }

    if (id) {
        solcitud.id = Number(id);
    } else if (!isNaN(Number(datos.id))) {
        solicitud.id = Number(datos.id);
    } else {
        solicitud.id = nextId++;
    }

    return solicitud;
}

export { crearSolicitud };
