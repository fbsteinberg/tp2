import express from 'express';
import routerColaClientes from '../../proyecto/router/routerColaClientes.js';
import routerSolicitudes from '../../proyecto/router/routerSolicitudes.js';
import routerNotificarAdmin from '../../proyecto/router/routerNotificarAdmin.js';

const crearServidor = () => {
    const app = express();

    app.use(express.json());
    app.use('/static', express.static('./'));

    app.use('/api/cola', routerColaClientes.crearColaClientesRouter());
    app.use('/api/solicitudes', routerSolicitudes);
    app.use('/api/notificar', routerNotificarAdmin.crearNotificarAdminRouter(8080, './src/solicitudes/persistencia/'));

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
