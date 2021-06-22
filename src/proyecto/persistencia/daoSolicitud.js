import { crearSolicitud } from "../modelos/Solicitud.js"
import {crearClienteMongoDB} from './mongoDB.js'
import {crearErrorDatosNoEncontrados, crearErrorDatosNoInsertados} from '../errores/errorDAO.js'

const crearDaoSolicitud = async () => {

    const db = await crearClienteMongoDB().conectar()
    const solicitudes = db.collection('solicitudes')

    const daoSolicitud = {
        getById: async (idSolicitud) => {
            const solicitudBuscada =  await solicitudes.findOne({ id: idSolicitud })
            if(!solicitudBuscada)
            {
                throw new crearErrorDatosNoEncontrados('La solicitud buscada no existe')
            }
            delete solicitudBuscada._id
            return solicitudBuscada
        },
        guardarSolicitud : async (urlArchivo, mailPropietario, idLocal) => {
            const solicitudBuscada =  await solicitudes.findOne( { mail: mailPropietario })
            if(!solicitudBuscada)
            {
                const nuevaSolicitud = {}
                let ultimoId = solicitudes.find({}, 'id').sort({id:-1}).limit(1)
                nuevaSolicitud.id = ultimoId ? ultimoId++  : 0
                nuevaSolicitud.idLocal = idLocal
                nuevaSolicitud.mail = mailPropietario
                nuevaSolicitud.urlArchivo = urlArchivo
                nuevaSolicitud.fechaSolicitud = Date.now()
                nuevaSolicitud.estado = 'enviado-administrador'
                const solicitudCreada = crearSolicitud(nuevaSolicitud)
                const solicitudGuardada = await solicitudes.insertOne(solicitudCreada)
                return solicitudGuardada
            }
            else
            {
                throw new crearErrorDatosNoInsertados('Ya existe una solicitud con el mail que intenta usar')
            }
        }
    }
    return daoSolicitud
}

export { crearDaoSolicitud }