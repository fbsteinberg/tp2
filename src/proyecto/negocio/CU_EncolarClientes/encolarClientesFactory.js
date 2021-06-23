import generarEncolarCliente from './CU_EncolarClientes.js';
import mailerFactory from '../../../compartidos/mail/mailFactory.js';
import { crearDaoClientes } from '../../persistencia/daoClientes.js';
import { crearDaoLocal } from '../../persistencia/daoLocal.js';

const daoClientes = crearDaoClientes();
const daoLocal = crearDaoLocal();
const enviadorMail = mailerFactory.crearMailer();

const crearEncolarClientes = async () => {
    const casoUsoEncolarClientes = generarEncolarCliente(
        daoClientes,
        daoLocal,
        enviadorMail
    );

    return casoUsoEncolarClientes;
}

export default {
    crearEncolarClientes
};
