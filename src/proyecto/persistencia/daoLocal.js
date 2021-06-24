import {crearLocal} from '../modelos/Local.js'
import {crearClienteMongoDB} from './mongoDB.js'
import {crearErrorDatosNoInsertados, crearErrorDatosNoEncontrados} from '../errores/errorDAO.js'

const crearDaoLocal = async () => {

    const db = await crearClienteMongoDB().conectar()
    const locales = db.collection('locales')

    const daoLocal = {
        getById: async (id) => {
            const localBuscado = await locales.findOne({ "id" : Number(id) })
            if (!localBuscado) {
                throw crearErrorDatosNoEncontrados('El local buscado no existe')
            }
            delete localBuscado._id
            return localBuscado
        },
        add: async (nuevoLocal) => {
            
            let cursorLastLocal = await locales.find({}).sort( { id: -1 } ).limit(1)
            cursorLastLocal = await cursorLastLocal.next()
            nuevoLocal.id = typeof cursorLastLocal?.id !== 'null' ? cursorLastLocal?.id + 1 : 0
            const localCreado = crearLocal(nuevoLocal)
            await locales.insertOne(localCreado)
            if(localCreado){
                return localCreado
            }
            throw crearErrorDatosNoInsertados('No ha sido posible insertar el local')
        },
        addClient: async (id, cliente) => {
            const status = await locales.updateOne({ "id" : Number(id) }, { $push: { "clientes": cliente } });
            if(status?.result?.nModified === 0){
                throw crearErrorDatosNoInsertados('No ha sido posible insertar el cliente en el local')
            }
        }
    }

    return daoLocal;
}

export { crearDaoLocal };