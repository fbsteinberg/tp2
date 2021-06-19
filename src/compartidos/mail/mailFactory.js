import generadorMail from './mail.js';
import { getMailConfig } from '../../config.js';

const mailConfig = getMailConfig();

const enviadorDeMails = generadorMail(mailConfig.mail, mailConfig.password, mailConfig.server, mailConfig.port);

function crearMailer() {
    return enviadorDeMails;
}

export default { crearMailer };
