function crearDaoSolicitud(){
    const daoSolicitud = {
        getById: (idSolicitud) => {
            console.log('solicitud encontrada!')
            return { idSolicitud, idLocal:5, estado:'pendiente-rechazado', fechaSolicitud:'2021-05-02', motivoRechazo:'Información incompleta'}
        }
    }
    return daoSolicitud
}

export { crearDaoSolicitud }