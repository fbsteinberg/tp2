import { crearErrorDatosInvalidos } from '../errores/errorDatoInvalido.js'

let nextId = 1;

function crearCliente(datos, id = null) {
    const cliente = {};

    if (!datos.nombre) {
        throw crearErrorDatosInvalidos('Falta el nombre del cliente')
    } else {
        cliente.nombre = datos.nombre
    }

    if (!datos.email) {
        throw crearErrorDatosInvalidos('Falta la cantidad')
    } else {
        cliente.email = datos.email
    }

    if (!cliente.dni) {
        throw crearErrorDatosInvalidos('falta el dni')
    } else {
        cliente.dni = datos.dni;
    }

    if (id) {
        cliente.id = Number(id);
    } else if (!isNaN(Number(datos.id))) {
        cliente.id = Number(datos.id);
    } else {
        cliente.id = nextId++;
    }

    return cliente;
}

export { crearCliente };
