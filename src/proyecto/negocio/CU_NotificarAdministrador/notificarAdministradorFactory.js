import CasoDeUso_NotificarAdministrador from './CU_NotificarAdministrador.js'
import mailerFactory from '../../../compartidos/mail/mailFactory.js'
import {crearDaoSolicitud} from '../../persistencia/daoSolicitud.js'
import {crearDaoLocal} from '../../persistencia/daoLocal.js'

async function crearCUFactory()
{
    const daoSolicitud = await crearDaoSolicitud()
    const generadorDeEmail = mailerFactory.crearMailer()
    const daoLocal = await crearDaoLocal()

    return {
        crearCU : () => {
            return new CasoDeUso_NotificarAdministrador(generadorDeEmail, daoSolicitud, daoLocal)
        }
    }
}

export default {crearCUFactory}