import { crearSolicitud } from "../modelos/Solicitud.js"
import {crearClienteMongoDB} from './mongoDB.js'
import {crearErrorDatosNoEncontrados} from '../errores/errorDAO.js'

const crearDaoSolicitud = async () => {
    const db = await crearClienteMongoDB().conectar()
    const solicitudes = db.collection('solicitudes')
    const daoSolicitud = {
        getByMail: async (mailSolicitud) => {
            const solicitudBuscada =  await solicitudes.findOne({mail: mailSolicitud})
            if(!solicitudBuscada)
            {
                throw new crearErrorDatosNoEncontrados('La solicitud buscada no existe')
            }
            delete solicitudBuscada._id
            return solicitudBuscada
        },
        guardarSolicitud : async (urlArchivo, mailPropietario) => {
            const solicitudBuscada =  await solicitudes.findOne({mail: mailSolicitud})
            if(!solicitudBuscada)
            {
                const nuevaSolicitud = {}
                nuevaSolicitud.mail = mailPropietario
                nuevaSolicitud.urlArchivo = urlArchivo
                nuevaSolicitud.fechaSolicitud = Date.now()
                nuevaSolicitud.estado = 'enviado-administrador'
                const solicitudCreada = crearSolicitud(nuevaSolicitud)
                const solicitudGuardada = await solicitudes.insertOne(solicitudCreada)
                return solicitudGuardada
            }
        }
    }
    return daoSolicitud
}

export { crearDaoSolicitud }