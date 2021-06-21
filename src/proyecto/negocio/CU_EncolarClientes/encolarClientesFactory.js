import generarEncolarCliente from './CU_EncolarClientes.js';
import generadorMail from '../../../compartidos/mail/mail.js';
import { crearDaoClientes } from '../../persistencia/daoClientes.js';
import { crearDaoLocal } from '../../persistencia/daoLocal.js';

const daoClientes = crearDaoClientes();
const daoLocal = crearDaoLocal();

const crearEncolarClientes = async () => {
    const enviadorMail = await generadorMail(process.env.MAIL_TEST, process.env.MAIL_PASSWORD_TEST);
    
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
