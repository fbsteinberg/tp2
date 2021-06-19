/*
imagino que al cargar los datos se envia un mail al administrador,
notificandolo de la nueva carga, mostrandole la documentación recibida.
opcional: ofrecer la posibilidad de aceptar o cancelar via click en algun link, quizas? (link que dispararía una peticion al endpoint correspondiente de
aceptar o cancelar subscripcion)
*/

//Caso de uso del backend: Notificar a administrador de la nueva solicitud

class CasoDeUso_NotificarAdministrador
{
    constructor(generadorDeEmail, daoLocal)
    {
        this.generadorDeEmail = generadorDeEmail
        this.daoLocal = daoLocal

    }
    async hacer(idPropietario, urlArchivo, mailAdmin)
    {

        //Buscar datos del propietario que hizo la solicitud
        const propietario = this.daoLocal.getPropetarioById(idPropietario)
        if(propietario == null)
        {
            throw new Error('El id de usuario no es valido')
        }

        //Generar enlace para acceder al documento
        const enlaceArchivo = '<a href='+urlArchivo+'>Aqui</a>'

        //Enviar el mail al administrador
        const respuesta = await this.generadorDeEmail.sendEmail(mailAdmin, 'Solicitud Aprobación de Propietario',
        'Propietario: '+propietario+'. Enlace a la documentación: '+enlaceArchivo);

        console.log(respuesta)
    }
}

export default CasoDeUso_NotificarAdministrador