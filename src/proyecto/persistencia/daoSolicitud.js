import {crearClienteMongoDB} from './mongoDB.js'
import {crearErrorDatosNoEncontrados, crearErrorDatosNoInsertados} from '../errores/errorDAO.js'

const crearDaoSolicitud = async () => {
    const db = await crearClienteMongoDB().conectar()
    const solicitudes = db.collection('solicitudes')

    const daoSolicitud = {
        getById: async (idSolicitud) => {
            const solicitudBuscada =  await solicitudes.findOne({ "id" : Number(idSolicitud) })
            if(!solicitudBuscada)
            {
                throw new crearErrorDatosNoEncontrados('La solicitud buscada no existe')
            }
            delete solicitudBuscada._id
            return solicitudBuscada
        },
        guardarSolicitud : async (nuevaSolicitud) => {
            const solicitudBuscada =  await solicitudes.findOne( { mailPropietario: nuevaSolicitud.mailPropietario })
            if(!solicitudBuscada)
            {
                
                let cursorLastSolicitud = await solicitudes.find({}).sort({ id: -1 }).limit(1)
                cursorLastSolicitud = await cursorLastSolicitud.next()
                nuevaSolicitud.id = typeof cursorLastSolicitud?.id !== 'null' ? cursorLastSolicitud?.id + 1 : 0
                const solicitudGuardada = await solicitudes.insertOne(nuevaSolicitud)
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