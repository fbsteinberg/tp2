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
                throw  crearErrorDatosNoEncontrados('La solicitud buscada no existe')
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
                throw crearErrorDatosNoInsertados('Ya existe una solicitud con el mail que intenta usar')
            }
        },
        actualizarEstadoSolicitud : async (solicitud) => {
            const status = await solicitudes.updateOne({ "id" : Number(solicitud.id) }, {$set: {estado: solicitud.estado}});
            if(status?.result?.nModified === 0){
                throw crearErrorDatosNoInsertados('No ha sido posible actualizar el estado de la solicitud')
            }
            console.log("Estado de solicitud actualizado correctamente")
        }
    }
    return daoSolicitud
}

export { crearDaoSolicitud }