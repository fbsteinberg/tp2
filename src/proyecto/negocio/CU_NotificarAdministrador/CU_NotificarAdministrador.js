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

        try{
            this.daoSolicitud.guardarSolicitud(urlArchivo)
            //Enviar el mail al administrador
            const respuesta = await this.generadorDeEmail.sendEmail(mailAdmin, mailPropietario, 'Solicitud Aprobación de Propietario',
            'Enlace a la documentación: '+enlaceArchivo);
            console.log('mail de nueva solicitud enviado al administrador ')
        }
        catch(e)
        {
            console.log(e)
        }
    }
}

export default CasoDeUso_NotificarAdministrador