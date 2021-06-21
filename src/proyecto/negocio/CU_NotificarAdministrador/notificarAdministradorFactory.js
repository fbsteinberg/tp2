import CasoDeUso_NotificarAdministrador from './CU_NotificarAdministrador.js'
import mailerFactory from '../../../compartidos/mail/mailFactory.js'
import {crearDaoSolicitud} from '../../persistencia/daoSolicitud.js'

async function crearCUFactory()
{
    const daoSolicitud = crearDaoSolicitud()
    const generadorDeEmail = mailerFactory.crearMailer()

    return {
        crearCU : () => {
            return new CasoDeUso_NotificarAdministrador(generadorDeEmail, daoSolicitud)
        }
    }
}

export default {crearCUFactory}