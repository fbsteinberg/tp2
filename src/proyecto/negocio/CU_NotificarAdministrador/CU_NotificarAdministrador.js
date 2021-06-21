class CasoDeUso_NotificarAdministrador
{
    constructor(generadorDeEmail, daoLocal)
    {
        this.generadorDeEmail = generadorDeEmail
        this.daoLocal = daoLocal

    }
    async hacer(urlArchivo, mailAdmin)
    {

        //Generar enlace para acceder al documento
        const enlaceArchivo = '<a href='+urlArchivo+'>Aqui</a>'
        try{
            //Enviar el mail al administrador
            const respuesta = await this.generadorDeEmail.sendEmail(mailAdmin, 'Solicitud Aprobación de Propietario',
            'Enlace a la documentación: '+enlaceArchivo);
            console.log('mail de nueva solicitud enviado al administrador '+respuesta)
        }
        catch(e)
        {
            console.log(e)
        }
    }
}

export default CasoDeUso_NotificarAdministrador