import express from 'express'
import CU_IE_Factory from '../negocio/CU_InformarEstadoSolicitud/InformarEstadoSolicitudFactory.js'
import CU_NA_Factory from '../negocio/CU_NotificarAdministrador/notificarAdministradorFactory.js';
import factoryRA from '../../compartidos/recepcionDeArchivos/recepcionDeArchivosFactory.js';
import { getServerPort, getMailAdmin, getRecepcionDeArchivosConfig } from '../../config.js'
import { crearErrorFaltaArchivo } from '../errores/errorFaltaArchivo.js'

const manejadorArchivos = await factoryRA.crearRecepcionDeArchivos(getRecepcionDeArchivosConfig())

const crearSolicitudesRouter = () => {
  const router = express.Router()

  router.post('/:idSolicitud', async (req, res, next) => {
    try {
      const crearCU_InformarEstadoSolicitud = CU_IE_Factory.crearCU_InformarEstadoSolicitud()
      await crearCU_InformarEstadoSolicitud.validar(req.params.idSolicitud)
      res.json({ result: 'ok' })
    } catch (err) {
      next(err)
    }
  })

  router.post('/', manejadorArchivos.single('archivo'), async (req, res, next) => {
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
            
            const CUFactory = await CU_NA_Factory.crearCUFactory()
            const cu = await CUFactory.crearCU()
            await cu.hacer(urlArchivo, getMailAdmin(), datosPropietario, datosLocal)
        } else {
            throw new crearErrorFaltaArchivo('No se ha adjuntado el archivo')
        }
    } catch(err) {
        next(error);
    }
})

  router.use((error, req, res, next) => {
    switch(error.type) {
      case 'ERROR_DATOS_INVALIDOS':
      case 'ERROR_DATOS_FALTANTES':
        res.status(400);
      case 'ERROR_DATOS_NO_ENCONTRADOS':
        res.status(404)
      default:
        res.status(500);
    }

    res.json({ message: error.message });
  });

  return router
}

export default { crearSolicitudesRouter }