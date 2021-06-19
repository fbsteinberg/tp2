import CasoDeUso_AprobarRechazarSolicitud from './CU_AprobarRechazarSolicitud.js'
import MailerFactory from '../../../compartidos/MailerFactory.js'
import QRFactory from '../../../compartidos/QRFactory.js'
import { crearDaoLocal } from '../../persistencia/daoLocal.js'
import { crearDaoSolicitud } from '../../persistencia/daoSolicitud.js'

const enviadorDeMails = MailerFactory.crearMailer()
const generadorQR = QRFactory.generadorQR('static')

const daoLocal = crearDaoLocal()
const daoSolicitud = crearDaoSolicitud()

function crearCU_AprobarRechazarSolicitud () {
    return new CasoDeUso_AprobarRechazarSolicitud(
        daoSolicitud,
        daoLocal,
        generadorQR,
        enviadorDeMails
    )
}
    
export default{ crearCU_AprobarRechazarSolicitud }