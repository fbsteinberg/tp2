import CasoDeUso_NotificarAdministrador from './CU_NotificarAdministrador.js'
import { crearDaoLocal } from '../../persistencia/daoLocal.js'
import mailerFactory from '../../../compartidos/mail/mailFactory.js'

async function crearCUFactory()
{
    const daoLocal = crearDaoLocal()
    const generadorDeEmail = mailerFactory.crearMailer()

    return {
        crearCU : () => {
            return new CasoDeUso_NotificarAdministrador(generadorDeEmail, daoLocal)
        }
    }
}

export default {crearCUFactory}