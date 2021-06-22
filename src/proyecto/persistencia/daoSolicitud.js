import { crearSolicitud } from "../modelos/Solicitud.js"
import {crearClienteMongoDB} from './mongoDB.js'
import {crearErrorDatosNoEncontrados, crearErrorDatosNoInsertados} from '../errores/errorDAO.js'

const crearDaoSolicitud = async () => {
    const db = await crearClienteMongoDB().conectar()
    const solicitudes = db.collection('solicitudes')
    const daoSolicitud = {
        getById: async (idSolicitud) => {
                const solicitudBuscada =  await solicitudes.findOne({id: idSolicitud})
                if(!solicitudBuscada)
                {
                    throw new crearErrorDatosNoEncontrados('La solicitud buscada no existe')
                }
                delete solicitudBuscada._id
                return solicitudBuscada
        },
        guardarSolicitud : async (urlArchivo, mailPropietario) => {
            const nuevaSolicitud = {}
            nuevaSolicitud.mailPropietario = mailPropietario
            nuevaSolicitud.urlArchivo = urlArchivo
            nuevaSolicitud.fechaSolicitud = Date.now()
            nuevaSolicitud.id = 0
            nuevaSolicitud.idLocal = 0
            nuevaSolicitud.estado = 'enviado-administrador'
            const solicitudCreada = crearSolicitud(nuevaSolicitud)
            const solicitudGuardada = await solicitudes.insertOne(solicitudCreada)
            if(!solicitudGuardada)
            {
                throw new crearErrorDatosNoInsertados('La solicitud generada no pudo ser guardada')
            }
            return solicitudGuardada
        }
    }
    return daoSolicitud
}

export { crearDaoSolicitud }