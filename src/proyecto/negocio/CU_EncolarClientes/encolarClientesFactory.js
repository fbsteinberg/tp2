import generarEncolarCliente from './CU_EncolarClientes.js';
import mailerFactory from '../../../compartidos/mail/mailFactory.js';
import { crearDaoClientes } from '../../persistencia/daoClientes.js';
import { crearDaoLocal } from '../../persistencia/daoLocal.js';

const daoClientes = await crearDaoClientes();
const daoLocal = await crearDaoLocal();
const enviadorMail = await mailerFactory.crearMailer();

const crearEncolarClientes = async () => {
    const casoUsoEncolarClientes = await generarEncolarCliente(
        daoClientes,
        daoLocal,
        enviadorMail
    );

    return casoUsoEncolarClientes;
}

export default {
    crearEncolarClientes
};
