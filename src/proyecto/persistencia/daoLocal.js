import {crearClienteMongoDB} from './mongoDB.js'
import {crearErrorDatosNoInsertados} from '../errores/errorDAO.js'
import {crearLocal} from '../modelos/Local.js'

const crearDaoLocal = async () => {

    const db = await crearClienteMongoDB().conectar()
    const locales = db.collection('locales')

    const daoLocal = {
        add: async (local) => {

            const nuevoLocal = {}
            let ultimoId = locales.find({}, 'id').sort({id:-1}).limit(1)
            nuevoLocal.nombre = local.nombre
            nuevoLocal.cantidad = local.cantidad
            nuevoLocal.horarioMin = local.horarioMin
            nuevoLocal.horarioMax = local.horarioMax
            nuevoLocal.id = 2//ultimoId ? ultimoId++ : 0

            const localCreado = await locales.insertOne(crearLocal(nuevoLocal))
            if(localCreado){
                return nuevoLocal
            }
            throw crearErrorDatosNoInsertados('No ha sido posible insertar el local')
        },
        addUnique: (local, claveUnica) => {
            const existe = locales.find(e => e[claveUnica] === local[claveUnica]);
            if (existe) {
                return { added: 0 };
            } else {
                locales.push(local);
                return { added: 1 };
            }
        },
        getById: (id) => {
            return locales.find(e => e.id === id);
        },
        addClient: (id, cliente) => {
            const index = locales.findIndex(e => e.id == id);
            if (index === -1) {
                return { updated: 0 };
            } else {
                locales[index].clientes.push(cliente);
                return { updated: 1 };
            }
        },
        removeFirstClient: (id) => {
            const index = locales.findIndex(e => e.id == id);
            if (index === -1) {
                return { updated: 0 };
            } else {
                locales[index].clientes.shift();
                return { updated: 1 };
            }
        }
    }

    return daoLocal;
}

export { crearDaoLocal };