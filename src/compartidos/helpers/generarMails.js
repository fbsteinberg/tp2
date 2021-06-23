import fs from 'fs'

async function generarMail(local, generadorQR, solicitud){
    const propietario = local.propietario
    
    let templateMail = solicitud.estado == 'pendiente-aprobacion' ? await generarMailAprobacion(local, generadorQR, solicitud) :await generarMailRechazo(solicitud)
    templateMail = templateMail.toString().replace('#APELLIDO_PROPIETARIO#', propietario.apellido).replace('#NOMBRE_PROPIETARIO#', propietario.nombre).replace('#ID_SOLICITUD#', solicitud.id).replace('#FECHA_SOLICITUD#', solicitud.fechaSolicitud).replace('#LOCAL#', local.nombre)
    return templateMail
}
        

async function generarMailAprobacion(local, generadorQR, solicitud){
    let mailAprobacion = await fs.promises.readFile('mail_templates/solicitudAceptada.html')
    const QR = await generadorQR.generar({
        archivo: `${local.nombre}.png`,
        texto: `https://localhost:3000/api/usuarios/unirseACola?local=${solicitud.idLocal}` ,
        ancho: 600,
        margen: 2, 
        colorQR: '#34ebb1',
        colorFondo: '#0000'
    })
    console.log(QR)
    mailAprobacion = mailAprobacion.toString().replace('#QR#', QR).replace('#MAIL_PROPIETARIO#', local.propietario.mail).replace('#PASSWORD#', local.propietario.password)
    return mailAprobacion
}

async function generarMailRechazo(solicitud){
    let mailRechazo = await fs.promises.readFile('mail_templates/solicitudRechazada.html')
    mailRechazo =  mailRechazo.toString().replace('#MOTIVO_RECHAZO#', solicitud.motivoRechazo)
    return mailRechazo
}

export {generarMail}