import express from 'express';
import factoryCU from '../negocio/CU_NotificarAdministrador/notificarAdministradorFactory.js';
import {crearRecepcionDeArchivos} from '../../compartidos/recepcionDeArchivos/recepcionDeArchivosFactory.js';
import {getServerPort, getMailAdmin} from '../../config.js'
import {crearErrorFaltaArchivo} from '../errores/errorFaltaArchivo.js'

const crearNotificarAdminRouter = (puerto, rutaArchivo) => {
    const router = express.Router();
    const manejadorArchivos = crearRecepcionDeArchivos()

    router.post('/cargarSolicitud', manejadorArchivos.single('archivo'),async (req,res) => {
        try{
            if(Object.prototype.hasOwnProperty.call(req.file, 'originalname'))
            {
                const urlArchivo = 'http://localhost:'+getServerPort+'/static/'+req.file.originalname
                const CUFactory = await factoryCU.crearCUFactory()
                const cu = CUFactory.crearCU()
                await cu.hacer(urlArchivo, getMailAdmin)
            }
            else
            {
                throw new crearErrorFaltaArchivo('No se ha adjuntado el archivo')
            }

        }
        catch(err)
        {
            throw new Error('Se ha producido un error: '+err)
        }
    })

    return router
};

export default { crearNotificarAdminRouter };
