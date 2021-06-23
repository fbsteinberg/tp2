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
                const datosPropietario = {
                    mail:req.body.mail,
                    nombre:req.body.nombrePropietario,
                    apellido:req.body.apellido,
                    password:req.body.password
                }
                
                const datosLocal = {
                    nombre: req.body.nombreLocal,
                    cantidad: req.body.cantidad,
                    horarioMin: req.body.horarioMin,
                    horarioMax: req.body.horarioMax
                }
                
                const CUFactory = await factoryCU.crearCUFactory()
                const cu = await CUFactory.crearCU()
                await cu.hacer(urlArchivo, getMailAdmin(), datosPropietario, datosLocal)
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
