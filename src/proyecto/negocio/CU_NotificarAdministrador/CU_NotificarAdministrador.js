import { crearSolicitud } from "../../modelos/Solicitud.js"

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

        const nuevoLocal = {}
        nuevoLocal.nombre = datosLocal.nombre
            nuevoLocal.cantidad = datosLocal.cantidad
            nuevoLocal.horarioMin = datosLocal.horarioMin
            nuevoLocal.horarioMax = datosLocal.horarioMax
            nuevoLocal.propietario = {
                nombre:datosPropietario.nombre,
                apellido:datosPropietario.apellido,
                mail:datosPropietario.mail,
                password:datosPropietario.password
            }
        const localCreado = await this.daoLocal.add(nuevoLocal)

        const nuevaSolicitud = {}
        nuevaSolicitud.idLocal = localCreado.id
        nuevaSolicitud.mailPropietario = datosPropietario.mail
        nuevaSolicitud.urlArchivo = urlArchivo
        nuevaSolicitud.fechaSolicitud = Date.now().toString()
        nuevaSolicitud.estado = 'enviado-administrador'
        await this.daoSolicitud.guardarSolicitud(nuevaSolicitud)

        //Enviar el mail al administrador
        const respuesta = await this.generadorDeEmail.sendEmail(mailAdmin, 'Solicitud Aprobación de Propietario',
        'Enlace a la documentación: '+enlaceArchivo +'. Mail propietario: '+localCreado.propietario.mail);
        console.log('mail de nueva solicitud enviado al administrador ')

    }
}

export default CasoDeUso_NotificarAdministrador