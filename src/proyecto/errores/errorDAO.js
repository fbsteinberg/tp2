function crearErrorDatosNoEncontrados(message) {
    const error = new Error(message);
    error.type = 'ERROR_DATOS_NO_ENCONTRADOS';

    return error;
}

function crearErrorDatosNoInsertados(message) {
    const error = new Error(message);
    error.type = 'ERROR_DATOS_NO_INSERTADOS';

    return error;
}





export { crearErrorDatosNoEncontrados, crearErrorDatosNoInsertados };
