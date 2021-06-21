function crearErrorFaltaArchivo(message) {
    const error = new Error(message);
    error.type = 'ERROR_DATOS_FALTANTES';

    return error;
}

export { crearErrorFaltaArchivo };
