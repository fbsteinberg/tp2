import { crearErrorDatosInvalidos } from '../errores/errorDatoInvalido.js'

let nextId = 1

function crearCola(datos, id = null) {
    const cola = {
        clientes: []
    };

    if (!datos.nombre) {
        throw crearErrorDatosInvalidos('Falta el nombre de la col')
    } else {
        cola.nombre = datos.nombre
    }

    if (!datos.cantidad) {
        throw crearErrorDatosInvalidos('Falta la cantidad de clientes')
    } else {
        cola.cantidad = datos.cantidad
    }

    if (!datos.horarioMin && isNaN(Number(datos.horarioMin))) {
        throw crearErrorDatosInvalidos('Falta el horario máximo en formato 24 horas')
    } else {
        cola.horarioMin = Number(datos.horarioMin)
    }

    if (!datos.horarioMax && isNaN(Number(datos.horarioMax))) {
        throw crearErrorDatosInvalidos('Falta el horario máximo en formato 24 horas')
    } else {
        cola.horarioMax = Number(datos.horarioMax)
    }

    if (id) {
        cola.id = Number(id)
    } else if (!isNaN(Number(datos.id))) {
        cola.id = Number(datos.id)
    } else {
        cola.id = nextId++
    }

    return cola;
}

export { crearCola };
