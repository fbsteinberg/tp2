import { crearErrorDatosInvalidos } from '../errores/errorDatoInvalido.js'

function crearCliente(datos) {
    const cliente = {};

    cliente.id = datos.id;

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

    return cliente;
}

export { crearCliente };
