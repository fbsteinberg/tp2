import { crearSolicitud } from "../modelos/Solicitud.js"
import {crearClienteMongoDB} from './mongoDB.js'

const crearDaoSolicitud = async () => {
    const db = await crearClienteMongoDB().conectar()
    const solicitudes = db.collection('solicitudes')
    const daoSolicitud = {
        getById: async (idSolicitud) => {
            try{
                return await solicitudes.findOne({id: idSolicitud})
            }
            catch(e)
            {

            }

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