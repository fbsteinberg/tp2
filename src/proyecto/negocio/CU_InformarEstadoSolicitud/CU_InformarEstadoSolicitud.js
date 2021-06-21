import fs from 'fs'

class CU_InformarEstadoSolicitud {
    constructor(daoSolicitud, daoLocal, generadorQR, enviadorDeMails){
        this.daoSolicitud = daoSolicitud,
        this.daoLocal = daoLocal,
        this.generadorQR = generadorQR,
        this.enviadorDeMails = enviadorDeMails
    }

    async validar(idSolicitud){
        const solicitud = await this.daoSolicitud.getById(idSolicitud)
        const local = await this.daoLocal.getById(solicitud.idLocal)
        const propietario = local.propietario
        let templateMail = solicitud.estado == 'pendiente-aprobacion' ? await this.generarMailAprobacion(solicitud) : await this.generarMailRechazo(solicitud)
        templateMail = templateMail.toString().replace('#APELLIDO_PROPIETARIO#', propietario.apellido).replace('#NOMBRE_PROPIETARIO#', propietario.nombre).replace('#ID_SOLICITUD#', idSolicitud).replace('#FECHA_SOLICITUD#', solicitud.fechaSolicitud).replace('#LOCAL#', local.nombre)
        await this.enviadorDeMails.sendEmail(propietario.email.toString(), 'Estado de su solicitud', templateMail)
    }

    async generarMailAprobacion(solicitud){
        let mailAprobacion = await fs.promises.readFile('mail_templates/solicitudAceptada.html')
        const local = await this.daoLocal.getById(solicitud.idLocal)
        const QR = await this.generadorQR.generar({
            archivo: `${local.nombre}.png`,
            texto: `https://localhost:3000/api/usuarios/unirseACola?local=${solicitud.idLocal}` ,
            ancho: 600,
            margen: 2, 
            colorQR: '#34ebb1',
            colorFondo: '#0000'
        })
        mailAprobacion = mailAprobacion.toString().replace('#QR#', QR).replace('#MAIL_PROPIETARIO#', local.propietario.email).replace('#PASSWORD#', local.propietario.password)
        return mailAprobacion
    }

    async generarMailRechazo(solicitud){
        let mailRechazo = await fs.promises.readFile('mail_templates/solicitudRechazada.html')
        mailRechazo =  mailRechazo.toString().replace('#MOTIVO_RECHAZO#', solicitud.motivoRechazo)
        return mailRechazo
    }
}

export default CU_InformarEstadoSolicitud