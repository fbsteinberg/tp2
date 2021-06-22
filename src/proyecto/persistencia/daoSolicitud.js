import { crearSolicitud } from "../modelos/Solicitud.js"

const crearDaoSolicitud = () => {
    const solicitudes = [
        {
            id: 0,
            idLocal: 0,
            urlArchivo: '',
            estado: '',
            fechaSolicitud: ''
        }
    ]
    const daoSolicitud = {

        getById: (idSolicitud) => {
            console.log('solicitud encontrada!')
            return { idSolicitud, idLocal:0, estado:'pendiente-rechazado', fechaSolicitud:'2021-05-02', motivoRechazo:'Información incompleta'}
        },
        guardarSolicitud : (urlArchivo, mailPropietario) => {
            const nuevaSolicitud = {}
            nuevaSolicitud.mailPropietario = mailPropietario
            nuevaSolicitud.urlArchivo = urlArchivo
            nuevaSolicitud.fechaSolicitud = Date.now()
            nuevaSolicitud.id = 0
            nuevaSolicitud.idLocal = 0
            nuevaSolicitud.estado = 'enviado-administrador'
            const solicitudCreada = crearSolicitud(nuevaSolicitud)
            return solicitudCreada

        }
    }
    return daoSolicitud
}

export { crearDaoSolicitud }