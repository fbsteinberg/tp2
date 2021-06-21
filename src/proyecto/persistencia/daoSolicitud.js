const crearDaoSolicitud = () => {
    const daoSolicitud = {
        getById: (idSolicitud) => {
            console.log('solicitud encontrada!')
            return { idSolicitud, idLocal:0, estado:'pendiente-aprobacion', fechaSolicitud:'2021-05-02', motivoRechazo:''}
        }
    }
    return daoSolicitud
}

export { crearDaoSolicitud }