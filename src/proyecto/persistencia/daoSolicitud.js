import { crearSolicitud } from "../modelos/Solicitud"

const crearDaoSolicitud = () => {
    const daoSolicitud = {
        getById: (idSolicitud) => {
            console.log('solicitud encontrada!')
            return { idSolicitud, idLocal:0, estado:'pendiente-rechazado', fechaSolicitud:'2021-05-02', motivoRechazo:'Información incompleta'}
        },
        guardarSolicitud : (urlArchivo) => {
            const nuevaSolicitud = {}
            nuevaSolicitud.urlArchivo = urlArchivo
            nuevaSolicitud.fechaSolicitud = Date.now()
            nuevaSolicitud.idSolicitud = 0
            nuevaSolicitud.idLocal = 0
            nuevaSolicitud.estado = 'enviado-administrador'
        }
    }
    return daoSolicitud
}

export { crearDaoSolicitud }