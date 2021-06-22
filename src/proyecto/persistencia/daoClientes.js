import {crearClienteMongoDB} from './mongoDB.js'
import {crearErrorDatosNoEncontrados} from '../errores/errorDAO.js'

const crearDaoClientes = async () => {

    const db = await crearClienteMongoDB().conectar()
    const clientes = db.collection('solicitudes')

    return {
        add: async (cliente) => {
            clientes.insertOne(cliente);
        },
        addUnique: (cliente, claveUnica) => {
            const existe = clientes.some(e => e[claveUnica] === cliente[claveUnica]);
            if (existe) {
                return { added: 0 };
            } else {
                clientes.push(cliente);
                return { added: 1 };
            }
        },
        getById: async (id) => {
            return clientes.find(e => e.id === id);
        },
        getByDni: async (dni) => {
            return clientes.find(e => e.dni === dni);
        }
    }
}

export { crearDaoClientes };
