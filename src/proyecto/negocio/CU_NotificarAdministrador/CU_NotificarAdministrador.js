class CasoDeUso_NotificarAdministrador
{
    constructor(generadorDeEmail, daoSolicitud, daoLocal)
    {
        this.generadorDeEmail = generadorDeEmail
        this.daoSolicitud = daoSolicitud
        this.daoLocal = daoLocal
    }
    async hacer(urlArchivo, mailAdmin, datosPropietario, datosLocal)
    {
        //Generar enlace para acceder al documento
        const enlaceArchivo = '<a href='+urlArchivo+'>Aqui</a>'

        const localCreado = await this.daoLocal.add(datosLocal, datosPropietario)
        console.log(localCreado)
        await this.daoSolicitud.guardarSolicitud(urlArchivo,datosPropietario.mail, localCreado.id)
        //Enviar el mail al administrador
        const respuesta = await this.generadorDeEmail.sendEmail(mailAdmin, 'Solicitud Aprobación de Propietario',
        'Enlace a la documentación: '+enlaceArchivo +'. Mail propietario: '+mailPropietario);
        console.log('mail de nueva solicitud enviado al administrador ')
    }
}

export default CasoDeUso_NotificarAdministrador