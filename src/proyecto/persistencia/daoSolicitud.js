import { crearSolicitud } from "../modelos/Solicitud"

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
        guardarSolicitud : (urlArchivo) => {
            const nuevaSolicitud = {}
            nuevaSolicitud.urlArchivo = urlArchivo
            nuevaSolicitud.fechaSolicitud = Date.now()
            nuevaSolicitud.id = 0
            nuevaSolicitud.idLocal = 0
            nuevaSolicitud.estado = 'enviado-administrador'
            try{
                const solicitudCreada = crearSolicitud(nuevaSolicitud)
                return solicitudCreada
            }
            catch(e)
            {
                console.log('error al crear la solicitud')
            }

        }
    }
    return daoSolicitud
}

export { crearDaoSolicitud }