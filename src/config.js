import dotenv from 'dotenv';

dotenv.config();

const getMailConfig = () => ({
    server: process.env.MAIL_SERVER_DEV || 'smtp.ethereal.email',
    port: process.env.MAIL_SERVER_PORT_DEV || 587,
    mail: process.env.MAIL_TEST,
    password: process.env.MAIL_PASSWORD_TEST
});

const getRecepcionDeArchivosConfig = () => process.env.FILES_DIRECTORY;
const getQRDirectoryConfig = () => process.env.QR_DIRECTORY;

const getMailAdmin = () => process.env.MAIL_ADMIN;

const getServerPort = () => process.env.SERVER_PORT || 3000;

getMongoCredentials = () => {return {dbname: process.env.MONGODB_DBNAME, username: process.env.MONGODB_USERNAME, password: process.env.MONGODB_PASSWORD}}

export { getMailConfig, getServerPort,
     getRecepcionDeArchivosConfig, getQRDirectoryConfig,
      getMailAdmin, getMongoCredentials};
