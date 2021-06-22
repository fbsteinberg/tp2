import express from 'express';
import factoryCU from '../negocio/CU_NotificarAdministrador/notificarAdministradorFactory.js';
import factoryRA from '../../compartidos/recepcionDeArchivos/recepcionDeArchivosFactory.js';
import { getServerPort, getMailAdmin, getRecepcionDeArchivosConfig } from '../../config.js'
import { crearErrorFaltaArchivo } from '../errores/errorFaltaArchivo.js'


const manejadorArchivos = await factoryRA.crearRecepcionDeArchivos(getRecepcionDeArchivosConfig())

const crearNotificarAdminRouter = () => {
    const router = express.Router();

    router.post('/cargarSolicitud', manejadorArchivos.single('archivo'), async (req,res) => {
        try {
            if (Object.prototype.hasOwnProperty.call(req.file, 'originalname')) {
                const urlArchivo = `http://localhost:${getServerPort()}/static/${req.file.originalname}`
                console.log(urlArchivo)
                const mailPropietario = req.body.mail
                console.log(mailPropietario)
                const CUFactory = await factoryCU.crearCUFactory()
                const cu = await CUFactory.crearCU()
                await cu.hacer(urlArchivo, getMailAdmin(), mailPropietario)
            } else {
                throw new crearErrorFaltaArchivo('No se ha adjuntado el archivo')
            }
        } catch(err) {
            throw new Error(`Se ha producido un error: ${err}`)
        }
    })

    return router
};

export default { crearNotificarAdminRouter };
