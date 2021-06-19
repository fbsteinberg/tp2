import generarEncolarCliente from './CU_EncolarClientes.js';
import generadorMail from '../../../compartidos/mail/mail.js';
import generarQR from '../../../compartidos/qr/qr.js';
import { crearDaoClientes } from '../../persistencia/daoClientes.js';
import { crearDaoColas } from '../../persistencia/daoColas.js';

const daoClientes = crearDaoClientes();
const daoColas = crearDaoColas();

const crearEncolarClientes = async () => {
    const enviadorMail = await generadorMail(process.env.MAIL_TEST, process.env.MAIL_PASSWORD_TEST);

    const generadorQR = await generarQR('static');
    
    const casoUsoEncolarClientes = generarEncolarCliente(
        daoClientes,
        daoColas,
        enviadorMail,
        generadorQR
    );

    return casoUsoEncolarClientes;
}

export default {
    crearEncolarClientes
};
