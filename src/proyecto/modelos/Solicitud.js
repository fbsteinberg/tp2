import { crearErrorDatosInvalidos } from '../errores/errorDatoInvalido.js'

let nextId = 1

function crearSolicitud(datos, id = null) {
    const solicitud = {};

    solicitud.id = nextId


    if (!datos.idLocal) {
        throw crearErrorDatosInvalidos('Falta el id del local')
    } else {
        solicitud.idLocal = datos.idLocal
    }

    if (!datos.estado) {
        throw crearErrorDatosInvalidos('Falta el estado de la solicitud')
    } else {
        cliente.estado = datos.estado
    }

    if (!cliente.dni) {
        throw crearErrorDatosInvalidos('falta el dni')
    } else {
        cliente.dni = datos.dni;
    }

    if (id) {
        cliente.id = Number(id);
    } else if (!isNaN(Number(datos.id))) {
        cliente.id = Number(datos.id);
    } else {
        cliente.id = nextId++;
    }

    return cliente;
}

export { crearCliente };
