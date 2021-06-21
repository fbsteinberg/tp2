import dotenv from 'dotenv';

dotenv.config();

const getMailConfig = () => ({
    server: process.env.MAIL_SERVER_DEV || 'smtp.ethereal.email',
    port: process.env.MAIL_SERVER_PORT_DEV || 587,
    mail: process.env.MAIL_TEST,
    password: process.env.MAIL_PASSWORD_TEST
});

const getRecepcionDeArchivosConfig = () => process.env.FILES_DIRECTORY;

const getMailAdmin = () => process.env.MAIL_ADMIN;

const getServerPort = () => process.env.SERVER_PORT || 3000;

export { getMailConfig, getServerPort, getRecepcionDeArchivosConfig, getMailAdmin};
