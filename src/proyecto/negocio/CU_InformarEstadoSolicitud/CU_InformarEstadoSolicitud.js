import {generarMail} from '../../../compartidos/helpers/generarMails.js'

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
        const mail = await generarMail(local, this.generadorQR, solicitud)
        await this.enviadorDeMails.sendEmail(propietario.email.toString(), 'Estado de su solicitud', mail)
    }
}

export default CU_InformarEstadoSolicitud