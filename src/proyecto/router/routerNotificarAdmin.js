import express from 'express';
import factoryCU from '../negocio/CU_NotificarAdministrador/notificarAdministradorFactory';
import moduloArchivos from '../../compartidos/recepcionDeArchivos/recepcionDeArchivos.js';

const crearNotificarAdminRouter = (puerto, rutaArchivo) => {
    const router = express.Router();
    const manejadorArchivos = await moduloArchivos.crearMiddleWare(rutaArchivo)

    router.post('/cargarSolicitud', manejadorArchivos.single('archivo'),async (req,res) => {
        try{
            if(Object.prototype.hasOwnProperty.call(req.body, 'idUsuario') &&
            Object.prototype.hasOwnProperty.call(req.file, 'originalname'))
            {
                app.use('/static', express.static('./'+req.body.idUsuario));
                const urlArchivo = 'http://localhost:'+puerto+'/static/'+req.file.originalname
                const CUFactory = await factoryCU.crearCUFactory()
                const cu = CUFactory.crearCU()
                await cu.hacer(req.body.idUsuario,req.body.urlArchivo,'fedesteinberg@gmail.com')
            }
            else
            {
                throw new Error('No se ha adjuntado el id del usuario o el archivo')
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
