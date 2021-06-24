import express from 'express';
import routerColaClientes from '../../proyecto/router/routerColaClientes.js';
import routerSolicitudes from '../../proyecto/router/routerSolicitudes.js';
import { getRecepcionDeArchivosConfig, getQRDirectoryConfig } from '../../config.js';

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
require('./endpoints')(app)

const crearServidor = () => {
    const app = express();

    app.use(express.json());
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    app.use('/static', express.static(getRecepcionDeArchivosConfig()));
    app.use('/static', express.static(getQRDirectoryConfig()));
    app.use('/api/cola', routerColaClientes.crearColaClientesRouter());
    app.use('/api/solicitudes', routerSolicitudes.crearSolicitudesRouter());
    
    let server = null;

    return {
        conectar: (port) => {
            return new Promise((resolve, reject) => {
                if (server) {
                    reject(new Error('Servidor ya conectado'));
                } else {
                    server = app.listen(port, () => {
                        console.log(`Conectado en puerto ${server.address().port}`)
                        resolve()
                    })
                    server.on('error', (err) => {
                        reject(err)
                    })
                }
            })
        },
        desconectar: () => {
            return new Promise((resolve, reject) => {
                server.close((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        server = null;
                        resolve();
                    }
                })
            })
        }
    };
};

export { crearServidor };
