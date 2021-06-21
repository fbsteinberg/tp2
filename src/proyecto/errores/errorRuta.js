function crearErrorCarpetaNoPudoCrearse(message) {
    const error = new Error(message);
    error.type = 'ERROR_RUTA';

    return error;
}

export { crearErrorCarpetaNoPudoCrearse };
