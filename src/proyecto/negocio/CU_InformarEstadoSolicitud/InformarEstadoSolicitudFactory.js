import CasoDeUso_InformarEstadoSolicitud from './CU_InformarEstadoSolicitud.js'
import MailerFactory from '../../../compartidos/mail/mailFactory.js'
import QRFactory from '../../../compartidos/qr/qrFactory.js'
import { crearDaoLocal } from '../../persistencia/daoLocal.js'
import { crearDaoSolicitud } from '../../persistencia/daoSolicitud.js'

const enviadorDeMails = MailerFactory.crearMailer()
const generadorQR = QRFactory.crearGeneradorQR('static')

const daoLocal = await crearDaoLocal()
const daoSolicitud = await crearDaoSolicitud()

function crearCU_InformarEstadoSolicitud () {
    return new CasoDeUso_InformarEstadoSolicitud(
        daoSolicitud,
        daoLocal,
        generadorQR,
        enviadorDeMails
    )
}
    
export default{ crearCU_InformarEstadoSolicitud }