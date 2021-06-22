class CasoDeUso_NotificarAdministrador
{
    constructor(generadorDeEmail, daoSolicitud)
    {
        this.generadorDeEmail = generadorDeEmail
        this.daoSolicitud = daoSolicitud
    }
    async hacer(urlArchivo, mailAdmin, mailPropietario)
    {
        //Generar enlace para acceder al documento
        const enlaceArchivo = '<a href='+urlArchivo+'>Aqui</a>'

        await this.daoSolicitud.guardarSolicitud(urlArchivo,mailPropietario)
        //Enviar el mail al administrador
        const respuesta = await this.generadorDeEmail.sendEmail(mailAdmin, 'Solicitud Aprobación de Propietario',
        'Enlace a la documentación: '+enlaceArchivo +'. Mail propietario: '+mailPropietario);
        console.log('mail de nueva solicitud enviado al administrador ')
    }
}

export default CasoDeUso_NotificarAdministrador