import {crearClienteMongoDB} from './mongoDB.js'
import {crearErrorDatosNoEncontrados} from '../errores/errorDAO.js'

const crearDaoClientes = async () => {

    const db = await crearClienteMongoDB().conectar()
    const clientes = db.collection('clientes')

    return {
        getById: async (id) => {
            const clienteBuscado = await clientes.findOne({ "id" : Number(id) })
            if (!clienteBuscado) {
                throw crearErrorDatosNoEncontrados('El cliente buscado no existe')
            }
            delete clienteBuscado._id
            return clienteBuscado
        },
        getByDni: async (dni) => {
            const clienteBuscado = await clientes.findOne({ "dni" : Number(dni) })
            if (!clienteBuscado) {
                throw crearErrorDatosNoEncontrados('El cliente buscado no existe')
            }
            delete clienteBuscado._id
            return clienteBuscado
        }
    }
}

export { crearDaoClientes };
