import { crearErrorDatosInvalidos } from '../errores/errorDatoInvalido.js'

let nextId = 1

function crearSolicitud(datos, id = null) {
    const solicitud = {};

    solicitud.id = nextId

    if(!datos.mailPropietario)
    {
        throw crearErrorDatosInvalidos('Falta el mail del propietario')
    } else {
        solicitud.mailPropietario = datos.mailPropietario
    }

    if (!datos.urlArchivo) {
        throw crearErrorDatosInvalidos('Falta la URL de la documentación')
    } else {
        solicitud.urlArchivo = datos.urlArchivo
    }

    try{
        solicitud.idLocal = datos.idLocal
    }catch(err){
        throw crearErrorDatosInvalidos('Falta el id del local')
        }


    if (!datos.estado) {
        throw crearErrorDatosInvalidos('Falta el estado de la solicitud')
    } else {
        solicitud.estado = datos.estado
    }

    if (!datos.fechaSolicitud) {
        throw crearErrorDatosInvalidos('falta la fecha de la solicitud')
    } else {
        solicitud.dni = datos.fechaSolicitud;
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
